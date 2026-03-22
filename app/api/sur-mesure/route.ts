import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

import { getSteps, isStepComplete } from '@/features/custom-order/helpers'
import type { WizardConfig } from '@/features/custom-order/types'
import { createCustomOrderEmailTemplate } from '@/lib/email-templates'
import { logger, maskEmailForLogs } from '@/lib/logger'
import { rateLimit } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/request'
import { validateInternalJsonRequest } from '@/lib/request-security'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CUSTOM_ORDER_IP_RATE_LIMIT = {
  limit: 4,
  windowMs: 30 * 60 * 1000,
} as const

const CUSTOM_ORDER_EMAIL_RATE_LIMIT = {
  limit: 2,
  windowMs: 30 * 60 * 1000,
} as const

const optionalString = (max: number) =>
  z.preprocess(sanitizeInput, z.string().max(max)).optional().default('')

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess(
    sanitizeInput,
    z
      .string()
      .refine((value) => values.includes(value), 'Valeur invalide.')
      .transform((value) => value as T[number])
  )
    .optional()

const customOrderSchema = z
  .object({
    usage: z.preprocess(sanitizeInput, z.enum(['cuisine', 'pliant', 'outdoor', 'chasse'])),
    cuisineForm: optionalString(80),
    pliantMechanism: optionalString(80),
    pliantForm: optionalString(80),
    outdoorUse: optionalEnum(['moderee', 'intensive']),
    outdoorForm: optionalString(80),
    chasseForm: optionalString(80),
    steel: optionalString(80),
    damasteelPattern: optionalString(80),
    sheath: optionalEnum(['kydex', 'cuir']),
    handleFamily: optionalString(80),
    handleVariant: optionalString(80),
    handleComposition: optionalEnum(['simple', 'compose']),
    rivetColor: optionalEnum(['cuivre', 'laiton', 'inox']),
    mosaicRivet: z.boolean(),
    engraving: z.boolean(),
    engravingText: optionalString(120),
    notes: optionalString(2000),
    guillochageMode: optionalEnum(['set', 'custom']),
    guillochageSet: optionalString(80),
    guillochageCentral: optionalString(80),
    guillochagePlatineLeft: optionalString(80),
    guillochagePlatineRight: optionalString(80),
    firstName: z.preprocess(sanitizeInput, z.string().min(1, 'Le prenom est requis.').max(80)),
    lastName: z.preprocess(sanitizeInput, z.string().min(1, 'Le nom est requis.').max(80)),
    email: z.preprocess(
      sanitizeInput,
      z.string().email('Email invalide.').max(120)
    ),
  })
  .strict()
  .superRefine((data, ctx) => {
    const config = data as WizardConfig
    const missingStep = getSteps(config).find((step) => !isStepComplete(step.id, config))

    if (missingStep) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Le configurateur est incomplet: ${missingStep.title}.`,
      })
    }
  })

export async function POST(req: Request) {
  const securityError = validateInternalJsonRequest(req)
  if (securityError) {
    return securityError
  }

  const ip = getClientIp(req)
  const ipLimit = await rateLimit({
    key: `sur-mesure:${ip}`,
    ...CUSTOM_ORDER_IP_RATE_LIMIT,
  })

  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: 'Trop de demandes envoyees. Reessayez plus tard.' },
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

  const parsed = customOrderSchema.safeParse(body)

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    const formErrors = parsed.error.flatten().formErrors

    return NextResponse.json(
      { error: formErrors[0] ?? 'Donnees invalides.', fieldErrors },
      { status: 400 }
    )
  }

  const config = parsed.data as WizardConfig
  const emailLimit = await rateLimit({
    key: `sur-mesure-email:${config.email.toLowerCase()}`,
    ...CUSTOM_ORDER_EMAIL_RATE_LIMIT,
  })

  if (!emailLimit.allowed) {
    return NextResponse.json(
      { error: 'Cet email a deja envoye plusieurs demandes recemment. Reessayez plus tard.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(emailLimit.retryAfterSeconds),
        },
      }
    )
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const recipientEmail =
    process.env.CUSTOM_ORDER_RECIPIENT_EMAIL ??
    process.env.CONTACT_RECIPIENT_EMAIL ??
    fromEmail

  if (!resendApiKey || !fromEmail || !recipientEmail) {
    logger.error('Missing email configuration for custom order form')
    return NextResponse.json(
      { error: 'Configuration email manquante cote serveur.' },
      { status: 500 }
    )
  }

  const resend = new Resend(resendApiKey)
  const email = createCustomOrderEmailTemplate(config)

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: config.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    })

    if (error) {
      logger.error('Resend rejected custom order email', error, {
        recipientEmail: maskEmailForLogs(recipientEmail),
        fromEmail: maskEmailForLogs(fromEmail),
        customerEmail: maskEmailForLogs(config.email),
        usage: config.usage,
      })

      return NextResponse.json(
        { error: "Erreur lors de l'envoi de la demande. Veuillez reessayer." },
        { status: 502 }
      )
    }

    logger.info('Custom order email sent', {
      resendEmailId: data?.id ?? null,
      recipientEmail: maskEmailForLogs(recipientEmail),
      fromEmail: maskEmailForLogs(fromEmail),
      customerEmail: maskEmailForLogs(config.email),
      usage: config.usage,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Failed to send custom order email', error, {
      usage: config.usage,
      email: maskEmailForLogs(config.email),
    })

    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la demande. Veuillez reessayer." },
      { status: 500 }
    )
  }
}

function sanitizeInput(value: unknown) {
  if (typeof value !== 'string') {
    return value
  }

  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim()
}
