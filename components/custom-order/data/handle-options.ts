import type { HandleFamily } from '../types'

export const handleFamilies: HandleFamily[] = [
  {
    id: 'bois',
    label: 'Bois',
    description: 'Clair, sombre, ou coloré',
    priceLevel: 2,
  },
  {
    id: 'synthetique',
    label: 'Synthétique',
    description: 'Résine, Carbone, Composite...',
    note: 'Étanche',
    priceLevel: 2,
  },
  {
    id: 'animal',
    label: 'Animal',
    description: 'Cerf, Corne, Os...',
    priceLevel: 3,
  },
  {
    id: 'exceptionnel',
    label: 'Exceptionnel',
    description: 'Ivoire, Fossile, Pièces Uniques',
    priceLevel: 5,
  },
]
