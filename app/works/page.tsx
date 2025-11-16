import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const collections = [
  {
    id: 1,
    title: 'Collection Damasteel 2024',
    subtitle: 'Série limitée',
    year: '2024',
    pieces: 8,
    category: 'Cuisine',
    image: '/damascus-steel-chef-knife-gyuto-kitchen.jpg',
    description: 'Une série de couteaux de chef en Damasteel DS93X avec différents motifs et manches en bois précieux.'
  },
  {
    id: 2,
    title: 'Bushcraft Série Noire',
    subtitle: 'Outdoor premium',
    year: '2024',
    pieces: 6,
    category: 'Outdoor',
    image: '/bushcraft-survival-knife-outdoor-blade.jpg',
    description: 'Couteaux de survie en 14C28N avec manches G10 texturé et étuis Kydex personnalisés.'
  },
  {
    id: 3,
    title: 'Pliants d\'Exception',
    subtitle: 'Collection couteaux pliants',
    year: '2023-2024',
    pieces: 12,
    category: 'Pliants',
    image: '/folding-pocket-knife-damascus-premium.jpg',
    description: 'Piémontais et cran forcé en Damasteel avec manches en morta millénaire et guillochage artisanal.'
  },
  {
    id: 4,
    title: 'Japonais Traditionnels',
    subtitle: 'Cuisine japonaise',
    year: '2023',
    pieces: 10,
    category: 'Cuisine',
    image: '/santoku-kitchen-knife-damascus-japanese.jpg',
    description: 'Gyuto, Santoku, Nakiri et Yanagiba en VG10 Suminagashi avec finitions traditionnelles.'
  },
  {
    id: 5,
    title: 'Commandes Spéciales',
    subtitle: 'Pièces sur mesure',
    year: '2022-2024',
    pieces: 15,
    category: 'Sur mesure',
    image: '/yanagiba-sushi-knife-damascus-steel.jpg',
    description: 'Créations uniques réalisées sur commande avec personnalisations spécifiques.'
  },
  {
    id: 6,
    title: 'Archives Forge',
    subtitle: 'Premières créations',
    year: '2021-2022',
    pieces: 20,
    category: 'Archives',
    image: '/nakiri-vegetable-knife-steel-blade.jpg',
    description: 'Les premières pièces de l\'atelier, témoignant de l\'évolution de mon travail.'
  },
]

export default function WorksPage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-3xl mb-16 space-y-6">
            <div className="space-y-2">
              <p className="text-sm tracking-[0.3em] text-primary uppercase">
                Portfolio
              </p>
              <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight">
                Works & Collections
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Découvrez mes différentes séries et collections de couteaux artisanaux. 
              Chaque collection raconte une histoire, explore des techniques et célèbre l'art de la coutellerie.
            </p>
          </div>

          {/* Collections Grid */}
          <div className="space-y-24">
            {collections.map((collection, index) => (
              <div 
                key={collection.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Link href="/galerie" className="group block">
                    <div className="aspect-[4/3] overflow-hidden bg-secondary rounded-sm">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </Link>
                </div>

                {/* Content */}
                <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{collection.category}</Badge>
                    <span className="text-sm text-muted-foreground">{collection.year}</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-serif font-light tracking-tight">
                      {collection.title}
                    </h2>
                    <p className="text-lg text-primary">
                      {collection.subtitle}
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <span>{collection.pieces} pièces</span>
                    <span>•</span>
                    <Link href="/galerie" className="hover:text-primary transition-colors">
                      Voir la galerie →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
