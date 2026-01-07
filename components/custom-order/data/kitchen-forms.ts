import type { KitchenForm } from '../types'

export const kitchenForms: KitchenForm[] = [
  {
    id: 'nakiri',
    label: 'Nakiri',
    length: '165 mm',
    usageNote: ['Légumes uniquement', 'Coupe verticale'],
    patternScale: 'large',
  },
  {
    id: 'gyuto',
    label: 'Gyuto',
    length: '210 – 270 mm',
    usageNote: ['Couteau polyvalent', 'Viandes, poissons, légumes'],
    patternScale: 'large',
  },
  {
    id: 'bunka',
    label: 'Bunka',
    length: '170 – 195 mm',
    usageNote: ['Polyvalent japonais', 'Pointe inversée'],
    patternScale: 'large',
  },
  {
    id: 'kiritsuke',
    label: 'Kiritsuke',
    length: '240 – 300 mm',
    usageNote: ['Polyvalent long', 'Mélange Yanagiba / Usuba'],
    patternScale: 'large',
  },
  {
    id: 'petty',
    label: 'Petty',
    length: '120 – 150 mm',
    usageNote: ['Petit couteau d\'office', 'Travaux minutieux'],
    patternScale: 'small',
  },
  {
    id: 'sujihiki',
    label: 'Sujihiki',
    length: '240 – 300 mm',
    usageNote: ['Trancheur fin', 'Viandes et poissons'],
    patternScale: 'large',
  },
]
