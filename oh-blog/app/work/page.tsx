"use client";

import { useMemo, useState } from "react";
import { work } from "@/content/work";
import { WorkIndex } from "@/components/work-index";
import type { WorkTag } from "@/lib/types";

const filters: { label: string; tag: WorkTag | "all" }[] = [
  { label: "All", tag: "all" },
  { label: "Product", tag: "product" },
  { label: "AI · LLM", tag: "ai" },
  { label: "Web", tag: "web" },
  { label: "Mobile", tag: "mobile" },
  { label: "Tools", tag: "tools" },
];

export default function WorkPage() {
  const [active, setActive] = useState<WorkTag | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? work : work.filter((item) => item.tags.includes(active))),
    [active],
  );

  return (
    <main id="main-content" className="section">
      <div className="wrap">
        <p className="eyebrow mb-4">Work</p>
        <h1 className="display mb-10">Everything I&rsquo;ve shipped</h1>

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.tag}
              type="button"
              onClick={() => setActive(f.tag)}
              className="meta border border-rule px-3 py-1.5 transition-colors"
              style={
                active === f.tag
                  ? { background: "var(--ink)", color: "var(--paper)", borderColor: "var(--ink)" }
                  : undefined
              }
              aria-pressed={active === f.tag}
            >
              {f.label}
            </button>
          ))}
        </div>

        <WorkIndex items={filtered} />
      </div>
    </main>
  );
}
