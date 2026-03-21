import type { PliantMechanism, PliantForm } from '../types'

export const pliantMechanisms: PliantMechanism[] = [
  {
    id: 'cran-plat',
    label: 'Cran plat',
    description: 'Un ressort maintient la lame en position\nouverte ou fermée',
  },
  {
    id: 'piemontais',
    label: 'Piémontais',
    description: 'Mécanisme à friction, sans\nverrouillage',
  },
]

export const pliantFormsByMechanism: Record<string, PliantForm[]> = {
  'cran-plat': [
    { id: 'forme-1-c', label: 'Forme 1', profile: 'forme1', description: 'description forme1' },
    { id: 'forme-2-c', label: 'Forme 2', profile: 'forme2', description: 'description forme2' },
    { id: 'outdoor-c', label: 'Outdoor', profile: '', description: '', disabled: true },
  ],
  'piemontais': [
    { id: 'forme-1-p', label: 'Forme 1', profile: 'forme1', description: 'description forme1' },
    { id: 'forme-2-p', label: 'Forme 2', profile: 'forme2', description: 'description forme2' },
    { id: 'outdoor-p', label: 'À venir', profile: '', description: '', disabled: true },
  ],
}
