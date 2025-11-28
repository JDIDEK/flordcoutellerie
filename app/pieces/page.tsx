// app/pieces/page.tsx
import { Navigation } from '@/components/navigation'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getPieces } from '@/lib/sanity/queries'

export default async function PiecesPage() {
  const pieces = await getPieces()

  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* ---------- TITRE CENTRÉ ---------- */}
          <h1 className="text-3xl md:text-4xl font-light text-center tracking-tight mb-24">
            Pièces
          </h1>

          {/* ---------- GRILLE PRODUITS ---------- */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {pieces.map((piece) => (
              <ProductCard key={piece._id} piece={piece} />
            ))}
          </div>

          {/* ---------- CTA SUR-MESURE ---------- */}
          <div className="max-w-2xl mx-auto border border-border rounded-sm p-10 text-center space-y-6 mt-24">
            <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-foreground">
              Vous ne trouvez pas votre lame idéale ?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Créons ensemble votre couteau sur mesure. Choix des aciers, dimensions, 
              manches et finitions personnalisées.
            </p>
            <Button asChild size="lg">
              <Link href="/sur-mesure">
                Commander sur mesure
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
