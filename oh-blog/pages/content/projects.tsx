import React from 'react';
import Link from 'next/link';
import { Kalam } from 'next/font/google';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

interface ProjectProps {
  title: string;
  description: string[];
  demoLink?: string; // Optional
  codeLink?: string; // Optional
  technologies: string[];
}

const ProjectCard = ({ title, description, demoLink, codeLink, technologies }: ProjectProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8">
      <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-center sm:text-left">{title}</h3>
      
      <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 mb-3 sm:mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {tech}
          </span>
        ))}
      </div>
      
      {/* Description points */}
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
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2"
          >
            <FaExternalLinkAlt size={12} />
            Demo
          </a>
        )}
        {codeLink && (
          <a 
            href={codeLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-700 hover:bg-gray-800 text-white text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2"
          >
            <FaGithub size={12} />
            Code
          </a>
        )}
      </div>
    </div>
  );
};

export default function Projects() {
  const projects = [
    {
      title: "Medication Guide",
      description: [
        "Built Medicine recommendation Web App based on user's information, winning the 'Best Use of Perplexity/Sonar' award at the 'Build with AI: HackHayward' Hackathon.",
      ],
      demoLink: "https://medication-recommend.vercel.app/", 
      codeLink: "https://github.com/driffe/Medication-Recommend",
      technologies: [ "Python", "FastAPI", "JavaScript", "HTML/CSS", "Perplexity AI API", "Google Places API", "Vercel"]
    },
    {
      title: "Event Management System",
      description: [
        "Built an event management system utilizing SQL database, and engineering backend infrastructure with Spring Boot and JDBC template to implement CRUD operations for event scheduling and ticket system."
      ],
      codeLink: "https://github.com/driffe/SJSU_Event",
      technologies: ["Java", "Spring Boot", "SQL", "JDBC", "RESTful API"]
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
    },
    {
      title: "Moon Timer",
      description: [
        "A minimal timer that allows you to measure time while watching an animation of the moon "
      ],
      demoLink: "https://chromewebstore.google.com/detail/moon-phase-timer/kkiikiidimhmaenmpdpfgkhoahkccjhm", 
      codeLink: "https://github.com/driffe/Moon-Timer",
      technologies: ["Next.js", "JavaScirpt", "TailwindCSS", "Google Extension App"]
    },
    {
      title: "Reaction Time Test",
      description: [
        "A reaction time test that measures how quickly you respond to visual cues by clicking when prompted, with results displayed in milliseconds. "
      ],
      demoLink: "https://chromewebstore.google.com/detail/%EB%B0%98%EC%9D%91%EC%86%8D%EB%8F%84-%ED%85%8C%EC%8A%A4%ED%8A%B8/oefdnnlfjgoagefgnhfhffjgdbgipoin", 
      codeLink: "https://github.com/driffe/Reaction_Time_Test",
      technologies: ["JavaScript", "HTML/CSS", "Google Extension App"]
    },
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
        <div className="bg-purple-200 rounded-3xl p-8 mb-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              demoLink={project.demoLink}
              codeLink={project.codeLink}
              technologies={project.technologies}
            />
          ))}
        </div>

        {/* GitHub Link */}
        <div className="text-center mt-10">
          <p className="text-xl mb-4">Explore more of my projects on GitHub</p>
          <a 
            href="https://github.com/driffe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full font-medium"
          >
            <FaGithub size={20} />
            Visit My GitHub Profile
          </a>
        </div>

        {/* Navigation to Other Sections */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
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