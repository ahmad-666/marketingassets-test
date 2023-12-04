/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
  },
};

module.exports = nextConfig;
