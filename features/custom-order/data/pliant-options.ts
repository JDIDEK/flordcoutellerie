import type { PliantMechanism, PliantForm } from '../types'
import { getCustomOrderMechanismAsset } from '../assets'

export const pliantMechanisms: PliantMechanism[] = [
  {
    id: 'cran-plat',
    label: 'Cran plat',
    description: 'Un ressort maintient la lame en position\nouverte ou fermée',
    imageSrc: getCustomOrderMechanismAsset('cran-plat'),
    imageAlt: 'Mécanisme cran plat',
  },
  {
    id: 'piemontais',
    label: 'Piémontais',
    description: 'Mécanisme à friction, sans\nverrouillage',
    imageSrc: getCustomOrderMechanismAsset('piemontais'),
    imageAlt: 'Mécanisme piémontais',
  },
]

export const pliantFormsByMechanism: Record<string, PliantForm[]> = {
  'cran-plat': [
    {
      id: 'forme-1-c',
      label: 'Forme 1',
      profile: 'forme1',
      description: 'description forme1',
    },
    {
      id: 'forme-2-c',
      label: 'Forme 2',
      profile: 'forme2',
      description: 'description forme2',
    },
  ],
  'piemontais': [
    {
      id: 'forme-1-p',
      label: 'Forme 1',
      profile: 'forme1',
      description: 'description forme1',
    },
    {
      id: 'forme-2-p',
      label: 'Forme 2',
      profile: 'forme2',
      description: 'description forme2',
    },
    {
      id: 'outdoor-p',
      label: 'À venir',
      profile: '',
      description: '',
      disabled: true,
    },
  ],
}
