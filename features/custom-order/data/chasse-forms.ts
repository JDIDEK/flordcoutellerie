import type { DamasteelScale } from '../types'
import { getCustomOrderFormAsset } from '../assets'

export interface ChasseForm {
  id: string
  label: string
  length: string
  description: string
  patternScale: DamasteelScale
  imageSrc?: string
  imageAlt?: string
}

export const chasseForms: ChasseForm[] = [
  {
    id: 'skinner',
    label: 'Skinner',
    length: '10-12 cm',
    description: 'Lame courbe pour écorcher le gibier',
    patternScale: 'small',
    imageSrc: getCustomOrderFormAsset('chasse', 'bunka'),
    imageAlt: 'Forme skinner',
  },
  {
    id: 'caper',
    label: 'Caper',
    length: '8-10 cm',
    description: 'Petite lame précise pour les finitions',
    patternScale: 'small',
    imageSrc: getCustomOrderFormAsset('chasse', 'petty'),
    imageAlt: 'Forme caper',
  },
  {
    id: 'depouille',
    label: 'Dépouille',
    length: '12-15 cm',
    description: 'Lame polyvalente pour le gros gibier',
    patternScale: 'large',
    imageSrc: getCustomOrderFormAsset('chasse', 'gyuto'),
    imageAlt: 'Forme dépouille',
  },
  {
    id: 'drop-point',
    label: 'Drop Point',
    length: '10-14 cm',
    description: 'Pointe abaissée pour contrôle optimal',
    patternScale: 'large',
    imageSrc: getCustomOrderFormAsset('chasse', 'kiritsuke'),
    imageAlt: 'Forme drop point',
  },
  {
    id: 'trailing-point',
    label: 'Trailing Point',
    length: '10-12 cm',
    description: 'Pointe relevée pour découpes fines',
    patternScale: 'small',
    imageSrc: getCustomOrderFormAsset('chasse', 'yanagiba'),
    imageAlt: 'Forme trailing point',
  },
]
