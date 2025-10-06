import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="title" content="Oh! Blog - Seyoung Oh's Portfolio" />
        <meta name="description" content="Software Engineering student at SJSU. Explore my projects, skills, and experiences in full-stack development and software engineering." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ohblog-inky.vercel.app/" />
        <meta property="og:title" content="Oh! Blog - Seyoung Oh's Portfolio" />
        <meta property="og:description" content="Software Engineering student at SJSU. Explore my projects, skills, and experiences in full-stack development and software engineering." />
        <meta property="og:image" content="https://ohblog-inky.vercel.app/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ohblog-inky.vercel.app/" />
        <meta property="twitter:title" content="Oh! Blog - Seyoung Oh's Portfolio" />
        <meta property="twitter:description" content="Software Engineering student at SJSU. Explore my projects, skills, and experiences in full-stack development and software engineering." />
        <meta property="twitter:image" content="https://ohblog-inky.vercel.app/og-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
