import type { SteelOption, Usage } from '../types'

export const steelOptionsCuisine: SteelOption[] = [
  {
    id: '14c28n',
    label: '14C28N',
    description: 'Inox Suédois\n100% inoxydable',
    tech: { retention: 3, sharpening: 5, flexibility: 3, price: 2 },
  },
  {
    id: 'suminagashi-vg10',
    label: 'Suminagashi VG10',
    description: 'Damas Japonais\n100% inoxydable',
    tech: { retention: 4, sharpening: 4, flexibility: 1, price: 3 },
  },
  {
    id: 'damasteel',
    label: 'Damasteel DS93X',
    description: 'Damas Suédois\n100% inoxydable',
    tech: { retention: 5, sharpening: 4, flexibility: 4, price: 5 },
  },
]

export const steelOptionsPliant: SteelOption[] = [
  {
    id: '14c28n',
    label: '14C28N',
    description: 'Inox Suédois\n100% inoxydable',
    tech: { retention: 3, sharpening: 5, flexibility: 3, price: 2 },
  },
  {
    id: 'suminagashi-vg10',
    label: 'Suminagashi VG10',
    description: 'Damas Japonais\n100% inoxydable',
    tech: { retention: 4, sharpening: 4, flexibility: 1, price: 3 },
  },
  {
    id: 'damasteel',
    label: 'Damasteel DS93X',
    description: 'Damas Suédois\n100% inoxydable',
    tech: { retention: 5, sharpening: 4, flexibility: 4, price: 5 },
  },
]

export const steelOptionsOutdoor: SteelOption[] = [
  {
    id: '14c28n',
    label: '14C28N',
    description: 'Inox Suédois\n100% inoxydable',
    tech: { retention: 3, sharpening: 5, flexibility: 3, price: 2 },
  },
  {
    id: 'N690Co',
    label: 'N690Co',
    description: 'Inox Autrichien\n100% inoxydable',
    tech: { retention: 5, sharpening: 3, flexibility: 4, price: 3 },
  },
  {
    id: 'damasteel',
    label: 'Damasteel DS93X',
    description: 'Damas Suédois\n100% inoxydable',
    tech: { retention: 5, sharpening: 4, flexibility: 4, price: 5 },
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
