import type { OutdoorUseCase, OutdoorForm } from '../types'

export const outdoorUseCases: OutdoorUseCase[] = [
  {
    id: 'moderee',
    label: 'Modérée',
    description: 'Cuisine en extérieur, tailler, trancher des matériaux souples',
    note: 'Plus tranchant, mais plus fragile',
  },
  {
    id: 'intensive',
    label: 'Intensive',
    description: 'Fendre du bois, trancher des matériaux durs, briser de la glace',
  },
]

export const outdoorFormsModerate: OutdoorForm[] = [
  {
    id: 'moderee-forme1',
    label: 'Forme 1',
    length: '',
    description: '',
    patternScale: 'small',
  },
  {
    id: 'moderee-forme2',
    label: 'Forme 2',
    length: '',
    description: '',
    patternScale: 'small',
  },
]

export const outdoorFormsIntensive: OutdoorForm[] = [
  {
    id: 'intensive-forme1',
    label: 'Forme 1',
    length: '',
    description: '',
    patternScale: 'large',
  },
  {
    id: 'intensive-forme2',
    label: 'Forme 2',
    length: '',
    description: '',
    patternScale: 'large',
  },
]
