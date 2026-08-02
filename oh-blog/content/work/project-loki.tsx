import { Prose, H2, P, UL, LI } from "@/components/case-study/prose";
import { Figure } from "@/components/case-study/figure";
import { Callout } from "@/components/case-study/callout";
import { MetricRow } from "@/components/case-study/metric";
import { Toc } from "@/components/case-study/toc";
import { DiagramFrame, Box, Row, Arrow, Stack } from "@/components/case-study/diagram";

const toc = [
  { id: "context", label: "Context" },
  { id: "architecture", label: "Architecture" },
  { id: "isolation", label: "Per-character isolation" },
  { id: "evidence-gating", label: "Server-authoritative evidence" },
  { id: "evidence-codes", label: "Codes, not conversation" },
  { id: "client", label: "The Godot client" },
];

export default function ProjectLokiBody() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-16">
      <Prose>
        <H2 id="context">Context</H2>
        <P>
          Project-Loki is an AI-driven detective mystery game: the player investigates the murder of Professor
          Richards by interviewing six LLM-roleplayed characters and collecting evidence. It&rsquo;s a team
          project — 177 commits — with a Godot 4.5 client (GDScript, 21 scripts, 1,495 lines) talking to a
          FastAPI backend (Motor/async MongoDB, OpenAI <code>gpt-4o-mini</code>, roughly 1,157 lines across about
          30 endpoints), the whole thing running under Docker Compose. I worked the backend.
        </P>
        <Figure
          src="/work/project-loki/main-menu.webp"
          alt="Project-Loki main menu"
          caption="The main menu — Godot 4.5 client."
        />

        <H2 id="architecture">Architecture</H2>
        <DiagramFrame>
          <Stack>
            <Box label="Godot 4.5 client" sub="GDScript · streamed dialogue box" />
            <Arrow direction="down" />
            <Box label="FastAPI backend" sub="~30 endpoints" />
            <Arrow direction="down" />
            <Row>
              <Box label="OpenAI gpt-4o-mini" sub="per-character sessions" />
              <Box label="MongoDB (Motor)" sub="conversation + evidence state" />
            </Row>
          </Stack>
        </DiagramFrame>
        <P>
          The Godot side streams model replies into a custom dialogue box rather than waiting for a full
          response, and keeps global state in autoloads — <code>Global</code>, <code>SceneManager</code>, and{" "}
          <code>GameManager</code>. On startup it runs health checks against both the OpenAI connection and
          MongoDB before letting the player into a scene — <code>GET /health</code> reports API, OpenAI, and
          MongoDB status separately, so a broken backend fails at launch with a specific cause instead of
          surfacing as a silent hang mid-conversation.
        </P>
        <P>
          The backend itself is split by responsibility rather than left as one file: <code>services.py</code>{" "}
          holds business logic and database access, <code>characters.py</code> holds character data, and{" "}
          <code>story.py</code> holds the narrative timeline the characters&rsquo; answers have to stay
          consistent with — including scripted beats like when a character plants a piece of misleading
          evidence. It all runs from a <code>Dockerfile</code> and <code>docker-compose.yml</code> alongside the
          FastAPI app itself.
        </P>

        <H2 id="isolation">Per-character isolation</H2>
        <P>
          One shared conversation thread across all six characters would leak context between them — talking to
          the chef would bleed into the conversation with the detective. That&rsquo;s why each character gets
          its own MongoDB conversation session instead, filtered by <code>character_id</code>, with a session
          created for one character rejected outright if the client tries to reuse it for another.
        </P>
        <P>
          Baking each character&rsquo;s personality and knowledge into the character-handling code would mean
          touching application logic every time a character&rsquo;s voice needed tuning. Instead, each
          character&rsquo;s personality and knowledge live in their own externalized prompt file under{" "}
          <code>backend/prompts/</code>, so tuning one character&rsquo;s voice doesn&rsquo;t mean touching
          application logic at all.
        </P>
        <P>
          A session accumulates the full back-and-forth for that one character: every previous message is
          replayed into the request before the next one is sent, with role mapped from{" "}
          <code>character_id</code> to <code>assistant</code> for the OpenAI API, so each character&rsquo;s
          responses stay consistent with what that specific character has already told the player — not with
          what any other character said in a separate conversation.
        </P>

        <H2 id="evidence-gating">Server-authoritative evidence</H2>
        <P>
          The interesting constraint here isn&rsquo;t the roleplay, it&rsquo;s what the roleplay isn&rsquo;t
          allowed to do. Discoverable evidence lives behind dedicated endpoints —{" "}
          <code>/evidence/discover/&#123;evidence_id&#125;</code> — and whether a piece of evidence has been
          found is game state enforced on the server, not something the conversation model tracks or reasons
          about. A player can be as persuasive as they want in chat; they can&rsquo;t talk an LLM character into
          handing them the solution, because the character has no authority to reveal evidence — only the
          evidence endpoints do, and those are gated by actual game state, not by what the model decides to say.
        </P>
        <Callout label="Why this matters for LLM NPCs">
          An LLM playing a character will happily improvise past whatever boundaries you asked it to respect in
          the system prompt if a player pushes hard enough — prompts are guidance, not enforcement. The fix
          isn&rsquo;t a better prompt, it&rsquo;s moving the actual authority for game-critical state (what
          evidence exists, what&rsquo;s been found) outside the model entirely, into server logic the model has
          no path to influence.
        </Callout>

        <H2 id="evidence-codes">Codes, not conversation</H2>
        <P>
          Each discovery endpoint requires a matching evidence code — a gloves discovery needs{" "}
          <code>GL001</code>, research papers need <code>RP002</code>, and so on — validated server-side before
          anything is written to the session. The public <code>GET /evidence/&#123;evidence_id&#125;</code>{" "}
          endpoint deliberately omits both the code and the validation prompt from its response, returning only
          name, description, whom it belongs to, and its location; a client can browse what evidence exists
          without that response leaking how to unlock it.
        </P>
        <P>
          One evidence item, the kitchen knife, is explicitly marked in the API as misleading evidence — a red
          herring the story intends the player to find and have to reason past, not a shortcut to the killer.
          Modeling that in the same server-enforced system as the real evidence is what makes it possible for
          the mystery to have a wrong answer that still feels earned, instead of every clue being equally
          trustworthy by construction.
        </P>

        <H2 id="client">The Godot client</H2>
        <P>
          Sixteen scenes and 21 GDScript files make up the client side: dialogue, evidence UI, scene
          transitions, and the game-state manager that mirrors what the server considers discovered. The
          dialogue box streams text in as it arrives from the backend rather than rendering it all at once,
          which matters more than it sounds like for a game built entirely around reading AI-generated
          conversation. Splitting responsibility this way — <code>SceneManager</code> for navigation between
          rooms, <code>GameManager</code> for what&rsquo;s actually been discovered, <code>Global</code> for
          everything else — kept the interview and evidence systems decoupled enough that different scenes could
          be worked on in parallel without constantly colliding in the same script, which mattered on a team
          project with this many commits.
        </P>
        <Figure
          src="/work/project-loki/bg-kitchen.webp"
          alt="Project-Loki kitchen background art"
          caption="Kitchen scene background art."
        />
        <Figure
          src="/work/project-loki/bg-living-room.webp"
          alt="Project-Loki living room background art"
          caption="Living room scene background art."
        />
        <MetricRow
          metrics={[
            { value: "6", label: "LLM characters" },
            { value: "~30", label: "Backend endpoints" },
            { value: "21", label: "GDScript files" },
            { value: "177", label: "Commits" },
          ]}
        />
        <P>
          The game runs fullscreen at 1920×1080. It was built for Godot 4.5 specifically rather than an older
          LTS release, and the project ships as a <code>project.godot</code> file the engine opens directly —
          no separate build step between the Godot editor and a playable session, as long as the FastAPI backend
          is already running for it to talk to.
        </P>
        <UL>
          <LI>Team project — the linked repository belongs to a teammate.</LI>
        </UL>
      </Prose>
      <Toc entries={toc} />
    </div>
  );
}
