import { Prose, H2, P, UL, LI } from "@/components/case-study/prose";
import { Figure } from "@/components/case-study/figure";
import { Callout } from "@/components/case-study/callout";
import { MetricRow } from "@/components/case-study/metric";
import { Toc } from "@/components/case-study/toc";
import { DiagramFrame, Box, Row, Arrow, Stack } from "@/components/case-study/diagram";

const toc = [
  { id: "context", label: "Context" },
  { id: "architecture", label: "Architecture" },
  { id: "quote-sourcing", label: "Two-tier quote sourcing" },
  { id: "hardening", label: "Hardening the proxy" },
  { id: "burst-fix", label: "The StrictMode 429 storm" },
  { id: "dev-prod-parity", label: "Dev/prod parity, the hard way" },
  { id: "disguise", label: "The disguise" },
  { id: "lessons", label: "Lessons" },
];

export default function ExcelStockBody() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-16">
      <Prose>
        <H2 id="context">Context</H2>
        <P>
          excel-stock is a live stock watchlist, at{" "}
          <a
            href="https://excel-stock.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent break-words"
          >
            excel-stock.vercel.app
          </a>
          , disguised as a Microsoft Excel 365 spreadsheet — column
          letters, ribbon, formula bar, data bars, autofilter, all hand-built in CSS grid with no grid
          library. Hit the backtick key and the whole thing flips to an innocent department-budget sheet: a
          different filename, plausible decoy numbers, the news pane gone. It&rsquo;s React 18 and TypeScript
          on Vite, with Vercel Node serverless functions on the backend, Vitest for tests, and about 5,360
          lines of code.
        </P>
        <P>
          The watchlist grid supports inline ticker editing and keyboard navigation, favoriting a row (★)
          auto-builds a personal watchlist sheet, and the default sheets are NASDAQ-10, NYSE-10, ETFs, and
          holdings. A real S&amp;P 500 / Nasdaq / Dow index strip and a live news pane sit alongside the grid. A
          mock mode — a random-walk quote provider with zero config — lets anyone try the whole thing offline in
          under 30 seconds without touching an API key.
        </P>
        <Figure
          src="/work/excel-stock/screen.webp"
          alt="excel-stock watchlist grid disguised as an Excel spreadsheet"
          caption="The watchlist grid, with a live news pane and a real index strip, wearing an Excel costume."
        />

        <H2 id="architecture">Architecture</H2>
        <P>
          An earlier project of mine, <code>autowise</code>, called Perplexity and OpenAI directly from the
          browser with <code>dangerouslyAllowBrowser: true</code> and <code>VITE_</code>-prefixed keys — meaning
          the API keys shipped in the client bundle. excel-stock&rsquo;s architecture is the deliberate fix for
          that mistake: no API keys ever reach the browser. Everything the client needs — quotes, news, index
          levels — goes through same-origin <code>/api/quote</code>, <code>/api/news</code>, and{" "}
          <code>/api/indices</code> proxy functions, and the secret-bearing provider code is only imported by
          those server modules, so it tree-shakes out of the client bundle entirely.
        </P>
        <DiagramFrame>
          <Stack>
            <Box label="Browser" sub="React 18 + TypeScript, Excel-chrome UI" />
            <Arrow direction="down" />
            <Box label="/api/quote · /api/news · /api/indices" sub="same-origin Vercel functions" />
            <Arrow direction="down" />
            <Row>
              <Box label="Stooq" sub="keyless, batched, shared watchlist" />
              <Box label="Finnhub" sub="per-symbol, user-added tickers" />
            </Row>
          </Stack>
        </DiagramFrame>

        <H2 id="quote-sourcing">Two-tier quote sourcing</H2>
        <P>
          Upstream load has to stay fixed no matter how many people have the page open, or the app can&rsquo;t
          sit public without turning into a rate-limit bill. That&rsquo;s why symbols on the shared default
          watchlist go through a single keyless, batched Stooq request, TTL-cached at 12 seconds with in-flight
          request coalescing, so upstream load is fixed at <code>symbols ÷ TTL</code> regardless of traffic.
          Symbols a user adds themselves aren&rsquo;t on that shared path; those hit Finnhub on demand instead.
        </P>
        <P>
          Fan-out to any per-symbol provider is capped by <code>mapPoolSettled</code>, a small concurrency-limited{" "}
          <code>Promise.allSettled</code> wrapper, so loading a full sheet doesn&rsquo;t fire every quote
          request at once and trip a free-tier burst limit. On top of that, <code>guard.ts</code> enforces a
          same-origin gate plus a per-IP rate limit — 240 requests/min by default, tracking up to 10,000 IPs
          before it clears its own state as a cheap backstop against IP-rotation spam.
        </P>

        <H2 id="hardening">Hardening the proxy</H2>
        <P>
          The news pane resolves Finnhub&rsquo;s redirect links server-side to find the real publisher, and
          that resolver is SSRF-hardened: it rejects private and loopback hosts outright and reads the
          redirect&rsquo;s <code>Location</code> header manually rather than ever following it, so the proxy
          never issues a request to a target host it hasn&rsquo;t validated first. The same{" "}
          <code>mapPoolSettled</code> helper caps that resolver&rsquo;s concurrency too, with its own small
          per-article result cache so re-resolving the same link twice is free.
        </P>

        <H2 id="burst-fix">The StrictMode 429 storm</H2>
        <P>
          The first live-mode test looked broken: a 10-symbol sheet loaded and every price cell showed{" "}
          <code>—</code> while the news pane worked fine. The cause was two multipliers stacking. Loading a full
          sheet fired all 10 Finnhub quote calls at once, and React StrictMode&rsquo;s dev-only double mount
          doubled that — roughly 20 near-simultaneous calls, on top of the news fan-out, tripped Finnhub&rsquo;s
          burst limit and every quote call came back <code>429</code>.
        </P>
        <P>
          The fix was the same <code>mapPoolSettled</code> concurrency cap described above, applied to the
          client&rsquo;s quote-fetching hook at a limit of 4 in-flight requests. After that, zero 429s. The part
          worth remembering: mock mode and live mode look identical on screen either way, so the only way to
          actually confirm which one is answering is to capture network responses per host and look at the
          status-code distribution — a screenshot alone can&rsquo;t tell you the grid is silently failing over
          to stale data.
        </P>

        <H2 id="dev-prod-parity">Dev/prod parity, the hard way</H2>
        <P>
          Dev and prod are meant to run the exact same handler modules — <code>vite.config.ts</code> runs them
          as Vite dev middleware, Vercel runs them as serverless functions — so there&rsquo;s no separate mock
          server to keep in sync. That guarantee still had one gap: Vercel <code>transpiles</code> each function
          rather than bundling it, and with <code>package.json</code> set to{" "}
          <code>&quot;type&quot;: &quot;module&quot;</code>, Node ESM requires explicit{" "}
          <code>.js</code> extensions on relative imports. Every function shipped fine locally under Vite (which
          bundles, so extensions don&rsquo;t matter) and then 500&rsquo;d in production with{" "}
          <code>ERR_MODULE_NOT_FOUND</code>.
        </P>
        <P>
          Reproducing it locally meant not trusting the dev server: transpiling the same source with esbuild in
          transpile-only mode (no bundling), writing a bare <code>&#123;&quot;type&quot;:&quot;module&quot;&#125;</code>{" "}
          package.json next to the output, and importing the built entry point under real Node ESM resolution.
          That setup fails with the exact missing-extension error and only stops failing once every relative
          import in the function&rsquo;s dependency graph gets its <code>.js</code> suffix — which is the actual
          fix, and the only way to verify it beyond just deploying and hoping.
        </P>
        <Figure
          src="/work/excel-stock/demo.gif"
          alt="excel-stock boss key demo"
          caption="The boss key in action — one keypress swaps the whole screen to a decoy budget sheet."
        />

        <H2 id="disguise">The disguise</H2>
        <P>
          The app is bilingual (EN/KO) with a single toggle, ships decoy budget-sheet data for the boss-key
          view, and disguises even the browser tab title and favicon as an <code>.xlsx</code> file. Auto-conceal
          triggers the moment the window loses focus or the tab is hidden — it only ever hides itself; revealing
          the real sheet again is always a deliberate keypress, so an unattended screen never flips back to
          stocks on its own.
        </P>

        <H2 id="lessons">Lessons, and honest caveats</H2>
        <MetricRow
          metrics={[
            { value: "~500", label: "Monthly visitors (Vercel)" },
            { value: "5,360", label: "Lines of code" },
            { value: "12s", label: "Quote cache TTL" },
            { value: "240/min", label: "Per-IP rate limit" },
          ]}
        />
        <Callout label="Honest caveats">
          <UL>
            <LI>Stooq data is roughly 15 minutes delayed — this is a watchlist toy, not a trading terminal.</LI>
            <LI>
              The ~500 figure is Vercel Analytics visitors, not monthly actives. Vercel identifies visitors with
              a hash that rotates daily, so somebody returning across several days is counted more than once —
              the true number of distinct people is lower than 500, not higher.
            </LI>
          </UL>
        </Callout>
      </Prose>
      <Toc entries={toc} />
    </div>
  );
}
