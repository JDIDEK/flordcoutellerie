// app/pieces/page.tsx
import { Navigation } from '@/components/navigation'
import { ProductCard } from '@/components/product-card'
import { getPieces } from '@/lib/sanity/queries'

export default async function PiecesPage() {
  const pieces = await getPieces()

  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">

          {/* ---------- TITRE CENTRÉ ---------- */}
          <h1 className="text-3xl md:text-6xl font-light text-center tracking-tight mb-12 md:mb-24 animate-fade-in-up">
            Pièces
          </h1>

          {/* ---------- GRILLE PRODUITS ---------- */}
          <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {pieces.map((piece, index) => (
              <div
                key={piece._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <ProductCard piece={piece} />
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  )
}
