// The MDX -> component map for blog posts. Exposes the existing
// case-study primitives (components/case-study/*) as bare JSX tags a
// content/blog/*.mdx file can use with no import statement, exactly like
// content/work/*.tsx bodies already do (see content/work/pilm.tsx). Raw
// markdown elements are also remapped so a stray "## heading" or fenced
// code block still renders styled instead of falling back to unstyled
// browser defaults.
import type { MDXComponents } from "mdx/types";
import { Prose, H2, H3, P, UL, LI } from "@/components/case-study/prose";
import { Figure } from "@/components/case-study/figure";
import { Callout } from "@/components/case-study/callout";
import { CodeBlock } from "@/components/case-study/code-block";
import { MetaTable } from "@/components/case-study/meta-table";
import { MetricRow } from "@/components/case-study/metric";
import { LinkList } from "@/components/case-study/link-list";
import { Toc } from "@/components/case-study/toc";
import { DiagramFrame, Box, Row, Arrow, Stack } from "@/components/case-study/diagram";

/**
 * `pre` unwraps MDX's default `<pre><code>...</code></pre>` fenced-code
 * output and re-wraps the raw text in CodeBlock, instead of nesting a
 * second `<code>` inside CodeBlock's own `<pre><code>` — that would let the
 * `:not(pre) > code` inline-code rule in globals.css (which only excludes
 * a code's *direct* parent being `pre`) incorrectly paint the whole block.
 */
function MDXPre({ children }: { children?: React.ReactElement<{ children?: React.ReactNode }> }) {
  const inner = children?.props?.children;
  return <CodeBlock>{inner ?? children}</CodeBlock>;
}

function MDXAnchor({ href = "", children, ...rest }: React.ComponentPropsWithoutRef<"a">) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className="underline hover:text-accent break-words"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  // Raw markdown elements, remapped to the styled primitives.
  h2: (props) => <H2 {...props} />,
  h3: (props) => <H3 {...props} />,
  p: (props) => <P {...props} />,
  ul: (props) => <UL {...props} />,
  li: (props) => <LI {...props} />,
  code: (props) => <code {...props} />, // inline code — already styled by `:not(pre) > code` in globals.css
  pre: MDXPre,
  a: MDXAnchor,

  // Case-study primitives, usable directly as JSX in post bodies.
  Prose,
  H2,
  H3,
  P,
  UL,
  LI,
  Figure,
  Callout,
  CodeBlock,
  MetaTable,
  MetricRow,
  LinkList,
  Toc,
  DiagramFrame,
  Box,
  Row,
  Arrow,
  Stack,
};
