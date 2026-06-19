import React from 'react';

interface Role {
  title: string;
  type?: string;
  period: string;
  responsibilities: string[];
}

interface ExperienceProps {
  company: string;
  badge: string;
  location: string;
  link?: string;
  hue: number;
  roles: Role[];
}

const ExperienceCard = ({ company, badge, location, link, hue, roles }: ExperienceProps) => {
  return (
    <div
      className="experience-card p-5 sm:p-6 mb-6"
      style={{ '--hue': hue } as React.CSSProperties}
    >
      {/* Company header */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-xl font-extrabold text-lg shrink-0"
          style={{
            background: `oklch(0.9 0.07 ${hue})`,
            color: `oklch(0.4 0.16 ${hue})`,
            border: `1px solid oklch(0.9 0.1 ${hue} / 0.6)`,
          }}
        >
          {badge}
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight">
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {company}
              </a>
            ) : (
              company
            )}
          </h3>
          <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>{location}</p>
        </div>
      </div>

      {/* Roles */}
      <div className="space-y-5 sm:pl-16">
        {roles.map((role, i) => (
          <div key={i} className="relative">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <h4 className="font-semibold text-base sm:text-lg">
                {role.title}
                {role.type && (
                  <span className="ml-2 align-middle text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background: `oklch(0.92 0.05 ${hue})`, color: `oklch(0.4 0.14 ${hue})` }}>
                    {role.type}
                  </span>
                )}
              </h4>
              <span className="text-sm shrink-0" style={{ color: 'var(--ink-soft)' }}>{role.period}</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
              {role.responsibilities.map((r, idx) => (
                <li key={idx} className="break-words" style={{ color: 'var(--ink-soft)' }}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Experiences() {
  const experiences: ExperienceProps[] = [
    {
      company: 'KQED',
      badge: 'KQ',
      location: 'San Francisco Bay Area · Hybrid',
      link: 'https://www.kqed.org',
      hue: 25,
      roles: [
        {
          title: 'Junior Software Engineer',
          type: 'Full-time',
          period: 'Mar 2026 – Present',
          responsibilities: [
            "Build production features and infrastructure across a microservices architecture for KQED's digital products, which serve ~1M monthly users across web, mobile, and streaming.",
            'Fixed a production page-loading bug on KQED.org (938K monthly visitors) by tracing a broken cache lookup that silently returned empty data — restoring affected pages from a 100% failure rate to fully working (React, Redux, Server-Side Rendering).',
            'Migrated mobile app credentials from plaintext Kubernetes ConfigMap files to a managed encrypted vault (GCP Secret Manager), removing exposed secrets across 3 internal microservices and aligning deployment with security best practices.',
          ],
        },
        {
          title: 'Software Engineer Intern',
          type: 'Internship',
          period: 'Jul 2025 – Feb 2026',
          responsibilities: [
            'Promoted to full-time Junior Software Engineer after the internship.',
            "Increased a file upload service's capacity 25× (2 → 50+ req/sec) by rewriting blocking JPA database calls into a non-blocking reactive pipeline (Spring WebFlux), eliminating timeout errors under concurrent load.",
            "Cut the team's API maintenance load by removing 27% of unused endpoints — audited 100+ APIs across microservices in Postman, cross-referenced frontend usage, and deprecated dead routes relied on by 8 engineers daily.",
            'Contributed to multiple frontend tickets: routing fixes, accessibility improvements, and component bug fixes.',
          ],
        },
      ],
    },
    {
      company: 'CoffeeByMe',
      badge: 'CB',
      location: 'Self-employed · Technical Lead',
      link: 'https://coffeebyme.com',
      hue: 55,
      roles: [
        {
          title: 'Technical Lead',
          period: 'Jul 2025 – Present',
          responsibilities: [
            'Designed, built, and shipped a live AI-powered Korean coffee discovery service (US + KR markets) end-to-end as the solo developer.',
            'Built with Spring Boot, AWS Bedrock (Claude Haiku 4.5), and Amazon Titan embeddings, plus a Python web-scraping + LLM extraction pipeline that turns unstructured roaster catalogs into clean, searchable records.',
            'Reached 1.5k+ search impressions in the first 30 days post-launch.',
          ],
        },
      ],
    },
    {
      company: 'IBM SkillsBuild',
      badge: 'IBM',
      location: 'Remote · Seasonal',
      hue: 240,
      roles: [
        {
          title: 'AI Experiential Learning Lab',
          period: 'Sep 2025 – Dec 2025',
          responsibilities: [
            'Won 1st place for the AI in Sports project among 300+ teams, earning 5 IBM certifications (Critical Thinking, Prompt Engineering, Generative AI, AI Agents, Code Generation & Optimization).',
            'Led a 3-person team developing NBA Hub, an AI-powered fan platform integrating IBM watsonx Granite models.',
          ],
        },
      ],
    },
    {
      company: 'JKI Inc',
      badge: 'JKI',
      location: 'Campbell, CA · Hybrid',
      hue: 150,
      roles: [
        {
          title: 'Application Engineer',
          type: 'Contract',
          period: 'Sep 2024 – Jan 2025',
          responsibilities: [
            'Built a C++ test automation framework for NAND flash memory chips that runs full hardware validation (reset, power cycling, error-rate checks) across configurable voltage levels with a single command, replacing the prior manual one-test-at-a-time workflow.',
            "Discovered an additional 17% safe operating voltage range through systematic testing, broadening reliable operation and informing the customer's production qualification spec.",
          ],
        },
        {
          title: 'Data Engineer Intern',
          type: 'Internship',
          period: 'Jul 2022 – Sep 2022',
          responsibilities: [
            'Built an interactive temperature monitoring dashboard with Plotly (Python) to analyze post-testing log data, enabling efficient thermal-anomaly detection and reducing debugging time by 85%.',
            'Developed and automated a robust data pipeline with NumPy and Pandas, cleaning and analyzing 10K+ log entries.',
          ],
        },
      ],
    },
    {
      company: 'Republic of Korea Army',
      badge: 'ROK',
      location: 'Goseong, Gangwon, South Korea · On-site',
      hue: 95,
      roles: [
        {
          title: 'IT Operations Specialist (Sergeant)',
          type: 'Full-time',
          period: 'Oct 2022 – Apr 2024',
          responsibilities: [
            'Resolved 1,800+ technical incidents (5+ daily) for 1,200+ personnel across server hardware, on-premise databases, and physical network infrastructure (cable termination, switch configuration).',
            'Operated three segregated networks with custom access control while maintaining 98% uptime on the unit’s on-premise database.',
            "Awarded the Corps Commander's Commendation following a month-long US–ROK Combined Forces Exercise (12-hour shifts, two-shift rotation), and recognized as an Outstanding Soldier in basic training.",
          ],
        },
      ],
    },
    {
      company: 'Kim Study',
      badge: 'KS',
      location: 'Hybrid · Part-time',
      hue: 295,
      roles: [
        {
          title: 'Programming Tutor',
          period: 'Apr 2024 – Jul 2024',
          responsibilities: [
            'Mentored students in programming — block coding, Python, and Java — through personalized instruction.',
            'Guided one student to acceptance into the Gifted and Talented Education Program through a curriculum focused on creative and practical Micro:bit projects.',
          ],
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen back">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Experiences</h1>
        <p className="mt-3 text-lg" style={{ color: 'var(--ink-soft)' }}>My professional journey</p>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="experience boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Work Experience</h2>
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>
    </main>
  );
}
