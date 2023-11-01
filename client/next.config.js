/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sabmaf2.blob.core.windows.net",
        port: "",
        pathname: "/sabmafimages/**",
      },
    ],
  },
};

module.exports = nextConfig
