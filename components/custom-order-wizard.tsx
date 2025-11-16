'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Check, ChevronRight, ChevronLeft, Mail } from 'lucide-react'

const steps = [
  { id: 1, title: 'Usage', description: 'Type de couteau' },
  { id: 2, title: 'Forme', description: 'Modèle & dimensions' },
  { id: 3, title: 'Acier', description: 'Choix de la lame' },
  { id: 4, title: 'Manche', description: 'Matériaux & finition' },
  { id: 5, title: 'Personnalisation', description: 'Guillochage & gravure' },
]

const usageOptions = [
  { id: 'cuisine', label: 'Cuisine', description: 'Couteaux de chef, Santoku, Nakiri', icon: '🔪' },
  { id: 'outdoor', label: 'Outdoor', description: 'Bushcraft, survie, camping', icon: '🏕️' },
  { id: 'collection', label: 'Collection', description: 'Pièce d\'art, vitrine', icon: '⭐' },
  { id: 'pliant', label: 'Pliant', description: 'Piémontais, cran forcé, EDC', icon: '🗡️' },
]

const formesByCuisine = [
  { id: 'gyuto', label: 'Gyuto', length: '210-270mm', price: 100 },
  { id: 'santoku', label: 'Santoku', length: '165-180mm', price: 90 },
  { id: 'nakiri', label: 'Nakiri', length: '165mm', price: 85 },
  { id: 'yanagiba', label: 'Yanagiba', length: '240-300mm', price: 120 },
  { id: 'kiritsuke', label: 'Kiritsuke', length: '240-270mm', price: 110 },
]

const formesOutdoor = [
  { id: 'bushcraft', label: 'Bushcraft', length: '100-120mm', price: 70 },
  { id: 'survie', label: 'Survie', length: '120-150mm', price: 80 },
  { id: 'hunting', label: 'Chasse', length: '100-130mm', price: 85 },
]

const formesPliants = [
  { id: 'piemontais', label: 'Piémontais', length: '90-110mm fermé', price: 150 },
  { id: 'cran-force', label: 'Cran Forcé', length: '100-120mm fermé', price: 160 },
  { id: 'laguiole', label: 'Laguiole', length: '110-120mm fermé', price: 170 },
]

const aciers = [
  { 
    id: '14c28n', 
    label: '14C28N Swedish', 
    hrc: '58-60', 
    price: 0,
    description: 'Inox suédois, excellent rapport qualité/prix',
    badge: '€'
  },
  { 
    id: 'vg10', 
    label: 'VG10 Suminagashi', 
    hrc: '60-61', 
    price: 200,
    description: '67 couches japonaises, motifs ondulés',
    badge: '€€'
  },
  { 
    id: 'damasteel', 
    label: 'Damasteel DS93X', 
    hrc: '64', 
    price: 500,
    description: 'Damas suédois premium, motifs variés',
    badge: '€€€€'
  },
]

const manches = [
  { id: 'stabilise', label: 'Bois Stabilisé', options: ['Loupe de peuplier', 'Olivier', 'Érable ondé'], price: 0 },
  { id: 'resine', label: 'Résine Artisanale', options: ['Alvéolée bronze', 'Translucide', 'Marbrée'], price: 50 },
  { id: 'g10', label: 'G10 Technique', options: ['Noir texturé', 'Vert olive', 'Bleu marine'], price: 30 },
  { id: 'morta', label: 'Morta Premium', options: ['3000 ans', '5000 ans'], price: 150 },
]

const guillochages = [
  { id: 'none', label: 'Sans guillochage', price: 0 },
  { id: 'fleuri', label: 'Guillochage fleuri', price: 80 },
  { id: 'pointes', label: 'Guillochage en pointes', price: 80 },
  { id: 'sabliers', label: 'Guillochage sabliers', price: 90 },
]

export function CustomOrderWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState({
    usage: '',
    forme: '',
    acier: '',
    manche: '',
    mancheVariant: '',
    guillochage: '',
    gravure: '',
    notes: '',
    name: '',
    email: '',
  })

  const calculatePrice = () => {
    let total = 0
    
    // Base forme price
    const allFormes = [...formesByCuisine, ...formesOutdoor, ...formesPliants]
    const selectedForme = allFormes.find(f => f.id === config.forme)
    if (selectedForme) total += selectedForme.price
    
    // Acier price
    const selectedAcier = aciers.find(a => a.id === config.acier)
    if (selectedAcier) total += selectedAcier.price
    
    // Manche price
    const selectedManche = manches.find(m => m.id === config.manche)
    if (selectedManche) total += selectedManche.price
    
    // Guillochage price
    const selectedGuillochage = guillochages.find(g => g.id === config.guillochage)
    if (selectedGuillochage) total += selectedGuillochage.price
    
    // Gravure
    if (config.gravure) total += 30
    
    return total
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    const price = calculatePrice()
    const subject = encodeURIComponent(`Devis Sur Mesure - ${config.usage}`)
    const body = encodeURIComponent(`Bonjour,

Je souhaite commander un couteau sur mesure avec la configuration suivante :

Usage : ${config.usage}
Forme : ${config.forme}
Acier : ${config.acier}
Manche : ${config.manche} ${config.mancheVariant ? `(${config.mancheVariant})` : ''}
Guillochage : ${config.guillochage}
Gravure : ${config.gravure || 'Non'}
Notes : ${config.notes || 'Aucune'}

Prix estimé : ${price}€

Nom : ${config.name}
Email : ${config.email}

Merci de me contacter pour finaliser la commande.

Cordialement`)

    window.location.href = `mailto:floribadeaudumas@gmail.com?subject=${subject}&body=${body}`
  }

  const getFormesByUsage = () => {
    switch (config.usage) {
      case 'cuisine':
        return formesByCuisine
      case 'outdoor':
        return formesOutdoor
      case 'pliant':
        return formesPliants
      default:
        return [...formesByCuisine, ...formesOutdoor]
    }
  }

  return (
    <div className="space-y-12">
      {/* Progress */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  currentStep > step.id
                    ? 'bg-primary border-primary text-primary-foreground'
                    : currentStep === step.id
                    ? 'border-primary text-primary'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <div className="text-center mt-2 hidden md:block">
                <p className="text-xs font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] flex-1 transition-colors ${
                  currentStep > step.id ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="p-8 md:p-12">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-light mb-2">
                Quel sera l'usage principal ?
              </h2>
              <p className="text-muted-foreground">
                Sélectionnez le type qui correspond à vos besoins
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {usageOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`p-6 cursor-pointer transition-all hover:border-primary ${
                    config.usage === option.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setConfig({ ...config, usage: option.id, forme: '', acier: '', manche: '' })}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{option.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{option.label}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    {config.usage === option.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-light mb-2">
                Choisissez la forme
              </h2>
              <p className="text-muted-foreground">
                Chaque forme a des caractéristiques et dimensions spécifiques
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {getFormesByUsage().map((forme) => (
                <Card
                  key={forme.id}
                  className={`p-6 cursor-pointer transition-all hover:border-primary ${
                    config.forme === forme.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setConfig({ ...config, forme: forme.id })}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{forme.label}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{forme.length}</p>
                      <Badge variant="outline">+{forme.price}€</Badge>
                    </div>
                    {config.forme === forme.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-light mb-2">
                Sélectionnez l'acier
              </h2>
              <p className="text-muted-foreground">
                L'acier détermine les performances et l'esthétique de la lame
              </p>
            </div>
            <div className="space-y-4">
              {aciers.map((acier) => (
                <Card
                  key={acier.id}
                  className={`p-6 cursor-pointer transition-all hover:border-primary ${
                    config.acier === acier.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setConfig({ ...config, acier: acier.id })}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{acier.label}</h3>
                        <Badge>{acier.badge}</Badge>
                        <Badge variant="outline">{acier.hrc} HRC</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{acier.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-light text-primary">
                        {acier.price > 0 ? `+${acier.price}€` : 'Base'}
                      </p>
                      {config.acier === acier.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-light mb-2">
                Matériau du manche
              </h2>
              <p className="text-muted-foreground">
                Le manche allie confort, esthétique et durabilité
              </p>
            </div>
            <div className="space-y-4">
              {manches.map((manche) => (
                <Card
                  key={manche.id}
                  className={`p-6 cursor-pointer transition-all hover:border-primary ${
                    config.manche === manche.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setConfig({ ...config, manche: manche.id, mancheVariant: '' })}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{manche.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {manche.options.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-light text-primary">
                          {manche.price > 0 ? `+${manche.price}€` : 'Base'}
                        </p>
                        {config.manche === manche.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                    
                    {config.manche === manche.id && (
                      <div className="pt-4 border-t border-border">
                        <Label className="text-sm mb-2 block">Variante</Label>
                        <RadioGroup value={config.mancheVariant} onValueChange={(value) => setConfig({ ...config, mancheVariant: value })}>
                          {manche.options.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={option} />
                              <Label htmlFor={option} className="text-sm cursor-pointer">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-light mb-2">
                Personnalisation finale
              </h2>
              <p className="text-muted-foreground">
                Ajoutez guillochage et gravure pour une pièce unique
              </p>
            </div>
            
            {/* Guillochage */}
            <div className="space-y-4">
              <Label>Guillochage</Label>
              <div className="grid md:grid-cols-2 gap-4">
                {guillochages.map((guillochage) => (
                  <Card
                    key={guillochage.id}
                    className={`p-4 cursor-pointer transition-all hover:border-primary ${
                      config.guillochage === guillochage.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setConfig({ ...config, guillochage: guillochage.id })}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{guillochage.label}</span>
                      <div className="flex items-center gap-3">
                        {guillochage.price > 0 && (
                          <Badge variant="outline">+{guillochage.price}€</Badge>
                        )}
                        {config.guillochage === guillochage.id && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Gravure */}
            <div className="space-y-2">
              <Label htmlFor="gravure">Gravure personnalisée (+30€)</Label>
              <Input
                id="gravure"
                placeholder="Initiales, date, message court..."
                value={config.gravure}
                onChange={(e) => setConfig({ ...config, gravure: e.target.value })}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes additionnelles</Label>
              <Textarea
                id="notes"
                placeholder="Précisions sur dimensions, préférences esthétiques..."
                value={config.notes}
                onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                rows={4}
              />
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  placeholder="Jean Dupont"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jean@example.com"
                  value={config.email}
                  onChange={(e) => setConfig({ ...config, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Price Summary */}
            <Card className="p-6 bg-secondary/30 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Prix estimé</h3>
                <p className="text-3xl font-serif font-light text-primary">
                  {calculatePrice()}€
                </p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Acompte de 20% à la commande • Délai de réalisation : 4-8 semaines
              </p>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSubmit}
                disabled={!config.name || !config.email}
              >
                <Mail className="mr-2 h-4 w-4" />
                Demander un Devis Gratuit
              </Button>
            </Card>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        {currentStep < steps.length ? (
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !config.usage) ||
              (currentStep === 2 && !config.forme) ||
              (currentStep === 3 && !config.acier) ||
              (currentStep === 4 && (!config.manche || !config.mancheVariant)) ||
              (currentStep === 5 && !config.guillochage)
            }
          >
            Suivant
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </div>
  )
}
