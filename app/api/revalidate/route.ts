import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { revalidateTag } from 'next/cache'

const AUTH_HEADER = 'x-sanity-webhook-signature'

export async function POST(request: Request) {
  const requestHeaders = await headers()
  const signature = requestHeaders.get(AUTH_HEADER)
  if (!process.env.SANITY_WEBHOOK_SECRET || signature !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  revalidateTag('pieces', 'default')

  if (body?.slug?.current) {
    revalidateTag(`piece:${body.slug.current}`, 'default')
  }

  return NextResponse.json({ success: true })
}
