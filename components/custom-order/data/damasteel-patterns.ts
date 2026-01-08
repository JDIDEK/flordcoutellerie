export interface DamasteelPattern {
  id: string
  label: string
  largeBladesOnly?: boolean
}

export const damasteelPatterns: DamasteelPattern[] = [
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
