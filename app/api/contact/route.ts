import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

import { logger } from '@/lib/logger'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const contactSchema = z
  .object({
    name: z.string().min(1, 'Le nom est requis.').max(80),
    email: z.string().email('Email invalide.').max(120),
    phone: z.string().max(30).optional().default(''),
    message: z.string().min(1, 'Le message est requis.').max(1500),
  })
  .strict()

export async function POST(req: Request) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload JSON invalide.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    return NextResponse.json({ error: 'Données invalides.', fieldErrors }, { status: 400 })
  }

  const { name, email, phone, message } = parsed.data

  const resendApiKey = process.env.RESEND_API_KEY
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL ?? process.env.RESEND_FROM_EMAIL
  const fromEmail = process.env.RESEND_FROM_EMAIL

  if (!resendApiKey || !fromEmail || !recipientEmail) {
    logger.error('Missing email configuration for contact form')
    return NextResponse.json(
      { error: 'Configuration email manquante côté serveur.' },
      { status: 500 }
    )
  }

  const resend = new Resend(resendApiKey)

  try {
    await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: email,
      subject: `Contact depuis le site — ${name}`,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        `Téléphone : ${phone || 'Non renseigné'}`,
        '',
        'Message :',
        message,
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Failed to send contact email', error)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message. Veuillez réessayer." },
      { status: 500 }
    )
  }
}
