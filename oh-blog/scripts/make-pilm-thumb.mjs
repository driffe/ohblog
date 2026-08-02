// Standalone composite for Pilm's hover-thumbnail. frame-01/03/05.webp are
// 900x1951 portrait camera stills; `.hover-thumb` (app/globals.css) is a
// fixed 288x192 (3:2) landscape box with object-fit: cover, so any single
// portrait frame gets ~69% cropped away. This composes three frames side by
// side onto a transparent 1200x800 canvas (same 3:2 ratio, 4x scale) so it
// downsizes cleanly into the hover box without cropping into any one frame.
//
// Run: node scripts/make-pilm-thumb.mjs  (or `npm run make-pilm-thumb`)
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const pilmDir = path.join(repoRoot, "public", "work", "pilm");

const CANVAS_W = 1200;
const CANVAS_H = 800;
const FRAME_H = 700; // ~700px tall so three fit side by side with margins
const GAP = 24;

const frames = ["frame-01.webp", "frame-03.webp", "frame-05.webp"];

async function main() {
  const resized = await Promise.all(
    frames.map((name) =>
      sharp(path.join(pilmDir, name))
        .resize({ height: FRAME_H })
        .toBuffer({ resolveWithObject: true }),
    ),
  );

  const totalW = resized.reduce((sum, r) => sum + r.info.width, 0) + GAP * (resized.length - 1);
  let x = Math.round((CANVAS_W - totalW) / 2);
  const composites = resized.map(({ data, info }) => {
    const top = Math.round((CANVAS_H - info.height) / 2);
    const layer = { input: data, left: x, top };
    x += info.width + GAP;
    return layer;
  });

  const outPath = path.join(pilmDir, "thumb.webp");
  await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .webp({ quality: 82 })
    .toFile(outPath);

  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
