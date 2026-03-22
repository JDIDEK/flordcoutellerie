import { NextResponse } from 'next/server'

import { getAllowedSiteOrigins } from '@/lib/app-origin'
import {
  INTERNAL_API_REQUEST_HEADER,
  INTERNAL_API_REQUEST_VALUE,
} from '@/lib/internal-api'

const JSON_CONTENT_TYPE = 'application/json'

export function validateInternalJsonRequest(req: Request) {
  const contentType = req.headers.get('content-type')?.toLowerCase() ?? ''
  if (!contentType.startsWith(JSON_CONTENT_TYPE)) {
    return NextResponse.json(
      { error: 'Le contenu JSON est requis.' },
      { status: 415 }
    )
  }

  if (req.headers.get(INTERNAL_API_REQUEST_HEADER) !== INTERNAL_API_REQUEST_VALUE) {
    return NextResponse.json(
      { error: 'Requete interne invalide.' },
      { status: 403 }
    )
  }

  const fetchSite = req.headers.get('sec-fetch-site')
  if (fetchSite === 'cross-site') {
    return NextResponse.json(
      { error: 'Les requetes cross-site sont refusees.' },
      { status: 403 }
    )
  }

  const requestOrigin = getRequestOrigin(req)
  if (!requestOrigin) {
    return NextResponse.json(
      { error: "L'origine de la requete n'a pas pu etre verifiee." },
      { status: 403 }
    )
  }

  if (!getAllowedOrigins(req).has(requestOrigin)) {
    return NextResponse.json(
      { error: 'Origine de requete non autorisee.' },
      { status: 403 }
    )
  }

  return null
}

function getRequestOrigin(req: Request) {
  const source = req.headers.get('origin') ?? req.headers.get('referer')
  if (!source) {
    return null
  }

  try {
    return new URL(source).origin
  } catch {
    return null
  }
}

function getAllowedOrigins(req: Request) {
  const origins = getAllowedSiteOrigins()

  if (process.env.NODE_ENV !== 'production') {
    try {
      origins.add(new URL(req.url).origin)
    } catch {
      // Ignore malformed request URLs in development fallback mode.
    }
  }

  return origins
}
