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
  education: {
    degree: string;
    school: string;
    period: string;
    coursework: string[];
  };
  stats: { label: string; value: string }[];
  about: string[];
}
