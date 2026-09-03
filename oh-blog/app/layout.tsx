import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Korean-language posts (lang: "ko" in blog frontmatter) get this layered in
// via the [lang="ko"] rule in globals.css. subsets: ["latin"] is deliberate,
// not a typo: next/font/google's metadata for this family only offers
// cyrillic/latin/latin-ext/vietnamese subsets (no "korean" option) — the
// underlying variable font file still carries full Korean glyph coverage.
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ohblog-inky.vercel.app"),
  title: {
    default: "Seyoung Oh — Software Engineer",
    template: "%s — Seyoung Oh",
  },
  description:
    "Software Engineer at KQED shipping production code to ~1M monthly users. SJSU '25 New Grad. Case studies in backend, full-stack, and applied AI.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Seyoung Oh",
    url: "https://ohblog-inky.vercel.app/",
    title: "Seyoung Oh — Software Engineer",
    description:
      "Software Engineer at KQED shipping production code to ~1M monthly users. SJSU '25 New Grad. Case studies in backend, full-stack, and applied AI.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seyoung Oh — Software Engineer",
    description:
      "Software Engineer at KQED shipping production code to ~1M monthly users. SJSU '25 New Grad. Case studies in backend, full-stack, and applied AI.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Blocking inline script — reads localStorage before first paint so the
// theme never flashes light-then-dark (or vice versa) on load.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoSansKR.variable} font-body antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 meta"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
