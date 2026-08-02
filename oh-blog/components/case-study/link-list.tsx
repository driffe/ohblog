import { ArrowIcon } from "@/components/icons";

interface LinkListProps {
  items: { title: string; href?: string; note?: string }[];
}

/**
 * Numbered-index-row list for a group of external links (e.g. the three
 * Chrome Web Store listings on chrome-extension-suite). Reuses the
 * `.index-row` pattern from the awards list in app/playground/page.tsx —
 * title left, meta right — so a.index-row:hover and .index-row-arrow in
 * app/globals.css apply for free.
 */
export function LinkList({ items }: LinkListProps) {
  return (
    <div className="my-8">
      {items.map((item) =>
        item.href ? (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="index-row"
            style={{ gridTemplateColumns: "1fr auto" }}
          >
            <span>{item.title}</span>
            <span className="meta flex items-center gap-2">
              {item.note}
              <ArrowIcon className="index-row-arrow" />
            </span>
          </a>
        ) : (
          <div key={item.title} className="index-row" style={{ gridTemplateColumns: "1fr auto" }}>
            <span>{item.title}</span>
            <span className="meta">{item.note}</span>
          </div>
        ),
      )}
    </div>
  );
}
