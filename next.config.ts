import type { NextConfig } from "next";

const curriculumFiles = ["./curriculum/**/*"];

const nextConfig: NextConfig = {
  serverExternalPackages: ["bcryptjs"],
  // Curriculum is read via fs at runtime; include it in serverless traces
  outputFileTracingIncludes: {
    "/": curriculumFiles,
    "/calendar": curriculumFiles,
    "/schedule": curriculumFiles,
    "/weeks/[week]": curriculumFiles,
    "/weeks/[week]/days/[day]": curriculumFiles,
    "/login": curriculumFiles,
    "/admin/users": curriculumFiles,
  },
};

export default nextConfig;
