# Oh! Blog

Seyoung Oh's personal site and portfolio — an editorial-mono index of shipped work, with full
technical case studies for the four deepest projects (CoffeeByMe, excel-stock, Pilm,
Project-Loki).

Live at [ohblog-inky.vercel.app](https://ohblog-inky.vercel.app).

## Stack

- **Next.js 15** (App Router) on **React 19**
- **Tailwind CSS 4**, CSS-first `@theme` tokens (no `tailwind.config.ts`) — see the design tokens
  at the top of `app/globals.css`
- **`next/font/google`** for self-hosted Instrument Serif (display), Inter (body), and
  JetBrains Mono (meta/eyebrow/tags)
- **`next/og`** (`ImageResponse`, built into Next — no extra dependency) for generated
  Open Graph cards
- **TypeScript**, strict mode, no `any`
- **`sharp`** (dev-only) for the one-off asset import script

No CSS-in-JS, no icon library (icons are hand-inlined SVGs in `components/icons.tsx`), no
component library. No `box-shadow` anywhere; border-radius is capped at 2px.

## Structure

```
app/
  layout.tsx                  fonts, theme script, skip link, header/footer, base metadata
  globals.css                 @theme tokens + primitives (.display, .meta, .index-row, .reveal, ...)
  page.tsx                    home (+ Person JSON-LD)
  opengraph-image.tsx         generated site-wide OG card
  sitemap.ts / robots.ts
  work/
    page.tsx                  full project index, client-side tag filter
    layout.tsx                metadata for /work (page.tsx is a client component)
    [slug]/
      page.tsx                case-study shell + generateStaticParams + generateMetadata + JSON-LD
      opengraph-image.tsx     generated per-case-study OG card
  experience/  stack/  about/  playground/  contact/   page.tsx per route
  not-found.tsx
components/
  site-header.tsx  site-footer.tsx  theme-toggle.tsx  reveal.tsx  icons.tsx  work-index.tsx
  case-study/                 prose.tsx figure.tsx metric.tsx callout.tsx
                               code-block.tsx meta-table.tsx toc.tsx diagram.tsx
content/
  profile.ts  experience.ts  stack.ts  playground.ts
  work/
    index.ts                  WorkItem[] — metadata for every shipped project
    coffeebyme.tsx  excel-stock.tsx  pilm.tsx  project-loki.tsx   case-study bodies
lib/
  types.ts                     shared content types (WorkItem, Profile, ExperienceEntry, ...)
scripts/
  import-assets.mjs            dev-only sharp import from absolute source paths → public/work/<slug>/
public/
  work/<slug>/*.webp           imported case-study screenshots
  favicon.ico, resume PDFs, ...
```

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — also the CI/type-check gate
npm run start    # serve the production build
npm run lint     # next lint
```

## Adding a new case study

1. Add a `WorkItem` entry to `content/work/index.ts` with `hasCaseStudy: true` and a unique
   `slug`/`index`. Set `thumbnail` once the hero asset exists at `public/work/<slug>/...`.
2. Create `content/work/<slug>.tsx`, default-exporting a body component built from the
   `components/case-study/*` primitives (`Prose`, `H2`/`P`/`UL`/`LI`, `Figure`, `MetricRow`,
   `Callout`, `CodeBlock`, `MetaTable`, `Toc`, and the `diagram.tsx` primitives for architecture
   diagrams). Follow the spine used by the existing four studies: Context → Architecture →
   3–5 challenge/approach/result sections → Measured results → What I'd change.
3. Register the new body component in the `bodies` map in `app/work/[slug]/page.tsx`.
4. Add the case study's assets to the `manifest` array in `scripts/import-assets.mjs` (see
   below), then reference the resulting `public/work/<slug>/*.webp` paths from the body and
   from `thumbnail` in `content/work/index.ts`.
5. `npm run build` — the new slug should show up in `generateStaticParams` output, get its own
   generated OG image at `/work/<slug>/opengraph-image`, and appear in `app/sitemap.ts`
   automatically (it's derived from `caseStudySlugs`).

## Importing case-study assets

`scripts/import-assets.mjs` is a dev-only, one-off image pipeline — it's not part of the build.
It reads a hardcoded `manifest` array of `{ slug, src, outName, opts?, copy? }` entries, where
`src` is an **absolute path on the machine running the script** (source screenshots live in
sibling project repos, not in this repo). For each entry it:

- resizes the source image to `opts.maxWidth` (default 1600px, `withoutEnlargement: true`),
- converts it to `.webp` at `opts.quality` (default 82), and
- writes it to `public/work/<slug>/<outName>.webp` —

except entries with `copy: true` (e.g. the excel-stock demo GIF), which are copied byte-for-byte
so animation is preserved.

```bash
npm run import-assets
```

Run it whenever a case study's source screenshots change upstream; commit the resulting
`public/work/<slug>/*.webp` files like any other asset.
