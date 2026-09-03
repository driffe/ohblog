import Link from "next/link";
import { posts } from "@/content/blog";
import { ArrowIcon } from "@/components/icons";

/** Person node shared with app/blog/[slug]/page.tsx's BlogPosting entries. */
const personNode = {
  "@type": "Person",
  name: "Seyoung Oh",
  url: "https://ohblog-inky.vercel.app",
};

export default function BlogPage() {
  const published = posts.filter((p) => !p.draft);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Seyoung Oh — Blog",
    url: "https://ohblog-inky.vercel.app/blog",
    author: personNode,
    blogPost: published.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://ohblog-inky.vercel.app/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <main id="main-content" className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <div className="wrap">
        <p className="eyebrow mb-4">Blog</p>
        <h1 className="display mb-10">Notes from the build</h1>

        <div>
          {published.length === 0 && (
            <p className="meta">
              Nothing published yet. First pieces are in progress.
            </p>
          )}
          {published.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="index-row">
              <span className="meta" style={{ minWidth: "2ch" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-xl sm:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                  {post.title}
                </span>
                <span className="meta mt-1 block truncate">{post.summary}</span>
              </span>
              <span className="meta hidden sm:flex items-center gap-2">
                {post.date.slice(0, 4)}
                {post.lang === "ko" && <span style={{ color: "var(--accent)" }}>KO</span>}
              </span>
              <ArrowIcon className="index-row-arrow" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
