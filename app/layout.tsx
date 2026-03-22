import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Cormorant_Garamond } from 'next/font/google'
import { AnalyticsGate } from '@/components/site/AnalyticsGate'
import { ClientProviders } from '@/components/site/ClientProviders'
import { SiteLoader } from '@/components/site/Loader'
import { ViewportHeight } from '@/components/site/ViewportHeight'
import { brandAssets } from '@/lib/assets/brand'
import '@/styles/globals.css'

const themeInitScript = `
(() => {
  try {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
  } catch (_) {}
})()
`

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: "Flo RD Coutellerie | Couteaux d'Art Français",
  description:
    "Coutelier d'art français créant des lames sur mesure et pièces uniques. Aciers Damasteel, VG10, 14C28N. Guillochage fleuri et manches en bois précieux.",
  generator: 'v0.app',
  keywords: ['coutellerie artisanale', 'couteaux sur mesure', 'damasteel', 'forge française', 'lames artisanales'],
  icons: {
    icon: [
      { url: brandAssets.logos.darkSmall, media: '(prefers-color-scheme: light)' },
      { url: brandAssets.logos.lightSmall, media: '(prefers-color-scheme: dark)' },
    ],
    apple: brandAssets.apple.icon,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${cormorant.variable} font-body antialiased`}>
        <ViewportHeight />
        <SiteLoader />
        <ClientProviders>{children}</ClientProviders>
        <AnalyticsGate />
      </body>
    </html>
  )
}
