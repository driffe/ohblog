import React from 'react';
import Link from 'next/link';
import { Kalam } from 'next/font/google';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}

const ContactItem = ({ icon, label, href, color }: ContactItemProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} button-winona contact-item-hover flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg transition-all duration-300`}
      data-text={label}
    >
      <span className="flex flex-col items-center justify-center">
        <div className="text-6xl mb-4 text-white">{icon}</div>
        <span className="text-xl font-bold text-white">{label}</span>
      </span>
    </a>
  );
};

export default function Contact() {
  const contactItems = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      href: 'mailto:syoh2k@gmail.com', 
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/syoh2k', 
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      href: 'https://github.com/driffe',
      color: 'bg-gray-800 hover:bg-gray-900'
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
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold">Contact Me</h1>
        <p className="mt-4 text-xl">Get in touch with me through these platforms</p>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-200 rounded-3xl p-8 mb-8 shadow-xl relative boxes boxes-opaque">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactItems.map((item, index) => (
              <ContactItem
                key={index}
                icon={item.icon}
                label={item.label}
                href={item.href}
                color={item.color}
              />
            ))}
          </div>
        </div>

        {/* Quick message */}
        <div className="bg-blue-200 rounded-3xl p-8 shadow-xl text-center relative boxes boxes-opaque">
          <h2 className="text-3xl font-bold mb-4">Let's Connect!</h2>
          <p className="text-lg">
            I'm open to new opportunities and collaborations! Feel free to reach out to discuss potential projects, job opportunities, or simply to connect. I'd love to hear from you!
          </p>
          <p className="text-lg">
            🎓 Graduating December 2025 | Seeking Full-time Opportunities Starting 2026
          </p>
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
        </div>
      </div>
    </main>
  );
}