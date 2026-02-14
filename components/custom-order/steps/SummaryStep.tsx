'use client'

import { Mail } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StepHeader } from '../ui'
import {
  usageOptions,
  kitchenForms,
  pliantMechanisms,
  pliantFormsByMechanism,
  outdoorUseCases,
  outdoorFormsModerate,
  outdoorFormsIntensive,
  chasseForms,
  handleFamilies,
  getSteelOptionsForUsage,
  damasteelPatterns,
} from '../data'
import { isStepComplete } from '../helpers'
import type { WizardConfig, Action } from '../types'

interface SummaryStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
  mailtoSubject: string
  mailtoBody: string
}

export function SummaryStep({ config, dispatch, mailtoSubject, mailtoBody }: SummaryStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Récapitulatif & contact"
        description="Vérifiez vos choix et renseignez vos coordonnées"
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 space-y-3">
          <h4 className="font-medium">Vos coordonnées</h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-1">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={config.firstName}
                onChange={(e) => dispatch({ type: 'setFirstName', value: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={config.lastName}
                onChange={(e) => dispatch({ type: 'setLastName', value: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={config.email}
                onChange={(e) => dispatch({ type: 'setEmail', value: e.target.value })}
              />
            </div>
          </div>
        </Card>
        <Card className="p-5 space-y-3">
          <h4 className="font-medium">Synthèse</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Usage : {usageOptions.find((u) => u.id === config.usage)?.label ?? '—'}</p>
            {config.usage === 'cuisine' && (
              <>
                <p>Forme : {kitchenForms.find((f) => f.id === config.cuisineForm)?.label ?? '—'}</p>
                <p>Guillochage dos de lame : {config.guillochageCentral ?? '—'}</p>
              </>
            )}
            {config.usage === 'pliant' && (
              <>
                <p>Mécanisme : {pliantMechanisms.find((m) => m.id === config.pliantMechanism)?.label ?? '—'}</p>
                <p>Forme : {config.pliantMechanism ? pliantFormsByMechanism[config.pliantMechanism]?.find((f) => f.id === config.pliantForm)?.label ?? '—' : '—'}</p>
                <p>Guillochage dos de lame : {config.guillochageCentral ?? '—'}</p>
                <p>Guillochage platines : {config.guillochagePlatineLeft && config.guillochagePlatineRight ? `${config.guillochagePlatineLeft} / ${config.guillochagePlatineRight}` : '—'}</p>
              </>
            )}
            {config.usage === 'outdoor' && (
              <>
                <p>Utilisation : {outdoorUseCases.find((o) => o.id === config.outdoorUse)?.label ?? '—'}</p>
                <p>Forme : {[...outdoorFormsModerate, ...outdoorFormsIntensive].find((f) => f.id === config.outdoorForm)?.label ?? '—'}</p>
                <p>Guillochage dos de lame : {config.guillochageCentral ?? '—'}</p>
                <p>Étui : {config.sheath ? (config.sheath === 'kydex' ? 'Kydex' : 'Cuir') : '—'}</p>
              </>
            )}
            {config.usage === 'chasse' && (
              <>
                <p>Forme : {chasseForms.find((f) => f.id === config.chasseForm)?.label ?? '—'}</p>
                <p>Guillochage dos de lame : {config.guillochageCentral ?? '—'}</p>
                <p>Étui : {config.sheath ? (config.sheath === 'kydex' ? 'Kydex' : 'Cuir') : '—'}</p>
              </>
            )}
            <p>Acier : {getSteelOptionsForUsage(config.usage).find((s) => s.id === config.steel)?.label ?? '—'}</p>
            {config.steel === 'damasteel' && (
              <p>Motif : {damasteelPatterns.find((p) => p.id === config.damasteelPattern)?.label ?? '—'}</p>
            )}
            <p>Manche : {config.handleFamily ? `${handleFamilies.find((h) => h.id === config.handleFamily)?.label ?? config.handleFamily}${config.handleVariant ? ` - ${handleFamilies.find((h) => h.id === config.handleFamily)?.variants?.find((v) => v.id === config.handleVariant)?.label ?? config.handleVariant}` : ''}` : '—'}</p>
            <p>Composition : {config.handleComposition === 'simple' ? 'Simple' : config.handleComposition === 'compose' ? 'Composé' : '—'}</p>
            <p>Rivet mosaïque : {config.mosaicRivet ? 'Oui' : 'Non'}</p>
            <p>Gravure : {config.engraving ? config.engravingText || 'Oui' : 'Non'}</p>
            <p>Commentaires : {config.notes || 'Aucun'}</p>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={() =>
              window.location.assign(
                `mailto:floribadeaudumas@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`
              )
            }
            disabled={!isStepComplete('summary', config)}
          >
            <Mail className="h-4 w-4 mr-2" />
            Envoyer la demande
          </Button>
        </Card>
      </div>
    </div>
  )
}
