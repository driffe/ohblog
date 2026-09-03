// GENERATED FILE — do not edit by hand.
// Produced by scripts/build-blog-index.mjs from the YAML frontmatter of
// content/blog/*.mdx. Run `npm run build:blog-index` to regenerate (also
// runs automatically before `build` and `dev`).

import type { BlogPost } from "@/lib/types";

// All blog posts, including drafts, newest first. Every entry's `slug` +
// `date` reconstructs its source file as content/blog/<date>-<slug>.mdx,
// dynamically imported in app/blog/[slug]/page.tsx.
export const posts: BlogPost[] = [

];

// Published slugs only — draft posts are excluded from the index, the
// sitemap, and generateStaticParams.
export const blogSlugs = posts.filter((p) => !p.draft).map((p) => p.slug);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
