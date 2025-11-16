import { Navigation } from '@/components/navigation'
import { HorizontalScrollGallery } from '@/components/horizontal-scroll-gallery'

const collections = [
  {
    id: 1,
    title: 'Collection Damasteel 2024',
    subtitle: 'Série limitée',
    year: '2024',
    pieces: 8,
    category: 'Cuisine',
    image: '/assets/images/damascus-steel-chef-knife-gyuto-kitchen.jpg',
    description: 'Une série de couteaux de chef en Damasteel DS93X avec différents motifs et manches en bois précieux.'
  },
  {
    id: 2,
    title: 'Bushcraft Série Noire',
    subtitle: 'Outdoor premium',
    year: '2024',
    pieces: 6,
    category: 'Outdoor',
    image: '/assets/images/bushcraft-survival-knife-outdoor-blade.jpg',
    description: 'Couteaux de survie en 14C28N avec manches G10 texturé et étuis Kydex personnalisés.'
  },
  {
    id: 3,
    title: 'Pliants d\'Exception',
    subtitle: 'Collection couteaux pliants',
    year: '2023-2024',
    pieces: 12,
    category: 'Pliants',
    image: '/assets/images/folding-pocket-knife-damascus-premium.jpg',
    description: 'Piémontais et cran forcé en Damasteel avec manches en morta millénaire et guillochage artisanal.'
  },
  {
    id: 4,
    title: 'Japonais Traditionnels',
    subtitle: 'Cuisine japonaise',
    year: '2023',
    pieces: 10,
    category: 'Cuisine',
    image: '/assets/images/santoku-kitchen-knife-damascus-japanese.jpg',
    description: 'Gyuto, Santoku, Nakiri et Yanagiba en VG10 Suminagashi avec finitions traditionnelles.'
  },
  {
    id: 5,
    title: 'Commandes Spéciales',
    subtitle: 'Pièces sur mesure',
    year: '2022-2024',
    pieces: 15,
    category: 'Sur mesure',
    image: '/assets/images/yanagiba-sushi-knife-damascus-steel.jpg',
    description: 'Créations uniques réalisées sur commande avec personnalisations spécifiques.'
  },
  {
    id: 6,
    title: 'Archives Forge',
    subtitle: 'Premières créations',
    year: '2021-2022',
    pieces: 20,
    category: 'Archives',
    image: '/assets/images/nakiri-vegetable-knife-steel-blade.jpg',
    description: 'Les premières pièces de l\'atelier, témoignant de l\'évolution de mon travail.'
  },
]

export default function WorksPage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Header */}
        <div className="container mx-auto px-6 pt-32 pb-12">
          <div className="max-w-3xl space-y-6">
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
        </div>

        {/* Horizontal Scroll Gallery */}
        <HorizontalScrollGallery collections={collections} />
      </main>
    </>
  )
}
