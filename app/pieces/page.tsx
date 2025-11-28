// app/pieces/page.tsx
import { Navigation } from '@/components/navigation'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getPieces } from '@/lib/sanity/queries'

export default async function PiecesPage() {
  const pieces = await getPieces()

  // Pour l'instant c’est juste du décor, mais c’est prêt pour brancher les vraies catégories.
  const categories = ['Toutes', 'Couteaux de cuisine', 'Pliants', 'Pièces d’exception']

  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Top bar : filtres + compteur, comme sur le screen */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {categories.map((cat, index) => (
                <button
                  key={cat}
                  type="button"
                  className={[
                    'relative pb-0.5',
                    index === 0
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground transition-colors',
                  ].join(' ')}
                >
                  {cat}
                  {index === 0 && (
                    <span className="absolute left-0 -bottom-px h-[1px] w-full bg-foreground" />
                  )}
                </button>
              ))}
            </nav>

            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
              {pieces.length} pièces
            </p>
          </div>

          {/* Petit texte de contexte, sobre */}
          <div className="max-w-xl mb-12 space-y-3">
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Pièces uniques
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Chaque couteau est une création originale, forgée à la main dans l’atelier. 
              Les pièces marquées comme vendues peuvent être recréées sur commande, 
              avec des variations propres à chaque lame.
            </p>
          </div>

          {/* Grille produits : 3 colonnes avec gros visuels */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {pieces.map((piece) => (
              <ProductCard key={piece._id} piece={piece} />
            ))}
          </div>

          {/* Bloc sur-mesure en bas */}
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
