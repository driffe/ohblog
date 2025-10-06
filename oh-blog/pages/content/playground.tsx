import React from 'react';
import Link from 'next/link';
import { Kalam } from 'next/font/google';
import { FaBasketballBall, FaSwimmer, FaBowlingBall, FaCamera, FaKeyboard, FaTrophy } from 'react-icons/fa';

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

interface HobbyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HobbyCard = ({ icon, title, description }: HobbyCardProps) => {
  return (
    <div className="hobby-card bg-color rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

interface AwardCardProps {
  title: string;
  year: string;
}

const AwardCard = ({ title, year }: AwardCardProps) => {
  return (
    <div className="award-card bg-color rounded-xl shadow-lg p-6 flex items-start gap-4 transition-all duration-300">
      <div className="text-3xl text-yellow-500 mt-1">
        <FaTrophy />
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
          <h3 className="text-xl font-bold mb-1 sm:mb-0">{title}</h3>
          <span className="text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded-full">{year}</span>
        </div>
      </div>
    </div>
  );
};

export default function Playground() {
  const hobbies = [
    {
      icon: <FaBowlingBall className="text-blue-600" />,
      title: "Bowling",
      description: "Bowling is one of my favorite weekend activities. I enjoy the precision and focus it requires."
    },
    {
      icon: <FaKeyboard className="text-gray-700" />,
      title: "Custom Keyboards",
      description: "I build custom mechanical keyboards, experimenting with different switches, keycaps, and layouts to create the perfect typing experience."
    },
    {
      icon: <FaCamera className="text-gray-800" />,
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
    <main className={`${kalam.className} min-h-screen p-6 back`}>
      {/* Navigation back to home */}
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <span>← Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-bold">Playground</h1>
        <p className="mt-4 text-xl">Explore my interests and activities outside of tech</p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Hobbies Section */}
        <div className="bg-red-200 rounded-3xl p-8 mb-8 shadow-xl relative boxes boxes-opaque">
          <h2 className="text-3xl font-bold mb-6">Hobbies & Interests</h2>
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
              href="https://www.instagram.com/dancing_bottle/"
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
        <div className="bg-yellow-200 rounded-3xl p-8 shadow-xl relative boxes boxes-opaque">
          <h2 className="text-3xl font-bold mb-6">Awards & Achievements</h2>
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