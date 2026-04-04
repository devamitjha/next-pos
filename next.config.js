/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        protocol: "https",
        hostname: "lucira.live.ornaverse.in",
        pathname: "/**", // allow all paths from this domain
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
