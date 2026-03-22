export const INTERNAL_API_REQUEST_HEADER = 'x-flord-request'
export const INTERNAL_API_REQUEST_VALUE = 'same-origin'

export function createInternalJsonHeaders(
  extraHeaders: Record<string, string> = {}
) {
  return {
    'Content-Type': 'application/json',
    [INTERNAL_API_REQUEST_HEADER]: INTERNAL_API_REQUEST_VALUE,
    ...extraHeaders,
  }
}
