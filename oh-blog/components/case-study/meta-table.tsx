interface MetaTableRow {
  key: string;
  value: string;
}

/** Key/value definition-list-style table with hairline row dividers. */
export function MetaTable({ rows }: { rows: MetaTableRow[] }) {
  return (
    <div className="my-8 max-w-[65ch] rule-t">
      {rows.map((row) => (
        <div
          key={row.key}
          className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 py-3 rule-b"
        >
          <span className="meta">{row.key}</span>
          <span className="text-ink-muted">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
