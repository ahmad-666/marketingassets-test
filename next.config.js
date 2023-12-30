/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  //trailingSlash: true,
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cufinder.io",
        pathname: "**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.cufinder.io",
        pathname: "**",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*", //api routes are inside /api/...
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin(front url)
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Length, Content-Type, Accept, Authorization, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
