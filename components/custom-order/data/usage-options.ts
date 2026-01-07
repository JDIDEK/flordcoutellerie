import type { UsageOption } from '../types'

export const usageOptions: UsageOption[] = [
  {
    id: 'cuisine',
    label: 'Cuisine',
    description: 'Couteaux de chef : Nakiri, Gyuto, Bunka, Kiritsuke…',
  },
  {
    id: 'pliant',
    label: 'Pliant',
    description: 'Couteau de poche avec mécanisme cran plat ou piémontais',
  },
  {
    id: 'outdoor',
    label: 'Outdoor',
    description: 'Couteaux fixes pour le bushcraft, la survie, le camp',
  },
  {
    id: 'chasse',
    label: 'Chasse',
    description: 'Couteaux de chasse et dépouille (Skinner, caper...)',
    disabled: true,
  },
]
