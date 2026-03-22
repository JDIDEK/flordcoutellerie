import type { SteelOption, Usage } from '../types'
import { getCustomOrderSteelAsset } from '../assets'

export const steelOptionsCuisine: SteelOption[] = [
  {
    id: '14c28n',
    label: '14C28N',
    description: 'Inox Suédois\n100% inoxydable',
    imageSrc: getCustomOrderSteelAsset('cuisine', '14c28n'),
    imageAlt: 'Acier 14C28N',
    tech: { retention: 3, sharpening: 5, flexibility: 3, price: 2 },
  },
  {
    id: 'suminagashi-vg10',
    label: 'Suminagashi VG10',
    description: 'Damas Japonais\n100% inoxydable',
    imageSrc: getCustomOrderSteelAsset('cuisine', 'suminagashi-vg10'),
    imageAlt: 'Acier Suminagashi VG10',
    tech: { retention: 4, sharpening: 4, flexibility: 1, price: 3 },
  },
  {
    id: 'damasteel',
    label: 'Damasteel DS93X',
    description: 'Damas Suédois\n100% inoxydable',
    imageSrc: getCustomOrderSteelAsset('cuisine', 'damasteel'),
    imageAlt: 'Acier Damasteel DS93X',
    tech: { retention: 5, sharpening: 4, flexibility: 4, price: 5 },
  },
]

export const steelOptionsPliant: SteelOption[] = [
  {
    id: '14c28n',
    label: '14C28N',
    description: 'Inox Suédois\n100% inoxydable',
    imageSrc: getCustomOrderSteelAsset('pliant', '14c28n'),
    imageAlt: 'Acier 14C28N',
    tech: { retention: 3, sharpening: 5, flexibility: 3, price: 2 },
  },
  {
    id: 'suminagashi-vg10',
    label: 'Suminagashi VG10',
    description: 'Damas Japonais\n100% inoxydable',
    imageSrc: getCustomOrderSteelAsset('pliant', 'suminagashi-vg10'),
    imageAlt: 'Acier Suminagashi VG10',
    tech: { retention: 4, sharpening: 4, flexibility: 1, price: 3 },
  },
  {
    id: 'damasteel',
    label: 'Damasteel DS93X',
    description: 'Damas Suédois\n100% inoxydable',
    imageSrc: getCustomOrderSteelAsset('pliant', 'damasteel'),
    imageAlt: 'Acier Damasteel DS93X',
    tech: { retention: 5, sharpening: 4, flexibility: 4, price: 5 },
  },
]

export const steelOptionsOutdoor: SteelOption[] = [
  {
    id: '14c28n',
    label: '14C28N',
    description: 'Inox Suédois\n100% inoxydable',
    imageSrc: getCustomOrderSteelAsset('outdoor', '14c28n'),
    imageAlt: 'Acier 14C28N',
    tech: { retention: 3, sharpening: 5, flexibility: 3, price: 2 },
  },
  {
    id: 'N690Co',
    label: 'N690Co',
    description: 'Inox Autrichien\n100% inoxydable',
    imageSrc: getCustomOrderSteelAsset('outdoor', 'N690Co'),
    imageAlt: 'Acier N690Co',
    tech: { retention: 5, sharpening: 3, flexibility: 4, price: 3 },
  },
  {
    id: 'damasteel',
    label: 'Damasteel DS93X',
    description: 'Damas Suédois\n100% inoxydable',
    imageSrc: getCustomOrderSteelAsset('outdoor', 'damasteel'),
    imageAlt: 'Acier Damasteel DS93X',
    tech: { retention: 5, sharpening: 4, flexibility: 4, price: 5 },
  },
]

export const steelOptionsChasse: SteelOption[] = []

export const steelOptionsByUsage: Record<Usage, SteelOption[]> = {
  cuisine: steelOptionsCuisine,
  pliant: steelOptionsPliant,
  outdoor: steelOptionsOutdoor,
  chasse: steelOptionsChasse,
}

export function getSteelOptionsForUsage(usage?: Usage): SteelOption[] {
  switch (usage) {
    case 'cuisine':
      return steelOptionsCuisine
    case 'pliant':
      return steelOptionsPliant
    case 'outdoor':
      return steelOptionsOutdoor
    case 'chasse':
      return steelOptionsChasse
    default:
      return []
  }
}
