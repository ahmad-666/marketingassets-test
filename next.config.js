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
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*", //api routes are inside <FRONT_URL>/api/...
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin(front url)
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
