"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { WorkItem } from "@/lib/types";
import { ArrowIcon } from "@/components/icons";

interface WorkIndexProps {
  items: WorkItem[];
}

/**
 * Numbered hairline index rows. On desktop pointer devices, a thumbnail
 * follows the cursor while hovering a row (skipped entirely on touch and
 * under prefers-reduced-motion).
 */
export function WorkIndex({ items }: WorkIndexProps) {
  const [preview, setPreview] = useState<{ src: string; x: number; y: number } | null>(null);
  const finePointer = useRef<boolean | null>(null);

  function canPreview() {
    if (finePointer.current === null) {
      finePointer.current =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return finePointer.current;
  }

  function handleMove(e: React.MouseEvent, item: WorkItem) {
    if (!canPreview() || !item.thumbnail) return;
    setPreview({ src: item.thumbnail, x: e.clientX, y: e.clientY });
  }

  function handleLeave() {
    setPreview(null);
  }

  return (
    <div>
      {items.map((item) => {
        const external = item.href.startsWith("http");
        const rowContent = (
          <>
            <span className="meta" style={{ minWidth: "2ch" }}>
              {String(item.index).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block text-xl sm:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                {item.title}
              </span>
              <span className="meta mt-1 block truncate">{item.stack.slice(0, 4).join(" · ")}</span>
              {(item.award || item.metric) && (
                <span className="meta mt-1 block" style={{ color: "var(--accent)" }}>
                  {[item.award && `★ ${item.award}`, item.metric].filter(Boolean).join("  ·  ")}
                </span>
              )}
            </span>
            <span className="meta hidden sm:block">{item.year}</span>
            <ArrowIcon className="index-row-arrow" />
          </>
        );

        const sharedProps = {
          className: "index-row",
          onMouseMove: (e: React.MouseEvent) => handleMove(e, item),
          onMouseLeave: handleLeave,
        };

        return external ? (
          <a
            key={item.slug}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            {...sharedProps}
          >
            {rowContent}
          </a>
        ) : (
          <Link key={item.slug} href={item.href} {...sharedProps}>
            {rowContent}
          </Link>
        );
      })}

      {preview && (
        <div
          className="hover-thumb hover-thumb-visible hidden md:block"
          style={{ transform: `translate(${preview.x + 24}px, ${preview.y - 96}px)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview.src} alt="" />
        </div>
      )}
    </div>
  );
}
