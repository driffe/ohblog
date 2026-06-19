import React from 'react';
import { FaBowlingBall, FaCamera, FaKeyboard, FaTrophy } from 'react-icons/fa';

interface HobbyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HobbyCard = ({ icon, title, description }: HobbyCardProps) => {
  return (
    <div className="hobby-card bg-color rounded-xl p-6 flex flex-col items-center text-center">
      <div className="text-5xl mb-4" aria-hidden>{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p style={{ color: 'var(--ink-soft)' }}>{description}</p>
    </div>
  );
};

interface AwardCardProps {
  title: string;
  year: string;
}

const AwardCard = ({ title, year }: AwardCardProps) => {
  return (
    <div className="award-card bg-color rounded-xl p-6 flex items-start gap-4">
      <div className="text-3xl mt-1" style={{ color: 'oklch(0.62 0.17 85)' }} aria-hidden>
        <FaTrophy />
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
          <h3 className="text-xl font-bold mb-1 sm:mb-0">{title}</h3>
          <span className="text-sm px-3 py-1 rounded-full" style={{ color: 'oklch(0.42 0.12 85)', background: 'oklch(0.95 0.045 85)' }}>{year}</span>
        </div>
      </div>
    </div>
  );
};

export default function Playground() {
  const hobbies = [
    {
      icon: <FaBowlingBall style={{ color: 'oklch(0.55 0.16 240)' }} />,
      title: "Bowling",
      description: "Bowling is one of my favorite weekend activities. I enjoy the precision and focus it requires."
    },
    {
      icon: <FaKeyboard style={{ color: 'oklch(0.55 0.16 295)' }} />,
      title: "Custom Keyboards",
      description: "I build custom mechanical keyboards, experimenting with different switches, keycaps, and layouts to create the perfect typing experience."
    },
    {
      icon: <FaCamera style={{ color: 'oklch(0.55 0.16 25)' }} />,
      title: "Photography",
      description: "I love capturing moments through photography, especially landscapes and street photography."
    }
  ];

  const awards = [
    {
      title: "Top 5 on Morgan Hill Bowling Tournament ",
      year: "2024",
    },
    {
      title: "Top 3 in the University-Hosted High School Basketball League",
      year: "2017",

    },
    {
      title: "Top 3 on West County Middle School Basketball League in Seoul",
      year: "2015",
    }
  ];

  return (
    <main className="min-h-screen back">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Playground</h1>
        <p className="mt-3 text-lg" style={{ color: 'var(--ink-soft)' }}>Life outside the terminal</p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Hobbies Section */}
        <div className="playground boxes boxes-opaque p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Hobbies &amp; Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hobbies.map((hobby, index) => (
              <HobbyCard
                key={index}
                icon={hobby.icon}
                title={hobby.title}
                description={hobby.description}
              />
            ))}
          </div>
          {/* Portfolio Button */}
          <div className="flex justify-center mt-8">
            <a
              href="https://www.instagram.com/oh.blog_sf/"
              target="_blank"
              rel="noopener noreferrer"
              className="button-winona button-winona-portfolio inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold"
              data-text="View My Works"
            >
              <span className="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View My Works
              </span>
            </a>
          </div>
        </div>


        {/* Awards Section */}
        <div className="about-me boxes boxes-opaque p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Awards &amp; Achievements</h2>
          <div className="space-y-4">
            {awards.map((award, index) => (
              <AwardCard
                key={index}
                title={award.title}
                year={award.year}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}