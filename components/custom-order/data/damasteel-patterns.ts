export interface DamasteelPattern {
  id: string
  label: string
  largeBladesOnly?: boolean
}

// Motifs pour grandes lames (cuisine, outdoor, chasse)
export const damasteelPatternsLarge: DamasteelPattern[] = [
  { id: 'fafnir', label: 'Fafnir' },
  { id: 'grabak', label: 'Grabak' },
  { id: 'ladder', label: 'Ladder' },
  { id: 'niddhog', label: 'Niddhog' },
  { id: 'rose', label: 'Rose' },
  { id: 'svavner', label: 'Svavner' },
  { id: 'vinland', label: 'Vinland' },
  { id: 'yggdrasil', label: 'Yggdrasil' },
  { id: 'odin-heim', label: 'Odin Heim', largeBladesOnly: true },
]

// Motifs pour petites lames (pliant)
export const damasteelPatternsSmall: DamasteelPattern[] = [
  { id: 'aegir', label: 'Aegir' },
  { id: 'baldur', label: 'Baldur' },
  { id: 'bifrost', label: 'Bifrost' },
  { id: 'bjorkmans-rwist', label: 'Björkmans Rwist' },
  { id: 'dense-twist', label: 'Dense Twist' },
  { id: 'draupner', label: 'Draupner' },
  { id: 'fafnir', label: 'Fafnir' },
  { id: 'grabak', label: 'Grabak' },
  { id: 'grossrosen', label: 'Grossrosen' },
  { id: 'gysinge', label: 'Gysinge' },
  { id: 'hakkapella', label: 'Hakkapella' },
  { id: 'heimskringla', label: 'Heimskringla' },
  { id: 'hugin', label: 'Hugin' },
  { id: 'ladder', label: 'Ladder' },
  { id: 'loki', label: 'Loki' },
  { id: 'munin', label: 'Munin' },
  { id: 'nidhogg', label: 'Nidhogg' },
  { id: 'odins-eye', label: 'Odins Eye' },
  { id: 'odin-heim', label: 'Odin Heim' },
  { id: 'rose', label: 'Rose' },
  { id: 'sparse-twist', label: 'Sparse Twist' },
  { id: 'svavner', label: 'Svavner' },
  { id: 'thor', label: 'Thor' },
  { id: 'vinland', label: 'Vinland' },
]

// Export pour rétrocompatibilité
export const damasteelPatterns = damasteelPatternsLarge
