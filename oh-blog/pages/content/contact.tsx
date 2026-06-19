import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  hue: number;
}

const ContactItem = ({ icon, label, href, hue }: ContactItemProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-tile button-winona contact-item-hover flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg"
      style={{ '--hue': hue } as React.CSSProperties}
      data-text={label}
      aria-label={label}
    >
      <span className="flex flex-col items-center justify-center">
        <div className="text-6xl mb-4 text-white" aria-hidden>{icon}</div>
        <span className="text-xl font-bold text-white">{label}</span>
      </span>
    </a>
  );
};

export default function Contact() {
  const contactItems = [
    { icon: <FaEnvelope />, label: 'Email', href: 'mailto:syoh2k@gmail.com', hue: 25 },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/syoh2k', hue: 240 },
    { icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/driffe', hue: 290 },
  ];

  return (
    <main className="min-h-screen back">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Contact Me</h1>
        <p className="mt-3 text-lg" style={{ color: 'var(--ink-soft)' }}>Get in touch through these platforms</p>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="contact boxes boxes-opaque p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactItems.map((item, index) => (
              <ContactItem
                key={index}
                icon={item.icon}
                label={item.label}
                href={item.href}
                hue={item.hue}
              />
            ))}
          </div>
        </div>

        {/* Quick message */}
        <div className="project boxes boxes-opaque p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Let&apos;s Connect!</h2>
          <p className="text-lg" style={{ color: 'var(--ink-soft)' }}>
            I&apos;m open to new opportunities and collaborations! Feel free to reach out to discuss projects, roles, or just to connect &mdash; I&apos;d love to hear from you.
          </p>
          <p className="text-lg mt-3 font-medium">
            🎓 Graduated Dec 2025 · Software Engineer @ KQED · Open to New Grad SWE roles (SF Bay Area / Washington D.C.)
          </p>
        </div>
      </div>
    </main>
  );
}
