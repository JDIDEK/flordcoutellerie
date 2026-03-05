type RateLimitOptions = {
  key: string
  limit: number
  windowMs: number
}

type RateLimitResult = {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

const buckets = new Map<string, number[]>()

export function rateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const windowStart = now - windowMs
  const existing = buckets.get(key) ?? []
  const recent = existing.filter((timestamp) => timestamp > windowStart)

  recent.push(now)
  buckets.set(key, recent)

  pruneBuckets(windowStart)

  if (recent.length > limit) {
    const retryAfterMs = recent[0] + windowMs - now

    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    }
  }

  return {
    allowed: true,
    remaining: Math.max(0, limit - recent.length),
    retryAfterSeconds: 0,
  }
}

function pruneBuckets(windowStart: number) {
  for (const [key, timestamps] of buckets.entries()) {
    const recent = timestamps.filter((timestamp) => timestamp > windowStart)

    if (recent.length === 0) {
      buckets.delete(key)
      continue
    }

    if (recent.length !== timestamps.length) {
      buckets.set(key, recent)
    }
  }
}

