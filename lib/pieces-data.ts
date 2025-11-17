export interface Piece {
  id: number
  slug: string
  title: string
  subtitle: string
  steel: string
  layers: string
  hrc: string
  handle: string
  length: string
  price: string
  originalPrice?: string
  stock: 'available' | 'sold'
  image: string
  features: string[]
  description?: string
  weight?: string
  category?: string
}

export const pieces: Piece[] = [
  {
    id: 1,
    slug: 'gyuto-damasteel',
    title: 'Gyuto Damasteel',
    subtitle: 'Couteau de Chef',
    steel: 'Damasteel DS93X Fafnir',
    layers: '67 couches',
    hrc: '64 HRC',
    handle: 'Loupe de Peuplier stabilisée',
    length: '240mm',
    weight: '180g',
    price: '1150',
    originalPrice: '1290',
    stock: 'available',
    category: 'Cuisine',
    image: '/assets/images/damascus-steel-chef-knife-gyuto-kitchen.jpg',
    features: ['Trempe différentielle', 'Guillochage fleuri', 'Étui cuir offert'],
    description: 'Gyuto professionnel forgé en Damasteel DS93X Fafnir avec motif spectaculaire. La trempe différentielle assure une lame ultra-tranchante tout en conservant une flexibilité optimale. Le manche en loupe de peuplier stabilisée offre une prise ergonomique et un équilibre parfait. Idéal pour les chefs exigeants recherchant performance et esthétique.'
  },
  {
    id: 2,
    slug: 'bushcraft-inox',
    title: 'Bushcraft Inox',
    subtitle: 'Survie & Outdoor',
    steel: '14C28N Swedish Steel',
    layers: 'Inox',
    hrc: '58-60 HRC',
    handle: 'G10 noir texturé',
    length: '115mm',
    weight: '165g',
    price: '390',
    stock: 'available',
    category: 'Outdoor',
    image: '/assets/images/bushcraft-survival-knife-outdoor-blade.jpg',
    features: ['Pleine soie', 'Fire starter', 'Étui Kydex'],
    description: 'Couteau bushcraft robuste en acier inoxydable suédois 14C28N, réputé pour sa fiabilité en conditions extrêmes. Construction pleine soie pour une solidité maximale. Livré avec fire starter intégré et étui Kydex moulé sur mesure. Le compagnon idéal pour vos aventures en pleine nature.'
  },
  {
    id: 3,
    slug: 'santoku-vg10',
    title: 'Santoku VG10',
    subtitle: 'Couteau Polyvalent',
    steel: 'VG10 Suminagashi',
    layers: '67 couches',
    hrc: '60-61 HRC',
    handle: 'Résine alvéolée bronze',
    length: '180mm',
    weight: '145g',
    price: '850',
    stock: 'sold',
    category: 'Cuisine',
    image: '/assets/images/santoku-kitchen-knife-damascus-japanese.jpg',
    features: ['Affûtage convexe', 'Gravure personnalisable'],
    description: 'Santoku japonais traditionnel en VG10 Suminagashi 67 couches. Les motifs ondulés caractéristiques créent une lame d\'une beauté exceptionnelle. L\'affûtage convexe garantit une coupe nette et précise. Le manche en résine alvéolée bronze offre une esthétique unique. Vendu mais peut être recréé avec variations.'
  },
  {
    id: 4,
    slug: 'yanagiba-traditionnel',
    title: 'Yanagiba Traditionnel',
    subtitle: 'Sushi & Sashimi',
    steel: 'VG10 Suminagashi',
    layers: '67 couches',
    hrc: '61 HRC',
    handle: 'Bois de Ho japonais',
    length: '270mm',
    weight: '160g',
    price: '1280',
    stock: 'available',
    category: 'Cuisine',
    image: '/assets/images/yanagiba-sushi-knife-damascus-steel.jpg',
    features: ['Biseautage asymétrique', 'Saya bois offerte'],
    description: 'Yanagiba professionnel pour sushi et sashimi, forgé selon la tradition japonaise. Le biseautage asymétrique permet des coupes d\'une finesse exceptionnelle. Manche en bois de Ho traditionnel pour un équilibre parfait. Livré avec sa saya (étui) en bois fait main.'
  },
  {
    id: 5,
    slug: 'piemontais-damas',
    title: 'Piémontais Damas',
    subtitle: 'Couteau Pliant',
    steel: 'Damasteel DS93X Rose',
    layers: '67 couches',
    hrc: '64 HRC',
    handle: 'Morta 3000 ans',
    length: '95mm fermé',
    weight: '85g',
    price: '980',
    stock: 'available',
    category: 'Pliants',
    image: '/assets/images/folding-pocket-knife-damascus-premium.jpg',
    features: ['Cran forcé', 'Guillochage sabliers', 'Livré en coffret'],
    description: 'Piémontais d\'exception en Damasteel DS93X Rose avec motif spectaculaire. Le manche en morta millénaire (chêne fossilisé de 3000 ans) apporte une dimension historique unique. Guillochage sabliers réalisé à la main. Système cran forcé fiable. Présenté dans un coffret en bois.'
  },
  {
    id: 6,
    slug: 'nakiri-vegetal',
    title: 'Nakiri Végétal',
    subtitle: 'Légumes',
    steel: '14C28N Swedish Steel',
    layers: 'Inox satiné',
    hrc: '59 HRC',
    handle: 'Olivier stabilisé',
    length: '165mm',
    weight: '130g',
    price: '620',
    stock: 'sold',
    category: 'Cuisine',
    image: '/assets/images/nakiri-vegetable-knife-steel-blade.jpg',
    features: ['Lame fine', 'Équilibre parfait'],
    description: 'Nakiri japonais spécialisé pour les légumes, avec sa lame large et fine permettant des coupes nettes et précises. Acier inoxydable suédois avec finition satinée élégante. Manche en olivier stabilisé pour une prise confortable. Équilibre parfait pour un usage intensif. Vendu mais recréation possible.'
  },
]

export function getPieceBySlug(slug: string): Piece | undefined {
  return pieces.find(piece => piece.slug === slug)
}

export function getAllPieceSlugs(): string[] {
  return pieces.map(piece => piece.slug)
}
