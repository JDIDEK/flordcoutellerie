import type { GuillochageMotif, GuillochageSet } from '../types'

// Motifs pour pliant (dos de lame + platines)
export const guillochageMotifs: GuillochageMotif[] = [
  { id: 'fileté', label: 'Fileté' },
  { id: 'quadrillé', label: 'Quadrillé' },
  { id: 'écailles', label: 'Écailles' },
  { id: 'torsades', label: 'Torsades' },
  { id: 'aucun', label: 'Aucun' },
]

// Motifs pour cuisine, outdoor, chasse (dos de lame uniquement)
export const guillochageMotifsCouteaux: GuillochageMotif[] = [
  { id: 'fleuri', label: 'Fleuri' },
  { id: 'losanges', label: 'Losanges' },
  { id: 'sabliers', label: 'Sabliers' },
  { id: 'soleils', label: 'Soleils' },
  { id: 'ronce', label: 'Ronce' },
  { id: 'scandinave', label: 'Scandinave' },
  { id: 'normand', label: 'Normand' },
]

export const guillochageSets: GuillochageSet[] = [
  { id: 'classique', label: 'Classique', central: 'Fileté', platineLeft: 'Quadrillé', platineRight: 'Quadrillé' },
  { id: 'sobre', label: 'Sobre', central: 'Aucun', platineLeft: 'Fileté', platineRight: 'Fileté' },
  { id: 'baroque', label: 'Baroque', central: 'Torsades', platineLeft: 'Écailles', platineRight: 'Écailles' },
]
