import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/media/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'usslhovmxqvixkodloau.supabase.co',
        pathname: '/storage/v1/object/public/aswith-portfolio-media/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: 'https://usslhovmxqvixkodloau.supabase.co/storage/v1/object/public/aswith-portfolio-media/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
