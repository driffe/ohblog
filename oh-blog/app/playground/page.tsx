import type { Metadata } from "next";
import { awards, hobbies, portfolioLink } from "@/content/playground";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Playground",
  description: "Life outside the terminal — hobbies and awards.",
  alternates: {
    canonical: "/playground",
  },
  openGraph: {
    title: "Playground — Seyoung Oh",
    description: "Life outside the terminal — hobbies and awards.",
    url: "/playground",
    images: ["/og-image.jpg"],
  },
};

export default function PlaygroundPage() {
  return (
    <main id="main-content" className="section">
      <div className="wrap">
        <p className="eyebrow mb-4">Playground</p>
        <h1 className="display mb-16">Life outside the terminal</h1>

        <Reveal className="rule-t py-10">
          <h2 className="meta mb-6">Hobbies &amp; Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
            {hobbies.map((hobby) => (
              <div key={hobby.title}>
                <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {hobby.title}
                </h3>
                <p className="text-ink-muted">{hobby.description}</p>
              </div>
            ))}
          </div>
          <a
            href={portfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="meta inline-block mt-10 border-b border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
          >
            View My Works →
          </a>
        </Reveal>

        <Reveal className="rule-t rule-b py-10">
          <h2 className="meta mb-6">Awards &amp; Achievements</h2>
          <div>
            {awards.map((award) => (
              <div key={award.title} className="index-row" style={{ gridTemplateColumns: "1fr auto" }}>
                <span>{award.title}</span>
                <span className="meta">{award.year}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
