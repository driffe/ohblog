import Link from "next/link";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

const links = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/stack", label: "Stack" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="wrap py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="meta mb-4">Elsewhere</p>
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-accent transition-colors"
            >
              <GitHubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent transition-colors"
            >
              <LinkedInIcon />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="hover:text-accent transition-colors"
            >
              <MailIcon />
            </a>
          </div>
          <p className="meta">© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
