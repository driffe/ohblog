import { Prose, H2, P, UL, LI } from "@/components/case-study/prose";
import { Figure } from "@/components/case-study/figure";
import { MetricRow } from "@/components/case-study/metric";
import { Callout } from "@/components/case-study/callout";
import { CodeBlock } from "@/components/case-study/code-block";
import { MetaTable } from "@/components/case-study/meta-table";
import { Toc } from "@/components/case-study/toc";
import { DiagramFrame, Box, Row, Arrow, Stack } from "@/components/case-study/diagram";

const toc = [
  { id: "context", label: "Context" },
  { id: "architecture", label: "Architecture" },
  { id: "ingestion", label: "Ingestion pipeline" },
  { id: "recommendation", label: "Recommendation engine" },
  { id: "cache-stampede", label: "The cache stampede" },
  { id: "n-plus-1", label: "An N+1 that survived twice" },
  { id: "ddl-auto", label: "Getting off ddl-auto" },
  { id: "data-integrity", label: "When the AI writes the data" },
  { id: "marketing-agents", label: "The multi-agent marketing system" },
  { id: "evals", label: "Offline evals" },
  { id: "deployment", label: "Deployment" },
  { id: "results", label: "Measured results" },
  { id: "retrospective", label: "What I'd change" },
];

export default function CoffeeByMeBody() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-16">
      <Prose>
        <H2 id="context">Context</H2>
        <P>
          CoffeeByMe is a coffee discovery platform serving the US and Korean markets, live at
          coffeebyme.com. I&rsquo;ve been the solo developer and technical lead since launch. The product lets
          someone answer a short taste quiz, then get a single recommended bean out of a catalog scraped and
          AI-analyzed from real specialty roasteries — with a coffee map, recipe pages, and single-origin and
          blend browsing around it.
        </P>
        <Figure
          src="/work/coffeebyme/app-quiz-step1.webp"
          alt="CoffeeByMe taste quiz, first step"
          caption="The taste quiz — acidity, body, roast, and flavor preference collected in a few short steps."
        />
        <Figure
          src="/work/coffeebyme/app-quiz-step7-taste.webp"
          alt="CoffeeByMe taste quiz, flavor step"
          caption="Flavor-note selection — this is the input the embedding-based recommendation query is built from."
        />
        <Figure
          src="/work/coffeebyme/app-report-profile.webp"
          alt="CoffeeByMe taste report"
          caption="The taste report generated from quiz answers, shown before the final bean recommendation."
        />
        <P>
          It took three builds to get here. The first, <code>coffee</code>, was a FastAPI + SQLAlchemy + Postgres
          app that I abandoned before it had a real recommendation loop. The second, <code>coffee_py</code>, did —
          FastAPI with OpenAI&rsquo;s <code>text-embedding-3-small</code> for embeddings, ChromaDB as the vector
          store, and <code>gpt-4o-mini</code> to write the final pick, at roughly $0.002 per request. It worked,
          but I abandoned it too: I wanted a backend I could actually operate long-term, not a FastAPI script with
          a vector database bolted on. The system that&rsquo;s live now, <code>CoffeeByMe</code>, is Java 17
          on Spring Boot 3.5.3, organized around DDD bounded contexts, backed by MySQL and Redis, with AWS
          Bedrock in place of the OpenAI API — 172 main Java files, 19 test classes. The frontend is Next.js 16
          (App Router) and React 19, deployed to Vercel.
        </P>
        <div className="grid grid-cols-2 gap-4 my-8">
          <Figure src="/work/coffeebyme/ai-main.webp" alt="AI recommendation landing page" caption="AI recommendation entry point" className="my-0" />
          <Figure src="/work/coffeebyme/single-main.webp" alt="Single origin catalog page" caption="Single-origin catalog" className="my-0" />
          <Figure src="/work/coffeebyme/recipe-main.webp" alt="Recipe page" caption="Recipe pages, attached to specific beans" className="my-0" />
          <Figure src="/work/coffeebyme/coffee-map-main.webp" alt="Coffee map page" caption="Coffee map — roasteries by location" className="my-0" />
        </div>

        <H2 id="architecture">Architecture</H2>
        <P>
          Nothing talks directly to the scraper at runtime — the CSV is the entire contract between it and
          everything downstream. Three pieces make up the system, connected by a file and by HTTP: a Python
          scraper that turns roastery websites into a CSV, a Java backend that imports that CSV and serves
          recommendations, and a Next.js frontend.
        </P>
        <DiagramFrame>
          <Stack>
            <Box label="~97 roastery sites" sub="Shopify products.json · Selenium fallback" />
            <Arrow direction="down" />
            <Box label="coffee_script" sub="Claude Haiku batch → Sonnet escalation" />
            <Arrow direction="down" />
            <Box label="CSV" sub="single_us.csv · blend_us.csv" />
            <Arrow direction="down" />
            <Box label="CoffeeByMe" sub="Spring Boot 3.5 · DDD bounded contexts" />
            <Arrow direction="down" />
            <Row>
              <Box label="MySQL" sub="beans + embeddings" />
              <Box label="Redis" sub="recommendation + query cache" />
              <Box label="AWS Bedrock" sub="Titan embed · Claude Haiku" />
            </Row>
            <Arrow direction="down" />
            <Box label="Next.js 16 frontend" sub="Vercel" />
          </Stack>
        </DiagramFrame>

        <H2 id="ingestion">The ingestion pipeline</H2>
        <P>
          Hitting a public JSON endpoint with plain requests is far cheaper than driving a real browser, so{" "}
          <code>coffee_script</code> always tries the lightweight path first: collecting from roughly 97
          roasteries, nineteen of 25 sites are Shopify stores, and those go through the public{" "}
          <code>/products.json</code> endpoint with plain <code>requests</code> — no browser, no rendering. Only
          the rest — bot-blocked or custom-platform sites — fall back to Selenium, run across 3 parallel workers.
        </P>
        <P>
          Analysis is a three-layer pipeline, shaped entirely around cost. First, a result cache keyed on
          normalized URL plus prompt version, so nothing gets re-analyzed unless the prompt itself changed. A
          miss goes to one Claude Messages Batch API call on <code>claude-haiku-4-5</code> — chosen for the
          batch API&rsquo;s 50% token discount — using structured outputs, so a JSON schema enforces that{" "}
          <code>coffee_type</code> can only be <code>SINGLE</code> or <code>BLEND</code> and every sensory field
          is clamped to a 1–5 enum. Only what actually needs it escalates further: anything that fails
          validation, or that had to infer five or more sensory fields, goes to <code>claude-sonnet-4-6</code>{" "}
          for a second pass.
        </P>
        <P>
          The prompt splits fields into two categories with opposite rules. Sensory fields — roast level, acidity,
          body, cup note, description — must always be inferred; they can never come back blank. Factual fields —
          price, weight, origin, name — must be copied verbatim from the store&rsquo;s own product API and never
          guessed; they&rsquo;re injected into the prompt as an explicit{" "}
          <code>[Known Facts — AUTHORITATIVE]</code> block the model isn&rsquo;t allowed to override. An{" "}
          <code>inferred_fields</code> output tracks per-cell provenance, so every value in the CSV can be traced
          back to either the store or the model.
        </P>
        <Figure
          src="/work/coffeebyme/flavor-wheel.webp"
          alt="CoffeeByMe flavor wheel guide"
          caption="The flavor wheel used to normalize sensory vocabulary across roasteries that all describe taste differently."
        />
        <P>
          Validation is a hard &ldquo;no empty cells&rdquo; rule — a row missing a required field gets dropped
          with a visible log entry rather than written half-empty. One real run: 123 items collected, 123
          analyzed, 80 rows passed validation with 0 dropped after that point, splitting into 41 single-origin
          and 39 blend. The master CSVs — <code>single_us.csv</code> and <code>blend_us.csv</code> — are what the
          backend actually imports; everything upstream of them is a scraping run.
        </P>

        <H2 id="recommendation">No vector database, and the v1 → v2.1 recommendation engine</H2>
        <P>
          Bean embeddings live in an ordinary MySQL table, <code>coffee_embeddings</code>, keyed by a SHA-256{" "}
          <code>text_hash</code> so re-embedding an unchanged bean is a no-op. The active set is held in a
          process-local in-memory <code>Map&lt;Long, float[]&gt;</code>, with the whole map swapped atomically
          (via a volatile reference) on refresh. Similarity search is brute-force cosine over the filtered
          candidate set — no ANN index, no separate vector store. At roughly 1,000–2,000 beans this comfortably
          beats operating a vector database, and the full backfill of about 1,000 embeddings cost around $0.003.
        </P>
        <Figure
          src="/work/coffeebyme/recommendation-classic.webp"
          alt="A recommended coffee bean detail card"
          caption="The output of the v2.1 recommendation flow — one bean, with the model's own reasoning attached."
        />
        <P>
          The recommendation logic itself went through three real revisions:
        </P>
        <MetaTable
          rows={[
            {
              key: "v1",
              value:
                "A SQL filter plus a hand-tuned 100-point score across acidity, body, roast, flavor, and caffeine; Claude picked one from the shortlist. It couldn't express something like “floral yet clean,” and every new flavor note meant re-tuning the weights by hand.",
            },
            {
              key: "v2",
              value:
                "Hard filter → Amazon Titan Embed Text v2 (1024-dim, normalized) → cosine similarity (weight 85%) plus an explicit +0.15 bonus for an exact roast-level match → top 10 candidates → Claude Haiku 4.5 picks one and writes 2–3 sentences of reasoning.",
            },
            {
              key: "v2.1",
              value:
                "Removed origin and processing method from the hard filter. The Korean market has too few anaerobic or infused coffees, and the candidate set kept hitting zero. That intent now flows through the embedding query text instead of a filter clause.",
            },
          ]}
        />

        <H2 id="cache-stampede">The cache stampede that sync = true didn&rsquo;t fix</H2>
        <P>
          Every production deploy runs the bean-import batch, which evicts the recommendation cache — so every
          deploy cold-starts it. Adding <code>@Cacheable(sync = true)</code> to the recommendation loader looked
          like the fix. It wasn&rsquo;t.
        </P>
        <P>
          Measurement proved it was a no-op. Spring&rsquo;s <code>RedisCache#get(key, valueLoader)</code> has no
          synchronization at all — zero <code>monitorenter</code> instructions in the compiled bytecode — and{" "}
          <code>RedisCacheManager</code>&rsquo;s default writer is non-locking, so it skips straight past the{" "}
          <code>isLockingCacheWriter()</code> branch and runs the loader immediately. At 20 virtual users hitting
          a cold cache in a k6 run, the loader executed 10 times — reproduced identically across 3 repeated runs.
        </P>
        <P>
          Spring does ship a locking option, <code>lockingRedisCacheWriter</code>, and I rejected it. Its lock is
          scoped to the cache <code>name</code>, not the key — with a measured cold load of 2.7 seconds, every
          unrelated taste profile would serialize behind whichever one loaded first, and tail latency would get
          worse across the board right after every deploy.
        </P>
        <P>
          The actual fix is a 256-way striped <code>ReentrantLock</code> keyed on the cache key&rsquo;s hash,
          wrapping the entire <code>@Cacheable</code> call rather than just the loader — leaving a gap between
          lookup and load would have left the duplicate-call problem in place. A thread that can&rsquo;t acquire
          its lock within 10 seconds proceeds without it, degrading to the old duplicate-call behavior instead of
          failing the request outright.
        </P>
        <CodeBlock label="CoffeeRecommendationService.java">
          {`private static final int LOCK_STRIPES = 256;
private static final long LOCK_WAIT_SECONDS = 10L;
private final ReentrantLock[] loadLocks = createLoadLocks();

ReentrantLock lock = loadLocks[Math.floorMod(cacheKey.hashCode(), LOCK_STRIPES)];
boolean locked = lock.tryLock(LOCK_WAIT_SECONDS, TimeUnit.SECONDS);
// ... self.getCachedRecommendation(cacheKey, tasteProfile, region) ...`}
        </CodeBlock>
        <P>
          The result is one Bedrock call per key on a cold burst, instead of one per concurrent request.{" "}
          <code>sync = true</code> stayed in the code as a statement of intent for if the cache implementation
          ever changes, but the actual serialization is the striped lock.
        </P>
        <Callout label="Honest limits">
          The lock is JVM-local. It works because CoffeeByMe runs on a single EC2 instance today. Scaling out to
          multiple instances would need a distributed lock instead — Redisson was considered and rejected for now
          as overkill for one box.
        </Callout>

        <H2 id="n-plus-1">An N+1 that survived two fixes</H2>
        <P>
          The community recipe feed uses a native SQL query to support dynamic filters, which rules out{" "}
          <code>JOIN FETCH</code> or <code>@EntityGraph</code>. Hibernate&rsquo;s{" "}
          <code>default_batch_fetch_size</code> setting doesn&rsquo;t reach that path&rsquo;s lazy{" "}
          <code>user</code> proxies either, so the feed was running about 22 queries per page — one per
          author, plus one for the page itself.
        </P>
        <P>
          The first fix looked reasonable: pre-load author IDs with <code>findAllById</code> to warm the
          persistence context before the recipes were mapped. It did nothing. Calling{" "}
          <code>getUser().getId()</code> on a lazy proxy initializes that proxy, which silently defeated the
          pre-load — tests still showed roughly 22 queries.
        </P>
        <P>
          The fix that actually worked doesn&rsquo;t depend on proxy behavior at all: fetch recipe and author IDs
          from the native query, re-query by recipe ID with an explicit <code>JOIN FETCH</code> on{" "}
          <code>user</code>, and rebuild the <code>PageImpl</code> in the original order by hand. Twenty-two
          queries dropped to two. I locked it in with an N+1 regression test that uses multiple authors and an
          empty persistence context, and changed CI to run the test suite on every PR so it can&rsquo;t regress
          silently after merge.
        </P>

        <H2 id="ddl-auto">Getting out of ddl-auto: update</H2>
        <P>
          Production schema had been created entirely by Hibernate&rsquo;s <code>ddl-auto: update</code> — no
          migration history, no rollback path, and <code>update</code> silently ignores column drops and type
          changes, so the schema and the entities could drift without anything failing loudly. Two real
          consequences of that: a stale CHECK constraint in dev was rejecting ratings the entity itself allowed,
          and there was an orphan column in prod that no entity referenced anymore.
        </P>
        <P>
          Flyway couldn&rsquo;t just be switched on, because both environments already had a{" "}
          <code>V1</code> migration recorded as failed, and Flyway refuses to boot at all against a failed
          migration history. The fix was to discard that history and restart from a single baseline generated
          from an actual production dump, so foreign-key and unique-constraint names would match production
          exactly rather than whatever Hibernate happened to name them. The next migration written after that
          baseline is the first one to actually exercise the pipeline for real.
        </P>
        <P>
          One more trap: Spring Batch initializes its own schema on startup, and on an empty database it beats
          Flyway to the punch — Flyway then just stamps the baseline as applied without creating any application
          tables at all, so the app boots against a database that has no schema. Setting{" "}
          <code>spring.batch.jdbc.initialize-schema: never</code> closes that gap. I added a test that stands up
          a blank MySQL instance, runs the migration, and validates the schema, and aligned the Testcontainers
          image to <code>mysql:8.4</code> to match the production RDS version.
        </P>

        <H2 id="data-integrity">When the AI writes the dataset, and disagrees with itself</H2>
        <P>
          The master CSVs aren&rsquo;t just an import staging file — they&rsquo;re the bean corpus users attach
          recipes to. Re-analysis isn&rsquo;t deterministic, so the same physical bean can come back from Claude
          with slightly different prose on a second scrape: <code>Bolivia | Pablo Yana - Washed</code> became{" "}
          <code>BOLIVIA | PABLO YANA - WASHED</code> on a later run, and the row-level merge wrote that drift
          straight into the master file, changing the identity of a bean that recipes already pointed at.
        </P>
        <P>
          The fix was to freeze the AI-authored prose entirely and sync only the two fields that are actually
          expected to change — <code>is_active</code> and <code>price</code> — by default. A second, related
          problem: some Squarespace roasteries swap the bean behind an existing product page without changing the
          URL, and since the link is the merge key, that would silently reassign a row&rsquo;s identity too. The
          sync step now checks whether the normalized name still matches; if it doesn&rsquo;t, it refuses to
          overwrite, marks the old bean inactive, and logs the collision for a human to review instead of guessing.
        </P>

        <H2 id="marketing-agents">The multi-agent marketing system</H2>
        <P>
          Marketing copy for a catalog this size is high-volume, repetitive work — keyword research, SEO pages,
          social posts, roaster profiles — which is exactly the shape of task an LLM is good at and exactly the
          shape of task you can&rsquo;t let one do unsupervised. So the system is built around two constraints
          rather than around throughput: a human has to approve before anything goes out, and one roaster&rsquo;s
          material must never end up in another roaster&rsquo;s copy.
        </P>
        <P>
          A manager agent plans the work and dispatches it to five specialized agents covering keyword research,
          SEO, SNS content, and roaster profiles, with an explicit human review gate before output is accepted
          rather than after it&rsquo;s published. The reason for splitting into specialists instead of one
          general writer is the same reason the ingestion prompt splits sensory from factual fields: a narrow
          agent with a narrow brief is far easier to check than a broad one, because you know what its output is
          supposed to look like.
        </P>
        <DiagramFrame>
          <Stack>
            <Box label="Manager agent" sub="plans and dispatches work" />
            <Arrow direction="down" />
            <Row>
              <Box label="Keyword research" />
              <Box label="SEO" />
              <Box label="SNS content" />
              <Box label="Roaster profiles" />
            </Row>
            <Arrow direction="down" />
            <Box label="Python verification layer" sub="fails the run on cross-agent data leakage" />
            <Arrow direction="down" />
            <Box label="Human review gate" sub="approval before anything ships" />
          </Stack>
        </DiagramFrame>
        <P>
          Review alone isn&rsquo;t enough, though — a reviewer skimming plausible marketing prose is exactly who
          would miss one roaster&rsquo;s tasting notes quietly appearing in another&rsquo;s profile. So a Python
          verification layer sits in front of the gate and fails the pipeline automatically when it detects data
          leakage between agents, rather than surfacing it as a warning a tired human can wave through. Same
          principle as the evidence gating in Project-Loki: when correctness matters, it belongs in code the
          model can&rsquo;t talk its way around, not in the prompt.
        </P>

        <H2 id="evals">Offline evals</H2>
        <P>
          The problem with changing anything in a RAG pipeline — the prompt, the embedding text, the filter, the
          model version — is that it&rsquo;s invisible. Nothing throws, nothing 500s, the recommendations just
          get quietly worse, and you find out from users or not at all. Unit tests don&rsquo;t catch it because
          there&rsquo;s no assertion to write about &ldquo;a good coffee recommendation.&rdquo;
        </P>
        <P>
          So the ingestion and retrieval output is validated by an offline eval pipeline run as regression
          testing — a fixed set of inputs scored between runs, so a prompt or model change that degrades output
          quality shows up as a measurable drop before it ships rather than as a slow decline nobody attributes
          to anything. It&rsquo;s the same instinct as the N+1 regression test earlier on this page, applied to
          the part of the system that has no stack trace.
        </P>

        <H2 id="deployment">Deployment</H2>
        <P>
          A deploy here means code, data, and embeddings, together — so it isn&rsquo;t considered finished at a
          passing health check alone. After health passes, the pipeline POSTs the bean-import batch and polls
          the embedding status every 30 seconds for up to 25 minutes before calling the deploy done. The rest of
          the pipeline is more ordinary: GitHub Actions builds the image and pushes it to GHCR, then SSHes into
          a single EC2 host. One Docker container runs behind the system nginx; MySQL and Redis are managed
          services rather than containers; logs ship to CloudWatch; recipe photos live on Cloudflare R2.
        </P>

        <H2 id="results">Measured results</H2>
        <MetricRow
          metrics={[
            { value: "1.1K+", label: "Monthly active users (GA4)" },
            { value: "1,685", label: "US catalog items" },
            { value: "~97", label: "Roasteries scraped" },
            { value: "2.7s", label: "Measured cold cache load" },
          ]}
        />
        <P>
          The 1.1K+ monthly active users figure is Google Analytics 4, and it&rsquo;s the conservative reading on
          purpose. GA4 is a third-party script, so ad blockers and Safari/Brave tracking prevention drop a real
          share of sessions before they&rsquo;re ever counted; Vercel Analytics, which is first-party and
          therefore rarely blocked, reports a higher number over the same window. That higher number isn&rsquo;t
          directly comparable — Vercel identifies visitors with a hash that rotates daily, so someone returning
          across several days is counted more than once, which makes it closer to a sum of daily uniques than to
          true monthly actives. The real figure sits between the two. I quote the one I can defend.
        </P>
        <P>
          The 1,685-item US catalog breaks down as 1,023 single-origin, 539 blend, and 120 capsule (bundled with
          blend). Recommendation latency is a cache hit under 100ms, a cache miss 1–3 seconds. Redis TTLs are 1
          hour for the recommendation cache and 7 days for query embeddings; the Hikari pool caps at 20
          connections. Load testing with k6 targets p95 under 800ms, p99 under 2000ms, and an error rate under
          1%.
        </P>
        <Figure
          src="/work/coffeebyme/preview-us.webp"
          alt="CoffeeByMe Open Graph preview card"
          caption="The OG card shown when a CoffeeByMe link is shared — relevant to the search numbers below."
        />
        <P>
          On the SEO side, week-over-week Google Search Console impressions went from 518 to 1,139 — a 120%
          increase as more pages got indexed. The honest number alongside it: click-through rate fell from 3.7%
          to 1.1% in that same week, which is the ordinary shape of indexing outpacing relevance — a lot of newly
          indexed pages showing up for queries they don&rsquo;t match well yet, dragging the average down even as
          raw traffic grows.
        </P>

        <H2 id="retrospective">What I&rsquo;d change</H2>
        <UL>
          <LI>
            Evict scope on deploy is still all-or-nothing — <code>clearRecommendationCache()</code> wipes every
            key on every import, even when the bean catalog barely changed. Evicting only affected keys, or
            warming the cache right after deploy instead of letting it cold-start on live traffic, is the
            obvious next step.
          </LI>
          <LI>
            The striped lock is JVM-local by design, which is fine for one EC2 instance and won&rsquo;t be the
            moment there are two.
          </LI>
          <LI>
            The ingestion pipeline&rsquo;s non-determinism is contained, not eliminated — freezing AI prose on
            sync stops it from corrupting the master CSV, but a re-scrape can still describe the same bean
            differently the first time it&rsquo;s written.
          </LI>
        </UL>
      </Prose>
      <Toc entries={toc} />
    </div>
  );
}
