import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export function getSanityWriteClient() {
  const token = process.env.SANITY_WRITE_TOKEN

  if (!token) {
    throw new Error('Missing environment variable: SANITY_WRITE_TOKEN')
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })
}
