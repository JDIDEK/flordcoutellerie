import { groq } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import type { PieceDetail, PieceListItem, SignaturePiece } from '@/lib/sanity/types'

const piecesListQuery = groq`
  *[_type == "piece"]
    | order(status asc, coalesce(homeOrder, 999), _createdAt desc){
    _id,
    title,
    subtitle,
    category,
    status,
    price,
    originalPrice,
    steel,
    layers,
    hrc,
    handle,
    length,
    weight,
    description,
    features,
    steelSummary,
    highlightOnHome,
    homeOrder,
    "slug": slug.current,
    "mainImage": mainImage
  }
`

const pieceDetailQuery = groq`
  *[_type == "piece" && slug.current == $slug][0]{
    _id,
    title,
    subtitle,
    category,
    status,
    price,
    originalPrice,
    steel,
    layers,
    hrc,
    handle,
    length,
    weight,
    description,
    features,
    steelSummary,
    highlightOnHome,
    "slug": slug.current,
    "mainImage": mainImage,
    gallery
  }
`

const signaturePiecesQuery = groq`
  *[_type == "piece" && highlightOnHome == true]
    | order(homeOrder asc, _createdAt desc)[0...4]{
    _id,
    title,
    status,
    price,
    steelSummary,
    "slug": slug.current,
    "mainImage": mainImage
  }
`

const pieceSlugsQuery = groq`*[_type == "piece" && defined(slug.current)]{ "slug": slug.current }`

export async function getPieces() {
  return client.fetch<PieceListItem[]>(
    piecesListQuery, 
    {}, 
    { next: { tags: ['piece'] } }
  )
}

export async function getPieceBySlug(slug: string) {
  return client.fetch<PieceDetail | null>(
    pieceDetailQuery, 
    { slug }, 
    { next: { tags: ['piece'] } }
  )
}

export async function getSignaturePieces() {
  return client.fetch<SignaturePiece[]>(
    signaturePiecesQuery, 
    {}, 
    { next: { tags: ['piece'] } }
  )
}

export async function getAllPieceSlugs() {
  const slugs = await client.fetch<{ slug?: string }[]>(pieceSlugsQuery)
  return slugs
    .map((entry) => entry.slug)
    .filter((slug): slug is string => typeof slug === 'string')
}