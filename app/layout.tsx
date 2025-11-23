import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/smooth-scroll'
import { FooterWrapper } from '@/components/footer-wrapper'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Flo RD Coutellerie | Couteaux d\'Art Français',
  description: 'Coutelier d\'art français créant des lames sur mesure et pièces uniques. Aciers Damasteel, VG10, 14C28N. Guillochage fleuri et manches en bois précieux.',
  generator: 'v0.app',
  keywords: ['coutellerie artisanale', 'couteaux sur mesure', 'damasteel', 'forge française', 'lames artisanales'],
  icons: {
    icon: [
      {
        url: '/assets/images/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/assets/images/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/assets/images/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/assets/images/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <SmoothScroll />
        {children}
        <FooterWrapper />
        <Analytics />
      </body>
    </html>
  )
}
