"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CloseIcon, MenuIcon } from "@/components/icons";

const links = [
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/experience", label: "Experience" },
  { href: "/stack", label: "Stack" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="wrap flex items-center justify-between gap-4 py-4">
        <Link href="/" className="meta text-ink" style={{ fontWeight: 600 }}>
          SEYOUNG OH
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className="meta hover:text-ink transition-colors"
                style={active ? { color: "var(--ink)" } : undefined}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="md:hidden meta flex items-center gap-2"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-rule bg-paper">
          <nav aria-label="Mobile" className="wrap flex flex-col py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="meta py-3 border-b border-rule last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="py-3">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
