import React from 'react';
import Link from 'next/link';
import { Kalam } from 'next/font/google';

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

interface ExperienceProps {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

const ExperienceCard = ({ title, company, location, period, responsibilities }: ExperienceProps) => {
  return (
    <div className="experience-card bg-color rounded-xl shadow-lg p-4 sm:p-6 mb-8 relative transition-all duration-300">
      <div className="flex flex-col mb-2">
        <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <p className="font-medium">{company}</p>
          <span className="text-gray-600 text-sm">{period}</span>
        </div>
        <p className="text-gray-600 italic text-sm mb-3">{location}</p>
      </div>
      <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base">
        {responsibilities.map((responsibility, index) => (
          <li key={index} className="text-gray-700 pb-1 break-words">{responsibility}</li>
        ))}
      </ul>
    </div>
  );
};

export default function Experiences() {
  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "KQED",
      location: "San Francisco, CA",
      period: "Jul 2025 - Present",
      responsibilities: [
        "Achieved 27% API reduction by auditing 100+ endpoints across microservices using Postman, deprecating unused APIs based on frontend usage analysis, simplifying API documentation, and reducing maintenance overhead.",
        "Optimized file upload bottleneck by migrating to reactive architecture (Spring WebFlux), which eliminated blocking errors under concurrent load and achieved 25x throughput increase (2 → 50+ req/sec).",
        "Identified IntelliJ build configuration issue, authored solution documents for the stakeholders, enabling engineers to use IntelliJ and reducing build times by 55%."
      ]
    },
    {
      title: "Application Engineer",
      company: "JKI INC",
      location: "Campbell, CA",
      period: "Sep 2024 - Jan 2025",
      responsibilities: [
        "Built an automated hardware validation framework in C++ that tested device operations (reset, power cycling, EPR) across voltage ranges, enabling engineers to identify reliable operating parameters with single-input execution.",
        "Identified an additional 17% VCC power margin through systematic performance validation, enabling broader operational stability and extending device lifespan under varying power conditions."
      ]
    },
    {
      title: "Programming Tutor",
      company: "Kim Study",
      location: "Hybrid",
      period: "Apr 2024 - Jul 2024",
      responsibilities: [
        "Mentored students in programming including block coding, Python, and Java through personalized instruction.",
        "Guided one student to successful acceptance into the Gifted and Talented Education Program through comprehensive curriculum focusing on both creative and practical Micro:bit projects."
      ]
    },
    {
      title: "IT Specialist (Sergeant)",
      company: "Republic of Korea Army",
      location: "Goseong, Gangwon, South Korea",
      period: "Oct 2022 - Apr 2024",
      responsibilities: [
        "Maintained 98% uptime for critical military databases and server infrastructure supporting 1200+ personnel by conducting daily health checks via PuTTY/Unix.",
        "Resolved 1,800+ hardware, software, and network incidents (averaging 5+ daily), ensuring operational continuity.",
        "Participated in the Freedom Shield exercise, a joint operation conducted by the United States and South Korea, and managed IT operations in a high-pressure environment, earning the III Corps Commanding General's Commendation."
      ]
    },
    {
      title: "Data Engineer Intern",
      company: "JKI INC",
      location: "Yongin-si, South Korea",
      period: "Jul 2022 - Sep 2022",
      responsibilities: [
        "Built an interactive temperature monitoring dashboard using Plotly Python and Figma to visualize and analyze post-testing log data, enabling thermal anomaly detection and improving debugging efficiency by 85%.",
        "Developed an automated data pipeline with NumPy and Pandas, cleaning and processing 10K+ burn-in test logs for the hardware team's thermal analysis workflow."
      ]
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
        <h1 className="text-5xl font-bold">Experiences</h1>
        <p className="mt-4 text-xl">My professional journey</p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Work Experience */}
        <div className="rounded-3xl p-8 mb-8 relative boxes boxes-opaque" style={{
          background: 'linear-gradient(135deg, #F69E7B 0%, #f28960 100%)'
        }}>
          <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              title={experience.title}
              company={experience.company}
              location={experience.location}
              period={experience.period}
              responsibilities={experience.responsibilities}
            />
          ))}
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
          <Link href="/content/projects">
            <button className="btn-project px-6 py-3 rounded-full font-bold shadow-md">
              Projects
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