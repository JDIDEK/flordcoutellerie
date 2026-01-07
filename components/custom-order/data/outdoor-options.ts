import type { OutdoorUseCase, OutdoorForm } from '../types'

export const outdoorUseCases: OutdoorUseCase[] = [
  {
    id: 'moderee',
    label: 'Modérée',
    description: 'Bivouac, camp léger, préparation de repas',
  },
  {
    id: 'intensive',
    label: 'Intensive',
    description: 'Survie, bushcraft engagé, batonnage',
  },
]

export const outdoorForms: OutdoorForm[] = [
  {
    id: 'campcraft',
    label: 'Campcraft',
    length: '100 – 120 mm',
    description: 'Compact, travaux légers',
    patternScale: 'small',
  },
  {
    id: 'companion',
    label: 'Companion',
    length: '120 – 140 mm',
    description: 'Polyvalent camp',
    patternScale: 'small',
  },
  {
    id: 'bush',
    label: 'Bush',
    length: '140 – 160 mm',
    description: 'Polyvalent robuste',
    patternScale: 'large',
  },
  {
    id: 'survie',
    label: 'Survie',
    length: '160 – 200 mm',
    description: 'Grande lame, batonnage',
    patternScale: 'large',
  },
]
