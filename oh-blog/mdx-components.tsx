// Required by @next/mdx in the App Router: this file at the repo root
// (not components/mdx-components.tsx, which holds the actual map) is how
// Next wires a components map into every .mdx file's compiled output.
import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/components/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
