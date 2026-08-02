import { Prose, H2, P } from "@/components/case-study/prose";
import { Callout } from "@/components/case-study/callout";
import { Figure } from "@/components/case-study/figure";
import { DiagramFrame, Box, Row, Arrow, Stack } from "@/components/case-study/diagram";

export default function TestAutomationToolBody() {
  return (
    <Prose>
      <H2 id="context">Context</H2>
      <P>
        Comparing chat models by hand — pasting the same prompt into each one, then eyeballing which reply is
        better — stops working past a handful of questions, and the judgment isn&rsquo;t reproducible run to run.
        This tool replaces that loop: load one question file, hit Run, and the same questions go to Claude,
        ChatGPT 4, and ChatGPT 3.5 at once, with every reply scored the same way. The third pane is labelled
        Copilot because that&rsquo;s what was being called — Copilot ran on GPT-3.5 at the time, so the run is
        really Claude against two generations of the same model family, which makes a version-to-version
        regression visible in the same view as a cross-vendor one.
      </P>
      <Figure
        src="/work/test-automation-tool/runner.webp"
        alt="Test Automation Tool running a question set against Claude, ChatGPT 4, and GPT-3.5-backed Copilot in three side-by-side panes"
        caption="One question file, three models, three live logs — each response scored on expected-keyword coverage as the run progresses."
      />

      <H2 id="scoring">Scoring a reply without reading it</H2>
      <P>
        The hard part of automating this isn&rsquo;t calling three APIs, it&rsquo;s deciding what counts as a
        correct answer when the output is free-form prose. Grading on exact text match would fail every
        correct-but-differently-worded reply. So each question in the file carries its own{" "}
        <code>Expected keywords</code> list, and a reply is scored on how many of them it contains — &ldquo;What
        is a stack?&rdquo; expects <code>lifo</code>, <code>last-in-first-out</code>, <code>push</code>,{" "}
        <code>pop</code>, <code>data structure</code>. The run log reports coverage per model as a fraction and a
        percentage, and names the terms that were missing, so a low score points at what the model left out
        rather than just flagging it as wrong.
      </P>
      <DiagramFrame>
        <Stack>
          <Box label="Structured question file" sub="question + expected keywords" />
          <Arrow direction="down" />
          <Row>
            <Box label="Claude" />
            <Box label="ChatGPT 4" />
            <Box label="Copilot" sub="GPT-3.5 at the time" />
          </Row>
          <Arrow direction="down" />
          <Box label="Keyword coverage per reply" sub="found / expected, plus what's missing" />
        </Stack>
      </DiagramFrame>

      <H2 id="negative-cases">Testing what a model does with nonsense</H2>
      <P>
        The question set isn&rsquo;t only made of questions that have answers. One entry is the deliberate
        gibberish <code>qusvuie what mean?</code>, and its expected keywords are <code>clarify</code>,{" "}
        <code>rephrase</code>, <code>unclear</code>, <code>typo</code> — so the test isn&rsquo;t whether the
        model knows the word, it&rsquo;s whether the model admits it doesn&rsquo;t and asks. That single case
        separated the three models more sharply than the factual ones did, which is the argument for keeping
        negative cases in the file at all: models agree on what a stack is and disagree on what to do when
        they don&rsquo;t know.
      </P>

      <H2 id="status">Status and honest caveats</H2>
      <Callout label="Honest caveats">
        There&rsquo;s no public repository for this one, so this page is written from the tool&rsquo;s own
        interface and a{" "}
        <a
          href="https://www.youtube.com/watch?v=JZXYpMRs_uE"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent"
        >
          demo recording
        </a>{" "}
        rather than from source — implementation details beyond what the runner displays aren&rsquo;t verifiable
        here. Keyword coverage is also a blunt proxy for answer quality: it rewards a reply for containing the
        right terms, not for being correct.
      </Callout>
    </Prose>
  );
}
