import { defaultDamasteelAsset, getDamasteelAsset } from '../assets'

export interface DamasteelPattern {
  id: string
  label: string
  largeBladesOnly?: boolean
  imageSrc?: string
  imageAlt?: string
}

const damasteelImageById: Record<string, string> = {
  aegir: getDamasteelAsset('aegir') ?? defaultDamasteelAsset,
  baldur: getDamasteelAsset('baldur') ?? defaultDamasteelAsset,
  bifrost: getDamasteelAsset('bifrost') ?? defaultDamasteelAsset,
  'bjorkmans-rwist': getDamasteelAsset('bjorkmans-rwist') ?? defaultDamasteelAsset,
  'dense-twist': getDamasteelAsset('dense-twist') ?? defaultDamasteelAsset,
  draupner: getDamasteelAsset('draupner') ?? defaultDamasteelAsset,
  fafnir: getDamasteelAsset('fafnir') ?? defaultDamasteelAsset,
  grabak: getDamasteelAsset('grabak') ?? defaultDamasteelAsset,
  grossrosen: getDamasteelAsset('grossrosen') ?? defaultDamasteelAsset,
  gysinge: getDamasteelAsset('gysinge') ?? defaultDamasteelAsset,
  hakkapella: getDamasteelAsset('hakkapella') ?? defaultDamasteelAsset,
  heimskringla: getDamasteelAsset('heimskringla') ?? defaultDamasteelAsset,
  hugin: getDamasteelAsset('hugin') ?? defaultDamasteelAsset,
  ladder: getDamasteelAsset('ladder') ?? defaultDamasteelAsset,
  loki: getDamasteelAsset('loki') ?? defaultDamasteelAsset,
  munin: getDamasteelAsset('munin') ?? defaultDamasteelAsset,
  nidhogg: getDamasteelAsset('nidhogg') ?? defaultDamasteelAsset,
  niddhog: getDamasteelAsset('niddhog') ?? defaultDamasteelAsset,
  'odin-heim': getDamasteelAsset('odin-heim') ?? defaultDamasteelAsset,
  'odins-eye': getDamasteelAsset('odins-eye') ?? defaultDamasteelAsset,
  rose: getDamasteelAsset('rose') ?? defaultDamasteelAsset,
  'sparse-twist': getDamasteelAsset('sparse-twist') ?? defaultDamasteelAsset,
  svavner: getDamasteelAsset('svavner') ?? defaultDamasteelAsset,
  thor: getDamasteelAsset('thor') ?? defaultDamasteelAsset,
  vinland: getDamasteelAsset('vinland') ?? defaultDamasteelAsset,
  yggdrasil: getDamasteelAsset('yggdrasil') ?? defaultDamasteelAsset,
}

const withDamasteelImage = (pattern: Omit<DamasteelPattern, 'imageSrc' | 'imageAlt'>): DamasteelPattern => ({
  ...pattern,
  imageSrc: damasteelImageById[pattern.id] ?? defaultDamasteelAsset,
  imageAlt: `Motif Damasteel ${pattern.label}`,
})

// Motifs pour grandes lames (cuisine, outdoor, chasse)
export const damasteelPatternsLarge: DamasteelPattern[] = [
  withDamasteelImage({ id: 'fafnir', label: 'Fafnir' }),
  withDamasteelImage({ id: 'grabak', label: 'Grabak' }),
  withDamasteelImage({ id: 'ladder', label: 'Ladder' }),
  withDamasteelImage({ id: 'niddhog', label: 'Niddhog' }),
  withDamasteelImage({ id: 'rose', label: 'Rose' }),
  withDamasteelImage({ id: 'svavner', label: 'Svavner' }),
  withDamasteelImage({ id: 'vinland', label: 'Vinland' }),
  withDamasteelImage({ id: 'yggdrasil', label: 'Yggdrasil' }),
  withDamasteelImage({ id: 'odin-heim', label: 'Odin Heim', largeBladesOnly: true }),
]

// Motifs pour petites lames (pliant)
export const damasteelPatternsSmall: DamasteelPattern[] = [
  withDamasteelImage({ id: 'aegir', label: 'Aegir' }),
  withDamasteelImage({ id: 'baldur', label: 'Baldur' }),
  withDamasteelImage({ id: 'bifrost', label: 'Bifrost' }),
  withDamasteelImage({ id: 'bjorkmans-rwist', label: 'Björkmans Rwist' }),
  withDamasteelImage({ id: 'dense-twist', label: 'Dense Twist' }),
  withDamasteelImage({ id: 'draupner', label: 'Draupner' }),
  withDamasteelImage({ id: 'fafnir', label: 'Fafnir' }),
  withDamasteelImage({ id: 'grabak', label: 'Grabak' }),
  withDamasteelImage({ id: 'grossrosen', label: 'Grossrosen' }),
  withDamasteelImage({ id: 'gysinge', label: 'Gysinge' }),
  withDamasteelImage({ id: 'hakkapella', label: 'Hakkapella' }),
  withDamasteelImage({ id: 'heimskringla', label: 'Heimskringla' }),
  withDamasteelImage({ id: 'hugin', label: 'Hugin' }),
  withDamasteelImage({ id: 'ladder', label: 'Ladder' }),
  withDamasteelImage({ id: 'loki', label: 'Loki' }),
  withDamasteelImage({ id: 'munin', label: 'Munin' }),
  withDamasteelImage({ id: 'nidhogg', label: 'Nidhogg' }),
  withDamasteelImage({ id: 'odins-eye', label: 'Odins Eye' }),
  withDamasteelImage({ id: 'odin-heim', label: 'Odin Heim' }),
  withDamasteelImage({ id: 'rose', label: 'Rose' }),
  withDamasteelImage({ id: 'sparse-twist', label: 'Sparse Twist' }),
  withDamasteelImage({ id: 'svavner', label: 'Svavner' }),
  withDamasteelImage({ id: 'thor', label: 'Thor' }),
  withDamasteelImage({ id: 'vinland', label: 'Vinland' }),
]

// Export pour rétrocompatibilité
export const damasteelPatterns = damasteelPatternsLarge
