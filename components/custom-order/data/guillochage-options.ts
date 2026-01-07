import type { GuillochageMotif, GuillochageSet } from '../types'

export const guillochageMotifs: GuillochageMotif[] = [
  { id: 'fileté', label: 'Fileté' },
  { id: 'quadrillé', label: 'Quadrillé' },
  { id: 'écailles', label: 'Écailles' },
  { id: 'torsades', label: 'Torsades' },
  { id: 'aucun', label: 'Aucun' },
]

export const guillochageSets: GuillochageSet[] = [
  { id: 'classique', label: 'Classique', central: 'Fileté', platineLeft: 'Quadrillé', platineRight: 'Quadrillé' },
  { id: 'sobre', label: 'Sobre', central: 'Aucun', platineLeft: 'Fileté', platineRight: 'Fileté' },
  { id: 'baroque', label: 'Baroque', central: 'Torsades', platineLeft: 'Écailles', platineRight: 'Écailles' },
]
