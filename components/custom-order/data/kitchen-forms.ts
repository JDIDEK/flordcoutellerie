import type { KitchenForm } from '../types'

export const kitchenForms: KitchenForm[] = [
    {
    id: 'gyuto',
    label: 'Gyuto',
    length: '220 mm',
    usageNote: ['Couteau de chef polyvalent', 'Tous les aliments sauf très durs'],
    patternScale: 'large',
  },
  {
    id: 'nakiri',
    label: 'Nakiri',
    length: '160 mm',
    usageNote: ['Compact et polyvalent', 'Spécial légumes'],
    patternScale: 'large',
  },
  {
    id: 'kiritsuke',
    label: 'Kiritsuke',
    length: '220 mm',
    usageNote: ['Couteau de chef polyvalent', 'Pointe agressive', 'Tous les aliments sauf très durs'],
    patternScale: 'large',
  },
  {
    id: 'bunka',
    label: 'Bunka',
    length: '180 mm',
    usageNote: ['Compact et polyvalent', 'Pointe agressive', 'Tous les aliments sauf très durs'],
    patternScale: 'large',
  },
  {
    id: 'santoku',
    label: 'Santoku',
    length: '180 mm',
    usageNote: ['Couteau compact et polyvalent', 'Tous les aliments sauf très durs'],
    patternScale: 'large',
  },
  {
    id: 'petty',
    label: 'Petty',
    length: '160 mm',
    usageNote: ['Fin et maniable', 'Tous les aliments sauf très durs'],
    patternScale: 'small',
  },
  {
    id: 'yanagiba',
    label: 'Yanagiba',
    length: '260 mm',
    usageNote: ['Couteau à trancher', 'Tranchant asymétrique', 'Spécialité poisson et viande'],
    patternScale: 'large',
  }
]
