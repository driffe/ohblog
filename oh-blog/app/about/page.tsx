import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Seyoung Oh — Software Engineer at KQED, SJSU '25 Software Engineering grad.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — Seyoung Oh",
    description: "Seyoung Oh — Software Engineer at KQED, SJSU '25 Software Engineering grad.",
    url: "/about",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="section">
      <div className="wrap">
        <p className="eyebrow mb-4">About</p>
        <h1 className="display mb-12">Hello, I&rsquo;m {profile.name}</h1>

        <Reveal className="rule-t py-10 max-w-2xl flex flex-col gap-4">
          {profile.about.map((p) => (
            <p key={p} className="text-lg text-ink-muted">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal className="rule-t py-10">
          <h2 className="meta mb-6">Education</h2>
          <h3 className="text-xl font-semibold">{profile.education.degree}</h3>
          <p className="text-ink-muted mb-6">
            {profile.education.school} · {profile.education.period}
          </p>
          <p className="meta mb-2">Relevant Coursework</p>
          <p className="text-ink-muted max-w-2xl">{profile.education.coursework.join(", ")}</p>
        </Reveal>

        <Reveal className="rule-t rule-b py-10">
          <h2 className="meta mb-6">Résumé</h2>
          <p className="text-ink-muted mb-6">Two versions, depending on what you&rsquo;re looking for.</p>
          <div className="flex flex-wrap gap-6">
            <a
              href={profile.resumeSwe}
              target="_blank"
              rel="noopener noreferrer"
              className="meta border-b border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              Software Engineering →
            </a>
            <a
              href={profile.resumeIt}
              target="_blank"
              rel="noopener noreferrer"
              className="meta border-b border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              IT →
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
