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
    <div className="bg-color rounded-xl shadow-lg p-4 sm:p-6 mb-8">
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
      period: "Jul 2024 - Present",
      responsibilities: [
        "Reduced API surface area by 27% through systematic audits and deprecation of unused endpoints in Spring Boot(Webflux) and MongoDB/firebase within a microservices architecture (MSA) environment on Docker/GCP.",
        "Improved developer build times by 55% through resolving IntelliJ configuration issues, enabling local development and documenting solutions for team productivity."
      ]
    },
    {
      title: "Application Engineer",
      company: "JKI INC",
      location: "Campbell, CA",
      period: "Sep 2024 - Jan 2025",
      responsibilities: [
        "Designed and implemented a Shmoo testing framework in C++ for NAND flash memory validation, automating voltage and timing parameter analysis against vendor specifications.",
        "Discovered an additional 17% VCC power margin through systematic performance validation, enabling broader operational stability and extending device lifespan under varying power conditions."
      ]
    },
    {
      title: "Programming Tutor",
      company: "Kim Study",
      location: "Seoul, South Korea",
      period: "Apr 2024 - July 2024",
      responsibilities: [
        "Mentored students in programming, including block coding, Python, and Java, through personalized instruction.",
        "Guided one student to successful acceptance into the Gifted and Talented Education Program through a comprehensive curriculum focusing on both creative and practical Micro:bit projects"
      ]
    },
    {
      title: "IT Specialist (Sergeant)",
      company: "Republic Of Korea Army",
      location: "Goseong-gun, South Korea",
      period: "Oct 2022 - Apr 2024",
      responsibilities: [
        "Diagnosed hardware, software, and network issues affecting military systems at the Class III Security Office, troubleshooting and resolving at least 5 issues per day.",
        "Conducted daily database inspections using PuTTY and Unix to ensure data integrity and server stability by monitoring performance and implementing optimizations, successfully maintaining 98% data stability and connectivity.",
        "Executed security audits on over 100 IT devices every quarter to evaluate both software and hardware aspects to identify potential vulnerabilities and provide solutions, successfully maintaining a security stability rate above 90%.",
        "Participated in the Freedom Shield exercise, a joint operation conducted by the United States and South Korea, and managed IT operations in a high-pressure environment, earning the III Corps Commanding General's Commendation."
      ]
    },
    {
      title: "Data Engineer Intern",
      company: "JKI INC",
      location: "Yongin-si, South Korea",
      period: "Jul 2022 - Sep 2022",
      responsibilities: [
        "Built an interactive temperature monitoring dashboard using Plotly Python to analyze post-testing log data, enabling efficient identification of thermal anomalies and reducing debugging time by 80%.",
        "Developed and automated a robust data pipeline with NumPy and Pandas, cleaning and analyzing 10K+ log entries."
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
        <div className="bg-orange-200 rounded-3xl p-8 mb-8 shadow-xl">
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

        {/* Awards and Recognition */}
        <div className="bg-blue-200 rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Awards & Recognition</h2>
          <ul className="space-y-4 list-disc ml-6">
            <li className="pl-2">
              <span className="font-semibold">Certificate Of Achievement</span> – SpartUp Hackathon 2025 
            </li>
            <li className="pl-2">
              <span className="font-semibold">Placed Top 10</span> – SpartUp × SBDC Pitch Jam 2025 
            </li>
            <li className="pl-2">
              <span className="font-semibold">Best Use of Perplexity / Sonar</span> – HackHayward Hackathon 2025 
            </li>
            <li className="pl-2">
              <span className="font-semibold">III Corps Commanding General's Commendation</span> – ROK-U.S. Joint Military Exercise Freedom Shield 2024
            </li>
          </ul>
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