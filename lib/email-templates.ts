import {
  buildCustomOrderPlainText,
  buildCustomOrderSummarySections,
  getCustomOrderSubject,
  type SummarySection,
} from '@/lib/custom-order-summary'
import type { WizardConfig } from '@/components/custom-order/types'

type ContactEmailInput = {
  name: string
  email: string
  phone: string
  message: string
}

type EmailTemplateContent = {
  subject: string
  html: string
  text: string
}

const BRAND = {
  name: 'FLO RD Coutellerie',
  eyebrow: 'Atelier de coutellerie artisanale',
  background: '#F2EAE4',
  panel: '#F8F3EE',
  border: '#D4C8BF',
  foreground: '#212120',
  muted: '#5A5A59',
  accent: '#5A5A59',
  accentSoft: '#E4DBD3',
} as const

export function createContactEmailTemplate({
  name,
  email,
  phone,
  message,
}: ContactEmailInput): EmailTemplateContent {
  const subject = `Contact depuis le site - ${name}`
  const sections: SummarySection[] = [
    {
      title: 'Coordonnees',
      items: [
        { label: 'Nom', value: name },
        { label: 'Email', value: email },
        { label: 'Telephone', value: phone || 'Non renseigne' },
      ],
    },
    {
      title: 'Message',
      items: [{ label: 'Contenu', value: message }],
    },
  ]

  return {
    subject,
    html: createEmailLayout({
      eyebrow: 'Nouveau message',
      title: 'Demande de contact',
      intro:
        'Un visiteur a utilise le formulaire de contact du site. Le detail du message est ci-dessous.',
      sections,
      actionLabel: 'Repondre au client',
      actionHref: `mailto:${encodeURIComponent(email)}`,
    }),
    text: [
      'Nouveau message de contact',
      '',
      `Nom : ${name}`,
      `Email : ${email}`,
      `Telephone : ${phone || 'Non renseigne'}`,
      '',
      'Message :',
      message,
    ].join('\n'),
  }
}

export function createCustomOrderEmailTemplate(config: WizardConfig): EmailTemplateContent {
  const subject = getCustomOrderSubject(config)
  const sections = buildCustomOrderSummarySections(config)

  return {
    subject,
    html: createEmailLayout({
      eyebrow: 'Nouvelle demande',
      title: 'Projet sur-mesure',
      intro:
        'Le configurateur a ete complete et la demande est prete a etre traitee. Toutes les selections client sont reprises ci-dessous.',
      sections,
      actionLabel: 'Repondre au client',
      actionHref: `mailto:${encodeURIComponent(config.email)}`,
    }),
    text: buildCustomOrderPlainText(config),
  }
}

function createEmailLayout({
  eyebrow,
  title,
  intro,
  sections,
  actionLabel,
  actionHref,
}: {
  eyebrow: string
  title: string
  intro: string
  sections: SummarySection[]
  actionLabel?: string
  actionHref?: string
}) {
  const sectionsHtml = sections
    .map((section) => {
      const itemsHtml = section.items
        .map(
          (item) => `
            <tr>
              <td style="padding:0 0 12px;vertical-align:top;width:180px;font-size:12px;line-height:18px;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND.muted};">
                ${escapeHtml(item.label)}
              </td>
              <td style="padding:0 0 12px;vertical-align:top;font-size:15px;line-height:24px;color:${BRAND.foreground};">
                ${renderMultilineValue(item.value)}
              </td>
            </tr>
          `
        )
        .join('')

      return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;border-spacing:0;background:${BRAND.panel};border:1px solid ${BRAND.border};margin:0 0 18px;border-radius:8px;">
          <tr>
            <td style="padding:20px 22px 8px;font-size:12px;line-height:18px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.muted};">
              ${escapeHtml(section.title)}
            </td>
          </tr>
          <tr>
            <td style="padding:0 22px 12px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
                ${itemsHtml}
              </table>
            </td>
          </tr>
        </table>
      `
    })
    .join('')

  const actionHtml =
    actionLabel && actionHref
      ? `
        <tr>
          <td style="padding:10px 32px 0;">
            <a href="${escapeHtml(actionHref)}" style="display:inline-block;padding:12px 18px;background:${BRAND.accent};color:${BRAND.background};text-decoration:none;font-size:12px;line-height:18px;letter-spacing:0.16em;text-transform:uppercase;border-radius:4px;">
              ${escapeHtml(actionLabel)}
            </a>
          </td>
        </tr>
      `
      : ''

  return `
    <!doctype html>
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin:0;padding:0;background:${BRAND.background};color:${BRAND.foreground};font-family:Georgia,'Times New Roman',serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:${BRAND.background};">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:720px;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid ${BRAND.border};border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 32px 18px;background:linear-gradient(180deg, #2A2A29 0%, #212120 100%);color:${BRAND.background};">
                    <div style="font-size:11px;line-height:18px;letter-spacing:0.22em;text-transform:uppercase;opacity:0.72;">
                      ${escapeHtml(BRAND.eyebrow)}
                    </div>
                    <div style="padding-top:14px;font-size:34px;line-height:38px;font-weight:400;letter-spacing:0.04em;">
                      FLO RD
                    </div>
                    <div style="font-size:15px;line-height:22px;letter-spacing:0.24em;text-transform:uppercase;opacity:0.84;">
                      COUTELLERIE
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px 10px;">
                    <div style="font-size:11px;line-height:18px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.muted};">
                      ${escapeHtml(eyebrow)}
                    </div>
                    <h1 style="margin:10px 0 12px;font-size:32px;line-height:36px;font-weight:400;color:${BRAND.foreground};">
                      ${escapeHtml(title)}
                    </h1>
                    <p style="margin:0;font-size:15px;line-height:24px;color:${BRAND.muted};">
                      ${escapeHtml(intro)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 32px 8px;">
                    ${sectionsHtml}
                  </td>
                </tr>
                ${actionHtml}
                <tr>
                  <td style="padding:28px 32px 32px;">
                    <div style="height:1px;background:${BRAND.accentSoft};margin-bottom:18px;"></div>
                    <p style="margin:0;font-size:12px;line-height:20px;color:${BRAND.muted};">
                      Email genere depuis le site ${escapeHtml(BRAND.name)}.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function renderMultilineValue(value: string) {
  return escapeHtml(value).replace(/\n/g, '<br />')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
