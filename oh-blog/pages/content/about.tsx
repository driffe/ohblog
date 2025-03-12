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
        <div className="bg-yellow-200 rounded-3xl p-8 mb-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Hello, I'm Seyoung Oh</h2>
          <div className="space-y-4">
            <p className="text-lg">
              I'm a Software Engineering student at San Jose State University from South Korea, 
              with a passion for building innovative solutions and continuous learning.
            </p>
            <p className="text-lg">
              Expected to graduate in December 2025, I'm focusing on developing my skills in 
              full-stack development, data analysis, and system architecture.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="bg-blue-200 rounded-3xl p-8 mb-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Education</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Software Engineering (B.S.)</h3>
            <p className="text-lg font-medium">San Jose State University</p>
            <p>Expected Dec 2025</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Relevant Coursework</h3>
            <p>
              Parallel Processing, Programming Languages, Object-Oriented Design, 
              Enterprise Software, Database Management Systems, Data Structure and Algorithm, 
              Operation Systems, Computer Network & Security
            </p>
          </div>
        </div>

        {/* Personal Interests */}
        <div className="bg-green-200 rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Personal Interests</h2>
          <p className="text-lg mb-4">
            Beyond coding, I enjoy exploring new technologies, contributing to open-source projects, 
            and staying updated with the latest industry trends.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Technical Interests</h3>
              <ul className="list-disc ml-5">
                <li>Web Application Development</li>
                <li>Data Visualization</li>
                <li>AI & Machine Learning</li>
                <li>System Architecture</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Hobbies</h3>
              <ul className="list-disc ml-5">
                <li>Reading tech blogs</li>
                <li>Contributing to open source</li>
                <li>Participating in hackathons</li>
                <li>Exploring new programming languages</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation to Other Sections */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
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