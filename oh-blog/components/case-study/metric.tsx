interface Metric {
  value: string;
  label: string;
}

/** Oversized display-font stat row with hairline dividers, a la the meta-grid in app/work/[slug]/page.tsx. */
export function MetricRow({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="my-10 grid grid-cols-2 sm:grid-cols-4 rule-t rule-b">
      {metrics.map((m, i) => (
        <div key={m.label} className={`py-6 pr-4 ${i > 0 ? "sm:border-l border-rule sm:pl-4" : ""}`}>
          <p className="display mb-1" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            {m.value}
          </p>
          <p className="meta">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
