export function getClientIp(req: Request) {
  for (const headerName of [
    'x-vercel-forwarded-for',
    'cf-connecting-ip',
    'x-real-ip',
    'x-forwarded-for',
  ]) {
    const candidate = parseIpHeader(req.headers.get(headerName))
    if (candidate) {
      return candidate
    }
  }

  return 'unknown'
}

export function escapeJsonForHtml(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

function parseIpHeader(value: string | null) {
  if (!value) {
    return null
  }

  const candidate = value
    .split(',')
    .map((part) => part.trim())
    .find(Boolean)

  if (!candidate) {
    return null
  }

  return isValidIp(candidate) ? candidate : null
}

function isValidIp(value: string) {
  const ipv4Pattern =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/
  const ipv6Pattern = /^[a-f0-9:]+$/i

  return ipv4Pattern.test(value) || ipv6Pattern.test(value)
}
