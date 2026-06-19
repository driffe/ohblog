import React from 'react';
import { FaJava, FaPython, FaHtml5, FaJs, FaDatabase, FaGithub, FaAws, FaGoogle, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiCplusplus, SiC, SiFirebase, SiMysql, SiReact, SiNextdotjs, SiTailwindcss, SiPandas, SiNumpy, SiFastapi, SiPlotly, SiMongodb, SiRedis, SiSelenium, SiVercel, SiNetlify, SiDart, SiFlutter, SiPostman, SiJira, SiConfluence, SiFigma, SiGoogleanalytics, SiGithubactions, SiCloudflare, SiFlask, SiGodotengine, SiNginx } from 'react-icons/si';
import { BiLogoSpringBoot } from "react-icons/bi";

interface SkillIconProps {
    icon: React.ReactNode;
    name: string;
}

const SkillIcon = ({ icon, name }: SkillIconProps) => {
    return (
        <div className="skill-icon bg-color rounded-xl p-6 flex flex-col items-center justify-center text-center" style={{ boxShadow: 'var(--shadow-neutral)' }}>
        <div className="skill-glyph text-4xl mb-3" aria-hidden>{icon}</div>
        <h3 className="font-semibold text-sm sm:text-base">{name}</h3>
        </div>
    );
};

export default function Skills() {
  return (
    <main className="min-h-screen back">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Skills</h1>
        <p className="mt-3 text-lg" style={{ color: 'var(--ink-soft)' }}>Technologies and tools I work with</p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Programming Languages */}
        <div className="skill boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Programming Languages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <SkillIcon icon={<FaJava />} name="Java" />
            <SkillIcon icon={<SiCplusplus />} name="C++" />
            <SkillIcon icon={<SiC />} name="C" />
            <SkillIcon icon={<FaPython />} name="Python" />
            <SkillIcon icon={<FaJs />} name="JavaScript" />
            <SkillIcon icon={<SiTypescript />} name="TypeScript" />
            <SkillIcon icon={<FaDatabase />} name="SQL" />
            <SkillIcon icon={<SiDart />} name="Dart" />
            <SkillIcon icon={<FaHtml5 />} name="HTML/CSS" />
            <SkillIcon icon={<SiTailwindcss />} name="TailwindCSS" />
          </div>
        </div>

        {/*Frameworks */}
        <div className="contact boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Frameworks &amp; Libraries</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <SkillIcon icon={<BiLogoSpringBoot />} name="Spring Boot" />
            <SkillIcon icon={<BiLogoSpringBoot />} name="Spring WebFlux" />
            <SkillIcon icon={<SiFastapi />} name="FastAPI" />
            <SkillIcon icon={<SiFlask />} name="Flask" />
            <SkillIcon icon={<SiNextdotjs />} name="Next.js" />
            <SkillIcon icon={<SiReact />} name="ReactJS" />
            <SkillIcon icon={<SiFlutter />} name="Flutter" />
            <SkillIcon icon={<SiGodotengine />} name="Godot" />
            <SkillIcon icon={<SiPlotly />} name="Plotly" />
            <SkillIcon icon={<SiPandas />} name="Pandas" />
            <SkillIcon icon={<SiNumpy />} name="NumPy" />
          </div>
        </div>

        {/*Databases */}
        <div className="experience boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Databases</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <SkillIcon icon={<SiMysql />} name="MySQL" />
            <SkillIcon icon={<SiMongodb />} name="MongoDB" />
            <SkillIcon icon={<SiRedis />} name="Redis" />
            <SkillIcon icon={<SiFirebase />} name="Firebase" />
          </div>
        </div>

        {/* Tools */}
        <div className="project boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <SkillIcon icon={<FaGithub />} name="Git" />
            <SkillIcon icon={<SiPostman />} name="Postman" />
            <SkillIcon icon={<SiJira />} name="Jira" />
            <SkillIcon icon={<SiConfluence />} name="Confluence" />
            <SkillIcon icon={<SiFigma />} name="Figma" />
            <SkillIcon icon={<SiGoogleanalytics />} name="GA4" />
            <SkillIcon icon={<SiSelenium />} name="Selenium" />
          </div>
        </div>

        {/* Deployments */}
        <div className="about-me boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Cloud &amp; DevOps</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <SkillIcon icon={<FaDocker />} name="Docker" />
            <SkillIcon icon={<SiGithubactions />} name="GitHub Actions" />
            <SkillIcon icon={<SiNginx />} name="Nginx" />
            <SkillIcon icon={<FaGoogle />} name="GCP" />
            <SkillIcon icon={<FaAws />} name="AWS" />
            <SkillIcon icon={<SiCloudflare />} name="Cloudflare" />
            <SkillIcon icon={<SiVercel />} name="Vercel" />
            <SkillIcon icon={<SiNetlify />} name="Netlify" />
          </div>
        </div>

      </div>
    </main>
  );
}