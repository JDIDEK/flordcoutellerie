import type { PliantMechanism, PliantForm } from '../types'

export const pliantMechanisms: PliantMechanism[] = [
  {
    id: 'cran-plat',
    label: 'Cran plat',
    description: 'Verrouillage à ressort classique',
  },
  {
    id: 'piemontais',
    label: 'Piémontais',
    description: 'Friction sans verrouillage, finesse extrême',
  },
]

export const pliantFormsByMechanism: Record<string, PliantForm[]> = {
  'cran-plat': [
    { id: 'yatagan', label: 'Yatagan', profile: 'Lame courbe descendante', description: 'Style traditionnel' },
    { id: 'navette', label: 'Navette', profile: 'Dos droit, tranchant courbe', description: 'Équilibre classique' },
    { id: 'laguiole', label: 'Laguiole', profile: 'Lame effilée, ressort ciselé', description: 'Tradition Aubrac' },
  ],
  'piemontais': [
    { id: 'svelte', label: 'Svelte', profile: 'Ultra fin, ressort caché', description: 'Légèreté maximale' },
    { id: 'rustique', label: 'Rustique', profile: 'Manche brut, forme droite', description: 'Style berger' },
  ],
}
