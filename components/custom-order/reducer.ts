import type { WizardConfig, Action } from './types'
import { guillochageSets } from './data'

export const initialConfig: WizardConfig = {
  mosaicRivet: false,
  engraving: false,
  engravingText: '',
  notes: '',
  firstName: '',
  lastName: '',
  email: '',
}

export function wizardReducer(state: WizardConfig, action: Action): WizardConfig {
  switch (action.type) {
    case 'setUsage':
      return {
        ...initialConfig,
        usage: action.usage,
      }
    case 'setCuisineForm':
      return { ...state, cuisineForm: action.form }
    case 'setPliantMechanism':
      return { ...state, pliantMechanism: action.mechanism, pliantForm: undefined }
    case 'setPliantForm':
      return { ...state, pliantForm: action.form }
    case 'setOutdoorUse':
      return { ...state, outdoorUse: action.usage, outdoorForm: undefined }
    case 'setOutdoorForm':
      return { ...state, outdoorForm: action.form }
    case 'setSteel':
      return {
        ...state,
        steel: action.steel,
        damasteelPattern: action.steel !== 'damasteel' ? undefined : state.damasteelPattern,
      }
    case 'setDamasteelPattern':
      return { ...state, damasteelPattern: action.pattern }
    case 'setSheath':
      return { ...state, sheath: action.sheath }
    case 'setHandle':
      return { ...state, handleFamily: action.family, handleVariant: action.variant }
    case 'setHandleComposition':
      return { ...state, handleComposition: action.composition }
    case 'toggleMosaic':
      return { ...state, mosaicRivet: action.enabled }
    case 'toggleEngraving':
      return { ...state, engraving: action.enabled, engravingText: action.enabled ? state.engravingText : '' }
    case 'setEngravingText':
      return { ...state, engravingText: action.text }
    case 'setNotes':
      return { ...state, notes: action.text }
    case 'setGuillochageSet': {
      const set = guillochageSets.find((s) => s.id === action.setId)
      if (!set) return state
      return {
        ...state,
        guillochageMode: 'set',
        guillochageSet: action.setId,
        guillochageCentral: set.central,
        guillochagePlatineLeft: set.platineLeft,
        guillochagePlatineRight: set.platineRight,
      }
    }
    case 'setGuillochageCentral':
      return { ...state, guillochageMode: 'custom', guillochageSet: undefined, guillochageCentral: action.motif }
    case 'setGuillochagePlatineLeft':
      return { ...state, guillochageMode: 'custom', guillochageSet: undefined, guillochagePlatineLeft: action.motif }
    case 'setGuillochagePlatineRight':
      return { ...state, guillochageMode: 'custom', guillochageSet: undefined, guillochagePlatineRight: action.motif }
    case 'setFirstName':
      return { ...state, firstName: action.value }
    case 'setLastName':
      return { ...state, lastName: action.value }
    case 'setEmail':
      return { ...state, email: action.value }
    default:
      return state
  }
}
