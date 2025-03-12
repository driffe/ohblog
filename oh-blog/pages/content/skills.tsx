import React from 'react';
import Link from 'next/link';
import { Kalam } from 'next/font/google';
import { FaJava, FaPython, FaHtml5, FaJs, FaPhp, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiCplusplus, SiC, SiFirebase, SiMysql, SiReact, SiNextdotjs, SiTailwindcss } from 'react-icons/si';

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

interface SkillIconProps {
    icon: React.ReactNode;
    name: string;
}

const SkillIcon = ({ icon, name }: SkillIconProps) => {
    return (
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center hover:shadow-lg">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="font-semibold">{name}</h3>
        </div>
    );
};

export default function Skills() {
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
        <h1 className="text-5xl font-bold">Skills</h1>
        <p className="mt-4 text-xl">Technologies and tools I work with</p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Programming Languages */}
        <div className="bg-green-200 rounded-3xl p-8 mb-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Programming Languages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <SkillIcon icon={<FaJava />} name="Java" />
            <SkillIcon icon={<SiCplusplus />} name="C++" />
            <SkillIcon icon={<SiC />} name="C" />
            <SkillIcon icon={<FaPython />} name="Python" />
            <SkillIcon icon={<FaJs />} name="JavaScript" />
            <SkillIcon icon={<SiTypescript />} name="TypeScript" />
            <SkillIcon icon={<FaDatabase />} name="SQL" />
            <SkillIcon icon={<FaHtml5 />} name="HTML" />
            <SkillIcon icon={<FaPhp />} name="PHP" />
          </div>
        </div>

        {/* Technologies & Frameworks */}
        <div className="bg-blue-200 rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Technologies & Frameworks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <SkillIcon icon={<SiReact />} name="React" />
            <SkillIcon icon={<SiNextdotjs />} name="Next.js" />
            <SkillIcon icon={<SiFirebase />} name="Firebase" />
            <SkillIcon icon={<SiMysql />} name="MySQL" />
            <SkillIcon icon={<SiTailwindcss />} name="TailwindCSS" />
          </div>
        </div>

        {/* Navigation to Other Sections */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/content/about">
                <button className="btn-about px-6 py-3 rounded-full font-bold shadow-md">
                    About Me
                </button>
            </Link>  
          <Link href="/content/experiences">
            <button className="btn-experience px-6 py-3 rounded-full font-bold shadow-md">
              Experiences
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