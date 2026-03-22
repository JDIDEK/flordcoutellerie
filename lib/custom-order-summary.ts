import {
  chasseForms,
  damasteelPatternsLarge,
  damasteelPatternsSmall,
  getSteelOptionsForUsage,
  guillochageSets,
  handleFamilies,
  kitchenForms,
  outdoorFormsIntensive,
  outdoorFormsModerate,
  outdoorUseCases,
  pliantFormsByMechanism,
  pliantMechanisms,
  rivetColors,
  sheathOptions,
  usageOptions,
} from '@/features/custom-order/data'
import type { WizardConfig } from '@/features/custom-order/types'

export type SummaryItem = {
  label: string
  value: string
}

export type SummarySection = {
  title: string
  items: SummaryItem[]
}

export function getCustomOrderUsageLabel(config: Pick<WizardConfig, 'usage'>) {
  return usageOptions.find((option) => option.id === config.usage)?.label ?? 'Sur-mesure'
}

export function getCustomOrderSubject(config: Pick<WizardConfig, 'usage'>) {
  return `Demande sur-mesure - ${getCustomOrderUsageLabel(config)}`
}

export function buildCustomOrderSummarySections(config: WizardConfig): SummarySection[] {
  const projectItems: SummaryItem[] = [
    { label: 'Usage', value: getCustomOrderUsageLabel(config) },
  ]

  if (config.usage === 'cuisine') {
    const form = kitchenForms.find((item) => item.id === config.cuisineForm)

    if (form) {
      projectItems.push({
        label: 'Forme cuisine',
        value: `${form.label}${form.length ? ` (${form.length})` : ''}`,
      })
    }

    if (config.guillochageCentral) {
      projectItems.push({
        label: 'Guillochage dos de lame',
        value: config.guillochageCentral,
      })
    }
  }

  if (config.usage === 'pliant') {
    const mechanism = pliantMechanisms.find((item) => item.id === config.pliantMechanism)
    const form = config.pliantMechanism
      ? pliantFormsByMechanism[config.pliantMechanism]?.find((item) => item.id === config.pliantForm)
      : undefined

    if (mechanism) {
      projectItems.push({ label: 'Mecanisme', value: mechanism.label })
    }

    if (form) {
      projectItems.push({ label: 'Forme pliant', value: form.label })
    }

    if (config.guillochageSet) {
      const set = guillochageSets.find((item) => item.id === config.guillochageSet)
      projectItems.push({
        label: 'Set de guillochage',
        value: set?.label ?? config.guillochageSet,
      })
    }

    if (config.guillochageCentral) {
      projectItems.push({
        label: 'Guillochage principal',
        value: config.guillochageCentral,
      })
    }

    if (config.guillochagePlatineLeft || config.guillochagePlatineRight) {
      projectItems.push({
        label: 'Guillochage platines',
        value: `${config.guillochagePlatineLeft ?? '-'} / ${config.guillochagePlatineRight ?? '-'}`,
      })
    }
  }

  if (config.usage === 'outdoor') {
    const useCase = outdoorUseCases.find((item) => item.id === config.outdoorUse)
    const form = [...outdoorFormsModerate, ...outdoorFormsIntensive].find(
      (item) => item.id === config.outdoorForm
    )

    if (useCase) {
      projectItems.push({ label: 'Utilisation', value: useCase.label })
    }

    if (form) {
      projectItems.push({
        label: 'Forme outdoor',
        value: `${form.label}${form.length ? ` (${form.length})` : ''}`,
      })
    }

    if (config.guillochageCentral) {
      projectItems.push({
        label: 'Guillochage dos de lame',
        value: config.guillochageCentral,
      })
    }
  }

  if (config.usage === 'chasse') {
    const form = chasseForms.find((item) => item.id === config.chasseForm)

    if (form) {
      projectItems.push({
        label: 'Forme chasse',
        value: `${form.label}${form.length ? ` (${form.length})` : ''}`,
      })
    }

    if (config.guillochageCentral) {
      projectItems.push({
        label: 'Guillochage dos de lame',
        value: config.guillochageCentral,
      })
    }
  }

  const materialsItems: SummaryItem[] = []
  const steel = getSteelOptionsForUsage(config.usage).find((item) => item.id === config.steel)
  const damasteelPatterns = config.usage === 'pliant' ? damasteelPatternsSmall : damasteelPatternsLarge
  const damasteelPattern = damasteelPatterns.find((item) => item.id === config.damasteelPattern)
  const handleFamily = handleFamilies.find((item) => item.id === config.handleFamily)
  const handleVariant = handleFamily?.variants?.find((item) => item.id === config.handleVariant)
  const sheath = sheathOptions.find((item) => item.id === config.sheath)

  if (steel) {
    materialsItems.push({ label: 'Acier', value: steel.label })
  } else if (config.steel) {
    materialsItems.push({ label: 'Acier', value: config.steel })
  }

  if (config.steel === 'damasteel' && config.damasteelPattern) {
    materialsItems.push({
      label: 'Motif Damasteel',
      value: damasteelPattern?.label ?? config.damasteelPattern,
    })
  }

  if (handleFamily) {
    materialsItems.push({
      label: 'Manche',
      value: handleVariant ? `${handleFamily.label} - ${handleVariant.label}` : handleFamily.label,
    })
  }

  if (config.handleComposition) {
    materialsItems.push({
      label: 'Composition manche',
      value: config.handleComposition === 'compose' ? 'Compose' : 'Simple',
    })
  }

  if (sheath) {
    materialsItems.push({ label: 'Etui', value: sheath.label })
  }

  const personalizationItems: SummaryItem[] = [
  ]

  if (
    (config.usage === 'cuisine' || config.usage === 'outdoor') &&
    config.rivetColor
  ) {
    personalizationItems.push({
      label: 'Couleur du rivet',
      value: rivetColors.find((item) => item.id === config.rivetColor)?.label ?? config.rivetColor,
    })
  }

  personalizationItems.push(
    { label: 'Rivet mosaique', value: config.mosaicRivet ? 'Oui' : 'Non' },
    {
      label: 'Gravure',
      value: config.engraving ? config.engravingText || 'Oui, sans texte precise' : 'Non',
    },
    { label: 'Commentaires', value: config.notes || 'Aucun commentaire' },
  )

  const contactItems: SummaryItem[] = [
    { label: 'Prenom', value: config.firstName },
    { label: 'Nom', value: config.lastName },
    { label: 'Email', value: config.email },
  ]

  return [
    { title: 'Projet', items: projectItems },
    { title: 'Materiaux et finitions', items: materialsItems },
    { title: 'Personnalisation', items: personalizationItems },
    { title: 'Coordonnees client', items: contactItems },
  ].filter((section) => section.items.length > 0)
}

export function buildCustomOrderPlainText(config: WizardConfig) {
  return buildCustomOrderSummarySections(config)
    .flatMap((section) => [
      `${section.title} :`,
      ...section.items.map((item) => `- ${item.label} : ${item.value}`),
      '',
    ])
    .join('\n')
    .trim()
}
