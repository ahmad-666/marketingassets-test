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
        hostname: "companyurlfinder.com", //or '**.amazonaws.com'
        pathname: "**",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
