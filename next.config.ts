import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle (.next/standalone) for a small runtime image.
  output: 'standalone',
  images: {
    // TEMP (test): route every next/image through a placeholder loader that
    // serves https://placehold.co. Remove `loader`/`loaderFile` to restore real
    // images.
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    qualities: [75, 90]
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
