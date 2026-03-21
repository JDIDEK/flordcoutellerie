import { groq } from 'next-sanity'

import { revalidatePieceTag } from '@/lib/cache'
import { logger } from '@/lib/logger'
import { getSanityWriteClient } from '@/sanity/lib/write-client'

export async function releaseCheckoutReservation({
  sanity,
  pieceIds,
  reservationId,
}: {
  sanity: ReturnType<typeof getSanityWriteClient>
  pieceIds: string[]
  reservationId: string
}) {
  try {
    const pieces = await sanity.fetch<
      Array<{
        _id: string
        _rev: string
        status?: string
        reservationId?: string
      }>
    >(
      groq`
        *[_type == "piece" && _id in $ids]{
          _id,
          _rev,
          status,
          reservationId
        }
      `,
      { ids: pieceIds },
      { cache: 'no-store' }
    )

    const releasablePieces = pieces.filter(
      (piece) => piece.status === 'reserved' && piece.reservationId === reservationId
    )

    if (releasablePieces.length === 0) {
      return { released: false }
    }

    const tx = sanity.transaction()
    releasablePieces.forEach((piece) => {
      tx.patch(piece._id, (patch) =>
        patch
          .ifRevisionId(piece._rev)
          .set({ status: 'available' })
          .unset(['reservationId', 'reservedAt', 'reservationExpiresAt'])
      )
    })

    await tx.commit({ visibility: 'sync' })
    revalidatePieceTag()

    return {
      released: true,
      releasedPieceIds: releasablePieces.map((piece) => piece._id),
    }
  } catch (error) {
    logger.error('Failed to release checkout reservation', error, {
      pieceIds,
      reservationId,
    })
    throw error
  }
}
