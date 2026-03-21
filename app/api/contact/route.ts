import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

import { createContactEmailTemplate } from '@/lib/email-templates'
import { logger } from '@/lib/logger'
import { rateLimit } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/request'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CONTACT_IP_RATE_LIMIT = {
  limit: 5,
  windowMs: 30 * 60 * 1000,
} as const

const CONTACT_EMAIL_RATE_LIMIT = {
  limit: 3,
  windowMs: 30 * 60 * 1000,
} as const

const contactSchema = z
  .object({
    name: z.string().min(1, 'Le nom est requis.').max(80),
    email: z.string().email('Email invalide.').max(120),
    phone: z.string().max(30).optional().default(''),
    message: z.string().min(1, 'Le message est requis.').max(1500),
  })
  .strict()

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const ipLimit = rateLimit({
    key: `contact:${ip}`,
    ...CONTACT_IP_RATE_LIMIT,
  })

  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: 'Trop de messages envoyés. Réessayez plus tard.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(ipLimit.retryAfterSeconds),
        },
      }
    )
  }

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
  const emailLimit = rateLimit({
    key: `contact-email:${email.toLowerCase()}`,
    ...CONTACT_EMAIL_RATE_LIMIT,
  })

  if (!emailLimit.allowed) {
    return NextResponse.json(
      { error: 'Cet email a envoyé trop de messages récemment. Réessayez plus tard.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(emailLimit.retryAfterSeconds),
        },
      }
    )
  }

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
  const emailContent = createContactEmailTemplate({
    name,
    email,
    phone,
    message,
  })

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    })

    if (error) {
      logger.error('Resend rejected contact email', error, {
        recipientEmail,
        fromEmail,
        senderEmail: email,
      })

      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message. Veuillez reessayer." },
        { status: 502 }
      )
    }

    logger.info('Contact email sent', {
      resendEmailId: data?.id ?? null,
      recipientEmail,
      fromEmail,
      senderEmail: email,
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
