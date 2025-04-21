// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,
  },
  // images: {
  //   domains: [
  //     'lh3.googleusercontent.com',
  //     'res.cloudinary.com',
  //     'images.unsplash.com',
  //   ],
  // },
};

export default nextConfig;