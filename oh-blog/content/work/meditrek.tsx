import { Prose, H2, P, UL, LI } from "@/components/case-study/prose";
import { Callout } from "@/components/case-study/callout";
import { MetricRow } from "@/components/case-study/metric";
import { Toc } from "@/components/case-study/toc";
import { DiagramFrame, Box, Row, Arrow, Stack } from "@/components/case-study/diagram";

const toc = [
  { id: "context", label: "Context" },
  { id: "combined-call", label: "One combined Perplexity call" },
  { id: "parsing", label: "Parsing free text as data" },
  { id: "pharmacies", label: "Finding nearby pharmacies" },
  { id: "status", label: "Status and honest caveats" },
];

export default function MediTrekBody() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-16">
      <Prose>
        <H2 id="context">Context</H2>
        <P>
          MediTrek was built at HackHayward, where it took 1st place for Use of Perplexity/Sonar. A visitor
          enters symptoms, gender, age, and allergies on a form; the backend — FastAPI serving Jinja2 templates —
          sends that to Perplexity&rsquo;s <code>sonar</code> model and renders back a short list of
          over-the-counter medications plus a do/don&rsquo;t care list, with an optional nearby-pharmacy lookup
          by ZIP code.
        </P>

        <H2 id="combined-call">One combined Perplexity call</H2>
        <P>
          Two separate model calls — one for medication suggestions, one for care guidance — would double the
          latency a visitor waits through and double the API spend per submission, and a hackathon demo can&rsquo;t
          afford either. <code>PerplexityService.get_combined_recommendations</code> asks for both in a single
          prompt instead, with the expected reply format spelled out exactly: three numbered{" "}
          <code>MEDICATIONS</code> entries (brand name, form, side effects), then a <code>MANAGEMENT</code>{" "}
          section with three <code>DO</code> items and three <code>DON&rsquo;T</code> items. The raw response text
          is cached in memory for an hour, keyed on a hash of the prompt, so a repeated symptom combination
          doesn&rsquo;t re-hit the API.
        </P>
        <DiagramFrame>
          <Stack>
            <Box label="/recommend form POST" sub="symptoms, gender, age, allergies" />
            <Arrow direction="down" />
            <Box label="One combined prompt → Perplexity sonar" sub="medications + DO/DON'T in one call" />
            <Arrow direction="down" />
            <Row>
              <Box label="Regex parser" sub="splits on MANAGEMENT:" />
              <Box label="results.html" sub="rendered response" />
            </Row>
          </Stack>
        </DiagramFrame>

        <H2 id="parsing">Parsing free text as data</H2>
        <P>
          The whole flow depends on a language model reliably following a plain-text format, which is never
          guaranteed, so the parser treats every field as optional rather than trusting the shape. The response
          is split on the literal string <code>MANAGEMENT:</code>, medication entries are separated on numbered
          bullets and picked apart with regex for <code>brand name</code>, <code>form</code>, and{" "}
          <code>side effects</code>, and a medication missing a name is skipped rather than added with a hole in
          it. A malformed reply degrades to an empty medications list and empty do/don&rsquo;t lists instead of
          throwing — the app still renders a page, just an unhelpful one.
        </P>
        <P>
          Each parsed medication name gets a CVS search link built by stripping parentheticals and strength
          qualifiers like &ldquo;extra strength&rdquo; out of the name before URL-encoding it — a direct link to
          search results, not a specific product page the model might have hallucinated.
        </P>

        <H2 id="pharmacies">Finding nearby pharmacies</H2>
        <P>
          <code>GET /api/pharmacies?zipcode=</code> is two chained Google API calls: the Geocoding API turns the
          ZIP code into a latitude/longitude pair, then the Places API runs a{" "}
          <code>nearbysearch</code> for <code>type=pharmacy</code> within a 5&nbsp;km radius of that point. Only
          the first three results are kept, each reduced to a name and address — there&rsquo;s no live distance
          calculation, so the response labels every result simply &ldquo;Nearby&rdquo;. Missing API keys,
          request timeouts, and empty result sets each return a distinct JSON error rather than a generic 500.
        </P>

        <H2 id="status">Status and honest caveats</H2>
        <MetricRow
          metrics={[
            { value: "3", label: "Medications per query" },
            { value: "3 + 3", label: "DO / DON'T items" },
            { value: "5 km", label: "Pharmacy search radius" },
            { value: "1 hr", label: "Response cache TTL" },
          ]}
        />
        <Callout label="Honest caveats">
          <UL>
            <LI>
              The pharmacy lookup returns at most 3 nearby results per ZIP code search via Google Places — it
              isn&rsquo;t backed by a pharmacy dataset of its own, and no recommendation-accuracy metric is
              computed or logged anywhere in the code.
            </LI>
            <LI>
              The app&rsquo;s own footer says it plainly: this is informational only and isn&rsquo;t a substitute
              for medical advice.
            </LI>
          </UL>
        </Callout>
      </Prose>
      <Toc entries={toc} />
    </div>
  );
}
