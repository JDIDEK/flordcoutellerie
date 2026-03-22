import type { SheathOption, Usage } from '../types'
import { getSheathAsset } from '../assets'

export const sheathOptionsCuisine: SheathOption[] = []

export const sheathOptionsPliant: SheathOption[] = []

export const sheathOptionsOutdoor: SheathOption[] = [
  {
    id: 'kydex',
    label: 'Kydex',
    description: 'Etui rigide à mémoire de forme',
    note: 'Etanche',
    imageSrc: getSheathAsset('kydex'),
    imageAlt: 'Étui kydex',
  },
  {
    id: 'cuir',
    label: 'Cuir',
    description: 'Etui souple en cuir pleine fleur',
    note: 'Non étanche',
    imageSrc: getSheathAsset('cuir'),
    imageAlt: 'Étui cuir',
  },
]

export const sheathOptionsChasse: SheathOption[] = [
  {
    id: 'kydex',
    label: 'Kydex',
    description: 'Etui rigide à mémoire de forme',
    note: 'Etanche',
    imageSrc: getSheathAsset('kydex'),
    imageAlt: 'Étui kydex chasse',
  },
  {
    id: 'cuir',
    label: 'Cuir',
    description: 'Etui souple en cuir pleine fleur',
    note: 'Non étanche',
    imageSrc: getSheathAsset('cuir'),
    imageAlt: 'Étui cuir chasse',
  },
]

export const sheathOptions: SheathOption[] = [
  ...sheathOptionsCuisine,
  ...sheathOptionsPliant,
  ...sheathOptionsOutdoor,
  ...sheathOptionsChasse,
]

export const sheathOptionsByUsage: Record<Usage, SheathOption[]> = {
  cuisine: sheathOptionsCuisine,
  pliant: sheathOptionsPliant,
  outdoor: sheathOptionsOutdoor,
  chasse: sheathOptionsChasse,
}

export function getSheathOptionsForUsage(usage?: Usage): SheathOption[] {
  switch (usage) {
    case 'cuisine':
      return sheathOptionsCuisine
    case 'pliant':
      return sheathOptionsPliant
    case 'outdoor':
      return sheathOptionsOutdoor
    case 'chasse':
      return sheathOptionsChasse
    default:
      return []
  }
}
