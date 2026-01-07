'use client'

import { useEffect, useMemo, useReducer, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  Sparkles,
  Star,
} from 'lucide-react'

type Usage = 'cuisine' | 'pliant' | 'outdoor'
type OutdoorUse = 'moderee' | 'intensive'
type DamasteelScale = 'large' | 'small'

type StepId =
  | 'usage'
  | 'cuisine-form'
  | 'pliant-mechanism'
  | 'pliant-form'
  | 'outdoor-intensity'
  | 'outdoor-form'
  | 'steel'
  | 'damasteel-pattern'
  | 'sheath'
  | 'pliant-guillochage'
  | 'handle'
  | 'personalization'
  | 'summary'

type WizardStep = {
  id: StepId
  title: string
  description: string
}

type KitchenForm = {
  id: string
  label: string
  length: string
  usageNote: string
  patternScale: DamasteelScale
  priceLevel: number
}

type PliantMechanism = {
  id: string
  label: string
  description: string
}

type PliantForm = {
  id: string
  label: string
  description: string
  profile: string
  priceLevel: number
}

type OutdoorForm = {
  id: string
  label: string
  description: string
  length: string
  patternScale: DamasteelScale
  priceLevel: number
}

type SteelOption = {
  id: '14c28n' | 'vg10' | 'damasteel' | 'n690co'
  label: string
  description: string
  contexts: Usage[]
  tech: {
    retention: number
    sharpening: number
    flexibility: number
    price: number
  }
}

type HandleFamily = {
  id: string
  label: string
  description: string
  priceLevel: number
  variants: { id: string; label: string; tone?: string }[]
}

type GuillochageSet = {
  id: string
  label: string
  central: string
  platines: string
}

type WizardConfig = {
  usage?: Usage
  cuisineForm?: string
  pliantMechanism?: string
  pliantForm?: string
  outdoorUse?: OutdoorUse
  outdoorForm?: string
  steel?: SteelOption['id']
  damasteelPattern?: string
  sheath?: 'kydex' | 'cuir'
  handleFamily?: string
  handleVariant?: string
  handleComposition?: 'simple' | 'compose'
  engraving: boolean
  engravingText: string
  mosaicRivet: boolean
  notes: string
  firstName: string
  lastName: string
  email: string
  guillochageMode: 'set' | 'custom'
  guillochageSet?: string
  guillochageCentral?: string
  guillochagePlatineLeft?: string
  guillochagePlatineRight?: string
}

const usageOptions = [
  {
    id: 'cuisine',
    label: 'Cuisine',
    description: 'Amateurs et professionnels, équilibre et long tranchant',
  },
  {
    id: 'pliant',
    label: 'Pliant',
    description: 'EDC discret, poche ou sac, mise au point fine',
  },
  {
    id: 'outdoor',
    label: 'Outdoor',
    description: 'Bushcraft, camp, survie. Robustesse et prise sûre',
  },
  {
    id: 'chasse',
    label: 'Chasse',
    description: 'En cours de conception',
    disabled: true,
  },
]

const kitchenForms: KitchenForm[] = [
  {
    id: 'gyuto',
    label: 'Gyuto',
    length: '210–270 mm',
    usageNote: 'Grand chef polyvalent',
    patternScale: 'large',
    priceLevel: 3,
  },
  {
    id: 'kiritsuke',
    label: 'Kiritsuke',
    length: '240 mm',
    usageNote: 'Ligne tendue, découpe précise',
    patternScale: 'large',
    priceLevel: 3,
  },
  {
    id: 'yanagiba',
    label: 'Yanagiba',
    length: '270–300 mm',
    usageNote: 'Tranches longues (sashimi)',
    patternScale: 'large',
    priceLevel: 4,
  },
  {
    id: 'santoku',
    label: 'Santoku',
    length: '165–180 mm',
    usageNote: 'Polyvalent, compact',
    patternScale: 'large',
    priceLevel: 2,
  },
  {
    id: 'nakiri',
    label: 'Nakiri',
    length: '165 mm',
    usageNote: 'Légumes, coupe à plat',
    patternScale: 'large',
    priceLevel: 2,
  },
  {
    id: 'bunka',
    label: 'Bunka',
    length: '165–180 mm',
    usageNote: 'Pointe carrée pour précision',
    patternScale: 'small',
    priceLevel: 2,
  },
  {
    id: 'petty',
    label: 'Petty',
    length: '120–150 mm',
    usageNote: 'Petite lame, émincer & parer',
    patternScale: 'small',
    priceLevel: 1,
  },
]

const pliantMechanisms: PliantMechanism[] = [
  {
    id: 'cran-plat',
    label: 'Cran Plat',
    description: 'Sûreté classique, fermeture nette',
  },
  {
    id: 'piemontais',
    label: 'Piémontais',
    description: 'Ouverture douce, friction contrôlée',
  },
]

const pliantFormsByMechanism: Record<string, PliantForm[]> = {
  'cran-plat': [
    {
      id: 'profil-classique',
      label: 'Profil Classique',
      description: 'Drop point équilibré',
      profile: 'EDC polyvalent',
      priceLevel: 2,
    },
    {
      id: 'urbain',
      label: 'Urbain',
      description: 'Ligne fine, port discret',
      profile: 'Couteau de poche fin',
      priceLevel: 2,
    },
    {
      id: 'heritage',
      label: 'Héritage',
      description: 'Courbes inspirées Laguiole',
      profile: 'Signature atelier',
      priceLevel: 3,
    },
  ],
  piemontais: [
    {
      id: 'piemontais-lame-haute',
      label: 'Lame Haute',
      description: 'Levier généreux, contrôle maximal',
      profile: 'Fricton douce',
      priceLevel: 2,
    },
    {
      id: 'piemontais-svelte',
      label: 'Svelte',
      description: 'Silhouette minimale',
      profile: 'EDC compact',
      priceLevel: 1,
    },
    {
      id: 'piemontais-workhorse',
      label: 'Workhorse',
      description: 'Lame solide pour tout faire',
      profile: 'Outils & camp',
      priceLevel: 3,
    },
  ],
}

const outdoorUseCases: { id: OutdoorUse; label: string; description: string }[] = [
  {
    id: 'moderee',
    label: 'Utilisation modérée',
    description: 'Cuisine de camp, randonnée, découpe polyvalente',
  },
  {
    id: 'intensive',
    label: 'Utilisation intensive',
    description: 'Bâtonnage, camp fixe, survie et bushcraft',
  },
]

const outdoorForms: OutdoorForm[] = [
  {
    id: 'campcraft',
    label: 'Campcraft',
    description: 'Lame ventrue pour la cuisine de camp',
    length: '110–130 mm',
    patternScale: 'large',
    priceLevel: 2,
  },
  {
    id: 'companion',
    label: 'Companion',
    description: 'Profil fin, coupe contrôlée',
    length: '95–110 mm',
    patternScale: 'small',
    priceLevel: 1,
  },
  {
    id: 'survie',
    label: 'Survie',
    description: 'Dos renforcé, pointe épaisse',
    length: '125–140 mm',
    patternScale: 'large',
    priceLevel: 3,
  },
  {
    id: 'bush',
    label: 'Bushcraft',
    description: 'Scandi léger, tranchant endurant',
    length: '105–120 mm',
    patternScale: 'small',
    priceLevel: 2,
  },
]

const steelOptions: SteelOption[] = [
  {
    id: '14c28n',
    label: '14C28N',
    description: 'Inox suédois, facile à entretenir',
    contexts: ['cuisine', 'pliant', 'outdoor'],
    tech: { retention: 3, sharpening: 5, flexibility: 3, price: 2 },
  },
  {
    id: 'vg10',
    label: 'Suminagashi VG10',
    description: 'Damas 67 couches, tranchant nerveux',
    contexts: ['cuisine', 'pliant'],
    tech: { retention: 4, sharpening: 3, flexibility: 3, price: 3 },
  },
  {
    id: 'damasteel',
    label: 'Damasteel DS93X',
    description: 'Damas suédois premium, motifs multiples',
    contexts: ['cuisine', 'pliant', 'outdoor'],
    tech: { retention: 4, sharpening: 3, flexibility: 4, price: 5 },
  },
  {
    id: 'n690co',
    label: 'N690Co',
    description: 'Inox cobalt, robuste et fiable',
    contexts: ['outdoor'],
    tech: { retention: 3, sharpening: 3, flexibility: 3, price: 3 },
  },
]

const damasteelPatterns: Record<DamasteelScale, string[]> = {
  large: [
    'Fafnir',
    'Rose',
    'Vinland',
    'Odin Heim',
    'Ladder',
    'Dense Twist',
    'Wild',
    'Nidhogg',
  ],
  small: [
    'Brokkr',
    'Hakkapella',
    'Bjorkmans Twist',
    'Dense Twist',
    'Rain',
    'Roses Dense',
    'Radial',
    'Odin Eye',
  ],
}

const handleFamilies: HandleFamily[] = [
  {
    id: 'bois',
    label: 'Bois',
    description: 'Textures naturelles, clair / sombre / coloré',
    priceLevel: 1,
    variants: [
      { id: 'clair', label: 'Clair (olivier, érable)' },
      { id: 'sombre', label: 'Sombre (noyer, wengé)' },
      { id: 'colore', label: 'Coloré (stabilisé)' },
    ],
  },
  {
    id: 'synthetic',
    label: 'Synthétique',
    description: 'Micarta, G10, composites techniques',
    priceLevel: 2,
    variants: [
      { id: 'micarta', label: 'Micarta toile' },
      { id: 'g10', label: 'G10 texturé' },
      { id: 'carbone', label: 'Fibre de carbone' },
    ],
  },
  {
    id: 'animal',
    label: 'Animal',
    description: 'Bois de cerf, corne, matière vivante',
    priceLevel: 3,
    variants: [
      { id: 'cerf', label: 'Bois de cerf' },
      { id: 'corne', label: 'Corne polie' },
    ],
  },
  {
    id: 'exceptionnel',
    label: 'Exceptionnel',
    description: 'Ivoire, fossile stabilisé, pièces rares',
    priceLevel: 4,
    variants: [
      { id: 'ivoire', label: 'Ivoire ancien' },
      { id: 'fossile', label: 'Matière fossile' },
    ],
  },
  {
    id: 'composition',
    label: 'Composition',
    description: 'Assemblage multi-matières',
    priceLevel: 3,
    variants: [
      { id: 'simple', label: 'Simple' },
      { id: 'compose', label: 'Composé (spacers, inserts)' },
    ],
  },
]

const sheathOptions = [
  {
    id: 'kydex',
    label: 'Kydex',
    description: 'Rigide, étanche, verrouillage net',
    badge: 'Technique',
  },
  {
    id: 'cuir',
    label: 'Cuir',
    description: 'Souple, patine élégante',
    badge: 'Traditionnel',
  },
]

const guillochageMotifs = [
  { id: 'liane', label: 'Liane' },
  { id: 'pointes', label: 'Pointes' },
  { id: 'sabliere', label: 'Sabliers' },
  { id: 'floral', label: 'Floral' },
  { id: 'geometrique', label: 'Géométrique' },
]

const guillochageSets: GuillochageSet[] = [
  { id: 'classique', label: 'Set Classique', central: 'Liane', platines: 'Pointes' },
  { id: 'organique', label: 'Set Organique', central: 'Floral', platines: 'Sabliers' },
  { id: 'graphique', label: 'Set Graphique', central: 'Géométrique', platines: 'Pointes' },
]

const initialConfig: WizardConfig = {
  usage: undefined,
  cuisineForm: undefined,
  pliantMechanism: undefined,
  pliantForm: undefined,
  outdoorUse: undefined,
  outdoorForm: undefined,
  steel: undefined,
  damasteelPattern: undefined,
  sheath: undefined,
  handleFamily: undefined,
  handleVariant: undefined,
  handleComposition: undefined,
  engraving: false,
  engravingText: '',
  mosaicRivet: false,
  notes: '',
  firstName: '',
  lastName: '',
  email: '',
  guillochageMode: 'set',
  guillochageSet: undefined,
  guillochageCentral: undefined,
  guillochagePlatineLeft: undefined,
  guillochagePlatineRight: undefined,
}

type Action =
  | { type: 'setUsage'; usage: Usage }
  | { type: 'setCuisineForm'; form: string }
  | { type: 'setPliantMechanism'; mechanism: string }
  | { type: 'setPliantForm'; form: string }
  | { type: 'setOutdoorUse'; usage: OutdoorUse }
  | { type: 'setOutdoorForm'; form: string }
  | { type: 'setSteel'; steel: SteelOption['id'] }
  | { type: 'setDamasteelPattern'; pattern: string }
  | { type: 'setSheath'; sheath: 'kydex' | 'cuir' }
  | { type: 'setHandle'; family: string; variant?: string }
  | { type: 'setGuillochageMode'; mode: 'set' | 'custom' }
  | { type: 'setGuillochageSet'; setId: string }
  | { type: 'setGuillochageCentral'; motif: string }
  | { type: 'setGuillochagePlatineLeft'; motif: string }
  | { type: 'setGuillochagePlatineRight'; motif: string }
  | { type: 'toggleEngraving'; enabled: boolean }
  | { type: 'setEngravingText'; text: string }
  | { type: 'toggleMosaic'; enabled: boolean }
  | { type: 'setNotes'; text: string }
  | { type: 'setFirstName'; value: string }
  | { type: 'setLastName'; value: string }
  | { type: 'setEmail'; value: string }

function wizardReducer(state: WizardConfig, action: Action): WizardConfig {
  switch (action.type) {
    case 'setUsage': {
      return {
        ...initialConfig,
        usage: action.usage,
        notes: state.notes,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        engraving: state.engraving,
        engravingText: state.engravingText,
        mosaicRivet: state.mosaicRivet,
      }
    }
    case 'setCuisineForm':
      return { ...state, cuisineForm: action.form }
    case 'setPliantMechanism':
      return {
        ...state,
        pliantMechanism: action.mechanism,
        pliantForm: undefined,
      }
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
        damasteelPattern: action.steel === 'damasteel' ? state.damasteelPattern : undefined,
      }
    case 'setDamasteelPattern':
      return { ...state, damasteelPattern: action.pattern }
    case 'setSheath':
      return { ...state, sheath: action.sheath }
    case 'setHandle':
      return {
        ...state,
        handleFamily: action.family,
        handleVariant: action.variant,
        handleComposition:
          action.family === 'composition' && action.variant
            ? (action.variant as 'simple' | 'compose')
            : undefined,
      }
    case 'setGuillochageMode':
      return {
        ...state,
        guillochageMode: action.mode,
        guillochageSet: action.mode === 'set' ? state.guillochageSet : undefined,
      }
    case 'setGuillochageSet': {
      const selectedSet = guillochageSets.find((set) => set.id === action.setId)
      return {
        ...state,
        guillochageMode: 'set',
        guillochageSet: action.setId,
        guillochageCentral: selectedSet?.central,
        guillochagePlatineLeft: selectedSet?.platines,
        guillochagePlatineRight: selectedSet?.platines,
      }
    }
    case 'setGuillochageCentral':
      return { ...state, guillochageMode: 'custom', guillochageCentral: action.motif }
    case 'setGuillochagePlatineLeft':
      return { ...state, guillochageMode: 'custom', guillochagePlatineLeft: action.motif }
    case 'setGuillochagePlatineRight':
      return { ...state, guillochageMode: 'custom', guillochagePlatineRight: action.motif }
    case 'toggleEngraving':
      return { ...state, engraving: action.enabled, engravingText: action.enabled ? state.engravingText : '' }
    case 'setEngravingText':
      return { ...state, engravingText: action.text }
    case 'toggleMosaic':
      return { ...state, mosaicRivet: action.enabled }
    case 'setNotes':
      return { ...state, notes: action.text }
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

const ContactHelp = () => (
  <Link
    href="/contact"
    className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4"
  >
    Une question ? Contactez-moi
  </Link>
)

const StepHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="flex items-start justify-between gap-4 flex-wrap">
    <div>
      <h2 className="text-2xl md:text-3xl font-serif font-light">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
    <ContactHelp />
  </div>
)

const MetricLine = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center justify-between text-xs text-muted-foreground">
    <span>{label}</span>
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < Math.min(value, 5) ? 'text-primary fill-primary/30' : 'text-muted-foreground/50'
          }`}
        />
      ))}
    </div>
  </div>
)

const PriceStars = ({ level }: { level?: number }) => {
  const value = Math.min(level ?? 0, 5)
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < value ? 'text-primary fill-primary/30' : 'text-muted-foreground/50'
          }`}
        />
      ))}
    </div>
  )
}

function getPatternScale(config: WizardConfig): DamasteelScale {
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

function getSteelOptionsForUsage(usage?: Usage) {
  if (!usage) return []
  return steelOptions.filter((steel) => steel.contexts.includes(usage))
}

function isStepComplete(step: StepId, config: WizardConfig) {
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
      return Boolean(config.handleFamily && config.handleVariant)
    case 'personalization':
      return !config.engraving || Boolean(config.engravingText)
    case 'summary':
      return Boolean(config.firstName && config.lastName && config.email)
    default:
      return false
  }
}

function getSteps(config: WizardConfig): WizardStep[] {
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
      { id: 'outdoor-form', title: 'Forme', description: 'Profil selon l’usage' },
      { id: 'steel', title: 'Acier', description: 'Résistance & entretien' },
      { id: 'sheath', title: 'Étui', description: 'Kydex ou cuir' },
    )
    if (config.steel === 'damasteel') {
      base.push({ id: 'damasteel-pattern', title: 'Motif Damasteel', description: 'Grandes vs petites lames' })
    }
  }

  base.push(
    { id: 'handle', title: 'Manche', description: 'Bois, synthétique, exceptionnel' },
    { id: 'personalization', title: 'Personnalisation', description: 'Gravure & rivet' },
    { id: 'summary', title: 'Récapitulatif', description: 'Coordonnées et envoi' },
  )

  return base
}

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
    }
    if (config.usage === 'pliant') {
      const mech = pliantMechanisms.find((m) => m.id === config.pliantMechanism)
      const form = config.pliantMechanism
        ? pliantFormsByMechanism[config.pliantMechanism]?.find((f) => f.id === config.pliantForm)
        : undefined
      if (mech) lines.push(`Mécanisme : ${mech.label}`)
      if (form) lines.push(`Forme pliant : ${form.label}`)
      if (config.guillochageCentral && config.guillochagePlatineLeft && config.guillochagePlatineRight) {
        lines.push(
          `Guillochage lame : ${config.guillochageCentral}`,
          `Guillochage platines : ${config.guillochagePlatineLeft} / ${config.guillochagePlatineRight}`
        )
      }
    }
    if (config.usage === 'outdoor') {
      const intensity = outdoorUseCases.find((o) => o.id === config.outdoorUse)
      const form = outdoorForms.find((f) => f.id === config.outdoorForm)
      if (intensity) lines.push(`Intensité : ${intensity.label}`)
      if (form) lines.push(`Forme outdoor : ${form.label} (${form.length})`)
      if (config.sheath) lines.push(`Étui : ${config.sheath === 'kydex' ? 'Kydex' : 'Cuir'}`)
    }

    if (config.steel) {
      const steel = steelOptions.find((s) => s.id === config.steel)
      lines.push(`Acier : ${steel?.label ?? config.steel}`)
    }
    if (config.steel === 'damasteel' && config.damasteelPattern) {
      lines.push(`Motif Damasteel : ${config.damasteelPattern}`)
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

  const renderUsageStep = () => (
    <div className="space-y-6">
      <StepHeader title="Usage principal" description="Choisissez la branche du configurateur" />
      <div className="grid md:grid-cols-2 gap-4">
        {usageOptions.map((option) => {
          const isSelected = config.usage === option.id
          return (
            <Card
              key={option.id}
              className={`p-6 transition-all ${option.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-primary'} ${isSelected ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => {
                if (option.disabled) return
                dispatch({ type: 'setUsage', usage: option.id as Usage })
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{option.label}</h3>
                    {option.disabled && <Badge variant="outline">En cours</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderCuisineFormStep = () => (
    <div className="space-y-6">
      <StepHeader
        title="Forme cuisine"
        description="Choisissez la silhouette adaptée à vos gestes"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {kitchenForms.map((form) => {
          const isSelected = config.cuisineForm === form.id
          return (
            <Card
              key={form.id}
              className={`p-6 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => dispatch({ type: 'setCuisineForm', form: form.id })}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{form.label}</h3>
                    <PriceStars level={form.priceLevel} />
                  </div>
                  <p className="text-sm text-muted-foreground">{form.usageNote}</p>
                  <p className="text-xs text-muted-foreground/80">{form.length}</p>
                  <Badge variant="secondary" className="mt-2">
                    {form.patternScale === 'large' ? 'Grande lame' : 'Petite lame'}
                  </Badge>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderPliantMechanismStep = () => (
    <div className="space-y-6">
      <StepHeader
        title="Mécanisme"
        description="Sélectionnez le système d’ouverture"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {pliantMechanisms.map((mechanism) => {
          const isSelected = config.pliantMechanism === mechanism.id
          return (
            <Card
              key={mechanism.id}
              className={`p-6 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => dispatch({ type: 'setPliantMechanism', mechanism: mechanism.id })}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-medium">{mechanism.label}</h3>
                  <p className="text-sm text-muted-foreground">{mechanism.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderPliantFormStep = () => {
    const forms = config.pliantMechanism ? pliantFormsByMechanism[config.pliantMechanism] : []
    return (
      <div className="space-y-6">
        <StepHeader
          title="Forme de pliant"
          description="La silhouette dépend du mécanisme choisi"
        />
        {!config.pliantMechanism ? (
          <Card className="p-6 border-dashed border-primary/30 bg-primary/5 text-sm text-muted-foreground">
            Choisissez d’abord un mécanisme pour voir les formes disponibles.
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {forms?.map((form) => {
              const isSelected = config.pliantForm === form.id
              return (
                <Card
                  key={form.id}
                  className={`p-6 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => dispatch({ type: 'setPliantForm', form: form.id })}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{form.label}</h3>
                      <PriceStars level={form.priceLevel} />
                    </div>
                    <p className="text-sm text-muted-foreground">{form.description}</p>
                    <p className="text-xs text-muted-foreground/80">{form.profile}</p>
                  </div>
                </div>
              </Card>
            )
          })}
          </div>
        )}
      </div>
    )
  }

  const renderOutdoorIntensityStep = () => (
    <div className="space-y-6">
      <StepHeader
        title="Utilisation outdoor"
        description="Modérée ou intensive, cela impacte la forme"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {outdoorUseCases.map((option) => {
          const isSelected = config.outdoorUse === option.id
          return (
            <Card
              key={option.id}
              className={`p-6 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => dispatch({ type: 'setOutdoorUse', usage: option.id })}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-medium">{option.label}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderOutdoorFormStep = () => {
    const forms =
      config.outdoorUse === 'moderee'
        ? outdoorForms.filter((form) => ['campcraft', 'companion', 'bush'].includes(form.id))
        : outdoorForms.filter((form) => ['survie', 'bush'].includes(form.id))

    return (
      <div className="space-y-6">
        <StepHeader
          title="Forme outdoor"
          description="Longueur et épaisseur selon le terrain"
        />
        <div className="grid md:grid-cols-2 gap-4">
          {forms.map((form) => {
            const isSelected = config.outdoorForm === form.id
            return (
              <Card
                key={form.id}
                className={`p-6 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => dispatch({ type: 'setOutdoorForm', form: form.id })}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{form.label}</h3>
                      <PriceStars level={form.priceLevel} />
                    </div>
                    <p className="text-sm text-muted-foreground">{form.description}</p>
                    <p className="text-xs text-muted-foreground/80">{form.length}</p>
                    <Badge variant="secondary" className="mt-2">
                      {form.patternScale === 'large' ? 'Grande lame' : 'Petite lame'}
                    </Badge>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  const renderSteelStep = () => {
    const steels = getSteelOptionsForUsage(config.usage)
    return (
      <div className="space-y-6">
        <StepHeader
          title="Acier"
          description={
            config.usage === 'pliant'
              ? 'Visuel et gamme de prix, sans caractéristiques techniques affichées'
              : 'Performance, entretien et esthétique'
          }
        />
        <div className="space-y-4">
          {steels.map((steel) => {
            const isSelected = config.steel === steel.id
            return (
              <Card
                key={steel.id}
                className={`p-6 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => dispatch({ type: 'setSteel', steel: steel.id })}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{steel.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{steel.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                      {config.usage !== 'pliant' && steel.tech && (
                        <>
                          <MetricLine label="Tenue de coupe" value={steel.tech.retention} />
                          <MetricLine label="Facilité d’affûtage" value={steel.tech.sharpening} />
                          <MetricLine label="Flexibilité" value={steel.tech.flexibility} />
                        </>
                      )}
                      <MetricLine label="Prix" value={steel.tech.price} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {config.usage === 'pliant' && (
                      <Badge variant="secondary">Photo sur demande</Badge>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  const renderDamasteelStep = () => {
    const scale = getPatternScale(config)
    const patterns = damasteelPatterns[scale]
    return (
      <div className="space-y-6">
        <StepHeader
          title="Motif Damasteel"
          description={`Liste adaptée aux ${scale === 'large' ? 'grandes' : 'petites'} lames`}
        />
        <ScrollArea className="h-[320px] rounded-md border border-border/50 p-2">
          <div className="grid md:grid-cols-2 gap-3 pr-2">
            {patterns.map((pattern) => {
              const isSelected = config.damasteelPattern === pattern
              return (
                <Card
                  key={pattern}
                  className={`p-4 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => dispatch({ type: 'setDamasteelPattern', pattern })}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{pattern}</h3>
                      <p className="text-xs text-muted-foreground">
                        Motif {scale === 'large' ? 'aéré' : 'dense'} pour Damasteel
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      </div>
    )
  }

  const renderSheathStep = () => (
    <div className="space-y-6">
      <StepHeader
        title="Étui"
        description="Adapté à l’usage outdoor"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {sheathOptions.map((sheath) => {
          const isSelected = config.sheath === sheath.id
          return (
            <Card
              key={sheath.id}
              className={`p-6 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => dispatch({ type: 'setSheath', sheath: sheath.id as 'kydex' | 'cuir' })}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Étui {sheath.label}</h3>
                    <Badge variant="secondary">{sheath.badge}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{sheath.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderHandleStep = () => (
    <div className="space-y-6">
      <StepHeader
        title="Manche"
        description="Bois, synthétique, animal, exceptionnel ou composé"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {handleFamilies.map((family) => {
          const isSelected = config.handleFamily === family.id
          return (
            <Card
              key={family.id}
              className={`p-6 transition-all cursor-pointer hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => dispatch({ type: 'setHandle', family: family.id, variant: undefined })}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{family.label}</h3>
                    <PriceStars level={family.priceLevel} />
                  </div>
                  <p className="text-sm text-muted-foreground">{family.description}</p>
                  {isSelected && (
                    <div className="pt-4 border-t border-border/60 space-y-2">
                      <Label className="text-xs text-muted-foreground">Variantes</Label>
                      <div className="flex flex-wrap gap-2">
                        {family.variants.map((variant) => {
                          const active = config.handleVariant === variant.id
                          return (
                            <Button
                              key={variant.id}
                              variant={active ? 'default' : 'outline'}
                              size="sm"
                              onClick={(event) => {
                                event.stopPropagation()
                                dispatch({
                                  type: 'setHandle',
                                  family: family.id,
                                  variant: variant.id,
                                })
                              }}
                            >
                              {variant.label}
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderGuillochageStep = () => (
    <div className="space-y-6">
      <StepHeader
        title="Guillochage pliant"
        description="1 central (dos de lame) + 2 platines. Choisissez un set ou personnalisez."
      />
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          {guillochageSets.map((set) => {
            const isSelected = config.guillochageSet === set.id && config.guillochageMode === 'set'
            return (
              <Button
                key={set.id}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch({ type: 'setGuillochageSet', setId: set.id })}
              >
                {set.label}
              </Button>
            )
          })}
          <Badge variant="outline" className="ml-auto">Ou personnalisez ci-dessous</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Dos de lame</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {guillochageMotifs.map((motif) => {
                const active = config.guillochageCentral === motif.label
                return (
                  <Button
                    key={motif.id}
                    variant={active ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => dispatch({ type: 'setGuillochageCentral', motif: motif.label })}
                  >
                    {motif.label}
                  </Button>
                )
              })}
            </div>
          </Card>
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Platine gauche</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {guillochageMotifs.map((motif) => {
                const active = config.guillochagePlatineLeft === motif.label
                return (
                  <Button
                    key={motif.id}
                    variant={active ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => dispatch({ type: 'setGuillochagePlatineLeft', motif: motif.label })}
                  >
                    {motif.label}
                  </Button>
                )
              })}
            </div>
          </Card>
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Platine droite</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {guillochageMotifs.map((motif) => {
                const active = config.guillochagePlatineRight === motif.label
                return (
                  <Button
                    key={motif.id}
                    variant={active ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => dispatch({ type: 'setGuillochagePlatineRight', motif: motif.label })}
                  >
                    {motif.label}
                  </Button>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderPersonalizationStep = () => (
    <div className="space-y-6">
      <StepHeader
        title="Personnalisation"
        description="Choisissez les finitions"
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Gravure</h4>
              <p className="text-sm text-muted-foreground">Initiales, date, message court</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={config.engraving ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch({ type: 'toggleEngraving', enabled: true })}
              >
                Oui
              </Button>
              <Button
                variant={!config.engraving ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch({ type: 'toggleEngraving', enabled: false })}
              >
                Non
              </Button>
            </div>
          </div>
          {config.engraving && (
            <Input
              placeholder="Texte à graver"
              value={config.engravingText}
              onChange={(e) => dispatch({ type: 'setEngravingText', text: e.target.value })}
            />
          )}
        </Card>
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Rivet mosaïque</h4>
              <p className="text-sm text-muted-foreground">Finition décorative sur la soie</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={config.mosaicRivet ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch({ type: 'toggleMosaic', enabled: true })}
              >
                Oui
              </Button>
              <Button
                variant={!config.mosaicRivet ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch({ type: 'toggleMosaic', enabled: false })}
              >
                Non
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Commentaires additionnels</Label>
        <Textarea
          id="notes"
          placeholder="Détails de dimensions, préférences esthétiques..."
          value={config.notes}
          onChange={(e) => dispatch({ type: 'setNotes', text: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  )

  const renderSummaryStep = () => (
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
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Synthèse</h4>
            <PriceStars level={steelOptions.find((s) => s.id === config.steel)?.tech?.price} />
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Usage : {usageOptions.find((u) => u.id === config.usage)?.label ?? '—'}</p>
            {config.usage === 'cuisine' && (
              <p>Forme : {kitchenForms.find((f) => f.id === config.cuisineForm)?.label ?? '—'}</p>
            )}
            {config.usage === 'pliant' && (
              <>
                <p>Mécanisme : {pliantMechanisms.find((m) => m.id === config.pliantMechanism)?.label ?? '—'}</p>
                <p>Forme : {config.pliantMechanism ? pliantFormsByMechanism[config.pliantMechanism]?.find((f) => f.id === config.pliantForm)?.label ?? '—' : '—'}</p>
                <p>Guillochage lame : {config.guillochageCentral ?? '—'}</p>
                <p>Guillochage platines : {config.guillochagePlatineLeft && config.guillochagePlatineRight ? `${config.guillochagePlatineLeft} / ${config.guillochagePlatineRight}` : '—'}</p>
              </>
            )}
            {config.usage === 'outdoor' && (
              <>
                <p>Intensité : {outdoorUseCases.find((o) => o.id === config.outdoorUse)?.label ?? '—'}</p>
                <p>Forme : {outdoorForms.find((f) => f.id === config.outdoorForm)?.label ?? '—'}</p>
                <p>Étui : {config.sheath ? (config.sheath === 'kydex' ? 'Kydex' : 'Cuir') : '—'}</p>
              </>
            )}
            <p>Acier : {steelOptions.find((s) => s.id === config.steel)?.label ?? '—'}</p>
            {config.steel === 'damasteel' && (
              <p>Motif : {config.damasteelPattern ?? '—'}</p>
            )}
            <p>Manche : {config.handleFamily ? `${handleFamilies.find((h) => h.id === config.handleFamily)?.label ?? config.handleFamily}${config.handleVariant ? ` - ${handleFamilies.find((h) => h.id === config.handleFamily)?.variants.find((v) => v.id === config.handleVariant)?.label ?? config.handleVariant}` : ''}` : '—'}</p>
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

  const renderStepContent = () => {
    switch (currentStep?.id) {
      case 'usage':
        return renderUsageStep()
      case 'cuisine-form':
        return renderCuisineFormStep()
      case 'pliant-mechanism':
        return renderPliantMechanismStep()
      case 'pliant-form':
        return renderPliantFormStep()
      case 'outdoor-intensity':
        return renderOutdoorIntensityStep()
      case 'outdoor-form':
        return renderOutdoorFormStep()
      case 'steel':
        return renderSteelStep()
      case 'damasteel-pattern':
        return renderDamasteelStep()
      case 'sheath':
        return renderSheathStep()
      case 'pliant-guillochage':
        return renderGuillochageStep()
      case 'handle':
        return renderHandleStep()
      case 'personalization':
        return renderPersonalizationStep()
      case 'summary':
        return renderSummaryStep()
      default:
        return null
    }
  }

  const progress = ((activeStepIndex + 1) / steps.length) * 100

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Configurateur</p>
          <p className="text-xs text-muted-foreground">
            Étape {activeStepIndex + 1} / {steps.length}
          </p>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid md:grid-cols-4 gap-2 text-xs text-muted-foreground">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 p-2 rounded border ${index === activeStepIndex ? 'border-primary/60 bg-primary/5 text-primary' : 'border-border/60 bg-card/40'}`}
            >
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] ${
                  index <= activeStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {index < activeStepIndex ? <Check className="h-3 w-3" /> : index + 1}
              </div>
              <div className="truncate">
                <p className="font-medium truncate">{step.title}</p>
                <p className="text-[11px] truncate">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
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
