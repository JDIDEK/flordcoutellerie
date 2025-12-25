import type { MetadataRoute } from 'next'

import { getAllPieceSlugs } from '@/lib/sanity/queries'

const siteUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000').replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pieceSlugs = await getAllPieceSlugs()
  const now = new Date()

  const staticRoutes = [
    '',
    '/pieces',
    '/sur-mesure',
    '/galerie',
    '/atelier',
    '/contact',
    '/cgv',
    '/mentions-legales',
    '/politique-confidentialite',
  ]

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
    })),
    ...pieceSlugs.map((slug) => ({
      url: `${siteUrl}/pieces/${slug}`,
      lastModified: now,
    })),
  ]
}
