import { Prose, H2, P, UL, LI } from "@/components/case-study/prose";
import { Callout } from "@/components/case-study/callout";
import { MetricRow } from "@/components/case-study/metric";
import { Toc } from "@/components/case-study/toc";
import { DiagramFrame, Box, Row, Arrow, Stack } from "@/components/case-study/diagram";

const toc = [
  { id: "context", label: "Context" },
  { id: "architecture", label: "Architecture" },
  { id: "endpoints", label: "Endpoints and data" },
  { id: "chatbot", label: "The Watsonx chatbot" },
  { id: "status", label: "Status and honest caveats" },
];

export default function IbmNbaHubBody() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-16">
      <Prose>
        <H2 id="context">Context</H2>
        <P>
          IBM NBA Hub was built for IBM SkillsBuild&rsquo;s hackathon as a 3-person team, and took 1st place in
          the AI in Sports category against 300+ teams. It&rsquo;s an NBA fan platform: a FastAPI backend
          (<code>main.py</code>) serving team rosters, conference standings, game schedules, and player search,
          fronted by a static Tailwind/vanilla-JS <code>index.html</code>, with an AI chatbot on top powered by
          IBM watsonx. I led the team.
        </P>

        <H2 id="architecture">A hackathon-timescale backend</H2>
        <P>
          A hackathon window doesn&rsquo;t leave time to stand up and seed a real database, so the backend skips
          one entirely: <code>team.py</code>, <code>game.py</code>, <code>standing_east.py</code>, and{" "}
          <code>standing_west.py</code> are Python modules holding the data as literal lists and dicts —
          30 teams with full rosters, both conferences&rsquo; standings, and a game schedule — imported directly
          into <code>main.py</code> and served from memory. It trades persistence and write support for zero
          setup time, which is the right trade for a demo that only needs to read.
        </P>
        <DiagramFrame>
          <Stack>
            <Box label="index.html" sub="Tailwind + vanilla JS frontend" />
            <Arrow direction="down" />
            <Box label="FastAPI (main.py)" sub="12 REST endpoints" />
            <Arrow direction="down" />
            <Row>
              <Box label="team.py · game.py · standing_east/west.py" sub="in-memory Python data" />
              <Box label="IBM watsonx Granite 3 8B" sub="/chat only" />
            </Row>
          </Stack>
        </DiagramFrame>

        <H2 id="endpoints">Endpoints and data</H2>
        <P>
          The API surface is a straight read layer over that in-memory data: <code>/teams</code> and{" "}
          <code>/teams/&#123;team_id&#125;</code> for roster lookups by ID or name, <code>/standings/eastern</code>{" "}
          and <code>/standings/western</code> for conference tables, <code>/games</code> and{" "}
          <code>/games/search</code> filtered by team or date, and <code>/search/players</code> filtering the
          full roster set by name, position, or country. Pydantic models (<code>Player</code>, <code>Team</code>,{" "}
          <code>Standing</code>, <code>Game</code>) validate every response shape, and CORS is wide open (
          <code>allow_origins=[&quot;*&quot;]</code>) since the static frontend is served separately from the
          API.
        </P>
        <P>
          The frontend layers a Team Finder quiz on top — five questions on playing style, conference, team
          history, star-player type, and team vibe — that maps answers to one of the 30 teams, each rendered with
          its official brand colors.
        </P>

        <H2 id="chatbot">The Watsonx chatbot</H2>
        <P>
          <code>POST /chat</code> is the one endpoint that isn&rsquo;t a lookup over static data. It authenticates
          against IBM watsonx with a URL, API key, and project ID from the environment, then calls{" "}
          <code>ModelInference</code> with model id <code>ibm/granite-3-8b-instruct</code> and a 500-token cap.
          Incoming <code>system</code> / <code>user</code> / <code>assistant</code> messages get reshaped per
          role into watsonx&rsquo;s expected message format before the call, and the handler falls back through a
          few response shapes (<code>response.choices</code>, a raw dict, or a stringified object) depending on
          what the SDK actually returns, wrapped in a try/except that turns any failure into a clean{" "}
          <code>500</code> instead of a raw stack trace.
        </P>

        <H2 id="status">Status and honest caveats</H2>
        <MetricRow
          metrics={[
            { value: "1st", label: "AI in Sports · 300+ teams" },
            { value: "3", label: "Team size" },
            { value: "30", label: "NBA teams with rosters" },
            { value: "12", label: "REST endpoints" },
          ]}
        />
        <Callout label="Honest caveats">
          <UL>
            <LI>
              <code>main.py</code> defines the eastern and western standings handlers as two separate functions
              both named <code>get_eastern_standings</code> — the second definition just overwrites the first in
              Python&rsquo;s module namespace. It doesn&rsquo;t break anything at runtime, since FastAPI binds
              each route to its function object at decoration time, but it&rsquo;s a naming mistake that shipped.
            </LI>
            <LI>Team, standings, and schedule data is static — nothing here updates live during or after a game.</LI>
          </UL>
        </Callout>
      </Prose>
      <Toc entries={toc} />
    </div>
  );
}
