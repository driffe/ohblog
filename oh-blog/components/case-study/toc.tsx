"use client";

import { useEffect, useRef, useState } from "react";

interface TocEntry {
  id: string;
  label: string;
}

/**
 * Sticky mini table-of-contents, xl breakpoint only. Highlights the current
 * section via IntersectionObserver on the target headings — no smooth-scroll
 * animation, so prefers-reduced-motion needs no special-casing here.
 */
export function Toc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);
  const visibleIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const targets = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (obsEntries) => {
        for (const obsEntry of obsEntries) {
          const id = obsEntry.target.id;
          if (obsEntry.isIntersecting) {
            visibleIds.current.add(id);
          } else {
            visibleIds.current.delete(id);
          }
        }
        // Pick the topmost currently-visible heading, falling back to the
        // last heading in the list that's been scrolled past.
        const firstVisible = entries.find((e) => visibleIds.current.has(e.id));
        if (firstVisible) setActiveId(firstVisible.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const el of targets) observer.observe(el);
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav className="hidden xl:block sticky top-24 self-start" aria-label="Table of contents">
      <p className="meta mb-4">On this page</p>
      <ul className="space-y-2 border-l border-rule">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className="block pl-4 py-1 text-sm transition-colors"
              style={{
                borderLeft: activeId === entry.id ? "2px solid var(--accent)" : "2px solid transparent",
                marginLeft: "-1px",
                color: activeId === entry.id ? "var(--ink)" : "var(--ink-muted)",
              }}
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
