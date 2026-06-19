'use client';

import Link from 'next/link';
import { FaGithub, FaEnvelope, FaFileAlt, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="back">
      {/* Hero */}
      <section className="hero">
        <p className="hero-eyebrow text-base sm:text-lg mb-3">Hi, I&apos;m</p>
        <h1 className="hero-name text-5xl sm:text-7xl mb-4">Seyoung Oh</h1>
        <p className="text-2xl sm:text-4xl mb-6">
          <span className="hero-role">Software Engineer @ KQED</span>
        </p>
        <p className="text-lg sm:text-xl max-w-2xl mb-8" style={{ color: 'var(--ink-soft)' }}>
          I build and operate backend services and frontend features that ship production
          code to nearly 1M monthly users. SJSU &rsquo;25 New Grad, 3&times; hackathon winner.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/Seyoung_Oh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="button-winona button-winona-download inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold"
            data-text="View Resume"
            aria-label="View resume (PDF)"
          >
            <span className="inline-flex items-center gap-2"><FaFileAlt aria-hidden /> View Resume</span>
          </a>
          <a
            href="https://github.com/driffe"
            target="_blank"
            rel="noopener noreferrer"
            className="button-winona button-winona-github inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold"
            data-text="GitHub"
            aria-label="GitHub profile"
          >
            <span className="inline-flex items-center gap-2"><FaGithub aria-hidden /> GitHub</span>
          </a>
          <a
            href="mailto:syoh2k@gmail.com"
            className="button-winona button-winona-view inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold"
            data-text="Email Me"
            aria-label="Email me"
          >
            <span className="inline-flex items-center gap-2"><FaEnvelope aria-hidden /> Email Me</span>
          </a>
        </div>
      </section>

      <div className="main">
        <div className="text-area">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--ink)' }}>
            Explore
          </h2>
          <p className="text-base sm:text-lg" style={{ color: 'var(--ink-soft)' }}>
            Wander around &mdash; every box is a door.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="menu-container">
          {/* Projects — hero */}
          <Link href="/content/projects" className="project boxes">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="box-text">Projects</h2>
                <p className="text-base sm:text-lg" style={{ color: 'var(--ink-soft)' }}>
                  Shipped products, hackathon wins, and side builds &mdash; from a live AI coffee
                  platform to Chrome extensions.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="tag">10+ projects</span>
                  <span className="tag">3&times; hackathon wins</span>
                  <span className="tag">RAG / AWS Bedrock</span>
                </div>
              </div>
              <span className="card-cta">Explore projects <FaArrowRight size={12} aria-hidden /></span>
            </div>
          </Link>

          {/* Experiences — tall */}
          <Link href="/content/experiences" className="experience boxes">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="box-text">Experiences</h2>
                <p style={{ color: 'var(--ink-soft)' }}>
                  KQED, CoffeeByMe, IBM, and the road there.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="tag">KQED · ~1M users</span>
                  <span className="tag">Promoted to FT</span>
                </div>
              </div>
              <span className="card-cta">See experience <FaArrowRight size={12} aria-hidden /></span>
            </div>
          </Link>

          {/* About */}
          <Link href="/content/about" className="about-me boxes">
            <div className="flex flex-col justify-between h-full">
              <h2 className="box-text">About Me</h2>
              <span className="card-cta">Enter <FaArrowRight size={12} aria-hidden /></span>
            </div>
          </Link>

          {/* Skills */}
          <Link href="/content/skills" className="skill boxes">
            <div className="flex flex-col justify-between h-full">
              <h2 className="box-text">Skills</h2>
              <span className="card-cta">Enter <FaArrowRight size={12} aria-hidden /></span>
            </div>
          </Link>

          {/* Playground */}
          <Link href="/content/playground" className="playground boxes">
            <div className="flex flex-col justify-between h-full">
              <h2 className="box-text">Playground</h2>
              <span className="card-cta">Enter <FaArrowRight size={12} aria-hidden /></span>
            </div>
          </Link>

          {/* Contact — wide CTA banner */}
          <Link href="/content/contact" className="contact boxes">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-full gap-2">
              <div>
                <h2 className="box-text mb-1">Let&apos;s connect</h2>
                <p style={{ color: 'var(--ink-soft)' }}>
                  Open to New Grad SWE roles &mdash; SF Bay Area &amp; Washington D.C.
                </p>
              </div>
              <span className="card-cta">Contact me <FaArrowRight size={12} aria-hidden /></span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
