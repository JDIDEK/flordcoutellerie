const DEFAULT_SITE_ORIGIN = 'https://flordcoutellerie.fr'

export function getPublicSiteOrigin() {
  return parseOrigin(process.env.NEXT_PUBLIC_APP_URL) ?? DEFAULT_SITE_ORIGIN
}

export function getRequiredSiteOrigin() {
  const origin = parseOrigin(process.env.NEXT_PUBLIC_APP_URL)

  if (origin) {
    return origin
  }

  if (process.env.NODE_ENV !== 'production') {
    return DEFAULT_SITE_ORIGIN
  }

  throw new Error('Missing or invalid NEXT_PUBLIC_APP_URL')
}

export function getAllowedSiteOrigins() {
  const origins = new Set<string>()

  addOrigin(origins, process.env.NEXT_PUBLIC_APP_URL)
  addOriginList(origins, process.env.APP_ALLOWED_ORIGINS)

  if (process.env.NODE_ENV !== 'production') {
    addOrigin(
      origins,
      process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : null
    )
    addOrigin(origins, process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    addOrigin(
      origins,
      process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : null
    )
  }

  if (origins.size === 0) {
    origins.add(DEFAULT_SITE_ORIGIN)
  }

  return origins
}

function addOrigin(origins: Set<string>, value?: string | null) {
  const origin = parseOrigin(value)
  if (origin) {
    origins.add(origin)
  }
}

function addOriginList(origins: Set<string>, value?: string | null) {
  if (!value) {
    return
  }

  value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .forEach((entry) => addOrigin(origins, entry))
}

function parseOrigin(value?: string | null) {
  if (!value) {
    return null
  }

  try {
    return new URL(value).origin
  } catch {
    return null
  }
}
