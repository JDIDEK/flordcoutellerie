import { NextResponse, type NextRequest } from 'next/server'

const RATE_LIMIT_WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 20
const CLEANUP_INTERVAL_MS = 5 * 60_000

const rateMap = new Map<string, { count: number; resetAt: number }>()
let lastCleanup = Date.now()

function cleanupExpiredEntries() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now
  for (const [key, entry] of rateMap) {
    if (now > entry.resetAt) {
      rateMap.delete(key)
    }
  }
}

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() ?? 'unknown'
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > MAX_REQUESTS_PER_WINDOW
}

// Note: This in-memory rate limiter works per-instance. In serverless or
// multi-instance deployments, consider a distributed store (e.g. Redis, Vercel KV).
export function proxy(req: NextRequest) {
  cleanupExpiredEntries()

  const key = getRateLimitKey(req)

  if (isRateLimited(key)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
      { status: 429 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
