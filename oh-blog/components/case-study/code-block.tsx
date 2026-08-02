interface CodeBlockProps {
  children: React.ReactNode;
  label?: string;
}

/** Styled <pre> for inline code/config snippets. No syntax highlighting, no new deps. */
export function CodeBlock({ children, label }: CodeBlockProps) {
  return (
    <div className="my-8 border border-rule" style={{ background: "var(--paper-2)" }}>
      {label && <p className="meta px-5 pt-4">{label}</p>}
      <pre
        className="overflow-x-auto px-5 py-4 text-[0.8125rem] leading-relaxed"
        style={{ fontFamily: "var(--font-meta)" }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
