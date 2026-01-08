export type Usage = 'cuisine' | 'pliant' | 'outdoor' | 'chasse'
export type OutdoorUse = 'moderee' | 'intensive'
export type DamasteelScale = 'large' | 'small'

export type StepId =
  | 'usage'
  | 'cuisine-form'
  | 'cuisine-guillochage'
  | 'pliant-mechanism'
  | 'pliant-form'
  | 'pliant-guillochage-dos'
  | 'pliant-guillochage-platines'
  | 'outdoor-intensity'
  | 'outdoor-form'
  | 'outdoor-guillochage'
  | 'chasse-form'
  | 'chasse-guillochage'
  | 'steel'
  | 'damasteel-pattern'
  | 'sheath'
  | 'pliant-guillochage'
  | 'handle'
  | 'handle-composition'
  | 'personalization'
  | 'summary'

export interface WizardStep {
  id: StepId
  title: string
  description: string
}

export interface KitchenForm {
  id: string
  label: string
  length: string
  usageNote: string[]
  patternScale: DamasteelScale
}

export interface PliantMechanism {
  id: string
  label: string
  description: string
}

export interface PliantForm {
  id: string
  label: string
  profile: string
  description: string
}

export interface OutdoorForm {
  id: string
  label: string
  length: string
  description: string
  patternScale: DamasteelScale
}

export interface OutdoorUseCase {
  id: OutdoorUse
  label: string
  description: string
  note?: string
}

export interface SteelOption {
  id: string
  label: string
  description: string
  tech: {
    retention: number
    sharpening: number
    flexibility: number
    price: number
  }
}

export interface HandleFamily {
  id: string
  label: string
  description: string
  priceLevel: number
  note?: string
  variants?: { id: string; label: string }[]
}

export interface SheathOption {
  id: 'kydex' | 'cuir'
  label: string
  badge: string
  description: string
}

export interface GuillochageMotif {
  id: string
  label: string
}

export interface GuillochageSet {
  id: string
  label: string
  central: string
  platineLeft: string
  platineRight: string
}

export interface UsageOption {
  id: string
  label: string
  description: string
  disabled?: boolean
}

export interface WizardConfig {
  usage?: Usage
  cuisineForm?: string
  pliantMechanism?: string
  pliantForm?: string
  outdoorUse?: OutdoorUse
  outdoorForm?: string
  chasseForm?: string
  steel?: string
  damasteelPattern?: string
  sheath?: 'kydex' | 'cuir'
  handleFamily?: string
  handleVariant?: string
  handleComposition?: 'simple' | 'compose'
  mosaicRivet: boolean
  engraving: boolean
  engravingText: string
  notes: string
  guillochageMode?: 'set' | 'custom'
  guillochageSet?: string
  guillochageCentral?: string
  guillochagePlatineLeft?: string
  guillochagePlatineRight?: string
  firstName: string
  lastName: string
  email: string
}

export type Action =
  | { type: 'setUsage'; usage: Usage }
  | { type: 'setCuisineForm'; form: string }
  | { type: 'setPliantMechanism'; mechanism: string }
  | { type: 'setPliantForm'; form: string }
  | { type: 'setOutdoorUse'; usage: OutdoorUse }
  | { type: 'setOutdoorForm'; form: string }
  | { type: 'setChasseForm'; form: string }
  | { type: 'setSteel'; steel: string }
  | { type: 'setDamasteelPattern'; pattern: string }
  | { type: 'setSheath'; sheath: 'kydex' | 'cuir' }
  | { type: 'setHandle'; family: string; variant?: string }
  | { type: 'setHandleComposition'; composition: 'simple' | 'compose' }
  | { type: 'toggleMosaic'; enabled: boolean }
  | { type: 'toggleEngraving'; enabled: boolean }
  | { type: 'setEngravingText'; text: string }
  | { type: 'setNotes'; text: string }
  | { type: 'setGuillochageSet'; setId: string }
  | { type: 'setGuillochageCentral'; motif: string }
  | { type: 'setGuillochagePlatineLeft'; motif: string }
  | { type: 'setGuillochagePlatineRight'; motif: string }
  | { type: 'setFirstName'; value: string }
  | { type: 'setLastName'; value: string }
  | { type: 'setEmail'; value: string }
