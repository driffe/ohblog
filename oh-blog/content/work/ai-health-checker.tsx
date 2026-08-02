import { Prose, H2, P, UL, LI } from "@/components/case-study/prose";
import { Callout } from "@/components/case-study/callout";
import { MetricRow } from "@/components/case-study/metric";
import { Toc } from "@/components/case-study/toc";
import { DiagramFrame, Box, Row, Arrow, Stack } from "@/components/case-study/diagram";

const toc = [
  { id: "context", label: "Context" },
  { id: "durable-scheduling", label: "Durable scheduling with Temporal" },
  { id: "voice-checkin", label: "The voice check-in" },
  { id: "sms-dashboard", label: "SMS path and dashboard" },
  { id: "status", label: "Status and honest caveats" },
];

export default function AiHealthCheckerBody() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-16">
      <Prose>
        <H2 id="context">Context</H2>
        <P>
          Built at the AWS MCP &amp; A2A hackathon, this is a medication check-in system for elderly users: an
          automated voice call asks whether today&rsquo;s medication was taken, and a Flask backend (
          <code>app.py</code>) turns the answer into an SMS summary or an escalation alert sent through Twilio.
          The voice side runs on VAPI.ai with Claude as the conversation model.
        </P>

        <H2 id="durable-scheduling">Durable scheduling with Temporal</H2>
        <P>
          A medication check that silently stops running because the process restarted is worse than useless for
          an elderly-care reminder — the whole point is that it keeps happening reliably. That&rsquo;s the case
          for building the core check loop as a Temporal workflow (<code>MedicationCheckWorkflow</code> in{" "}
          <code>workflow.py</code>) rather than a plain cron job: Temporal persists workflow state, so the timer
          between checks and the retry count survive a worker restart instead of resetting to zero.
        </P>
        <DiagramFrame>
          <Stack>
            <Box label="MedicationCheckWorkflow" sub="Temporal, persists between checks" />
            <Arrow direction="down" />
            <Box label="execute_medication_check activity" sub="5 min timeout" />
            <Arrow direction="down" />
            <Row>
              <Box label="VAPI voice call" sub="via voiceAgent.py" />
              <Box label="Twilio SMS" sub="via alertSender.py" />
            </Row>
          </Stack>
        </DiagramFrame>
        <P>
          Each check increments a <code>consecutive_no_responses</code> counter on no answer and resets it to
          zero on any completed call. Three consecutive misses trigger a separate high-severity alert activity —
          the escalation threshold is state the workflow tracks itself, not something re-derived from a call log
          after the fact.
        </P>

        <H2 id="voice-checkin">The voice check-in</H2>
        <P>
          The VAPI assistant is configured per call with Deepgram for transcription, Claude (
          <code>claude-3-sonnet-20240229</code>) as the conversation model with a system prompt asking it to
          stay brief and non-judgmental, and ElevenLabs for the voice reply, ending automatically after 10
          seconds of silence. Rather than parsing the conversation transcript after the fact, VAPI&rsquo;s{" "}
          <code>analysisPlan</code> is given a <code>structuredDataSchema</code> up front —{" "}
          <code>medication_taken</code> (boolean), <code>details</code>, and a{" "}
          <code>response_quality</code> enum of <code>clear</code> / <code>confused</code> /{" "}
          <code>no_response</code> — so the model returns already-structured data instead of free text that would
          need a second parsing pass.
        </P>
        <P>
          <code>wait_for_call_completion</code> polls the call status every 5 seconds for up to 20 retries
          (roughly 100 seconds) before giving up and treating the check as a no-response, since VAPI calls run
          asynchronously and there&rsquo;s no webhook wired up to push completion instead.
        </P>

        <H2 id="sms-dashboard">SMS path and dashboard</H2>
        <P>
          A second, simpler reminder path runs alongside the Temporal workflow: APScheduler cron jobs (
          <code>add_schedule_to_scheduler</code>) fire a plain Twilio SMS — &ldquo;Have you taken your medication
          today?&rdquo; — on a daily or weekly schedule, independent of the voice-call workflow above. The Flask
          API exposes both paths plus a small dashboard layer: <code>/api/users</code> and{" "}
          <code>/api/schedules</code> to register people and cadences, <code>/api/check-now</code> and{" "}
          <code>/api/call-now</code> to trigger an immediate voice check, and{" "}
          <code>/api/chart/&lt;user_id&gt;</code>, which builds a Plotly bar chart of daily alert counts from{" "}
          <code>medication_records</code>.
        </P>

        <H2 id="status">Status and honest caveats</H2>
        <MetricRow
          metrics={[
            { value: "3", label: "Consecutive misses → escalation" },
            { value: "10s", label: "Voice call silence timeout" },
            { value: "5 min", label: "Check activity timeout" },
            { value: "~100s", label: "Max wait for call completion" },
          ]}
        />
        <Callout label="Honest caveats">
          <UL>
            <LI>
              The Temporal voice workflow and the APScheduler SMS reminders are two separate, not fully unified
              scheduling paths built alongside each other rather than merged into one — a hackathon-scope
              artifact, not a deliberate dual-channel design.
            </LI>
            <LI>User and schedule data live in an in-memory Python dict, so none of it survives a restart.</LI>
          </UL>
        </Callout>
      </Prose>
      <Toc entries={toc} />
    </div>
  );
}
