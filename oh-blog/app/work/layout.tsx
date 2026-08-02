import type { Metadata } from "next";

// app/work/page.tsx is a client component (filter state), so metadata for the
// /work index lives here instead. This layout also wraps /work/[slug], but
// that segment's own generateMetadata takes priority per-page.
export const metadata: Metadata = {
  title: {
    template: "%s — Seyoung Oh",
    default: "Work",
  },
  description:
    "Everything I've shipped — filterable by product, AI/LLM, web, mobile, and tools. Every project has a full case study.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work — Seyoung Oh",
    description:
      "Everything I've shipped — filterable by product, AI/LLM, web, mobile, and tools. Four projects have full case studies.",
    url: "/work",
    images: ["/og-image.jpg"],
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
