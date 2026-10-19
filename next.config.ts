import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  /* Page cuts: React <ViewTransition> on router navigations (layout.tsx) */
  experimental: { viewTransition: true },
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
