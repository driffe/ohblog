import { ImageResponse } from "next/og";
import { caseStudySlugs, getWorkBySlug } from "@/content/work";

// Same font-fallback decision as app/opengraph-image.tsx — no request-time
// font fetch, default ImageResponse font, hierarchy via size/weight/spacing.
export const alt = "Case study cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#FCFAF7";
const INK = "#16130F";
const INK_MUTED = "#6B6259";
const RULE = "#E3DED5";
const ACCENT = "#C24E1A";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  const index = item ? String(item.index).padStart(2, "0") : "00";
  const title = item?.title ?? "Case Study";
  const stack = item?.stack.slice(0, 5) ?? [];

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
          <div style={{ display: "flex" }}>Case Study</div>
          <div style={{ display: "flex", color: ACCENT }}>{index}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {stack.map((s) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  fontSize: 20,
                  letterSpacing: 1,
                  color: INK_MUTED,
                  border: `1px solid ${RULE}`,
                  padding: "8px 16px",
                }}
              >
                {s}
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
