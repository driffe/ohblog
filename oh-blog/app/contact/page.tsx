import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — email, LinkedIn, or GitHub.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Seyoung Oh",
    description: "Get in touch — email, LinkedIn, or GitHub.",
    url: "/contact",
    images: ["/og-image.jpg"],
  },
};

const items = [
  { icon: MailIcon, label: "Email", href: `mailto:${profile.email}`, sub: profile.email },
  { icon: LinkedInIcon, label: "LinkedIn", href: profile.linkedin, sub: "linkedin.com/in/syoh2k" },
  { icon: GitHubIcon, label: "GitHub", href: profile.github, sub: "github.com/driffe" },
];

export default function ContactPage() {
  return (
    <main id="main-content" className="section">
      <div className="wrap">
        <p className="eyebrow mb-4">Contact</p>
        <h1 className="display mb-6">Let&rsquo;s connect</h1>
        <p className="max-w-xl text-lg text-ink-muted mb-16">
          I&rsquo;m open to new opportunities and collaborations. {profile.availability}
        </p>

        <div>
          {items.map(({ icon: Icon, label, href, sub }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="index-row"
              style={{ gridTemplateColumns: "auto 1fr auto" }}
            >
              <Icon />
              <span>
                <span className="block text-xl sm:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                  {label}
                </span>
                <span className="meta mt-1 block">{sub}</span>
              </span>
              <span aria-hidden>→</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
