import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudySlugs, getWorkBySlug } from "@/content/work";
import CoffeeByMeBody from "@/content/work/coffeebyme";
import ExcelStockBody from "@/content/work/excel-stock";
import PilmBody from "@/content/work/pilm";
import ProjectLokiBody from "@/content/work/project-loki";
import IbmNbaHubBody from "@/content/work/ibm-nba-hub";
import MediTrekBody from "@/content/work/meditrek";
import TestAutomationToolBody from "@/content/work/test-automation-tool";
import AiHealthCheckerBody from "@/content/work/ai-health-checker";
import AutowiseBody from "@/content/work/autowise";
import PersonalMoneyTrackerBody from "@/content/work/personal-money-tracker";
import WeatherAppBody from "@/content/work/weather-app";
import ChromeExtensionSuiteBody from "@/content/work/chrome-extension-suite";

const bodies: Record<string, React.ComponentType> = {
  coffeebyme: CoffeeByMeBody,
  "excel-stock": ExcelStockBody,
  pilm: PilmBody,
  "project-loki": ProjectLokiBody,
  "ibm-nba-hub": IbmNbaHubBody,
  meditrek: MediTrekBody,
  "test-automation-tool": TestAutomationToolBody,
  "ai-health-checker": AiHealthCheckerBody,
  autowise: AutowiseBody,
  "personal-money-tracker": PersonalMoneyTrackerBody,
  "weather-app": WeatherAppBody,
  "chrome-extension-suite": ChromeExtensionSuiteBody,
};

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) return {};
  const canonical = `/work/${slug}`;
  const ogImage = `/work/${slug}/opengraph-image`;
  return {
    title: item.title,
    description: item.summary,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${item.title} — Seyoung Oh`,
      description: item.summary,
      url: canonical,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} — Seyoung Oh`,
      description: item.summary,
      images: [ogImage],
    },
  };
}

/** Person node shared across every case study's structured data. */
const personNode = {
  "@type": "Person",
  name: "Seyoung Oh",
  url: "https://ohblog-inky.vercel.app",
};

function buildJsonLd(item: NonNullable<ReturnType<typeof getWorkBySlug>>) {
  const canonical = `https://ohblog-inky.vercel.app/work/${item.slug}`;
  if (item.slug === "pilm") {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: item.title,
      description: item.summary,
      url: canonical,
      author: personNode,
      applicationCategory: "PhotographyApplication",
      operatingSystem: "iOS",
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.summary,
    url: canonical,
    author: personNode,
    keywords: item.stack.join(", "),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item || !item.hasCaseStudy) notFound();

  const Body = bodies[slug];
  if (!Body) notFound();
  const idx = caseStudySlugs.indexOf(slug);
  const prevSlug = caseStudySlugs[(idx - 1 + caseStudySlugs.length) % caseStudySlugs.length];
  const nextSlug = caseStudySlugs[(idx + 1) % caseStudySlugs.length];
  const prev = getWorkBySlug(prevSlug);
  const next = getWorkBySlug(nextSlug);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(item)) }}
      />
      <section className="section pb-0">
        <div className="wrap">
          <p className="eyebrow mb-4">
            {item.year} · {item.role}
            {item.status ? ` · ${item.status}` : ""}
          </p>
          <h1 className="display mb-6">{item.title}</h1>
          <p className="max-w-2xl text-lg text-ink-muted mb-10">{item.summary}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 rule-t rule-b">
            <div className="py-6 pr-4 min-w-0">
              <p className="meta mb-2">Role</p>
              <p>{item.role}</p>
            </div>
            <div className="py-6 pr-4 md:border-l border-rule md:pl-4 min-w-0">
              <p className="meta mb-2">Timeline</p>
              <p>{item.year}</p>
            </div>
            <div className="py-6 pr-4 md:border-l border-rule md:pl-4 min-w-0">
              <p className="meta mb-2">Stack</p>
              <p className="break-words">{item.stack.join(", ")}</p>
            </div>
            <div className="py-6 md:border-l border-rule md:pl-4 min-w-0">
              <p className="meta mb-2">Links</p>
              <p className="flex flex-col gap-1">
                {item.demoHref && (
                  <a
                    href={item.demoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    Live →
                  </a>
                )}
                {item.githubHref && (
                  <a
                    href={item.githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    GitHub →
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {item.thumbnail && (
        <section className="wrap py-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.thumbnail} alt={`${item.title} hero`} className="w-full border border-rule" />
        </section>
      )}

      <section className="section pt-10">
        <div className="wrap">
          <Body />
        </div>
      </section>

      <nav className="rule-t">
        <div className="wrap grid grid-cols-2">
          <Link href={`/work/${prev?.slug}`} className="py-8 pr-4 hover:text-accent transition-colors">
            <p className="meta mb-2">← Previous</p>
            <p className="display" style={{ fontSize: "1.75rem" }}>
              {prev?.title}
            </p>
          </Link>
          <Link
            href={`/work/${next?.slug}`}
            className="py-8 pl-4 md:border-l border-rule text-right hover:text-accent transition-colors"
          >
            <p className="meta mb-2">Next →</p>
            <p className="display" style={{ fontSize: "1.75rem" }}>
              {next?.title}
            </p>
          </Link>
        </div>
      </nav>
    </main>
  );
}
