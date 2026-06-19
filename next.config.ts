import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The LP solver and AI calls run server-side on the Node.js runtime.
  serverExternalPackages: ["javascript-lp-solver"],
  eslint: {
    // CI runs lint separately; don't fail production builds on lint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
