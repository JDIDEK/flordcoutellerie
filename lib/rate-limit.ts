import { createHash } from 'node:crypto'

import { logger } from '@/lib/logger'
import { getSanityWriteClient } from '@/sanity/lib/write-client'

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
let lastSharedCleanupAt = 0

type SharedRateLimitBucket = {
  count?: number
}

export async function rateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  if (process.env.SANITY_WRITE_TOKEN) {
    try {
      return await rateLimitWithSanity({
        key,
        limit,
        windowMs,
      })
    } catch (error) {
      logger.warn('Shared rate limit store unavailable, falling back to memory', {
        keyHash: hashRateLimitKey(key),
        errorMessage: error instanceof Error ? error.message : String(error),
      })
    }
  }

  return rateLimitInMemory({
    key,
    limit,
    windowMs,
  })
}

function rateLimitInMemory({
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

async function rateLimitWithSanity({
  key,
  limit,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  const now = Date.now()
  const bucketStart = Math.floor(now / windowMs) * windowMs
  const bucketEnd = bucketStart + windowMs
  const keyHash = hashRateLimitKey(key)
  const bucketId = `securityRateLimit.${keyHash}.${bucketStart}`
  const nowIso = new Date(now).toISOString()
  const bucketStartIso = new Date(bucketStart).toISOString()
  const bucketEndIso = new Date(bucketEnd).toISOString()
  const sanity = getSanityWriteClient()

  const tx = sanity.transaction()
  tx.createIfNotExists({
    _id: bucketId,
    _type: 'securityRateLimitBucket',
    count: 0,
    keyHash,
    windowStartedAt: bucketStartIso,
    windowEndsAt: bucketEndIso,
    createdAt: nowIso,
    updatedAt: nowIso,
  })
  tx.patch(bucketId, (patch) =>
    patch.setIfMissing({ count: 0 }).inc({ count: 1 }).set({ updatedAt: nowIso })
  )
  await tx.commit({ visibility: 'sync' })

  await cleanupExpiredSharedBuckets(sanity, now)

  const bucket = await sanity.fetch<SharedRateLimitBucket | null>(
    '*[_id == $bucketId][0]{ count }',
    { bucketId },
    { cache: 'no-store' }
  )

  const count = bucket?.count ?? 0
  const allowed = count <= limit

  return {
    allowed,
    remaining: Math.max(0, limit - count),
    retryAfterSeconds: allowed
      ? 0
      : Math.max(1, Math.ceil((bucketEnd - now) / 1000)),
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

function hashRateLimitKey(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

async function cleanupExpiredSharedBuckets(
  sanity: ReturnType<typeof getSanityWriteClient>,
  now: number
) {
  const CLEANUP_INTERVAL_MS = 15 * 60 * 1000
  const RETENTION_MS = 24 * 60 * 60 * 1000

  if (now - lastSharedCleanupAt < CLEANUP_INTERVAL_MS) {
    return
  }

  lastSharedCleanupAt = now

  const cutoffIso = new Date(now - RETENTION_MS).toISOString()
  const expiredIds = await sanity.fetch<Array<{ _id: string }>>(
    `*[
      _type == "securityRateLimitBucket" &&
      windowEndsAt < $cutoffIso
    ][0...50]{
      _id
    }`,
    { cutoffIso },
    { cache: 'no-store' }
  )

  if (expiredIds.length === 0) {
    return
  }

  const tx = sanity.transaction()
  expiredIds.forEach((doc) => tx.delete(doc._id))
  await tx.commit({ visibility: 'sync' })
}
