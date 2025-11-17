import { Navigation } from '@/components/navigation'
import { ProductCard } from '@/components/product-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const pieces = [
  {
    id: 1,
    title: 'Gyuto Damasteel',
    subtitle: 'Couteau de Chef',
    steel: 'Damasteel DS93X Fafnir',
    layers: '67 couches',
    hrc: '64 HRC',
    handle: 'Loupe de Peuplier stabilisée',
    length: '240mm',
    price: '1150',
    originalPrice: '1290',
    stock: 'available',
    image: '/assets/images/damascus-steel-chef-knife-gyuto-kitchen.jpg',
    features: ['Trempe différentielle', 'Guillochage fleuri', 'Étui cuir offert']
  },
  {
    id: 2,
    title: 'Bushcraft Inox',
    subtitle: 'Survie & Outdoor',
    steel: '14C28N Swedish Steel',
    layers: 'Inox',
    hrc: '58-60 HRC',
    handle: 'G10 noir texturé',
    length: '115mm',
    price: '390',
    stock: 'available',
    image: '/assets/images/bushcraft-survival-knife-outdoor-blade.jpg',
    features: ['Pleine soie', 'Fire starter', 'Étui Kydex']
  },
  {
    id: 3,
    title: 'Santoku VG10',
    subtitle: 'Couteau Polyvalent',
    steel: 'VG10 Suminagashi',
    layers: '67 couches',
    hrc: '60-61 HRC',
    handle: 'Résine alvéolée bronze',
    length: '180mm',
    price: '850',
    stock: 'sold',
    image: '/assets/images/santoku-kitchen-knife-damascus-japanese.jpg',
    features: ['Affûtage convexe', 'Gravure personnalisable']
  },
  {
    id: 4,
    title: 'Yanagiba Traditionnel',
    subtitle: 'Sushi & Sashimi',
    steel: 'VG10 Suminagashi',
    layers: '67 couches',
    hrc: '61 HRC',
    handle: 'Bois de Ho japonais',
    length: '270mm',
    price: '1280',
    stock: 'available',
    image: '/assets/images/yanagiba-sushi-knife-damascus-steel.jpg',
    features: ['Biseautage asymétrique', 'Saya bois offerte']
  },
  {
    id: 5,
    title: 'Piémontais Damas',
    subtitle: 'Couteau Pliant',
    steel: 'Damasteel DS93X Rose',
    layers: '67 couches',
    hrc: '64 HRC',
    handle: 'Morta 3000 ans',
    length: '95mm fermé',
    price: '980',
    stock: 'available',
    image: '/assets/images/folding-pocket-knife-damascus-premium.jpg',
    features: ['Cran forcé', 'Guillochage sabliers', 'Livré en coffret']
  },
  {
    id: 6,
    title: 'Nakiri Végétal',
    subtitle: 'Légumes',
    steel: '14C28N Swedish Steel',
    layers: 'Inox satiné',
    hrc: '59 HRC',
    handle: 'Olivier stabilisé',
    length: '165mm',
    price: '620',
    stock: 'sold',
    image: '/assets/images/nakiri-vegetable-knife-steel-blade.jpg',
    features: ['Lame fine', 'Équilibre parfait']
  },
]

export default function PiecesPage() {
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
              <ProductCard key={piece.id} piece={piece} />
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
