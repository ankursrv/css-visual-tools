import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enforce strict React mode
  reactStrictMode: true,

  // Optimize images
  images: {
    // Add your external image domains here when needed, e.g.:
    // domains: ['images.example.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Tailwind CSS v4 via the Turbopack-native loader (shared toolchain with development)
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
