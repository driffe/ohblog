interface CalloutProps {
  label?: string;
  children: React.ReactNode;
}

/** Bordered aside for pull-quotes, honest-limits notes, and caveats. */
export function Callout({ label = "Note", children }: CalloutProps) {
  return (
    <aside className="my-8 border border-rule px-6 py-5" style={{ background: "var(--paper-2)" }}>
      <p className="meta mb-3">{label}</p>
      <div className="text-ink-muted max-w-[65ch]">{children}</div>
    </aside>
  );
}
