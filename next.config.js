/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "companyurlfinder.com",
        pathname: "**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.companyurlfinder.com",
        pathname: "**",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
