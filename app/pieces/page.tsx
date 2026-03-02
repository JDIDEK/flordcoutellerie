// app/pieces/page.tsx
import { Navigation } from '@/components/Navigation'
import { ProductCard } from '@/components/ProductCard'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { getPieces } from '@/lib/sanity/queries'

export default async function PiecesPage() {
  const pieces = await getPieces()

  const available = pieces.filter((p) => !p.status || p.status === 'available')
  const soldOrReserved = pieces.filter(
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
              Les pièces
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
