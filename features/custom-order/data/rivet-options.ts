import type { RivetColor } from '../types'
import { getRivetColorAsset } from '../assets'

export interface RivetOption {
  id: RivetColor
  label: string
  imageSrc: string
  imageAlt: string
}

export const rivetColors: RivetOption[] = [
  {
    id: 'cuivre',
    label: 'Cuivre',
    imageSrc: getRivetColorAsset('cuivre'),
    imageAlt: 'Rivet cuivre',
  },
  {
    id: 'laiton',
    label: 'Laiton',
    imageSrc: getRivetColorAsset('laiton'),
    imageAlt: 'Rivet laiton',
  },
  {
    id: 'inox',
    label: 'Inox',
    imageSrc: getRivetColorAsset('inox'),
    imageAlt: 'Rivet inox',
  },
]
