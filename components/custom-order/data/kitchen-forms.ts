import type { KitchenForm } from '../types'

export const kitchenForms: KitchenForm[] = [
    {
    id: 'gyuto',
    label: 'Gyuto',
    length: '200 - 240mm',
    usageNote: ['Couteau de chef polyvalent', 'Tous les aliments sauf très durs'],
    patternScale: 'large',
  },
  {
    id: 'nakiri',
    label: 'Nakiri',
    length: '170 - 180mm',
    usageNote: ['Compact et polyvalent', 'Spécial légumes'],
    patternScale: 'large',
  },
  {
    id: 'kiritsuke',
    label: 'Kiritsuke',
    length: '200 -240mm',
    usageNote: ['Couteau de chef polyvalent', 'Pointe agressive', 'Tous les aliments sauf très durs'],
    patternScale: 'large',
  },
  {
    id: 'bunka',
    label: 'Bunka',
    length: '170 - 180mm',
    usageNote: ['Compact et polyvalent', 'Pointe agressive', 'Tous les aliments sauf très durs'],
    patternScale: 'large',
  },
  {
    id: 'santoku',
    label: 'Santoku',
    length: '180mm',
    usageNote: ['Couteau compact et polyvalent', 'Tous les aliments sauf très durs'],
    patternScale: 'large',
  },
  {
    id: 'petty',
    label: 'Petty',
    length: '140 – 160mm',
    usageNote: ['Fin et maniable', 'Tous les aliments sauf très durs'],
    patternScale: 'small',
  },
  {
    id: 'yanagiba',
    label: 'Yanagiba',
    length: '240 – 280mm',
    usageNote: ['Couteau à trancher', 'Tranchant asymétrique', 'Spécialité poisson et viande'],
    patternScale: 'large',
  }
]
