// app/pieces/page.tsx
import { Navigation } from '@/components/Navigation'
import { ProductCard } from '@/components/ProductCard'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { getPieces } from '@/lib/sanity/queries'

export default async function PiecesPage() {
  const pieces = await getPieces()

  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <main className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">

          {/* ---------- TITRE CENTRÉ ---------- */}
          <h1 className="text-3xl md:text-6xl font-serif font-light text-center tracking-tight text-foreground mb-12 md:mb-24 md:animate-fade-in-up">
            Pièces disponibles
          </h1>

          {/* ---------- GRILLE PRODUITS ---------- */}
          <div className="grid grid-cols-2 gap-4 md:gap-10 lg:grid-cols-3">
            {pieces.map((piece, index) => (
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
      </main>
      </PageTransitionWrapper>
    </>
  )
}
