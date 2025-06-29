/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enable future appDir if needed
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.mangadex.org", // MangaDex cover/chapter images
      },
      {
        protocol: "https",
        hostname: "s4.anilist.co", // AniList cover images
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net", // optional MAL fallback
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // optional user avatar
      },
    ],
  },
};

module.exports = nextConfig;

