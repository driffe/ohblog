import { ImageResponse } from "next/og";
import { blogSlugs, getPostBySlug } from "@/content/blog";

// Cloned from app/work/[slug]/opengraph-image.tsx — same PAPER/INK/INK_MUTED
// /RULE/ACCENT constants, same no-request-time-font-fetch decision (default
// ImageResponse font, hierarchy via size/weight/spacing only). Only the data
// source (content/blog instead of content/work) and the eyebrow text change.
export const alt = "Blog post cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#FCFAF7";
const INK = "#16130F";
const INK_MUTED = "#6B6259";
const RULE = "#E3DED5";
const ACCENT = "#C24E1A";

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const year = post ? post.date.slice(0, 4) : "";
  const title = post?.title ?? "Blog Post";
  const tags = post?.tags.slice(0, 5) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: "72px",
          border: `1px solid ${RULE}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: INK_MUTED,
          }}
        >
          <div style={{ display: "flex" }}>Blog</div>
          <div style={{ display: "flex", color: ACCENT }}>{year}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 20,
                  letterSpacing: 1,
                  color: INK_MUTED,
                  border: `1px solid ${RULE}`,
                  padding: "8px 16px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: INK_MUTED,
          }}
        >
          <div style={{ display: "flex" }}>SEYOUNG OH</div>
          <div style={{ display: "flex" }}>ohblog-inky.vercel.app</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
