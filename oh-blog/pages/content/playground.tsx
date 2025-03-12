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
    <div className="back rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

interface AwardCardProps {
  title: string;
  year: string;
  description: string;
}

const AwardCard = ({ title, year, description }: AwardCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4">
      <div className="text-3xl text-yellow-500 mt-1">
        <FaTrophy />
      </div>
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-gray-600 text-sm">{year}</span>
        </div>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default function Playground() {
  const hobbies = [
    {
      icon: <FaBasketballBall className="text-orange-500" />,
      title: "Basketball",
      description: "I enjoy playing basketball in my free time. It's a great way to stay active and work as part of a team."
    },
    {
      icon: <FaBowlingBall className="text-blue-600" />,
      title: "Bowling",
      description: "Bowling is one of my favorite weekend activities. I enjoy the precision and focus it requires."
    },
    {
      icon: <FaSwimmer className="text-blue-400" />,
      title: "Swimming",
      description: "Swimming helps me stay fit and clear my mind. I try to swim regularly to maintain physical health."
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
      title: "Basketball Tournament Champion",
      year: "2023",
      description: "First place in the local community basketball tournament."
    },
    {
      title: "Bowling Championship",
      year: "2024",
      description: "Won the regional bowling championship with an average score of 220."
    },
    {
      title: "Swimming Competition",
      year: "2022",
      description: "Received a medal in the 100m freestyle swimming competition at university level."
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
        <div className="bg-pink-200 rounded-3xl p-8 mb-8 shadow-xl">
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
        </div>

        {/* Awards Section */}
        <div className="bg-yellow-200 rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Awards & Achievements</h2>
          <div className="space-y-4">
            {awards.map((award, index) => (
              <AwardCard
                key={index}
                title={award.title}
                year={award.year}
                description={award.description}
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