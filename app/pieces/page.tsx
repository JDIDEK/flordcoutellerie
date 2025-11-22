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
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-2xl mx-auto mb-16 space-y-4 text-center">
            <div className="space-y-2">
              <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
                Disponibles
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground">
                Pièces Uniques
              </h1>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Chaque couteau est une création originale, forgée à la main dans mon atelier. 
              Les pièces marquées comme vendues peuvent être recréées sur commande avec des variations uniques.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {pieces.map((piece) => (
              <ProductCard key={piece._id} piece={piece} />
            ))}
          </div>

          {/* Custom Order CTA */}
          <div className="max-w-2xl mx-auto border border-border rounded-sm p-10 text-center space-y-6 mt-16">
            <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-foreground">
              Vous ne trouvez pas votre lame idéale ?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Créons ensemble votre couteau sur mesure. Choix des aciers, dimensions, 
              manches et finitions personnalisées.
            </p>
            <Button asChild size="lg">
              <Link href="/sur-mesure">
                Commander sur Mesure
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
