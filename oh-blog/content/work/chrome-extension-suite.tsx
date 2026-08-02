import { Prose, H2, P } from "@/components/case-study/prose";
import { Callout } from "@/components/case-study/callout";
import { LinkList } from "@/components/case-study/link-list";
import { getWorkBySlug } from "@/content/work";

export default function ChromeExtensionSuiteBody() {
  const group = getWorkBySlug("chrome-extension-suite")?.group ?? [];

  return (
    <Prose>
      <H2 id="context">Context</H2>
      <P>
        Two small utilities published to the Chrome Web Store. Neither needed to be a website: both are
        single-purpose tools you reach for in the middle of doing something else, and a toolbar popup opens
        over the tab you&rsquo;re already on instead of asking you to leave it. That&rsquo;s the entire reason
        for the extension form factor here — no accounts, no backend, no navigation cost.
      </P>

      <H2 id="extensions">The two extensions</H2>
      <P>
        <strong>Moon Phase Timer</strong> is a minimal countdown timer where the visual is the point: as the
        time runs down, an animation moves continuously from a crescent to a full moon, so the remaining time
        is readable at a glance without parsing digits. Hours, minutes, and seconds are all freely
        configurable, with pause and reset.
      </P>
      <P>
        <strong>Reaction Time Test</strong> is deliberately the opposite — a single-screen app that does one
        thing, measuring reaction speed, with nothing else on the page to configure or read.
      </P>
      <LinkList items={group} />

      <H2 id="status">Status and honest caveats</H2>
      <Callout label="Honest caveats">
        These are small personal tools, not products — both have modest install counts, and neither has a
        public repository, so this page is written from the published Chrome Web Store listings rather than
        from source. Both listings are in Korean.
      </Callout>
    </Prose>
  );
}
