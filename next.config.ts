import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix for Vercel deployment: ensure Turbopack uses the project root
  turbopack: {
    root: "/",
  },
};

export default nextConfig;
