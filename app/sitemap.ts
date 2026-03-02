import type { MetadataRoute } from 'next'

import { getAllPieceSlugs } from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://flordcoutellerie.fr'

  const slugs = await getAllPieceSlugs()

  const pieceUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/pieces/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/pieces`, priority: 0.9 },
    { url: `${baseUrl}/sur-mesure`, priority: 0.8 },
    { url: `${baseUrl}/atelier`, priority: 0.7 },
    { url: `${baseUrl}/galerie`, priority: 0.7 },
    { url: `${baseUrl}/formation`, priority: 0.6 },
    { url: `${baseUrl}/contact`, priority: 0.6 },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...pieceUrls]
}
