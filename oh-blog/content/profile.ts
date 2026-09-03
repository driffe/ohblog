import type { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Seyoung Oh",
  role: "Software engineer",
  employer: "@ KQED",
  eyebrow: "Hi, I'm",
  positioning:
    "I build and operate backend services and frontend features in production — at work, and on things I ship myself. SJSU '25 New Grad, 2× hackathon winner.",
  availability: "Open to New Grad SWE roles — SF Bay Area & Washington D.C.",
  location: "San Francisco Bay Area",
  email: "syoh2k@gmail.com",
  github: "https://github.com/driffe",
  linkedin: "https://linkedin.com/in/syoh2k",
  resumeSwe: "/Seyoung_Oh_Resume.pdf",
  resumeIt: "/Seyoung_Oh_Resume_TSE.pdf",
  resumeStartup: "/Seyoung_Oh_Resume_Startup.pdf",
  education: {
    degree: "Software Engineering (B.S.)",
    school: "San Jose State University",
    period: "Aug 2021 – Dec 2025",
    coursework: [
      "Parallel Processing",
      "Programming Paradigms",
      "Software Quality Engineering",
      "Object-Oriented Design",
      "Enterprise Software",
      "Database Management Systems",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks & Security",
    ],
  },
  // Four tiles, to fill the md:grid-cols-4 stat band on the homepage. Every
  // number here is from my own projects, not an employer's product metrics.
  stats: [
    { label: "Pilm App Store downloads", value: "3.2K+" },
    { label: "CoffeeByMe MAU", value: "1.1K+" },
    { label: "Hackathon wins", value: "2×" },
    { label: "Shipped projects", value: "12" },
  ],
  about: [
    "I'm a Software Engineer at KQED (San Francisco public media), shipping production code that serves nearly 1M monthly users across web, mobile, and streaming.",
    "I graduated from San Jose State University in December 2025 (B.S. Software Engineering). I build and operate backend services and frontend features across a microservices architecture, and I'm actively open to full-time New Grad SWE roles — especially at teams building production AI systems and backend infrastructure.",
  ],
};
