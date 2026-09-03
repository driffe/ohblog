// Generates content/blog/index.ts from the YAML frontmatter of every
// content/blog/<YYYY-MM-DD>-<slug>.mdx file, using gray-matter. The .mdx
// frontmatter is the ONLY place blog metadata is typed — this script is
// what lets sitemap.ts, app/blog/page.tsx, and the OG image consume it as
// a plain content/blog/index.ts, the same shape family as content/work/index.ts.
//
// Run: node scripts/build-blog-index.mjs  (or `npm run build:blog-index`)
// Runs automatically before `build` (prebuild) and `dev`.
//
// Fails loudly (non-zero exit) on: a missing required field, a slug that
// doesn't match its filename, a duplicate slug, or a date that doesn't
// match the filename's date prefix.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const blogDir = path.join(repoRoot, "content", "blog");
const outFile = path.join(blogDir, "index.ts");

const FILENAME_RE = /^(\d{4}-\d{2}-\d{2})-(.+)\.mdx$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const REQUIRED_FIELDS = [
  "slug",
  "title",
  "summary",
  "date",
  "updated",
  "lang",
  "tags",
  "readingMinutes",
  "draft",
];

function fail(message) {
  console.error(`[build-blog-index] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(blogDir)) {
  fail(`content/blog directory not found at ${blogDir}`);
}

// `_`-prefixed files are authoring scaffolding (e.g. _template.mdx), not posts.
const files = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
  .sort();

// Zero posts is a valid state — an empty blog awaiting its first real piece.
// It must not fail the build, or `npm run build` breaks the whole site.
if (files.length === 0) {
  console.warn("[build-blog-index] no posts under content/blog — writing an empty index.");
}

const seenSlugs = new Map(); // slug -> filename, for duplicate detection
const posts = [];

for (const filename of files) {
  const match = FILENAME_RE.exec(filename);
  if (!match) {
    fail(
      `"${filename}" doesn't match the required <YYYY-MM-DD>-<slug>.mdx naming pattern.`,
    );
  }
  const [, filenameDate, filenameSlug] = match;

  const raw = fs.readFileSync(path.join(blogDir, filename), "utf8");
  const { data: fm } = matter(raw);

  // YAML parses a bare `date: 2026-08-20` as a Date, not a string (js-yaml
  // reads it as a UTC-midnight timestamp) — normalize back to YYYY-MM-DD so
  // authors don't have to remember to quote it.
  for (const field of ["date", "updated"]) {
    if (fm[field] instanceof Date) {
      fm[field] = fm[field].toISOString().slice(0, 10);
    }
  }

  for (const field of REQUIRED_FIELDS) {
    if (fm[field] === undefined || fm[field] === null || fm[field] === "") {
      fail(`"${filename}" is missing required frontmatter field "${field}".`);
    }
  }

  if (fm.slug !== filenameSlug) {
    fail(
      `"${filename}": frontmatter slug "${fm.slug}" does not match the filename slug "${filenameSlug}" ` +
        `(expected the filename to be "${filenameDate}-${fm.slug}.mdx").`,
    );
  }

  if (!DATE_RE.test(fm.date)) {
    fail(`"${filename}": frontmatter "date" must be YYYY-MM-DD, got "${fm.date}".`);
  }
  if (fm.date !== filenameDate) {
    fail(
      `"${filename}": frontmatter date "${fm.date}" does not match the filename's date prefix "${filenameDate}".`,
    );
  }
  if (!DATE_RE.test(fm.updated)) {
    fail(`"${filename}": frontmatter "updated" must be YYYY-MM-DD, got "${fm.updated}".`);
  }

  if (fm.lang !== "en" && fm.lang !== "ko") {
    fail(`"${filename}": frontmatter "lang" must be "en" or "ko", got "${JSON.stringify(fm.lang)}".`);
  }

  if (!Array.isArray(fm.tags) || fm.tags.length === 0 || !fm.tags.every((t) => typeof t === "string")) {
    fail(`"${filename}": frontmatter "tags" must be a non-empty array of strings.`);
  }

  if (typeof fm.readingMinutes !== "number" || fm.readingMinutes <= 0) {
    fail(`"${filename}": frontmatter "readingMinutes" must be a positive number.`);
  }

  if (typeof fm.draft !== "boolean") {
    fail(`"${filename}": frontmatter "draft" must be a boolean.`);
  }

  if (fm.project !== undefined && typeof fm.project !== "string") {
    fail(`"${filename}": frontmatter "project", if set, must be a string.`);
  }

  if (fm.brief !== undefined && typeof fm.brief !== "string") {
    fail(`"${filename}": frontmatter "brief", if set, must be a string.`);
  }

  if (seenSlugs.has(fm.slug)) {
    fail(`duplicate slug "${fm.slug}" in "${filename}" and "${seenSlugs.get(fm.slug)}".`);
  }
  seenSlugs.set(fm.slug, filename);

  posts.push({
    slug: fm.slug,
    title: fm.title,
    summary: fm.summary,
    date: fm.date,
    updated: fm.updated,
    lang: fm.lang,
    tags: fm.tags,
    ...(fm.project !== undefined ? { project: fm.project } : {}),
    readingMinutes: fm.readingMinutes,
    draft: fm.draft,
    ...(fm.brief !== undefined ? { brief: fm.brief } : {}),
  });
}

// Newest first, matching how the /blog index and sitemap should list posts.
posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

function serializePost(post) {
  const lines = [
    "  {",
    `    slug: ${JSON.stringify(post.slug)},`,
    `    title: ${JSON.stringify(post.title)},`,
    `    summary: ${JSON.stringify(post.summary)},`,
    `    date: ${JSON.stringify(post.date)},`,
    `    updated: ${JSON.stringify(post.updated)},`,
    `    lang: ${JSON.stringify(post.lang)},`,
    `    tags: ${JSON.stringify(post.tags)},`,
  ];
  if (post.project !== undefined) lines.push(`    project: ${JSON.stringify(post.project)},`);
  lines.push(`    readingMinutes: ${JSON.stringify(post.readingMinutes)},`);
  lines.push(`    draft: ${JSON.stringify(post.draft)},`);
  if (post.brief !== undefined) lines.push(`    brief: ${JSON.stringify(post.brief)},`);
  lines.push("  },");
  return lines.join("\n");
}

const banner = `// GENERATED FILE — do not edit by hand.
// Produced by scripts/build-blog-index.mjs from the YAML frontmatter of
// content/blog/*.mdx. Run \`npm run build:blog-index\` to regenerate (also
// runs automatically before \`build\` and \`dev\`).
`;

const body = `import type { BlogPost } from "@/lib/types";

// All blog posts, including drafts, newest first. Every entry's \`slug\` +
// \`date\` reconstructs its source file as content/blog/<date>-<slug>.mdx,
// dynamically imported in app/blog/[slug]/page.tsx.
export const posts: BlogPost[] = [
${posts.map(serializePost).join("\n")}
];

// Published slugs only — draft posts are excluded from the index, the
// sitemap, and generateStaticParams.
export const blogSlugs = posts.filter((p) => !p.draft).map((p) => p.slug);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
`;

fs.writeFileSync(outFile, banner + "\n" + body);

const publishedCount = posts.filter((p) => !p.draft).length;
console.log(
  `[build-blog-index] wrote ${outFile} — ${posts.length} post(s), ${publishedCount} published, ${
    posts.length - publishedCount
  } draft.`,
);
