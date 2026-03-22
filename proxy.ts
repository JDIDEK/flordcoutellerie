import { randomUUID } from 'node:crypto'

import { NextResponse, type NextRequest } from 'next/server'

function buildContentSecurityPolicy(nonce: string) {
  const isDev = process.env.NODE_ENV !== 'production'

  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com${
      isDev ? " 'unsafe-eval'" : ''
    }`,
    `style-src 'self' ${
      isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`
    } https://fonts.googleapis.com`,
    "img-src 'self' data: blob: https://cdn.sanity.io https://image.mux.com https://*.public.blob.vercel-storage.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.sanity.io https://*.mux.com https://blob.vercel-storage.com https://*.public.blob.vercel-storage.com https://va.vercel-scripts.com wss://*.sanity.io",
    "frame-src 'self'",
    "media-src 'self' https://stream.mux.com https://*.public.blob.vercel-storage.com blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
  ].join('; ')
}

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(randomUUID()).toString('base64')
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce)
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicy)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set('Content-Security-Policy', contentSecurityPolicy)
  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!api|studio|_next/static|_next/image|favicon.ico|.*\\..*).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
