'use client';

import { Kalam } from 'next/font/google'

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

export default function Home() {
  return (
    <main className={`${kalam.className} back`}>
      <div className="main">
        {/* Title */}
        <h1 className="text-area text-7xl">Oh! Blog</h1>

        {/* Main Content Grid */}
        <div className="menu-container">
          {/* Profile */}
          <div className="about-me boxes flex shadow-xl">
            <a href='./content/about' className='h-full w-full'>
              <div className='flex flex-col justify-between h-full'>
                <h2 className="box-text">About Me</h2>
                <p>I'm Seyoung Oh from South Korea, majoring in Software Engineering.</p>
              </div>
            </a>
          </div>

          {/* Skills */}
          <div className="skill boxes shadow-xl">
            <a href='./content/skills' className='h-full w-full'>
              <div className='flex flex-col justify-between h-full'>
                  <h2 className="box-text">Skills</h2>
                  <p>Technical Skills.</p>
              </div>            
            </a>
          </div>

          {/* Experiences */}
          <div className="experience boxes shadow-xl">
            <a href='./content/experiences' className='h-full w-full'>
              <div className='flex flex-col justify-between h-full'>
                <h2 className="box-text">Experiences</h2>
                <p>Oh my experiences.</p>
              </div>
            </a>
          </div>

          {/* Projects */}
          <div className="project boxes shadow-xl">
            <a href='./content/projects' className='h-full w-full'>
              <div className='flex flex-col justify-between h-full'>
                <h2 className="box-text">Projects</h2>
                <p>Feel free to enter and review my projects.</p>
              </div>
            </a>
          </div>

          {/* playground */}
          <div className="playground boxes shadow-xl">
            <a href='./content/playground' className='h-full w-full'>
              <div className='flex flex-col justify-between h-full'>
                <h2 className="box-text">Playground</h2>
                <p>Explore my areas of interest.</p>
              </div>
            </a>
          </div>

          {/* Contacts */}
          <div className="contact boxes shadow-xl">
            <a href='./content/contact' className='h-full w-full'>
              <h2 className="box-text">Contact Me</h2>
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
