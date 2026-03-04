import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import { ClientProviders } from '@/components/ClientProviders'
import { SiteLoader } from '@/components/Loader'
import { ViewportHeight } from '@/components/ViewportHeight'
import { AnalyticsGate } from '@/components/AnalyticsGate'
import '@/styles/globals.css'

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
      { url: '/assets/images/Logo-Clair-Petit.svg', media: '(prefers-color-scheme: light)' },
      { url: '/assets/images/Logo-Clair-Petit.svg', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/assets/images/flo/flo.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${cormorant.variable} font-body antialiased`}>
        <ViewportHeight />
        <SiteLoader />
        <ClientProviders>{children}</ClientProviders>
        <AnalyticsGate />
      </body>
    </html>
  )
}
