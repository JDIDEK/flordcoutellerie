import type { HandleFamily } from '../types'

export const handleFamilies: HandleFamily[] = [
  {
    id: 'bois-local',
    label: 'Bois locaux',
    description: 'Chêne, noyer, hêtre, frêne... issus de forêts françaises',
    priceLevel: 1,
    variants: [
      { id: 'chene', label: 'Chêne' },
      { id: 'noyer', label: 'Noyer' },
      { id: 'hetre', label: 'Hêtre' },
      { id: 'frene', label: 'Frêne' },
    ],
  },
  {
    id: 'bois-exotique',
    label: 'Bois exotiques',
    description: 'Padouk, wengé, ébène, palissandre...',
    priceLevel: 2,
    variants: [
      { id: 'padouk', label: 'Padouk' },
      { id: 'wenge', label: 'Wengé' },
      { id: 'ebene', label: 'Ébène' },
      { id: 'palissandre', label: 'Palissandre' },
    ],
  },
  {
    id: 'stabilise',
    label: 'Bois stabilisé',
    description: 'Loupe teintée résine, couleurs vives, très résistant',
    priceLevel: 3,
    variants: [
      { id: 'loupe-teintee', label: 'Loupe teintée' },
      { id: 'hybride-resine', label: 'Hybride résine' },
    ],
  },
  {
    id: 'synthetique',
    label: 'Synthétiques',
    description: 'G10, Micarta, fibre de carbone',
    priceLevel: 2,
    variants: [
      { id: 'g10', label: 'G10' },
      { id: 'micarta', label: 'Micarta' },
      { id: 'carbone', label: 'Fibre de carbone' },
    ],
  },
  {
    id: 'exceptionnel',
    label: 'Matériaux exceptionnels',
    description: 'Ivoire de mammouth, nacre, corne, météorite...',
    priceLevel: 5,
    variants: [
      { id: 'ivoire-mammouth', label: 'Ivoire de mammouth' },
      { id: 'nacre', label: 'Nacre' },
      { id: 'corne', label: 'Corne' },
      { id: 'meteorite', label: 'Météorite' },
    ],
  },
]
