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
        <h1 className="text-area text-7xl mt-10">Oh! Blog</h1>

        {/* Main Content Grid */}
        <div className="menu-container">
          {/* Profile */}
          <div className="about-me boxes flex shadow-xl">
            <div className='flex flex-col justify-between h-full'>
              <h2 className="box-text">About Me</h2>
              <p>I'm Seyoung Oh from South Korea, majoring in Software Engineering.</p>
            </div>
            {/* Profile content goes here */}
          </div>

          {/* Skills */}
          <div className="skill boxes shadow-xl">
            <div className='flex flex-col justify-between h-full'>
                <h2 className="box-text">Skills</h2>
                <p></p>
            </div>            
            {/* Skills content goes here */}
          </div>

          {/* Experiences */}
          <div className="experience boxes shadow-xl">
            <div className='flex flex-col justify-between h-full'>
              <h2 className="box-text">Experiences</h2>
              <p>Oh my experiences.</p>
            </div>
            {/* Experiences content goes here */}
          </div>

          {/* Projects */}
          <div className="project boxes shadow-xl">
            <div className='flex flex-col justify-between h-full'>
              <h2 className="box-text">Projects</h2>
              <p>Feel free to enter and review my projects.</p>
            </div>
            {/* Projects content goes here */}
          </div>

          {/* playground */}
          <div className="playground boxes shadow-xl">
            <div className='flex flex-col justify-between h-full'>
              <h2 className="box-text">Playground</h2>
              <p>Explore my areas of interest.</p>
            </div>
            {/* Projects content goes here */}
          </div>

          {/* Contacts */}
          <div className="contact boxes shadow-xl">
            <h2 className="box-text">Contact Me</h2>
            {/* Contacts content goes here */}
          </div>

        </div>
      </div>
    </main>
  );
}
