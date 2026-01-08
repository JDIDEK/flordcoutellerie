'use client'

import { useReducer, useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import type { WizardStep } from './types'
import { wizardReducer, initialConfig } from './reducer'
import { isStepComplete, getSteps } from './helpers'
import {
  usageOptions,
  kitchenForms,
  pliantMechanisms,
  pliantFormsByMechanism,
  outdoorUseCases,
  outdoorForms,
  chasseForms,
  handleFamilies,
  getSteelOptionsForUsage,
  damasteelPatterns,
} from './data'
import {
  UsageStep,
  CuisineFormStep,
  CuisineGuillochageStep,
  PliantMechanismStep,
  PliantFormStep,
  PliantGuillochageDosStep,
  PliantGuillochagePlatinesStep,
  OutdoorIntensityStep,
  OutdoorFormStep,
  OutdoorGuillochageStep,
  ChasseFormStep,
  ChasseGuillochageStep,
  SteelStep,
  DamasteelStep,
  SheathStep,
  HandleStep,
  HandleCompositionStep,
  GuillochageStep,
  PersonalizationStep,
  SummaryStep,
} from './steps'

export function CustomOrderWizard() {
  const [config, dispatch] = useReducer(wizardReducer, initialConfig)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const steps = useMemo(() => getSteps(config), [config])
  const currentStep = steps[activeStepIndex]

  useEffect(() => {
    if (activeStepIndex > steps.length - 1) {
      setActiveStepIndex(steps.length - 1)
    }
  }, [steps.length, activeStepIndex])

  const canGoNext = currentStep ? isStepComplete(currentStep.id, config) : false

  const goNext = () => {
    if (activeStepIndex < steps.length - 1 && canGoNext) {
      setActiveStepIndex((prev) => prev + 1)
    }
  }

  const goBack = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex((prev) => prev - 1)
    }
  }

  const mailtoBody = useMemo(() => {
    const usageLabel = usageOptions.find((u) => u.id === config.usage)?.label ?? 'Sur-mesure'
    const lines = [
      `Usage : ${usageLabel}`,
    ]

    if (config.usage === 'cuisine') {
      const form = kitchenForms.find((f) => f.id === config.cuisineForm)
      if (form) lines.push(`Forme cuisine : ${form.label} (${form.length})`)
      if (config.guillochageCentral) {
        lines.push(`Guillochage dos de lame : ${config.guillochageCentral}`)
      }
    }
    if (config.usage === 'pliant') {
      const mech = pliantMechanisms.find((m) => m.id === config.pliantMechanism)
      const form = config.pliantMechanism
        ? pliantFormsByMechanism[config.pliantMechanism]?.find((f) => f.id === config.pliantForm)
        : undefined
      if (mech) lines.push(`Mécanisme : ${mech.label}`)
      if (form) lines.push(`Forme pliant : ${form.label}`)
      if (config.guillochageCentral) {
        lines.push(`Guillochage dos de lame : ${config.guillochageCentral}`)
      }
      if (config.guillochagePlatineLeft || config.guillochagePlatineRight) {
        lines.push(`Guillochage platines : ${config.guillochagePlatineLeft ?? '-'} / ${config.guillochagePlatineRight ?? '-'}`)
      }
    }
    if (config.usage === 'outdoor') {
      const intensity = outdoorUseCases.find((o) => o.id === config.outdoorUse)
      const form = outdoorForms.find((f) => f.id === config.outdoorForm)
      if (intensity) lines.push(`Utilisation : ${intensity.label}`)
      if (form) lines.push(`Forme outdoor : ${form.label} (${form.length})`)
      if (config.guillochageCentral) {
        lines.push(`Guillochage dos de lame : ${config.guillochageCentral}`)
      }
      if (config.sheath) lines.push(`Étui : ${config.sheath === 'kydex' ? 'Kydex' : 'Cuir'}`)
    }
    if (config.usage === 'chasse') {
      const form = chasseForms.find((f) => f.id === config.chasseForm)
      if (form) lines.push(`Forme chasse : ${form.label} (${form.length})`)
      if (config.guillochageCentral) {
        lines.push(`Guillochage dos de lame : ${config.guillochageCentral}`)
      }
      if (config.sheath) lines.push(`Étui : ${config.sheath === 'kydex' ? 'Kydex' : 'Cuir'}`)
    }

    if (config.steel) {
      const steel = getSteelOptionsForUsage(config.usage).find((s) => s.id === config.steel)
      lines.push(`Acier : ${steel?.label ?? config.steel}`)
    }
    if (config.steel === 'damasteel' && config.damasteelPattern) {
      const pattern = damasteelPatterns.find((p) => p.id === config.damasteelPattern)
      lines.push(`Motif Damasteel : ${pattern?.label ?? config.damasteelPattern}`)
    }

    if (config.handleFamily) {
      const handle = handleFamilies.find((h) => h.id === config.handleFamily)
      const variant = handle?.variants.find((v) => v.id === config.handleVariant)
      lines.push(`Manche : ${handle?.label ?? config.handleFamily} ${variant ? `- ${variant.label}` : ''}`)
    }

    lines.push(`Rivet mosaïque : ${config.mosaicRivet ? 'Oui' : 'Non'}`)
    lines.push(`Gravure : ${config.engraving ? config.engravingText || 'Oui' : 'Non'}`)
    lines.push(`Commentaires : ${config.notes || 'Aucun'}`)
    lines.push('')
    lines.push(`Prénom : ${config.firstName || '-'}`)
    lines.push(`Nom : ${config.lastName || '-'}`)
    lines.push(`Email : ${config.email || '-'}`)

    return encodeURIComponent(lines.join('\n'))
  }, [config])

  const mailtoSubject = encodeURIComponent(
    `Demande sur-mesure - ${usageOptions.find((u) => u.id === config.usage)?.label ?? 'Couteau'}`
  )

  const renderStepContent = () => {
    switch (currentStep?.id) {
      case 'usage':
        return <UsageStep config={config} dispatch={dispatch} />
      case 'cuisine-form':
        return <CuisineFormStep config={config} dispatch={dispatch} />
      case 'cuisine-guillochage':
        return <CuisineGuillochageStep config={config} dispatch={dispatch} />
      case 'pliant-mechanism':
        return <PliantMechanismStep config={config} dispatch={dispatch} />
      case 'pliant-form':
        return <PliantFormStep config={config} dispatch={dispatch} />
      case 'pliant-guillochage-dos':
        return <PliantGuillochageDosStep config={config} dispatch={dispatch} />
      case 'pliant-guillochage-platines':
        return <PliantGuillochagePlatinesStep config={config} dispatch={dispatch} />
      case 'outdoor-intensity':
        return <OutdoorIntensityStep config={config} dispatch={dispatch} />
      case 'outdoor-form':
        return <OutdoorFormStep config={config} dispatch={dispatch} />
      case 'outdoor-guillochage':
        return <OutdoorGuillochageStep config={config} dispatch={dispatch} />
      case 'chasse-form':
        return <ChasseFormStep config={config} dispatch={dispatch} />
      case 'chasse-guillochage':
        return <ChasseGuillochageStep config={config} dispatch={dispatch} />
      case 'steel':
        return <SteelStep config={config} dispatch={dispatch} />
      case 'damasteel-pattern':
        return <DamasteelStep config={config} dispatch={dispatch} />
      case 'sheath':
        return <SheathStep config={config} dispatch={dispatch} />
      case 'pliant-guillochage':
        return <GuillochageStep config={config} dispatch={dispatch} />
      case 'handle':
        return <HandleStep config={config} dispatch={dispatch} />
      case 'handle-composition':
        return <HandleCompositionStep config={config} dispatch={dispatch} />
      case 'personalization':
        return <PersonalizationStep config={config} dispatch={dispatch} />
      case 'summary':
        return <SummaryStep config={config} dispatch={dispatch} mailtoSubject={mailtoSubject} mailtoBody={mailtoBody} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 flex-1">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                index < activeStepIndex
                  ? 'bg-primary'
                  : index === activeStepIndex
                    ? 'bg-primary/60'
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground whitespace-nowrap">
          {activeStepIndex + 1}/{steps.length} · {currentStep?.title}
        </p>
      </div>

      <Card className="p-6 md:p-10 space-y-6">{renderStepContent()}</Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={goBack} disabled={activeStepIndex === 0}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        {currentStep?.id !== 'summary' && (
          <Button onClick={goNext} disabled={!canGoNext}>
            Continuer
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
