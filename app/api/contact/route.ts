import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type CustomOrderPayload = {
  usage?: string
  forme?: string
  acier?: string
  manche?: string
  mancheVariant?: string
  guillochage?: string
  gravure?: string
  notes?: string
  name?: string
  email?: string
  estimatedPrice?: number
}

const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim())
const sanitize = (value: string) => value.replace(/[\u0000-\u001F\u007F]/g, '').trim()

export async function POST(req: Request) {
  let payload: CustomOrderPayload

  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload JSON invalide.' }, { status: 400 })
  }

  const safePayload = {
    usage: sanitize(payload.usage ?? ''),
    forme: sanitize(payload.forme ?? ''),
    acier: sanitize(payload.acier ?? ''),
    manche: sanitize(payload.manche ?? ''),
    mancheVariant: sanitize(payload.mancheVariant ?? ''),
    guillochage: sanitize(payload.guillochage ?? ''),
    gravure: sanitize(payload.gravure ?? ''),
    notes: sanitize(payload.notes ?? ''),
    name: sanitize(payload.name ?? ''),
    email: sanitize(payload.email ?? ''),
  }

  const validationErrors: string[] = []

  if (!safePayload.name) validationErrors.push('Nom requis.')
  if (!validateEmail(safePayload.email)) validationErrors.push('Email invalide.')
  if (!safePayload.usage) validationErrors.push('Usage requis.')
  if (!safePayload.forme) validationErrors.push('Forme requise.')
  if (!safePayload.acier) validationErrors.push('Acier requis.')
  if (!safePayload.manche) validationErrors.push('Manche requis.')
  if (!safePayload.guillochage) validationErrors.push('Guillochage requis.')

  if (validationErrors.length > 0) {
    return NextResponse.json(
      { error: 'Validation echouee.', details: validationErrors },
      { status: 400 }
    )
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    return NextResponse.json(
      { error: 'Configuration Resend manquante.' },
      { status: 500 }
    )
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!fromEmail) {
    return NextResponse.json(
      { error: 'Configuration email manquante.' },
      { status: 500 }
    )
  }

  const adminEmail = process.env.CONTACT_TO_EMAIL || fromEmail || 'floribadeaudumas@gmail.com'

  const estimatedPrice =
    typeof payload.estimatedPrice === 'number' && Number.isFinite(payload.estimatedPrice)
      ? payload.estimatedPrice
      : null

  const emailLines = [
    'Nouvelle demande sur mesure.',
    '',
    `Nom: ${safePayload.name}`,
    `Email: ${safePayload.email}`,
    `Usage: ${safePayload.usage}`,
    `Forme: ${safePayload.forme}`,
    `Acier: ${safePayload.acier}`,
    `Manche: ${safePayload.manche}${
      safePayload.mancheVariant ? ` (${safePayload.mancheVariant})` : ''
    }`,
    `Guillochage: ${safePayload.guillochage}`,
    `Gravure: ${safePayload.gravure || 'Non'}`,
    `Notes: ${safePayload.notes || 'Aucune'}`,
    estimatedPrice !== null ? `Prix estime: ${estimatedPrice} EUR` : null,
  ].filter(Boolean)

  try {
    const resend = new Resend(resendApiKey)
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `Demande sur mesure - ${safePayload.usage || 'Flor D Coutellerie'}`,
      text: emailLines.join('\n'),
      replyTo: safePayload.email,
    })
  } catch (error) {
    console.error('Failed to send custom order email via Resend', error)
    return NextResponse.json({ error: "Echec de l'envoi de l'email." }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
