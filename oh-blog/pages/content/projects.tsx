import React, { useState } from 'react';
import Link from 'next/link';
import { Kalam } from 'next/font/google';
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

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
    <div className="project-card bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 relative boxes transition-all duration-300">
      <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-center sm:text-left">{title}</h3>

      <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 mb-3 sm:mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {tech}
          </span>
        ))}
      </div>

      <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base mb-4 sm:mb-6">
        {description.map((point, index) => (
          <li key={index} className="text-gray-700 pb-1 break-words">{point}</li>
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
    <div className="bg-gray-50 rounded-lg shadow-md p-4 mb-4 ml-4">
      <h4 className="text-md sm:text-lg font-semibold mb-2">{title}</h4>

      <div className="flex flex-wrap gap-1 mb-2">
        {technologies.filter(tech => tech !== "Google Extension App").map((tech, index) => (
          <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {tech}
          </span>
        ))}
      </div>

      <ul className="list-disc pl-4 space-y-1 text-sm mb-3">
        {description.map((point, index) => (
          <li key={index} className="text-gray-600">{point}</li>
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
    <div className="project-card bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 relative boxes transition-all duration-300">
      <div>
        <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">Chrome Extension Suite</h3>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
            JavaScript
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
            HTML/CSS
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
            Chrome Extensions
          </span>
        </div>
        <p className="text-gray-700 text-sm sm:text-base mb-4">
          A collection of {extensions.length} Chrome extensions with 25+ downloading.
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
      title: "Coffeebyme",
      description: [
        "Built a RAG-based coffee platform with Spring Boot and Batch, helping users discover Korean specialty coffee.",
        "Architected cost-optimized infrastructure on AWS (EC2, RDS, Bedrock) supporting 50+ concurrent users on a $30/month budget through strategic use of Docker, Nginx reverse proxy, Cloudflare, and environment separation.",
        "Built a complete CI/CD pipeline using GitHub Actions, reducing deployment time by 83% (30min → 5min)."
      ],
      demoLink: "https://coffeebyme.com",
      technologies: ["Java", "Spring Boot", "Spring Batch", "AWS EC2", "AWS RDS", "AWS Bedrock", "Docker", "Nginx", "Cloudflare", "GitHub Actions"]
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
    <main className={`${kalam.className} min-h-screen p-6 back`}>
      {/* Navigation back to home */}
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <span>← Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-bold">Projects</h1>
        <p className="mt-4 text-xl">A showcase of my recent work</p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Featured Projects */}
        <div className="bg-purple-200 rounded-3xl p-8 mb-8 shadow-xl relative boxes boxes-opaque">
          <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>

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
        <div className="rounded-3xl p-8 mb-8 shadow-xl" style={{
          background: 'linear-gradient(135deg, rgb(191, 219, 254) 0%, rgb(147, 197, 253) 100%)',
          position: 'relative',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -3px rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 className="text-3xl font-bold mb-6">Awards & Recognition</h2>
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
          <p className="text-xl mb-4">Explore more of my projects on GitHub</p>
          <a
            href="https://github.com/driffe"
            target="_blank"
            rel="noopener noreferrer"
            className="button-winona button-winona-github inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium"
            data-text="Visit My GitHub Profile"
          >
            <span className="inline-flex items-center gap-2">
              <FaGithub size={20} />
              Visit My GitHub Profile
            </span>
          </a>
        </div>

        {/* Navigation to Other Sections */}
        <div className="navigation-section mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/content/about">
                <button className="btn-about px-6 py-3 rounded-full font-bold shadow-md">
                  About Me
                </button>
            </Link>
            <Link href="/content/skills">
            <button className="btn-skill px-6 py-3 rounded-full font-bold shadow-md">
              Skills
            </button>
          </Link>
          <Link href="/content/experiences">
            <button className="btn-experience px-6 py-3 rounded-full font-bold shadow-md">
              Experiences
            </button>
          </Link>
          <Link href="/content/playground">
            <button className="btn-playground px-6 py-3 rounded-full font-bold shadow-md">
              Playground
            </button>
          </Link>
          <Link href="/content/contact">
            <button className="contact px-6 py-3 rounded-full font-bold shadow-md">
              Contact Me
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}