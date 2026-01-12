import React from 'react';
import Link from 'next/link';
import { Kalam } from 'next/font/google';

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

export default function About() {
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
        <h1 className="text-5xl font-bold">About Me</h1>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Introduction Section */}
        <div className="about-section rounded-3xl p-8 mb-8 relative boxes boxes-opaque" style={{
          background: 'linear-gradient(135deg, #fff864 0%, #ffed4e 100%)'
        }}>
          <h2 className="text-3xl font-bold mb-6">Hello, I'm Seyoung Oh</h2>
          <div className="space-y-4">
            <p className="text-lg">
              I'm a Software Engineering student at San Jose State University
              with a passion for building innovative solutions and continuous learning.
            </p>
            <p className="text-lg">
              Graduated in December 2025, I'm focusing on developing my skills in
              full-stack development, data analysis, HW/SW solution, and Information Technology.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="about-section rounded-3xl p-8 mb-8 relative boxes boxes-opaque" style={{
          background: 'linear-gradient(135deg, rgb(191, 219, 254) 0%, rgb(147, 197, 253) 100%)'
        }}>
          <h2 className="text-3xl font-bold mb-6">Education</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Software Engineering (B.S.)</h3>
            <p className="text-lg font-medium">San Jose State University (Aug 2021 - Dec 2025)</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Relevant Coursework</h3>
            <p>
              Parallel Processing, Programming Paradigms, Software Quality Engineering, Object-Oriented Design,
              Enterprise Software, Database Management Systems, Data Structures and Algorithms,
              Operation Systems, Computer Network & Security
            </p>
          </div>
        </div>

        {/* Personal Interests */}
        <div className="about-section rounded-3xl p-8 shadow-xl relative boxes boxes-opaque" style={{
          background: 'linear-gradient(135deg, #99BC85 0%, #85a872 100%)'
        }}>
          <h2 className="text-3xl font-bold mb-6">Download Resume</h2>
          <p className="text-lg mb-4">
            There are two option for my resume.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-color p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-4">Resume Focused on SW</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/SeyoungOh_Resume.pdf"
                  download
                  className="button-winona button-winona-download inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-center"
                  data-text="Download Resume"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Resume
                  </span>
                </a>
                <a
                  href="/SeyoungOh_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-winona button-winona-view inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-center"
                  data-text="View Resume"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Resume
                  </span>
                </a>
              </div>
            </div>

            <div className="bg-color p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-4">Resume Focused on Experiences</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/SeyoungOh(A)_Resume.pdf"
                  download
                  className="button-winona button-winona-download inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-center"
                  data-text="Download Resume"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Resume
                  </span>
                </a>
                <a
                  href="/SeyoungOh(A)_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-winona button-winona-view inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-center"
                  data-text="View Resume"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Resume
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation to Other Sections */}
        <div className="navigation-section mt-12 flex flex-wrap justify-center gap-4">
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