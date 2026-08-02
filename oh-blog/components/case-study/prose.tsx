// Typographic primitives for case-study body copy — comfortable reading
// measure, body font, generous vertical rhythm. Composed by hand in each
// content/work/<slug>.tsx rather than parsed from markdown.

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[70ch] text-[1.0625rem] leading-relaxed text-ink">
      {children}
    </div>
  );
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="display mt-16 mb-6 scroll-mt-24" style={{ fontSize: "2.25rem" }}>
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 mb-3 text-lg font-medium" style={{ fontFamily: "var(--font-body)" }}>
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-ink-muted max-w-[70ch]">{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="mb-5 ml-5 list-disc space-y-2 text-ink-muted max-w-[70ch]">{children}</ul>;
}

export function LI({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}
