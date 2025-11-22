import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { revalidateTag } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_WEBHOOK_SECRET
    )

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (body?._type === 'piece') {
      revalidateTag('piece', 'default')
      console.log('Cache nettoyé pour le tag: piece')
    }

    return NextResponse.json({ body })
  } catch (err: any) {
    console.error(err)
    return new NextResponse(err.message, { status: 500 })
  }
}
