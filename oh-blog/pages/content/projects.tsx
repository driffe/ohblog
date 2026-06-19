import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface ProjectProps {
  title: string;
  description: string[];
  demoLink?: string;
  codeLink?: string;
  technologies: string[];
}

interface ExtensionProjectProps {
  title: string;
  description: string[];
  demoLink?: string;
  codeLink?: string;
  technologies: string[];
}

const ProjectCard = ({ title, description, demoLink, codeLink, technologies }: ProjectProps) => {
  return (
    <div className="project-card p-4 sm:p-6 mb-6">
      <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-center sm:text-left">{title}</h3>

      <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 mb-3 sm:mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="tag">{tech}</span>
        ))}
      </div>

      <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base mb-4 sm:mb-6">
        {description.map((point, index) => (
          <li key={index} className="pb-1 break-words" style={{ color: 'var(--ink-soft)' }}>{point}</li>
        ))}
      </ul>

      <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="button-winona button-winona-demo inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium"
            data-text="Demo"
          >
            <span className="inline-flex items-center gap-1 sm:gap-2">
              <FaExternalLinkAlt size={12} />
              Demo
            </span>
          </a>
        )}
        {codeLink && (
          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="button-winona button-winona-code inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium"
            data-text="Code"
          >
            <span className="inline-flex items-center gap-1 sm:gap-2">
              <FaGithub size={12} />
              Code
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

const ExtensionProjectCard = ({ title, description, demoLink, codeLink, technologies }: ExtensionProjectProps) => {
  return (
    <div
      className="rounded-xl p-4 mb-4 ml-2 sm:ml-4"
      style={{ background: 'var(--surface)', border: '1px solid oklch(0.92 0.03 var(--hue))', boxShadow: 'var(--shadow-neutral)' }}
    >
      <h4 className="text-md sm:text-lg font-semibold mb-2">{title}</h4>

      <div className="flex flex-wrap gap-1 mb-2">
        {technologies.filter(tech => tech !== "Google Extension App").map((tech, index) => (
          <span key={index} className="tag">{tech}</span>
        ))}
      </div>

      <ul className="list-disc pl-4 space-y-1 text-sm mb-3">
        {description.map((point, index) => (
          <li key={index} style={{ color: 'var(--ink-soft)' }}>{point}</li>
        ))}
      </ul>

      <div className="flex gap-2">
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="button-winona button-winona-demo inline-flex items-center justify-center gap-1 px-3 py-1 rounded-lg text-xs font-medium"
            data-text="Demo"
          >
            <span className="inline-flex items-center gap-1">
              <FaExternalLinkAlt size={10} />
              Demo
            </span>
          </a>
        )}
        {codeLink && (
          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="button-winona button-winona-code inline-flex items-center justify-center gap-1 px-3 py-1 rounded-lg text-xs font-medium"
            data-text="Code"
          >
            <span className="inline-flex items-center gap-1">
              <FaGithub size={10} />
              Code
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

const ChromeExtensionGroup = ({ extensions }: { extensions: ExtensionProjectProps[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="project-card p-4 sm:p-6 mb-6">
      <div>
        <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">Chrome Extension Suite</h3>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
          <span className="tag">JavaScript</span>
          <span className="tag">HTML/CSS</span>
          <span className="tag">Chrome Extensions</span>
        </div>
        <p className="text-sm sm:text-base mb-4" style={{ color: 'var(--ink-soft)' }}>
          A collection of {extensions.length} Chrome extensions with 25+ downloads.
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="button-winona button-winona-expand inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
          data-text={isExpanded ? "Show Less" : "Show More"}
        >
          <span className="inline-flex items-center gap-2">
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <FaChevronUp size={12} />
              </>
            ) : (
              <>
                <span>Show More</span>
                <FaChevronDown size={12} />
              </>
            )}
          </span>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-6">
          <hr className="mb-4" />
          {extensions.map((extension, index) => (
            <ExtensionProjectCard
              key={index}
              title={extension.title}
              description={extension.description}
              demoLink={extension.demoLink}
              codeLink={extension.codeLink}
              technologies={extension.technologies}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Projects() {
  const regularProjects = [
    {
      title: "CoffeeByMe",
      description: [
        "Designed, built, and shipped a live AI-powered Korean coffee discovery service (US + KR markets) end-to-end as the solo developer — reaching 1.5k+ search impressions in the first 30 days post-launch.",
        "Built a RAG pipeline on AWS Bedrock (Claude Haiku 4.5) with Amazon Titan embeddings, plus a Python web-scraping + LLM extraction pipeline that turns unstructured roaster catalogs into clean, searchable records.",
        "Architected cost-optimized infrastructure on AWS (EC2, RDS, Bedrock) supporting 50+ concurrent users on a $30/month budget via Docker, Nginx reverse proxy, Cloudflare, and environment separation.",
        "Built a complete CI/CD pipeline with GitHub Actions, reducing deployment time by 83% (30min → 5min)."
      ],
      demoLink: "https://coffeebyme.com",
      technologies: ["Java", "Spring Boot", "AWS Bedrock", "Claude Haiku 4.5", "Titan Embeddings", "AWS EC2", "AWS RDS", "Docker", "Nginx", "GitHub Actions"]
    },
    {
      title: "Test Automation Tool",
      description: [
        "Developed automated testing tool that queries multiple AI services (ChatGPT 3.5, Claude, ChatGPT 4) simultaneously and collects responses.",
        "Implemented hierarchical context management using Context Tree and Input Tree structures for consistent AI prompting.",
        "Built comprehensive output classification system that categorizes AI responses as Valid/Invalid with detailed analytics and response tracking."
      ],
      demoLink: "https://www.youtube.com/watch?v=JZXYpMRs_uE",
      technologies: ["Python", "OpenAI API", "Anthropic API", "JSON"]
    },
    {
      title: "AI Chat-Based Game",
      description: [
        "Building narrative-driven game using Godot with LLM integration as Senior Capstone Project.",
        "Designing a dynamic NPC dialogue system with branching storylines for seamless conversational gameplay.",
        "Managing AI response latency and state management with real-time LLM API integration."
      ],
      technologies: ["Godot", "Python", "LLM APIs", "MongoDB"]
    },
    {
      title: "IBM SkillsBuild AI lab",
      description: [
        "Led a 3-person team developing NBA Hub, an AI-powered fan and NBA information platform using Python FastAPI.",
        "Won 1st place for AI in Sports Project among 300+ teams using IBM Watsonx Granite models, earning 5 IBM certifications (Critical Thinking, Prompt Engineering, Generative AI, AI Agents, Code Generation and Optimization)."
      ],
      demoLink: "https://youtu.be/GOdMPxPy90w",
      technologies: ["Python", "FastAPI", "IBM Watsonx", "AI/ML"]
    },
    {
      title: "AI Health Checker",
      description: [
        "Built an automated medication reminder system for elderly users during AWS MCP & A2A Hackathon.",
        "Integrated VAPI.ai voice interface for voice-based assistance with Claude AI for natural language processing.",
        "Automated SMS notifications using Twilio for comprehensive health monitoring."
      ],
      technologies: ["Python", "Flask", "VAPI.ai", "Claude AI", "Twilio"]
    },
    {
      title: "MediTrek",
      description: [
        "Developed MediTrek, an AI medication recommendation platform serving 100K+ pharmacies with 80% accuracy.",
        "Won 1st Place for Use of Perplexity/Sonar at HackHayward and placed Top 10 at SpartUp x SVSBDC Pitch Jam.",
        "Reduced LLM API usage by 30% and improved response times to under 1s with a caching system implementation."
      ],
      demoLink: "https://meditrek.vercel.app/",
      codeLink: "https://github.com/driffe/Medication-Recommend",
      technologies: ["Python", "FastAPI", "JavaScript", "HTML/CSS", "Perplexity AI API", "Google Places API", "Vercel"]
    },
    {
      title: "Autowise",
      description: [
        "Built AI-powered car maintenance app, winning 5th award at the 'SpartUp' Hackathon within 4hours.",
      ],
      demoLink: "https://visionary-squirrel-309b11.netlify.app//",
      technologies: ["NextJS", "Typescript", "JavaScript", "HTML/CSS", "Perplexity AI API", "Mapbox API", "Netlify"]
    },
    {
      title: "Event Management System",
      description: [
        "Built an event management system utilizing SQL database, and engineering backend infrastructure with Spring Boot(JPA/JDBC) template to implement CRUD operations for event scheduling and ticket system."
      ],
      codeLink: "https://github.com/driffe/SJSU_Event",
      technologies: ["Java", "Spring Boot", "SQL", "JPA/JDBC", "RESTful API"]
    },
    {
      title: "Personal Money Tracker",
      description: [
        "Built a personalized expense manager in Next.js to gain hands-on experience with NOSQL databases, successfully implementing secure OAuth authentication flow and designing Firestore database schema with security rules."
      ],
      demoLink: "https://army-money-tracker.vercel.app/", 
      codeLink: "https://github.com/driffe/Army",
      technologies: ["Next.js", "TypeScript", "Firebase", "OAuth", "TailwindCSS", "Vercel"]
    },
    {
      title: "Weather App",
      description: [
        "Simple Weather app with KR/EN Version using OpenWeatherMap api"
      ],
      demoLink: "https://weather-app-seyoungohs-projects.vercel.app/", 
      codeLink: "https://github.com/driffe/weatherApp",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "PWA" ,"Vercel"]
    }
  ];

  const chromeExtensions = [
    {
      title: "De Anza College Rate My Profs",
      description: [
        "Chrome extension that instantly displays professor ratings, class difficulty levels, and would take again percentages when highlighting any professor's name on webpages"
      ],
      demoLink: "https://chromewebstore.google.com/detail/de-anza-professor-info-vi/omielgfjgpilflimpdbmnppkfbknaogd", 
      codeLink: "https://github.com/driffe/Rate-my-profs",
      technologies: ["JavaScript", "HTML/CSS", "Python", "Selenium", "Google Extension App"]
    },
    {
      title: "Moon Timer",
      description: [
        "A minimal timer that allows you to measure time while watching an animation of the moon"
      ],
      demoLink: "https://chromewebstore.google.com/detail/moon-phase-timer/kkiikiidimhmaenmpdpfgkhoahkccjhm", 
      codeLink: "https://github.com/driffe/Moon-Timer",
      technologies: ["Next.js", "JavaScript", "TailwindCSS", "Google Extension App"]
    },
    {
      title: "Reaction Time Test",
      description: [
        "A reaction time test that measures how quickly you respond to visual cues by clicking when prompted, with results displayed in milliseconds."
      ],
      demoLink: "https://chromewebstore.google.com/detail/%EB%B0%98%EC%9D%91%EC%86%8D%EB%8F%84-%ED%85%8C%EC%8A%A4%ED%8A%B8/oefdnnlfjgoagefgnhfhffjgdbgipoin", 
      codeLink: "https://github.com/driffe/Reaction_Time_Test",
      technologies: ["JavaScript", "HTML/CSS", "Google Extension App"]
    }
  ];

  return (
    <main className="min-h-screen back">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Projects</h1>
        <p className="mt-3 text-lg" style={{ color: 'var(--ink-soft)' }}>A showcase of my recent work</p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Featured Projects */}
        <div className="project boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Featured Projects</h2>

          {/* Regular Projects */}
          {regularProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              demoLink={project.demoLink}
              codeLink={project.codeLink}
              technologies={project.technologies}
            />
          ))}

          {/* Chrome Extensions Group */}
          <ChromeExtensionGroup extensions={chromeExtensions} />
        </div>

        {/* Awards and Recognition */}
        <div className="contact boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Awards &amp; Recognition</h2>
          <ul className="space-y-4 list-disc ml-6">
            <li className="pl-2">
              <span className="font-semibold">1st Place AI in Sports Project</span> – IBM SkillsBuild AI Lab (among 300+ teams)
            </li>
            <li className="pl-2">
              <span className="font-semibold">5 IBM Certifications</span> – Critical Thinking, Prompt Engineering, Generative AI, AI Agents, Code Generation and Optimization
            </li>
            <li className="pl-2">
              <span className="font-semibold">Certificate Of Achievement</span> – SpartUp Hackathon 2025
            </li>
            <li className="pl-2">
              <span className="font-semibold">Placed Top 10</span> – SpartUp × SBDC Pitch Jam 2025
            </li>
            <li className="pl-2">
              <span className="font-semibold">Best Use of Perplexity / Sonar</span> – HackHayward Hackathon 2025
            </li>
          </ul>
        </div>

        {/* GitHub Link */}
        <div className="text-center mt-10">
          <p className="text-xl mb-4" style={{ color: 'var(--ink-soft)' }}>Explore more of my projects on GitHub</p>
          <a
            href="https://github.com/driffe"
            target="_blank"
            rel="noopener noreferrer"
            className="button-winona button-winona-github inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium"
            data-text="Visit My GitHub Profile"
            aria-label="Visit my GitHub profile"
          >
            <span className="inline-flex items-center gap-2">
              <FaGithub size={20} aria-hidden />
              Visit My GitHub Profile
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}