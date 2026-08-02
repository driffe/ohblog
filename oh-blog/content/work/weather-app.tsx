import { Prose, H2, P, UL, LI } from "@/components/case-study/prose";
import { Callout } from "@/components/case-study/callout";
import { Toc } from "@/components/case-study/toc";

const toc = [
  { id: "context", label: "Context" },
  { id: "flip-card", label: "A card that flips, not a second screen" },
  { id: "clothing", label: "The clothing recommendation" },
  { id: "status", label: "Status and honest caveats" },
];

export default function WeatherAppBody() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-16">
      <Prose>
        <H2 id="context">Context</H2>
        <P>
          Weather App is a bilingual (Korean/English) Progressive Web App, built on Next.js&rsquo; pages router
          with TypeScript and Tailwind, pulling live conditions from the OpenWeatherMap API by city name. The
          PWA manifest names it &ldquo;Hoodie Weather,&rdquo; which is the actual point of the app: it isn&rsquo;t
          just reporting temperature, it&rsquo;s recommending what to wear.
        </P>

        <H2 id="flip-card">A card that flips, not a second screen</H2>
        <P>
          A city search only needs to surface a headline temperature at a glance, but the app also wants to show
          description, feels-like temperature, humidity, and a clothing recommendation without crowding all of it
          onto one view. Rather than route to a separate details page, the result renders as a single flip card:
          the front shows just the weather icon and temperature, and a click flips it via CSS to a back face with
          the rest — one component, one piece of state (<code>isCardFlipped</code>), no navigation.
        </P>

        <H2 id="clothing">The clothing recommendation</H2>
        <P>
          <code>getClothingRecommendation</code> maps feels-like temperature to one of four labels: below 0°C is
          &ldquo;More Hoodies,&rdquo; up to 10°C is &ldquo;Fleece Hoodie Day,&rdquo; up to 20°C is &ldquo;Hoodie is
          the best,&rdquo; and 20°C and above is &ldquo;T-Shirt Day&rdquo; — each with a matching Korean string in
          the same lookup. The language toggle doesn&rsquo;t translate individual strings on the fly; it swaps
          the active key into a single <code>translations</code> record that holds every label, placeholder, and
          error message for that language at once, so English and Korean stay two complete, independently
          reviewable copies rather than a scattered set of per-string conditionals.
        </P>

        <H2 id="status">Status and honest caveats</H2>
        <Callout label="Honest caveats">
          <UL>
            <LI>
              The OpenWeatherMap API key is a hardcoded constant inside the client-side{" "}
              <code>getWeatherData</code> module, called directly from the page with no server-side proxy — it
              ships readable inside the client bundle. It&rsquo;s the same category of mistake later projects
              like <code>excel-stock</code> were built specifically to avoid.
            </LI>
            <LI>City lookup is by name only; there&rsquo;s no geolocation or saved-city list.</LI>
          </UL>
        </Callout>
      </Prose>
      <Toc entries={toc} />
    </div>
  );
}
