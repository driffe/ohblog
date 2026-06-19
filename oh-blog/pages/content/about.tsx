import React from 'react';
import { FaDownload, FaEye } from 'react-icons/fa';

interface ResumeOption {
  label: string;
  file: string;
}

const ResumeCard = ({ label, file }: ResumeOption) => (
  <div className="bg-color p-6 rounded-2xl" style={{ boxShadow: 'var(--shadow-neutral)' }}>
    <h3 className="font-semibold text-xl mb-4">{label}</h3>
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={file}
        download
        className="button-winona button-winona-download inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-center"
        data-text="Download"
      >
        <span className="inline-flex items-center gap-2"><FaDownload /> Download</span>
      </a>
      <a
        href={file}
        target="_blank"
        rel="noopener noreferrer"
        className="button-winona button-winona-view inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-center"
        data-text="View"
      >
        <span className="inline-flex items-center gap-2"><FaEye /> View</span>
      </a>
    </div>
  </div>
);

export default function About() {
  return (
    <main className="min-h-screen back">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">About Me</h1>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Introduction Section */}
        <div className="about-me boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Hello, I&apos;m Seyoung Oh 👋</h2>
          <div className="space-y-4" style={{ color: 'var(--ink-soft)' }}>
            <p className="text-lg">
              I&apos;m a Software Engineer at KQED (San Francisco public media), shipping production
              code that serves nearly 1M monthly users across web, mobile, and streaming.
            </p>
            <p className="text-lg">
              I graduated from San Jose State University in December 2025 (B.S. Software Engineering).
              I build and operate backend services and frontend features across a microservices
              architecture, and I&apos;m actively open to full-time New Grad SWE roles &mdash; especially
              at teams building production AI systems and backend infrastructure.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="contact boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Education</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Software Engineering (B.S.)</h3>
            <p className="text-lg font-medium" style={{ color: 'var(--ink-soft)' }}>
              San Jose State University · Aug 2021 – Dec 2025
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Relevant Coursework</h3>
            <p style={{ color: 'var(--ink-soft)' }}>
              Parallel Processing, Programming Paradigms, Software Quality Engineering, Object-Oriented
              Design, Enterprise Software, Database Management Systems, Data Structures &amp; Algorithms,
              Operating Systems, Computer Networks &amp; Security
            </p>
          </div>
        </div>

        {/* Resume */}
        <div className="skill boxes boxes-opaque p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Download Resume</h2>
          <p className="text-lg mb-4" style={{ color: 'var(--ink-soft)' }}>
            Two versions, depending on what you&apos;re looking for.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <ResumeCard label="Software Engineering" file="/Seyoung_Oh_Resume.pdf" />
            <ResumeCard label="IT" file="/Seyoung_Oh_Resume_TSE.pdf" />
          </div>
        </div>
      </div>
    </main>
  );
}
