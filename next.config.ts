import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Disable image optimization for Netlify/Vercel compatibility
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
