import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogSlugs, getPostBySlug } from "@/content/blog";
import type { BlogPost } from "@/lib/types";

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) return {};
  const canonical = `/blog/${slug}`;
  const ogImage = `/blog/${slug}/opengraph-image`;
  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: `${post.title} — Seyoung Oh`,
      description: post.summary,
      url: canonical,
      images: [ogImage],
      publishedTime: post.date,
      modifiedTime: post.updated,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Seyoung Oh`,
      description: post.summary,
      images: [ogImage],
    },
  };
}

/** Person node shared with app/blog/page.tsx's Blog node. */
const personNode = {
  "@type": "Person",
  name: "Seyoung Oh",
  url: "https://ohblog-inky.vercel.app",
};

function buildJsonLd(post: BlogPost) {
  const canonical = `https://ohblog-inky.vercel.app/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    url: canonical,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: post.lang,
    keywords: post.tags.join(", "),
    author: personNode,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  // The .mdx frontmatter is the only metadata source; the body itself is
  // loaded via a dynamic import mirroring the `bodies: Record<string,
  // ComponentType>` map in app/work/[slug]/page.tsx — here the map is
  // implicit (slug + date reconstruct the filename) since it's one file per
  // post rather than a handful of named case-study bodies.
  const { default: Body } = await import(`@/content/blog/${post.date}-${post.slug}.mdx`);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(post)) }}
      />
      <section className="section pb-0">
        <div className="wrap">
          <p className="eyebrow mb-4">
            {post.date} · {post.readingMinutes} min read{post.lang === "ko" ? " · KO" : ""}
          </p>
          <h1 className="display mb-6">{post.title}</h1>
          <p className="max-w-2xl text-lg text-ink-muted mb-10">{post.summary}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 rule-t rule-b">
            <div className="py-6 pr-4 min-w-0">
              <p className="meta mb-2">Published</p>
              <p>{post.date}</p>
            </div>
            <div className="py-6 pr-4 md:border-l border-rule md:pl-4 min-w-0">
              <p className="meta mb-2">Updated</p>
              <p>{post.updated}</p>
            </div>
            <div className="py-6 pr-4 md:border-l border-rule md:pl-4 min-w-0">
              <p className="meta mb-2">Tags</p>
              <p className="break-words">{post.tags.join(", ")}</p>
            </div>
            <div className="py-6 md:border-l border-rule md:pl-4 min-w-0">
              <p className="meta mb-2">Reading time</p>
              <p>{post.readingMinutes} min</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-10">
        <div className="wrap">
          <article lang={post.lang}>
            <Body />
          </article>
        </div>
      </section>
    </main>
  );
}
