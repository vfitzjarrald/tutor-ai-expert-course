import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Curriculum markdown lives outside app/; allow reading at runtime
  serverExternalPackages: ["bcryptjs"],
};

export default nextConfig;
