/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/content/about", destination: "/about", permanent: true },
      { source: "/content/skills", destination: "/stack", permanent: true },
      { source: "/content/experiences", destination: "/experience", permanent: true },
      { source: "/content/projects", destination: "/work", permanent: true },
      { source: "/content/playground", destination: "/playground", permanent: true },
      { source: "/content/contact", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
