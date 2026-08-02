import type { Metadata } from "next";
import { stack } from "@/content/stack";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Stack",
  description: "Languages, frameworks, databases, tools, and cloud/DevOps I work with.",
  alternates: {
    canonical: "/stack",
  },
  openGraph: {
    title: "Stack — Seyoung Oh",
    description: "Languages, frameworks, databases, tools, and cloud/DevOps I work with.",
    url: "/stack",
    images: ["/og-image.jpg"],
  },
};

export default function StackPage() {
  return (
    <main id="main-content" className="section">
      <div className="wrap">
        <p className="eyebrow mb-4">Stack</p>
        <h1 className="display mb-16">Technologies and tools</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {stack.map((category) => (
            <Reveal key={category.category} as="div" className="rule-t py-8">
              <h2 className="meta mb-4">{category.category}</h2>
              <ul className="flex flex-col">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="py-2 border-b border-rule last:border-b-0 text-lg"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
