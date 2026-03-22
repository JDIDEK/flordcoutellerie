import type { OutdoorUseCase, OutdoorForm } from '../types'
import { getCustomOrderFormAsset } from '../assets'

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
    imageSrc: getCustomOrderFormAsset('outdoor', 'moderee-forme1'),
    imageAlt: 'Forme outdoor modérée',
  },
  {
    id: 'a-venir',
    label: 'À venir',
    length: '',
    description: '',
    patternScale: 'small',
    disabled: true,
  },
]

export const outdoorFormsIntensive: OutdoorForm[] = [
  {
    id: 'intensive-forme1',
    label: 'Forme 1',
    length: '',
    description: '',
    patternScale: 'large',
    imageSrc: getCustomOrderFormAsset('outdoor', 'intensive-forme1'),
    imageAlt: 'Forme outdoor intensive',
  },
  {
    id: 'a-venir',
    label: 'À venir',
    length: '',
    description: '',
    patternScale: 'large',
    disabled: true,
  },
]
