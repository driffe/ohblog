import { Prose, H2, P, UL, LI } from "@/components/case-study/prose";
import { Callout } from "@/components/case-study/callout";
import { Toc } from "@/components/case-study/toc";
import { DiagramFrame, Box, Row, Arrow, Stack } from "@/components/case-study/diagram";

const toc = [
  { id: "context", label: "Context" },
  { id: "auth", label: "Sign-in behind a context gate" },
  { id: "data-model", label: "Denormalized categories, not a flat ledger" },
  { id: "status", label: "Status and honest caveats" },
];

export default function PersonalMoneyTrackerBody() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-16">
      <Prose>
        <H2 id="context">Context</H2>
        <P>
          Personal Money Tracker is a Next.js expense manager backed by Firebase — Firestore for data, Firebase
          Auth for sign-in. A user logs in, adds income and expense categories, and sees a live balance plus a
          category breakdown chart, with every read and write scoped to that one signed-in account.
        </P>

        <H2 id="auth">Sign-in behind a context gate</H2>
        <P>
          Every screen in the app assumes a signed-in user — there&rsquo;s no meaningful anonymous state to design
          for — so rather than checking auth state inside each page, <code>AuthContextProvider</code> wraps the
          whole app and the home route renders <code>&lt;SignIn/&gt;</code> outright whenever{" "}
          <code>useAuthState(auth)</code> reports no user, before any finance UI mounts. Sign-in itself offers
          Google and GitHub as two separate Firebase <code>signInWithPopup</code> providers, so a visitor
          isn&rsquo;t locked into one identity provider to try the app.
        </P>

        <H2 id="data-model">Denormalized categories, not a flat ledger</H2>
        <P>
          A flat transactions collection would mean re-summing every row client-side just to show &ldquo;how much
          have I spent on Groceries&rdquo; or render the balance doughnut chart. Instead, each expense category is
          its own Firestore document — <code>title</code>, <code>color</code>, an <code>items[]</code> array of
          individual expenses, and a running <code>total</code> kept in sync on every add or delete — so the
          category list and the chart both read directly off one denormalized number per category instead of
          aggregating on every render.
        </P>
        <DiagramFrame>
          <Stack>
            <Box label="AuthContextProvider" sub="Google / GitHub via Firebase Auth" />
            <Arrow direction="down" />
            <Box label="FinanceContextProvider" sub="queries scoped by uid ==" />
            <Arrow direction="down" />
            <Row>
              <Box label="expenses/{id}" sub="items[] + running total" />
              <Box label="income/{id}" sub="flat entries" />
            </Row>
          </Stack>
        </DiagramFrame>
        <P>
          Every read goes through a Firestore <code>query(...where(&quot;uid&quot;, &quot;==&quot;,
          user.uid))</code> rather than a global collection scan, and the balance shown on the home screen is
          just <code>sum(income) − sum(expenses.total)</code>, recomputed client-side whenever either context
          array changes.
        </P>

        <H2 id="status">Status and honest caveats</H2>
        <Callout label="Honest caveats">
          <UL>
            <LI>
              Data access is scoped by <code>uid</code> in every client query, but the Firestore security rules
              that actually enforce that scoping server-side aren&rsquo;t checked into the repository, so this
              page repeats that claim from the existing project summary rather than from rules text read
              directly.
            </LI>
            <LI>
              The category running total is updated by the client on every write rather than by a server-side
              transaction or Cloud Function, so it&rsquo;s only as consistent as the client code that maintains
              it.
            </LI>
          </UL>
        </Callout>
      </Prose>
      <Toc entries={toc} />
    </div>
  );
}
