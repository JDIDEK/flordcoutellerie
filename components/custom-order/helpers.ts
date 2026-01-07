import type { StepId, WizardConfig, WizardStep, DamasteelScale } from './types'
import { kitchenForms, outdoorForms } from './data'

export function isStepComplete(step: StepId, config: WizardConfig): boolean {
  switch (step) {
    case 'usage':
      return Boolean(config.usage)
    case 'cuisine-form':
      return Boolean(config.cuisineForm)
    case 'pliant-mechanism':
      return Boolean(config.pliantMechanism)
    case 'pliant-form':
      return Boolean(config.pliantForm)
    case 'outdoor-intensity':
      return Boolean(config.outdoorUse)
    case 'outdoor-form':
      return Boolean(config.outdoorForm)
    case 'steel':
      return Boolean(config.steel)
    case 'damasteel-pattern':
      return config.steel === 'damasteel' ? Boolean(config.damasteelPattern) : true
    case 'sheath':
      return Boolean(config.sheath)
    case 'pliant-guillochage':
      return Boolean(config.guillochageCentral && config.guillochagePlatineLeft && config.guillochagePlatineRight)
    case 'handle':
      return Boolean(config.handleFamily)
    case 'handle-composition':
      return Boolean(config.handleComposition)
    case 'personalization':
      return !config.engraving || Boolean(config.engravingText)
    case 'summary':
      return Boolean(config.firstName && config.lastName && config.email)
    default:
      return false
  }
}

export function getSteps(config: WizardConfig): WizardStep[] {
  const base: WizardStep[] = [
    { id: 'usage', title: 'Usage', description: 'Point de départ' },
  ]

  if (config.usage === 'cuisine') {
    base.push(
      { id: 'cuisine-form', title: 'Forme', description: 'Nakiri, Gyuto, Bunka…' },
      { id: 'steel', title: 'Acier', description: 'Performance & esthétique' }
    )
    if (config.steel === 'damasteel') {
      base.push({ id: 'damasteel-pattern', title: 'Motif Damasteel', description: 'Grandes vs petites lames' })
    }
  }

  if (config.usage === 'pliant') {
    base.push(
      { id: 'pliant-mechanism', title: 'Mécanisme', description: 'Cran plat vs Piémontais' },
      { id: 'pliant-form', title: 'Forme', description: 'Silhouette selon le mécanisme' },
      { id: 'steel', title: 'Acier', description: 'Visuel & gamme' },
      { id: 'pliant-guillochage', title: 'Guillochage', description: 'Dos de lame + platines' },
    )
    if (config.steel === 'damasteel') {
      base.push({ id: 'damasteel-pattern', title: 'Motif Damasteel', description: 'Adapté aux pliants' })
    }
  }

  if (config.usage === 'outdoor') {
    base.push(
      { id: 'outdoor-intensity', title: 'Intensité', description: 'Modérée ou intensive' },
      { id: 'outdoor-form', title: 'Forme', description: 'Profil selon l\'usage' },
      { id: 'steel', title: 'Acier', description: 'Résistance & entretien' },
      { id: 'sheath', title: 'Étui', description: 'Kydex ou cuir' },
    )
    if (config.steel === 'damasteel') {
      base.push({ id: 'damasteel-pattern', title: 'Motif Damasteel', description: 'Grandes vs petites lames' })
    }
  }

  base.push(
    { id: 'handle', title: 'Manche', description: 'Bois, synthétique, exceptionnel' },
    { id: 'handle-composition', title: 'Composition', description: 'Simple ou composé' },
    { id: 'personalization', title: 'Personnalisation', description: 'Gravure & rivet' },
    { id: 'summary', title: 'Récapitulatif', description: 'Coordonnées et envoi' },
  )

  return base
}

export function getPatternScale(config: WizardConfig): DamasteelScale {
  if (config.usage === 'cuisine' && config.cuisineForm) {
    const form = kitchenForms.find((item) => item.id === config.cuisineForm)
    if (form) return form.patternScale
  }
  if (config.usage === 'outdoor' && config.outdoorForm) {
    const form = outdoorForms.find((item) => item.id === config.outdoorForm)
    if (form) return form.patternScale
  }
  return 'small'
}
