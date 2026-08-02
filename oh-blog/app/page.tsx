import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { work } from "@/content/work";
import { experience } from "@/content/experience";
import { WorkIndex } from "@/components/work-index";
import { Reveal } from "@/components/reveal";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "KQED",
  },
  url: "https://ohblog-inky.vercel.app",
  sameAs: [profile.github, profile.linkedin],
  alumniOf: "San Jose State University",
};

export default function Home() {
  const selectedWork = work.slice(0, 6);
  const recentRoles = experience.slice(0, 3);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* Hero */}
      <section className="section pb-0">
        <div className="wrap">
          <p className="eyebrow mb-6">{profile.eyebrow} {profile.name}</p>
          <h1 className="display mb-8">
            {profile.role}
            <br />
            {profile.employer}
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-ink-muted mb-8">
            {profile.positioning}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="meta border border-rule px-3 py-1.5">{profile.availability}</span>
          </div>

          <div className="flex flex-wrap gap-6 pb-16">
            <a
              href={profile.resumeSwe}
              target="_blank"
              rel="noopener noreferrer"
              className="meta border-b border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              View Résumé
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="meta flex items-center gap-2 hover:text-accent transition-colors"
            >
              <GitHubIcon /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="meta flex items-center gap-2 hover:text-accent transition-colors"
            >
              <LinkedInIcon /> LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="meta flex items-center gap-2 hover:text-accent transition-colors"
            >
              <MailIcon /> Email
            </a>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="rule-t rule-b">
        <div className="wrap grid grid-cols-2 md:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 px-4 ${i > 0 ? "border-l border-rule" : ""}`}
            >
              <p className="display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
                {stat.value}
              </p>
              <p className="meta mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="eyebrow">Selected Work</h2>
              <Link href="/work" className="meta hover:text-accent transition-colors">
                View all work
              </Link>
            </div>
          </Reveal>
          <WorkIndex items={selectedWork} />
        </div>
      </section>

      {/* Recent roles teaser */}
      <section className="section pt-0">
        <div className="wrap">
          <Reveal>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="eyebrow">Recent Roles</h2>
              <Link href="/experience" className="meta hover:text-accent transition-colors">
                Full history
              </Link>
            </div>
          </Reveal>
          <div>
            {recentRoles.map((role) => (
              <div key={role.company} className="index-row" style={{ gridTemplateColumns: "1fr auto" }}>
                <span>
                  <span className="block text-xl sm:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                    {role.company}
                  </span>
                  <span className="meta mt-1 block">{role.roles[0].title}</span>
                </span>
                <span className="meta">{role.roles[0].period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact band */}
      <section className="rule-t">
        <div className="wrap py-20">
          <Link href="/contact" className="group block">
            <h2 className="display group-hover:text-accent transition-colors">
              Let&rsquo;s talk →
            </h2>
            <p className="meta mt-4">{profile.availability}</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
