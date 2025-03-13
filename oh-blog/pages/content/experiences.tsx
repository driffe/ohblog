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
      title: "Field Application Engineer",
      company: "JKI INC",
      location: "Campbell, CA",
      period: "Sep 2024 - Jan 2025",
      responsibilities: [
        "Implemented a Shmoo testing framework of Erase Operation in C++ to verify performance against vendor datasheet.",
        "Utilized the Program and Read operations for precise performance verification, identifying 17% more VCC power operational margin than documented in the vendor's datasheet specifications.",
        "Reconstructed memory operation timing to align with the vendor-specific NAND flash specification.",
        "Implemented missing timing operations and optimized existing ones by reducing them up to 50% based on the vendor's datasheet, achieving 80% alignment with the timing and operation patterns specified in the vendor's datasheet."
      ]
    },
    {
      title: "Private Programming Tutor",
      company: "Self-Employed",
      location: "Yongin-si, South Korea",
      period: "Apr 2024 - July 2024",
      responsibilities: [
        "Mentored students to get basic coding skills (Micro:bit coding, Python, and Java) and logical thinking abilities, resulting in one of the students gaining acceptance into the Gifted and Talented Education Program."
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
      title: "Software Engineer Intern",
      company: "JKI INC",
      location: "Yongin-si, South Korea",
      period: "Jul 2022 - Sep 2022",
      responsibilities: [
        "Implemented temperature analysis and visualization program to analyze temperature in Burn-in boards.",
        "Engineered automated data processing pipeline and frame using Python (NumPy, Pandas) to scrape, clean, and analyze log data across multiple Burn-in boards and implemented an interactive visualization system with Plotly, successfully handling and analyzing over 10,000 log entries."
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