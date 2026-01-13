import type { DamasteelScale } from '../types'

export interface ChasseForm {
  id: string
  label: string
  length: string
  description: string
  patternScale: DamasteelScale
}

export const chasseForms: ChasseForm[] = [
  {
    id: 'skinner',
    label: 'Skinner',
    length: '10-12 cm',
    description: 'Lame courbe pour écorcher le gibier',
    patternScale: 'small',
  },
  {
    id: 'caper',
    label: 'Caper',
    length: '8-10 cm',
    description: 'Petite lame précise pour les finitions',
    patternScale: 'small',
  },
  {
    id: 'depouille',
    label: 'Dépouille',
    length: '12-15 cm',
    description: 'Lame polyvalente pour le gros gibier',
    patternScale: 'large',
  },
  {
    id: 'drop-point',
    label: 'Drop Point',
    length: '10-14 cm',
    description: 'Pointe abaissée pour contrôle optimal',
    patternScale: 'large',
  },
  {
    id: 'trailing-point',
    label: 'Trailing Point',
    length: '10-12 cm',
    description: 'Pointe relevée pour découpes fines',
    patternScale: 'small',
  },
]
