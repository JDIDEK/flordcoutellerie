import { withNextVideo } from 'next-video/process'
import { legacyAssetRewrites } from './config/legacy-asset-rewrites.mjs'
/** @type {import('next').NextConfig} */
const studioScriptSrc = [
  "'self'",
  "'unsafe-inline'",
  'https://va.vercel-scripts.com',
  'https://core.sanity-cdn.com',
  'https://vercel.live',
]

const connectSrc = [
  "'self'",
  'https://*.sanity.io',
  'https://*.mux.com',
  'https://blob.vercel-storage.com',
  'https://*.public.blob.vercel-storage.com',
  'https://va.vercel-scripts.com',
  'wss://*.sanity.io',
]

const studioConnectSrc = [
  ...connectSrc,
  'https://sanity-cdn.com',
  'https://*.sanity-cdn.com',
  'https://core.sanity-cdn.com',
  'https://vercel.live',
]

if (process.env.NODE_ENV !== 'production') {
  studioScriptSrc.push("'unsafe-eval'")
}

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Mobile-first: prioriser les petites tailles
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // Disabled because Next 16 dev currently tries to require `critters`
  // in this project setup and crashes the dev server.
  experimental: {
    optimizeCss: false,
  },
  // Security & performance headers
  async rewrites() {
    return {
      beforeFiles: legacyAssetRewrites,
    }
  },
  async headers() {
    const studioHeaders = [
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          `script-src ${studioScriptSrc.join(' ')}`,
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: blob: https://cdn.sanity.io https://image.mux.com https://*.public.blob.vercel-storage.com",
          "font-src 'self' https://fonts.gstatic.com",
          `connect-src ${studioConnectSrc.join(' ')}`,
          "frame-src 'self'",
          "media-src 'self' https://stream.mux.com https://*.public.blob.vercel-storage.com blob:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'self'",
        ].join('; '),
      },
    ]

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
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
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/studio',
        headers: studioHeaders,
      },
      {
        source: '/studio/:path*',
        headers: studioHeaders,
      },
    ]
  },
}

export default withNextVideo(nextConfig, {
  provider: 'vercel-blob',
})
