// Hand-built architecture-diagram primitives — hairline boxes and arrows,
// no mermaid, no new deps. Each case study composes ONE diagram from these.

export function DiagramFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 border border-rule px-4 py-8 sm:px-8" style={{ background: "var(--paper-2)" }}>
      {children}
    </div>
  );
}

interface BoxProps {
  label: string;
  sub?: string;
  className?: string;
}

/** A labeled hairline node — the basic unit of every diagram. */
export function Box({ label, sub, className = "" }: BoxProps) {
  return (
    <div
      className={`border border-rule px-3 py-2.5 text-center bg-paper ${className}`}
      style={{ fontFamily: "var(--font-meta)", fontSize: "0.7rem", letterSpacing: "0.04em" }}
    >
      <div className="uppercase text-ink">{label}</div>
      {sub && <div className="mt-1 text-ink-muted normal-case" style={{ letterSpacing: "0" }}>{sub}</div>}
    </div>
  );
}

/** Horizontal row of boxes, evenly spaced with connecting arrows between them. */
export function Row({ children, wrap = true }: { children: React.ReactNode; wrap?: boolean }) {
  return (
    <div className={`flex items-stretch justify-center gap-3 ${wrap ? "flex-wrap" : ""}`}>{children}</div>
  );
}

/** A rightward flow arrow, for use between Row children. */
export function Arrow({ direction = "right" }: { direction?: "right" | "down" }) {
  if (direction === "down") {
    return (
      <div className="flex items-center justify-center py-1 text-ink-muted" aria-hidden>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.25">
          <path d="M8 1v18M2 14l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center px-1 text-ink-muted" aria-hidden>
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M1 8h22M18 2l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** A vertical stack of rows, for multi-stage pipelines. */
export function Stack({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center gap-2">{children}</div>;
}
