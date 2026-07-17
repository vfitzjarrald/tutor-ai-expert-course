import type { NextConfig } from "next";

const traced = [
  "./curriculum/**/*",
  "./checkpoints/**/*",
  "./labs/**/*",
  "./capstone/README.md",
];

const routes = [
  "/",
  "/calendar",
  "/schedule",
  "/weeks/[week]",
  "/weeks/[week]/days/[day]",
  "/login",
  "/admin/users",
  "/checks",
  "/placement",
  "/gates",
  "/resources",
  "/phases/[id]",
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["bcryptjs"],
  outputFileTracingIncludes: Object.fromEntries(routes.map((route) => [route, traced])),
};

export default nextConfig;
