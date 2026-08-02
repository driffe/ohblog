import type { Metadata } from "next";
import { experience } from "@/content/experience";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work history — KQED, IBM SkillsBuild, JKI, ROK Army, Kim Study.",
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: "Experience — Seyoung Oh",
    description: "Work history — KQED, IBM SkillsBuild, JKI, ROK Army, Kim Study.",
    url: "/experience",
    images: ["/og-image.jpg"],
  },
};

export default function ExperiencePage() {
  return (
    <main id="main-content" className="section">
      <div className="wrap">
        <p className="eyebrow mb-4">Experience</p>
        <h1 className="display mb-16">My professional journey</h1>

        <div>
          {experience.map((entry) => (
            <Reveal key={entry.company} as="article" className="rule-t py-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3">
                  <p className="meta mb-2">{entry.badge}</p>
                  <h2 className="display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
                    {entry.link ? (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        {entry.company}
                      </a>
                    ) : (
                      entry.company
                    )}
                  </h2>
                  <p className="meta mt-2">{entry.location}</p>
                </div>

                <div className="md:col-span-9 flex flex-col gap-8">
                  {entry.roles.map((role) => (
                    <div key={role.title + role.period}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                        <h3 className="text-lg font-semibold">
                          {role.title}
                          {role.type && <span className="meta ml-3">{role.type}</span>}
                        </h3>
                        <span className="meta">{role.period}</span>
                      </div>
                      <ul className="flex flex-col gap-2 list-disc ml-5">
                        {role.responsibilities.map((r) => (
                          <li key={r} className="text-ink-muted">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
