import type { SteelOption, Usage } from '../types'

export const steelOptionsCuisine: SteelOption[] = [
  {
    id: 'c130',
    label: 'C130',
    description: 'Acier carbone classique',
    tech: { retention: 4, sharpening: 5, flexibility: 3, price: 1 },
  },
  {
    id: '14c28n',
    label: '14C28N',
    description: 'Inox suédois haut de gamme',
    tech: { retention: 3, sharpening: 4, flexibility: 3, price: 2 },
  },
  {
    id: 'xc75',
    label: 'XC75',
    description: 'Carbone fin, excellent tranchant',
    tech: { retention: 4, sharpening: 5, flexibility: 4, price: 2 },
  },
  {
    id: 'damasteel',
    label: 'Damasteel',
    description: 'Acier de Damas haut de gamme',
    tech: { retention: 4, sharpening: 4, flexibility: 3, price: 5 },
  },
]

export const steelOptionsPliant: SteelOption[] = [
  {
    id: '14c28n',
    label: '14C28N',
    description: 'Inox suédois, entretien facile',
    tech: { retention: 3, sharpening: 4, flexibility: 3, price: 2 },
  },
  {
    id: 'xc75',
    label: 'XC75',
    description: 'Carbone traditionnel',
    tech: { retention: 4, sharpening: 5, flexibility: 4, price: 2 },
  },
  {
    id: 'damasteel',
    label: 'Damasteel',
    description: 'Damas haut de gamme, motifs uniques',
    tech: { retention: 4, sharpening: 4, flexibility: 3, price: 5 },
  },
]

export const steelOptionsOutdoor: SteelOption[] = [
  {
    id: 'c130',
    label: 'C130',
    description: 'Carbone robuste, affûtage terrain',
    tech: { retention: 4, sharpening: 5, flexibility: 3, price: 1 },
  },
  {
    id: '14c28n',
    label: '14C28N',
    description: 'Inox anti-corrosion',
    tech: { retention: 3, sharpening: 4, flexibility: 3, price: 2 },
  },
  {
    id: 'xc75',
    label: 'XC75',
    description: 'Carbone performant',
    tech: { retention: 4, sharpening: 5, flexibility: 4, price: 2 },
  },
  {
    id: 'damasteel',
    label: 'Damasteel',
    description: 'Damas premium, résistant',
    tech: { retention: 4, sharpening: 4, flexibility: 3, price: 5 },
  },
]

export const steelOptionsChasse: SteelOption[] = []

export function getSteelOptionsForUsage(usage?: Usage): SteelOption[] {
  switch (usage) {
    case 'cuisine':
      return steelOptionsCuisine
    case 'pliant':
      return steelOptionsPliant
    case 'outdoor':
      return steelOptionsOutdoor
    default:
      return []
  }
}
