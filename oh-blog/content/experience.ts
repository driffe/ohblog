import type { ExperienceEntry } from "@/lib/types";

export const experience: ExperienceEntry[] = [
  {
    company: "KQED",
    badge: "KQ",
    location: "San Francisco Bay Area · Hybrid",
    link: "https://www.kqed.org",
    roles: [
      {
        title: "Junior Software Engineer",
        type: "Full-time",
        period: "Mar 2026 – Present",
        responsibilities: [
          "Build production features and infrastructure across a microservices architecture for KQED's digital products, which serve ~1M monthly users across web, mobile, and streaming.",
          "Fixed a production page-loading bug on KQED.org (938K monthly visitors) by tracing a broken cache lookup that silently returned empty data — restoring affected pages from a 100% failure rate to fully working (React, Redux, Server-Side Rendering).",
          "Built end-to-end pagination for 1M+ tag-archive pages on KQED.org: CSR/SSR canonical redirects, dynamic SEO tags driven from Redux state, VoiceOver accessibility, and 404 handling for invalid page requests.",
          "Migrated mobile app credentials from plaintext Kubernetes ConfigMap files to a managed encrypted vault (GCP Secret Manager), removing exposed secrets across 3 internal microservices and aligning deployment with security best practices.",
          "Shipped two reusable WordPress content blocks (podcast and sponsor sections) that editors update directly, replacing developer-only edits across 20+ program pages.",
          "Fixed a data-isolation bug affecting 260K+ membership accounts where sub-accounts inherited primary-account data, closing a cross-account data leak.",
        ],
      },
      {
        title: "Software Engineer Intern",
        type: "Internship",
        period: "Jul 2025 – Feb 2026",
        responsibilities: [
          "Promoted to full-time Junior Software Engineer after the internship.",
          "Increased a file upload service's capacity 25× (2 → 50+ req/sec) by rewriting blocking JPA database calls into a non-blocking reactive pipeline (Spring WebFlux), eliminating timeout errors under concurrent load.",
          "Cut the team's API maintenance load by removing 27% of unused endpoints — audited 100+ APIs across a Spring WebFlux microservices architecture (Kafka for event streaming) in Postman, cross-referenced frontend usage, and deprecated dead routes relied on by 8 engineers daily.",
        ],
      },
    ],
  },
  {
    company: "IBM SkillsBuild",
    badge: "IBM",
    location: "Remote · Seasonal",
    roles: [
      {
        title: "AI Experiential Learning Lab",
        period: "Sep 2025 – Dec 2025",
        responsibilities: [
          "Won 1st place for the AI in Sports project among 300+ teams, earning 5 IBM certifications (Critical Thinking, Prompt Engineering, Generative AI, AI Agents, Code Generation & Optimization).",
          "Led a 3-person team developing NBA Hub, an AI-powered fan platform integrating IBM watsonx Granite models.",
        ],
      },
    ],
  },
  {
    company: "JKI Inc",
    badge: "JKI",
    location: "Campbell, CA · Hybrid",
    roles: [
      {
        title: "Field Application Engineer",
        type: "Contract",
        period: "Sep 2024 – Jan 2025",
        responsibilities: [
          "Built a C++ test automation framework for NAND flash memory chips that runs full hardware validation (reset, power cycling, error-rate checks) across configurable voltage levels with a single command, replacing the prior manual one-test-at-a-time workflow.",
          "Discovered an additional 17% safe operating voltage range through systematic testing, broadening reliable operation and informing the customer's production qualification spec.",
          "Served as the technical liaison between the customer's engineering team and JKI's product team, supporting NAND flash hardware qualification.",
        ],
      },
      {
        title: "Application Engineer Intern",
        type: "Internship",
        period: "Jul 2022 – Sep 2022",
        responsibilities: [
          "Built an interactive temperature monitoring dashboard with Plotly (Python) to analyze post-testing log data, enabling efficient thermal-anomaly detection and reducing debugging time by 85%.",
          "Developed and automated a robust data pipeline with NumPy and Pandas, cleaning and analyzing 10K+ log entries.",
        ],
      },
    ],
  },
  {
    company: "Republic of Korea Army",
    badge: "ROK",
    location: "Goseong, Gangwon, South Korea · On-site",
    roles: [
      {
        title: "Technical Support Engineer (Sergeant)",
        type: "Full-time",
        period: "Oct 2022 – Apr 2024",
        responsibilities: [
          "Resolved 1,800+ technical incidents (5+ daily) for 1,200+ personnel across server hardware, on-premise databases, and physical network infrastructure (cable termination, switch configuration).",
          "Operated three segregated networks with custom access control while maintaining 98% uptime on the unit's on-premise database.",
          "Trained 5 incoming personnel and authored equipment operation manuals and network troubleshooting guides, standardizing diagnostics for workstations, CCTV, printers, and video conferencing equipment.",
          "Awarded the Corps Commander's Commendation following a month-long US–ROK Combined Forces Exercise (12-hour shifts, two-shift rotation), and recognized as an Outstanding Soldier in basic training.",
        ],
      },
    ],
  },
  {
    company: "Kim Study",
    badge: "KS",
    location: "Hybrid · Part-time",
    roles: [
      {
        title: "Programming Tutor",
        period: "Apr 2024 – Jul 2024",
        responsibilities: [
          "Mentored students in programming — block coding, Python, and Java — through personalized instruction.",
          "Guided one student to acceptance into the Gifted and Talented Education Program through a curriculum focused on creative and practical Micro:bit projects.",
        ],
      },
    ],
  },
];
