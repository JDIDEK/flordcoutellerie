import type { Metadata } from 'next'
import { Arsenal_SC, Josefin_Sans, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClientProviders } from '@/components/ClientProviders'
import { SiteLoader } from '@/components/Loader'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ViewportHeight } from '@/components/ViewportHeight'
import '@/styles/globals.css'

const arsenalSC = Arsenal_SC({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-title',
})

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-subtitle',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: "Flo RD Coutellerie | Couteaux d'Art Français",
  description:
    "Coutelier d'art français créant des lames sur mesure et pièces uniques. Aciers Damasteel, VG10, 14C28N. Guillochage fleuri et manches en bois précieux.",
  generator: 'v0.app',
  keywords: ['coutellerie artisanale', 'couteaux sur mesure', 'damasteel', 'forge française', 'lames artisanales'],
  icons: {
    icon: [
      { url: '/assets/images/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/assets/images/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/assets/images/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/assets/images/apple-icon.png',
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
      <body className={`${arsenalSC.variable} ${josefinSans.variable} ${poppins.variable} font-body antialiased`}>
        <ViewportHeight />
        <SiteLoader />
        <ThemeToggle />
        <ClientProviders>{children}</ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
