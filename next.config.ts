import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.izotope.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "media.gettyimages.com" }
    ]
  }
};

export default nextConfig;
