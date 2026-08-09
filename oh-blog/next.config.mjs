import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return [
      { source: "/content/about", destination: "/about", permanent: true },
      { source: "/content/skills", destination: "/stack", permanent: true },
      { source: "/content/experiences", destination: "/experience", permanent: true },
      { source: "/content/projects", destination: "/work", permanent: true },
      { source: "/content/playground", destination: "/playground", permanent: true },
      { source: "/content/contact", destination: "/contact", permanent: true },
    ];
  },
};

// remark-frontmatter lets .mdx files open with a YAML --- block without MDX
// choking on it; scripts/build-blog-index.mjs is what actually reads that
// frontmatter (via gray-matter) at prebuild time, so it's parsed but not
// rendered here. remark-gfm adds tables/strikethrough/task-lists for post bodies.
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
  },
});

export default withMDX(nextConfig);
