import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // must match the query string built in lib/photos.ts
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*", search: "?auto=format&fit=crop&w=1600&q=75" },
    ],
  },
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
