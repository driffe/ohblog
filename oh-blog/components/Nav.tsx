import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const links = [
  { href: '/content/about', label: 'About', hue: 95 },
  { href: '/content/skills', label: 'Skills', hue: 150 },
  { href: '/content/experiences', label: 'Experiences', hue: 55 },
  { href: '/content/projects', label: 'Projects', hue: 295 },
  { href: '/content/playground', label: 'Playground', hue: 25 },
  { href: '/content/contact', label: 'Contact', hue: 240 },
];

export default function Nav() {
  const { pathname } = useRouter();

  return (
    <header className="site-nav">
      <nav className="site-nav-inner" aria-label="Primary">
        <Link href="/" className="site-brand">Oh! Blog</Link>
        <ul className="site-nav-links">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`nav-link${active ? ' nav-link-active' : ''}`}
                  style={{ '--hue': l.hue } as React.CSSProperties}
                  aria-current={active ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
