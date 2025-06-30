/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, // jika kamu menggunakan app router
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.mangadex.org", // cover dan beberapa chapter
      },
      {
        protocol: "https",
        hostname: "**.mangadex.network", // baseUrl acak dari fetchChapterImages (penting!)
      },
      {
        protocol: "https",
        hostname: "s4.anilist.co", // anilist cover
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net", // MAL optional
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // user avatar
      },
    ],
    dangerouslyAllowSVG: true, // optional: kalau kamu load logo SVG dari luar
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
