import type { HandleFamily } from '../types'
import { getHandleFamilyAsset } from '../assets'

export const handleFamilies: HandleFamily[] = [
  {
    id: 'bois',
    label: 'Bois',
    description: 'Clair, sombre, ou coloré',
    priceLevel: 2,
    imageSrc: getHandleFamilyAsset('bois'),
    imageAlt: 'Manche bois',
  },
  {
    id: 'synthetique',
    label: 'Synthétique',
    description: 'Résine, Carbone, Composite...',
    note: 'Étanche',
    priceLevel: 2,
    imageSrc: getHandleFamilyAsset('synthetique'),
    imageAlt: 'Manche synthétique',
  },
  {
    id: 'animal',
    label: 'Animal',
    description: 'Cerf, Corne, Os...',
    priceLevel: 3,
    imageSrc: getHandleFamilyAsset('animal'),
    imageAlt: 'Manche animal',
  },
  {
    id: 'exceptionnel',
    label: 'Exceptionnel',
    description: 'Ivoire, Fossile, Pièces Uniques',
    priceLevel: 5,
    imageSrc: getHandleFamilyAsset('exceptionnel'),
    imageAlt: 'Manche exceptionnel',
  },
]
