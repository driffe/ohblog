import type { Metadata } from "next";

// app/blog/[slug]'s own generateMetadata takes priority per-post; this is
// just the /blog index's metadata, kept in a layout the same way
// app/work/layout.tsx does it.
export const metadata: Metadata = {
  title: {
    template: "%s — Seyoung Oh",
    default: "Blog",
  },
  description:
    "Notes from building CoffeeByMe and other shipped projects — RAG, embeddings, backend systems, and AWS infrastructure.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — Seyoung Oh",
    description:
      "Notes from building CoffeeByMe and other shipped projects — RAG, embeddings, backend systems, and AWS infrastructure.",
    url: "/blog",
    images: ["/og-image.jpg"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
