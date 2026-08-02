// One-off asset import for the four case-study projects. Resizes/converts
// source screenshots to .webp under public/work/<slug>/, except the
// excel-stock demo GIF which is copied as-is to keep its animation.
//
// Run: node scripts/import-assets.mjs  (or `npm run import-assets`)
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const publicWork = path.join(repoRoot, "public", "work");

/** @type {{ slug: string, src: string, outName: string, opts?: { maxWidth?: number, quality?: number }, copy?: boolean }[]} */
const manifest = [
  // ---- coffeebyme ----
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee_front/website/web/public/hero/hero-paint.webp",
    outName: "hero-paint",
  },
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee_front/website/web/public/main/ai_main.webp",
    outName: "ai-main",
  },
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee_front/website/web/public/main/single_main.webp",
    outName: "single-main",
  },
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee_front/website/web/public/main/recipe_main.webp",
    outName: "recipe-main",
  },
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee_front/website/web/public/main/coffeeMap_main.webp",
    outName: "coffee-map-main",
  },
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee_front/website/web/public/og/preview_us.png",
    outName: "preview-us",
  },
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee_front/website/web/public/guide/coffeebyme-flavor-wheel.webp",
    outName: "flavor-wheel",
  },
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee-agent-team/data/app/app-quiz-step1.png",
    outName: "app-quiz-step1",
  },
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee-agent-team/data/app/app-quiz-step7-taste.png",
    outName: "app-quiz-step7-taste",
  },
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee-agent-team/data/app/app-report-profile.png",
    outName: "app-report-profile",
  },
  {
    slug: "coffeebyme",
    src: "/Users/seyoungoh/Projects/coffee-agent-team/data/app/coffee-recommendation-the-classic.png",
    outName: "recommendation-classic",
  },

  // ---- excel-stock ----
  {
    slug: "excel-stock",
    src: "/Users/seyoungoh/Projects/excel-stock/demo/screen.png",
    outName: "screen",
    opts: { maxWidth: 1600 },
  },
  {
    slug: "excel-stock",
    src: "/Users/seyoungoh/Projects/excel-stock/demo/demo.gif",
    outName: "demo",
    copy: true,
  },

  // ---- pilm (portrait phone frames, capped narrower — source files are ~3MB) ----
  {
    slug: "pilm",
    src: "/Users/seyoungoh/Projects/Pilm/Preview/AppStore/6.9/01_IMG_2315_6.9.png",
    outName: "frame-01",
    opts: { maxWidth: 900 },
  },
  {
    slug: "pilm",
    src: "/Users/seyoungoh/Projects/Pilm/Preview/AppStore/6.9/03_IMG_2317_6.9.png",
    outName: "frame-03",
    opts: { maxWidth: 900 },
  },
  {
    slug: "pilm",
    src: "/Users/seyoungoh/Projects/Pilm/Preview/AppStore/6.9/05_IMG_2319_6.9.png",
    outName: "frame-05",
    opts: { maxWidth: 900 },
  },
  {
    slug: "pilm",
    src: "/Users/seyoungoh/Projects/Pilm/Preview/AppStore/6.9/07_IMG_2321_6.9.png",
    outName: "frame-07",
    opts: { maxWidth: 900 },
  },
  {
    slug: "pilm",
    src: "/Users/seyoungoh/Projects/Pilm/Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png",
    outName: "app-icon",
    opts: { maxWidth: 512 },
  },

  // ---- project-loki ----
  {
    slug: "project-loki",
    src: "/Users/seyoungoh/Projects/Project-Loki/godot/main_menu_screenshot.png",
    outName: "main-menu",
  },
  {
    slug: "project-loki",
    src: "/Users/seyoungoh/Projects/Project-Loki/godot/art/background/Kitchen.jpg",
    outName: "bg-kitchen",
  },
  {
    slug: "project-loki",
    src: "/Users/seyoungoh/Projects/Project-Loki/godot/art/background/Living room.jpg",
    outName: "bg-living-room",
  },
];

const DEFAULT_MAX_WIDTH = 1600;
const DEFAULT_QUALITY = 82;

async function main() {
  for (const entry of manifest) {
    const outDir = path.join(publicWork, entry.slug);
    await fs.mkdir(outDir, { recursive: true });

    if (entry.copy) {
      const outPath = path.join(outDir, `${entry.outName}${path.extname(entry.src)}`);
      await fs.copyFile(entry.src, outPath);
      const { size } = await fs.stat(outPath);
      console.log(`copied  ${outPath}  (${size.toLocaleString()} bytes)`);
      continue;
    }

    const maxWidth = entry.opts?.maxWidth ?? DEFAULT_MAX_WIDTH;
    const quality = entry.opts?.quality ?? DEFAULT_QUALITY;
    const outPath = path.join(outDir, `${entry.outName}.webp`);

    await sharp(entry.src)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath);

    const { size } = await fs.stat(outPath);
    console.log(`written ${outPath}  (${size.toLocaleString()} bytes)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
