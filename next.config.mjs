import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    OWNER: process.env.OWNER,
    REPO: process.env.REPO,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
