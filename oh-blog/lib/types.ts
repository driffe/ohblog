// Shared content types for the Editorial Mono rebuild.

export type WorkTag = "product" | "ai" | "web" | "mobile" | "tools";

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkItem {
  slug: string;
  index: number;
  title: string;
  year: string;
  summary: string;
  role: string;
  status?: string;
  tags: WorkTag[];
  stack: string[];
  /** Internal /work/<slug> for case studies, otherwise the best external link. */
  href: string;
  demoHref?: string;
  githubHref?: string;
  hasCaseStudy: boolean;
  /** Competition placement, shown as a badge on the work index. e.g. "1st · Use of Perplexity/Sonar". */
  award?: string;
  /** Live usage number, shown as an accent badge next to `award`. e.g. "500+ MAU". */
  metric?: string;
  /** Set when a project is really a group of smaller shipped things (e.g. Chrome extensions). */
  group?: { title: string; href?: string }[];
  /** Optional hover-preview thumbnail, wired up once assets land in public/work/<slug>/. */
  thumbnail?: string;
}

export interface ExperienceRole {
  title: string;
  type?: string;
  period: string;
  responsibilities: string[];
}

export interface ExperienceEntry {
  company: string;
  badge: string;
  location: string;
  link?: string;
  roles: ExperienceRole[];
}

export interface StackCategory {
  category: string;
  items: string[];
}

export interface Hobby {
  title: string;
  description: string;
}

export interface Award {
  title: string;
  year: string;
}

/**
 * Blog post frontmatter topics. Unlike WorkTag, this isn't a closed set tied
 * to filter-bar UI — /blog has no tag filter in this phase — so it stays a
 * freeform string rather than a fixed union.
 */
export type BlogTag = string;

/**
 * Blog post metadata, typed 1:1 from the YAML frontmatter of
 * content/blog/<YYYY-MM-DD>-<slug>.mdx. content/blog/index.ts is generated
 * from that frontmatter by scripts/build-blog-index.mjs — the .mdx files are
 * the single source of truth, this interface just types their shape.
 */
export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  /** ISO date (YYYY-MM-DD) matching the file's date prefix. */
  date: string;
  /** ISO date (YYYY-MM-DD); used as sitemap lastModified. */
  updated: string;
  lang: "en" | "ko";
  tags: BlogTag[];
  /** Optional slug of a related /work/<slug> case study. */
  project?: string;
  readingMinutes: number;
  /** Excluded from the index, sitemap, and generateStaticParams when true. */
  draft: boolean;
  /** Optional oh-press brief id this post originated from. */
  brief?: string;
}

export interface Profile {
  name: string;
  /** First line of the homepage display headline. */
  role: string;
  /** Second line of the homepage display headline, broken onto its own line. */
  employer: string;
  eyebrow: string;
  positioning: string;
  availability: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeSwe: string;
  resumeIt: string;
  resumeStartup: string;
  education: {
    degree: string;
    school: string;
    period: string;
    coursework: string[];
  };
  stats: { label: string; value: string }[];
  about: string[];
}
