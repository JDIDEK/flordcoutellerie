import type { GuillochageMotif, GuillochageSet } from '../types'
import { defaultGuillochageAsset, getGuillochageAsset } from '../assets'

const guillochageImageById: Record<string, string> = {
  fleuri: getGuillochageAsset('fleuri') ?? defaultGuillochageAsset,
  'losange-pointe': getGuillochageAsset('losange-pointe') ?? defaultGuillochageAsset,
  normand: getGuillochageAsset('normand') ?? defaultGuillochageAsset,
  ronce: getGuillochageAsset('ronce') ?? defaultGuillochageAsset,
  sablier: getGuillochageAsset('sablier') ?? defaultGuillochageAsset,
  'sablier-pliant': getGuillochageAsset('sablier-pliant') ?? defaultGuillochageAsset,
  scandinave: getGuillochageAsset('scandinave') ?? defaultGuillochageAsset,
  'scandinave-pliant': getGuillochageAsset('scandinave-pliant') ?? defaultGuillochageAsset,
  soleil: getGuillochageAsset('soleil') ?? defaultGuillochageAsset,
  'ondule-pliant': getGuillochageAsset('ondule-pliant') ?? defaultGuillochageAsset,
}

const withGuillochageImage = (motif: Omit<GuillochageMotif, 'imageSrc' | 'imageAlt'>): GuillochageMotif => ({
  ...motif,
  imageSrc: guillochageImageById[motif.id] ?? defaultGuillochageAsset,
  imageAlt: `Motif guillochage ${motif.label}`,
})

// Motifs pour pliant (dos de lame + platines)
export const guillochageMotifs: GuillochageMotif[] = [
  { id: 'filete', label: 'Fileté' },
  { id: 'quadrille', label: 'Quadrillé' },
  { id: 'ecailles', label: 'Écailles' },
  { id: 'torsades', label: 'Torsades' },
  { id: 'aucun', label: 'Aucun' },
]

export const guillochageMotifsPrincipale: GuillochageMotif[] = [
  withGuillochageImage({ id: 'fleuri', label: 'Fleuri' }),
  withGuillochageImage({ id: 'losange-pointe', label: 'Losange pointe' }),
  withGuillochageImage({ id: 'sablier', label: 'Sablier' }),
  withGuillochageImage({ id: 'soleil', label: 'Soleil' }),
  withGuillochageImage({ id: 'ronce', label: 'Ronce' }),
  withGuillochageImage({ id: 'scandinave', label: 'Scandinave' }),
  withGuillochageImage({ id: 'normand', label: 'Normand' }),
]

export const guillochageMotifsPlatines: GuillochageMotif[] = [
  withGuillochageImage({ id: 'sablier-pliant', label: 'Sablier' }),
  withGuillochageImage({ id: 'scandinave-pliant', label: 'Scandinave' }),
  withGuillochageImage({ id: 'ondule-pliant', label: 'Ondulé' }),
]

export const guillochageSets: GuillochageSet[] = [
  { id: 'classique', label: 'Classique', central: 'Fileté', platineLeft: 'Quadrillé', platineRight: 'Quadrillé' },
  { id: 'sobre', label: 'Sobre', central: 'Aucun', platineLeft: 'Fileté', platineRight: 'Fileté' },
  { id: 'baroque', label: 'Baroque', central: 'Torsades', platineLeft: 'Écailles', platineRight: 'Écailles' },
]
