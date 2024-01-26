

export default function Home() {
  return (
    <div className="main">
      {/* Title */}
      <h1 className="text-area">Oh! Blog</h1>

      {/* Main Content Grid */}
      <div className="menu-container">
        {/* Profile */}
        <div className="about-me border">
          <h2 className="text-3xl font-bold text-black mb-2">About Me</h2>
          {/* Profile content goes here */}
        </div>

        {/* Skills */}
        <div className="skill border">
          <h2 className="text-3xl font-bold text-black mb-2">Skills</h2>
          {/* Skills content goes here */}
        </div>

        {/* Experiences */}
        <div className="experience border">
          <h2 className="text-3xl font-bold text-black mb-2">Work Experience</h2>
          {/* Experiences content goes here */}
        </div>

        {/* Projects */}
        <div className="project border">
          <h2 className="text-3xl font-bold text-black mb-2">Projects</h2>
          {/* Projects content goes here */}
        </div>

        {/* Projects */}
        <div className="playground border">
          <h2 className="text-3xl font-bold text-black mb-2">Projects</h2>
          {/* Projects content goes here */}
        </div>

        {/* Contacts */}
        <div className="contact border">
          <h2 className="text-3xl font-bold text-black mb-2">Contact Me</h2>
          {/* Contacts content goes here */}
        </div>

      </div>
    </div>
  );
}
