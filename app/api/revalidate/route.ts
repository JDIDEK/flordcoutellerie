import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

import { revalidateSanityType } from '@/lib/cache'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET
    if (!secret) {
      logger.error('Missing environment variable: SANITY_WEBHOOK_SECRET')
      return new NextResponse('Server configuration error', { status: 500 })
    }

    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      secret
    )

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    revalidateSanityType(body?._type)

    return NextResponse.json({ body })
  } catch (err: unknown) {
    logger.error('Revalidation failed', err)
    return new NextResponse('Revalidation request failed', { status: 500 })
  }
}
