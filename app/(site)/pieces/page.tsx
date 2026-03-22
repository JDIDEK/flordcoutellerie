// app/pieces/page.tsx
import type { Metadata } from 'next'
import { Navigation } from '@/components/site/Navigation'
import { PageTransitionWrapper } from '@/components/site/PageTransitionWrapper'
import { resolvePieceStatus } from '@/lib/pieces'
import { getPieces } from '@/lib/sanity/queries'
import { ProductCard } from './_components/ProductCard'

export const metadata: Metadata = {
  title: 'Pièces disponibles | Flo RD Coutellerie',
  description: 'Découvrez les couteaux artisanaux disponibles : pièces uniques en acier Damasteel, VG10 et 14C28N, avec guillochage fleuri et manches en bois précieux.',
  openGraph: {
    title: 'Pièces disponibles | Flo RD Coutellerie',
    description: 'Découvrez les couteaux artisanaux disponibles à la vente.',
    url: 'https://flordcoutellerie.fr/pieces',
  },
}

export default async function PiecesPage() {
  const pieces = await getPieces()
  const normalizedPieces = pieces.map((piece) => ({
    ...piece,
    status: resolvePieceStatus(piece.status, piece.reservationExpiresAt),
  }))

  const available = normalizedPieces.filter(
    (piece) => !piece.status || piece.status === 'available'
  )
  const soldOrReserved = normalizedPieces.filter(
    (p) => p.status === 'sold' || p.status === 'reserved'
  )

  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <main className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-20 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">

            {/* ---------- TITRE ---------- */}
            <h1 className="text-3xl md:text-6xl font-serif font-light text-center tracking-tight text-foreground mb-12 md:mb-24 md:animate-fade-in-up">
              Pièces Disponibles
            </h1>

            {/* ---------- DISPONIBLES ---------- */}
            {available.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:gap-10 lg:grid-cols-3">
                {available.map((piece, index) => (
                  <div
                    key={piece._id}
                    className="md:animate-fade-in-up"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <ProductCard piece={piece} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-sm py-16">
                Aucune pièce disponible pour le moment — revenez bientôt.
              </p>
            )}

            {/* ---------- DÉJÀ PARTIES ---------- */}
            {soldOrReserved.length > 0 && (
              <div className="mt-20 md:mt-32">
                <h2 className="text-lg md:text-2xl font-serif font-light text-center tracking-widest text-muted-foreground uppercase mb-8 md:mb-16">
                  Déjà parties
                </h2>
                <div className="grid grid-cols-2 gap-4 md:gap-10 lg:grid-cols-3">
                  {soldOrReserved.map((piece, index) => (
                    <div
                      key={piece._id}
                      className="md:animate-fade-in-up"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <ProductCard piece={piece} />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>
      </PageTransitionWrapper>
    </>
  )
}
