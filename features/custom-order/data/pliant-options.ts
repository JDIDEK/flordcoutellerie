import type { PliantMechanism, PliantForm } from '../types'
import { getCustomOrderFormAsset, getCustomOrderMechanismAsset } from '../assets'

export const pliantMechanisms: PliantMechanism[] = [
  {
    id: 'cran-plat',
    label: 'Cran forcé',
    description: 'Un ressort maintient la lame en position\nouverte ou fermée',
    imageSrc: getCustomOrderMechanismAsset('cran-plat'),
    imageAlt: 'Mécanisme cran forcé',
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
      profile: '',
      description: '',
      imageSrc: getCustomOrderFormAsset('pliant', 'cran-force-forme-1'),
      imageAlt: 'Forme 1 cran forcé',
    },
    {
      id: 'forme-2-c',
      label: 'Forme 2',
      profile: '',
      description: '',
      imageSrc: getCustomOrderFormAsset('pliant', 'cran-force-forme-2'),
      imageAlt: 'Forme 2 cran forcé',
    },
  ],
  'piemontais': [
    {
      id: 'coupage-p',
      label: 'Coupage',
      profile: '',
      description: '',
      imageSrc: getCustomOrderFormAsset('pliant', 'piemontais-coupage'),
      imageAlt: 'Forme Coupage piémontais',
    },
    {
      id: 'a-venir-p',
      label: 'À venir',
      profile: '',
      description: '',
      disabled: true,
    },
  ],
}
