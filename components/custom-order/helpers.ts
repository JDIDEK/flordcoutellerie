import type { StepId, WizardConfig, WizardStep, DamasteelScale } from './types'
import { kitchenForms, outdoorFormsModerate, outdoorFormsIntensive } from './data'

export function isStepComplete(step: StepId, config: WizardConfig): boolean {
  switch (step) {
    case 'usage':
      return Boolean(config.usage)
    case 'cuisine-form':
      return Boolean(config.cuisineForm)
    case 'cuisine-guillochage':
      return Boolean(config.guillochageCentral)
    case 'pliant-mechanism':
      return Boolean(config.pliantMechanism)
    case 'pliant-form':
      return Boolean(config.pliantForm)
    case 'pliant-guillochage-dos':
      return Boolean(config.guillochageCentral)
    case 'pliant-guillochage-platines':
      return Boolean(config.guillochagePlatineLeft && config.guillochagePlatineRight)
    case 'pliant-guillochage':
      return Boolean(config.guillochageCentral && config.guillochagePlatineLeft && config.guillochagePlatineRight)
    case 'outdoor-intensity':
      return Boolean(config.outdoorUse)
    case 'outdoor-form':
      return Boolean(config.outdoorForm)
    case 'outdoor-guillochage':
      return Boolean(config.guillochageCentral)
    case 'chasse-form':
      return Boolean(config.chasseForm)
    case 'chasse-guillochage':
      return Boolean(config.guillochageCentral)
    case 'steel':
      return Boolean(config.steel)
    case 'damasteel-pattern':
      return config.steel === 'damasteel' ? Boolean(config.damasteelPattern) : true
    case 'sheath':
      return Boolean(config.sheath)
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

  // CUISINE: forme - acier - motifs - guillochage - manche - personnalisation
  if (config.usage === 'cuisine') {
    base.push(
      { id: 'cuisine-form', title: 'Forme', description: 'Nakiri, Gyuto, Bunka…' },
      { id: 'steel', title: 'Acier', description: 'Performance & esthétique' },
    )
    if (config.steel === 'damasteel') {
      base.push({ id: 'damasteel-pattern', title: 'Motifs de Damasteel', description: 'Purement esthétique' })
    }
    base.push(
      { id: 'cuisine-guillochage', title: 'Guillochage', description: 'Dos de lame' },
      { id: 'handle', title: 'Manche', description: 'Bois, synthétique, exceptionnel' },
      { id: 'handle-composition', title: 'Composition', description: 'Simple ou composé' },
      { id: 'personalization', title: 'Personnalisation', description: 'Gravure & rivet' },
      { id: 'summary', title: 'Récapitulatif', description: 'Coordonnées et envoi' },
    )
  }

  // PLIANT: mecanisme - forme - acier - motifs - guillochage principal - guillochage platines - manche - personnalisation
  if (config.usage === 'pliant') {
    base.push(
      { id: 'pliant-mechanism', title: 'Mécanisme', description: 'Cran plat vs Piémontais' },
      { id: 'pliant-form', title: 'Forme', description: 'Silhouette selon le mécanisme' },
      { id: 'steel', title: 'Acier', description: 'Visuel & gamme' },
    )
    if (config.steel === 'damasteel') {
      base.push({ id: 'damasteel-pattern', title: 'Motifs de Damasteel', description: 'Purement esthétique' })
    }
    base.push(
      { id: 'pliant-guillochage-dos', title: 'Guillochage principal', description: 'Dos de lame' },
      { id: 'pliant-guillochage-platines', title: 'Guillochage platines', description: 'Platines gauche et droite' },
      { id: 'handle', title: 'Manche', description: 'Bois, synthétique, exceptionnel' },
      { id: 'handle-composition', title: 'Composition', description: 'Simple ou composé' },
      { id: 'personalization', title: 'Personnalisation', description: 'Gravure & rivet' },
      { id: 'summary', title: 'Récapitulatif', description: 'Coordonnées et envoi' },
    )
  }

  // OUTDOOR: utilisation - forme - acier - motifs - guillochage - manche - personnalisation - etui
  if (config.usage === 'outdoor') {
    base.push(
      { id: 'outdoor-intensity', title: 'Utilisation', description: 'Modérée ou intensive' },
      { id: 'outdoor-form', title: 'Forme', description: 'Profil selon l\'usage' },
      { id: 'steel', title: 'Acier', description: 'Résistance & entretien' },
    )
    if (config.steel === 'damasteel') {
      base.push({ id: 'damasteel-pattern', title: 'Motifs de Damasteel', description: 'Purement esthétique' })
    }
    base.push(
      { id: 'outdoor-guillochage', title: 'Guillochage', description: 'Dos de lame' },
      { id: 'handle', title: 'Manche', description: 'Bois, synthétique, exceptionnel' },
      { id: 'handle-composition', title: 'Composition', description: 'Simple ou composé' },
      { id: 'personalization', title: 'Personnalisation', description: 'Gravure & rivet' },
      { id: 'sheath', title: 'Étui', description: 'Kydex ou cuir' },
      { id: 'summary', title: 'Récapitulatif', description: 'Coordonnées et envoi' },
    )
  }

  // CHASSE: forme - acier - motifs - guillochage - manche - personnalisation - etui
  if (config.usage === 'chasse') {
    base.push(
      { id: 'chasse-form', title: 'Forme', description: 'Skinner, caper, dépouille…' },
      { id: 'steel', title: 'Acier', description: 'Résistance & entretien' },
    )
    if (config.steel === 'damasteel') {
      base.push({ id: 'damasteel-pattern', title: 'Motifs de Damasteel', description: 'Purement esthétique' })
    }
    base.push(
      { id: 'chasse-guillochage', title: 'Guillochage', description: 'Dos de lame' },
      { id: 'handle', title: 'Manche', description: 'Bois, synthétique, exceptionnel' },
      { id: 'handle-composition', title: 'Composition', description: 'Simple ou composé' },
      { id: 'personalization', title: 'Personnalisation', description: 'Gravure & rivet' },
      { id: 'sheath', title: 'Étui', description: 'Kydex ou cuir' },
      { id: 'summary', title: 'Récapitulatif', description: 'Coordonnées et envoi' },
    )
  }

  return base
}

export function getPatternScale(config: WizardConfig): DamasteelScale {
  if (config.usage === 'cuisine' && config.cuisineForm) {
    const form = kitchenForms.find((item) => item.id === config.cuisineForm)
    if (form) return form.patternScale
  }
  if (config.usage === 'outdoor' && config.outdoorForm) {
    const allForms = [...outdoorFormsModerate, ...outdoorFormsIntensive]
    const form = allForms.find((item) => item.id === config.outdoorForm)
    if (form) return form.patternScale
  }
  return 'small'
}
