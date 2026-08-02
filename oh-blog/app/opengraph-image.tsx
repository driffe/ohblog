import { ImageResponse } from "next/og";

// Generated via next/og's ImageResponse (built into Next 15, zero new deps).
// Uses the ImageResponse default font rather than fetching Instrument Serif /
// JetBrains Mono at request time — a network fetch during static generation
// is a real build-fragility risk for zero cosmetic upside here, so hierarchy
// comes from size/weight/spacing instead of custom type. See report.
export const alt = "Seyoung Oh — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#FCFAF7";
const INK = "#16130F";
const INK_MUTED = "#6B6259";
const RULE = "#E3DED5";
const ACCENT = "#C24E1A";

export default async function Image() {
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
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: INK_MUTED,
          }}
        >
          SEYOUNG OH
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            Seyoung Oh
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 500, color: ACCENT }}>
            Software Engineer
          </div>
          <div style={{ display: "flex", fontSize: 24, color: INK_MUTED, maxWidth: 880 }}>
            Shipping production code to ~1M monthly users. Case studies in backend, full-stack, and
            applied AI.
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
          <div style={{ display: "flex" }}>ohblog-inky.vercel.app</div>
          <div style={{ display: "flex" }}>Case Studies · Engineering</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
