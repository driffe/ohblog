import { Prose, H2, P } from "@/components/case-study/prose";
import { Callout } from "@/components/case-study/callout";

export default function AutowiseBody() {
  return (
    <Prose>
      <H2 id="context">Context</H2>
      <P>
        Autowise is an AI-powered car maintenance app built in four hours at the SpartUp Hackathon, placing 5th.
        A four-hour build window rules out most of the setup a longer project would default to — there was no
        time for a backend to sit between the frontend and the AI/maps providers it depended on, so Next.js
        called Perplexity and Mapbox directly from the client.
      </P>

      <H2 id="lesson">The lesson it left behind</H2>
      <P>
        That shortcut had a real cost: calling Perplexity directly from the browser meant the API key shipped
        inside the client bundle, readable by anyone who opened dev tools. It&rsquo;s a mistake I&rsquo;ve since
        written about and deliberately fixed — <code>excel-stock</code>&rsquo;s entire proxy architecture (same-origin
        serverless functions, no provider keys ever reaching the browser) exists specifically because of what
        went wrong here. Autowise is the before picture; excel-stock is the after.
      </P>

      <H2 id="status">Status and honest caveats</H2>
      <Callout label="Honest caveats">
        The Autowise repository is private, so this page is written from the existing project summary, the
        Netlify demo, and what a later project&rsquo;s write-up already documents about this one&rsquo;s
        architecture — not from reading Autowise&rsquo;s own source. The GitHub link that used to be published
        alongside this project pointed at that private repo and returned nothing to visitors who clicked it, so
        it&rsquo;s been removed here; the live Netlify demo stays linked above.
      </Callout>
    </Prose>
  );
}
