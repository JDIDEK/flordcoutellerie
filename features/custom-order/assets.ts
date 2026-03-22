import type { RivetColor, Usage } from './types'

const CUSTOM_ORDER_BASE = '/media/custom-order'
const SHARED_BASE = `${CUSTOM_ORDER_BASE}/shared`

const formAssetsByUsage: Partial<Record<Usage, Record<string, string>>> = {
  cuisine: {
    gyuto: `${CUSTOM_ORDER_BASE}/cuisine/forms/gyuto.webp`,
    nakiri: `${CUSTOM_ORDER_BASE}/cuisine/forms/nakiri.webp`,
    kiritsuke: `${CUSTOM_ORDER_BASE}/cuisine/forms/kiritsuke.webp`,
    bunka: `${CUSTOM_ORDER_BASE}/cuisine/forms/bunka.webp`,
    santoku: `${CUSTOM_ORDER_BASE}/cuisine/forms/santoku.webp`,
    petty: `${CUSTOM_ORDER_BASE}/cuisine/forms/petty.webp`,
    yanagiba: `${CUSTOM_ORDER_BASE}/cuisine/forms/yanagiba.webp`,
  },
  outdoor: {
    'moderee-forme1': `${CUSTOM_ORDER_BASE}/outdoor/forms/moderee.webp`,
    'intensive-forme1': `${CUSTOM_ORDER_BASE}/outdoor/forms/intensive.webp`,
  },
  chasse: {
    bunka: `${CUSTOM_ORDER_BASE}/cuisine/forms/bunka.webp`,
    petty: `${CUSTOM_ORDER_BASE}/cuisine/forms/petty.webp`,
    gyuto: `${CUSTOM_ORDER_BASE}/cuisine/forms/gyuto.webp`,
    kiritsuke: `${CUSTOM_ORDER_BASE}/cuisine/forms/kiritsuke.webp`,
    yanagiba: `${CUSTOM_ORDER_BASE}/cuisine/forms/yanagiba.webp`,
  },
}

const mechanismAssets = {
  'cran-plat': `${CUSTOM_ORDER_BASE}/pliant/mechanisms/cran-plat.webp`,
  piemontais: `${CUSTOM_ORDER_BASE}/pliant/mechanisms/piemontais.webp`,
} as const

const steelAssetsByUsage: Partial<Record<Usage, Record<string, string>>> = {
  cuisine: {
    '14c28n': `${CUSTOM_ORDER_BASE}/cuisine/steels/14c28n.webp`,
    'suminagashi-vg10': `${CUSTOM_ORDER_BASE}/cuisine/steels/vg10.webp`,
    damasteel: `${CUSTOM_ORDER_BASE}/cuisine/steels/damasteel.webp`,
  },
  pliant: {
    '14c28n': `${CUSTOM_ORDER_BASE}/pliant/steels/14c28n.webp`,
    'suminagashi-vg10': `${CUSTOM_ORDER_BASE}/pliant/steels/vg10.webp`,
    damasteel: `${CUSTOM_ORDER_BASE}/pliant/steels/damasteel.webp`,
  },
  outdoor: {
    '14c28n': `${CUSTOM_ORDER_BASE}/outdoor/steels/14c28n.webp`,
    N690Co: `${CUSTOM_ORDER_BASE}/outdoor/steels/n690co.webp`,
    damasteel: `${CUSTOM_ORDER_BASE}/outdoor/steels/damasteel.webp`,
  },
}

const damasteelAssets = {
  aegir: `${SHARED_BASE}/damasteel/aegir.webp`,
  baldur: `${SHARED_BASE}/damasteel/baldur.webp`,
  bifrost: `${SHARED_BASE}/damasteel/bifrost.webp`,
  'bjorkmans-rwist': `${SHARED_BASE}/damasteel/bjorkmans-twist.webp`,
  'dense-twist': `${SHARED_BASE}/damasteel/dense-twist.webp`,
  draupner: `${SHARED_BASE}/damasteel/draupner.webp`,
  fafnir: `${SHARED_BASE}/damasteel/fafnir.webp`,
  grabak: `${SHARED_BASE}/damasteel/grabak.webp`,
  grossrosen: `${SHARED_BASE}/damasteel/grossrosen.webp`,
  gysinge: `${SHARED_BASE}/damasteel/gysinge.webp`,
  hakkapella: `${SHARED_BASE}/damasteel/hakkapella.webp`,
  heimskringla: `${SHARED_BASE}/damasteel/heimskringla.webp`,
  hugin: `${SHARED_BASE}/damasteel/hugin.webp`,
  ladder: `${SHARED_BASE}/damasteel/ladder.webp`,
  loki: `${SHARED_BASE}/damasteel/loki.webp`,
  munin: `${SHARED_BASE}/damasteel/munin.webp`,
  nidhogg: `${SHARED_BASE}/damasteel/nidhogg.webp`,
  niddhog: `${SHARED_BASE}/damasteel/nidhogg.webp`,
  'odin-heim': `${SHARED_BASE}/damasteel/odin-heim.webp`,
  'odins-eye': `${SHARED_BASE}/damasteel/odins-eye.webp`,
  rose: `${SHARED_BASE}/damasteel/rose.webp`,
  'sparse-twist': `${SHARED_BASE}/damasteel/sparse-twist.webp`,
  svavner: `${SHARED_BASE}/damasteel/svavner.webp`,
  thor: `${SHARED_BASE}/damasteel/thor.webp`,
  vinland: `${SHARED_BASE}/damasteel/vinland.webp`,
  yggdrasil: `${SHARED_BASE}/damasteel/yggdrasil.webp`,
} as const

const guillochageAssets = {
  fleuri: `${SHARED_BASE}/guillochage/fleuri.webp`,
  'losange-pointe': `${SHARED_BASE}/guillochage/losange-pointe.webp`,
  normand: `${SHARED_BASE}/guillochage/normand.webp`,
  ronce: `${SHARED_BASE}/guillochage/ronce.webp`,
  sablier: `${SHARED_BASE}/guillochage/sablier.webp`,
  'sablier-pliant': `${SHARED_BASE}/guillochage/sablier-pliant.webp`,
  scandinave: `${SHARED_BASE}/guillochage/scandinave.webp`,
  'scandinave-pliant': `${SHARED_BASE}/guillochage/scandinave-pliant.webp`,
  soleil: `${SHARED_BASE}/guillochage/soleil.webp`,
  'ondule-pliant': `${SHARED_BASE}/guillochage/ondule-pliant.webp`,
} as const

const handleFamilyAssets = {
  bois: `${SHARED_BASE}/handle-materials/bois.webp`,
  synthetique: `${SHARED_BASE}/handle-materials/synthetique.webp`,
  animal: `${SHARED_BASE}/handle-materials/animal.webp`,
  exceptionnel: `${SHARED_BASE}/handle-materials/exceptionnel.webp`,
} as const

const handleCompositionAssetsByUsage: Record<Usage, Record<'simple' | 'compose', string>> = {
  cuisine: {
    simple: `${CUSTOM_ORDER_BASE}/cuisine/handles/simple.webp`,
    compose: `${CUSTOM_ORDER_BASE}/cuisine/handles/compose.webp`,
  },
  pliant: {
    simple: `${CUSTOM_ORDER_BASE}/pliant/handles/simple.webp`,
    compose: `${CUSTOM_ORDER_BASE}/pliant/handles/compose.webp`,
  },
  outdoor: {
    simple: `${CUSTOM_ORDER_BASE}/outdoor/handles/simple.webp`,
    compose: `${CUSTOM_ORDER_BASE}/outdoor/handles/compose.webp`,
  },
  chasse: {
    simple: `${CUSTOM_ORDER_BASE}/cuisine/handles/simple.webp`,
    compose: `${CUSTOM_ORDER_BASE}/cuisine/handles/compose.webp`,
  },
}

const personalizationAssetsByUsage: Record<
  Usage,
  Record<'engraving' | 'mosaic-rivet', string>
> = {
  cuisine: {
    engraving: `${CUSTOM_ORDER_BASE}/cuisine/personalization/engraving/engraving.webp`,
    'mosaic-rivet': `${CUSTOM_ORDER_BASE}/cuisine/personalization/mosaic-rivet/mosaic-rivet.webp`,
  },
  pliant: {
    engraving: `${CUSTOM_ORDER_BASE}/pliant/personalization/engraving/engraving.webp`,
    'mosaic-rivet': `${CUSTOM_ORDER_BASE}/pliant/personalization/mosaic-rivet/mosaic-rivet.webp`,
  },
  outdoor: {
    engraving: `${CUSTOM_ORDER_BASE}/outdoor/personalization/engraving/engraving.webp`,
    'mosaic-rivet': `${CUSTOM_ORDER_BASE}/outdoor/personalization/mosaic-rivet/mosaic-rivet.webp`,
  },
  chasse: {
    engraving: `${CUSTOM_ORDER_BASE}/cuisine/personalization/engraving/engraving.webp`,
    'mosaic-rivet': `${CUSTOM_ORDER_BASE}/cuisine/personalization/mosaic-rivet/mosaic-rivet.webp`,
  },
}

const sheathAssets = {
  kydex: `${CUSTOM_ORDER_BASE}/outdoor/sheaths/kydex.webp`,
  cuir: `${CUSTOM_ORDER_BASE}/outdoor/sheaths/cuir.webp`,
} as const

const rivetColorAssets: Record<RivetColor, string> = {
  cuivre: `${SHARED_BASE}/rivet-colors/copper-rivet.webp`,
  laiton: `${SHARED_BASE}/rivet-colors/brass-rivet.webp`,
  inox: `${SHARED_BASE}/rivet-colors/stainless-rivet.webp`,
}

export const defaultKitchenFormAsset = formAssetsByUsage.cuisine?.gyuto ?? ''
export const defaultDamasteelAsset = damasteelAssets.fafnir
export const defaultGuillochageAsset = guillochageAssets.fleuri
export const defaultHandleFamilyAsset = handleFamilyAssets.bois
export const defaultSheathAsset = sheathAssets.kydex

export function getCustomOrderFormAsset(usage: Usage, formId: string) {
  return formAssetsByUsage[usage]?.[formId]
}

export function getCustomOrderMechanismAsset(mechanismId: keyof typeof mechanismAssets) {
  return mechanismAssets[mechanismId]
}

export function getCustomOrderSteelAsset(usage: Usage, steelId: string) {
  return steelAssetsByUsage[usage]?.[steelId]
}

export function getDamasteelAsset(patternId: string) {
  return damasteelAssets[patternId as keyof typeof damasteelAssets]
}

export function getGuillochageAsset(motifId: string) {
  return guillochageAssets[motifId as keyof typeof guillochageAssets]
}

export function getHandleFamilyAsset(handleFamilyId: string) {
  return handleFamilyAssets[handleFamilyId as keyof typeof handleFamilyAssets]
}

export function getHandleCompositionAsset(usage: Usage, composition: 'simple' | 'compose') {
  return handleCompositionAssetsByUsage[usage][composition]
}

export function getPersonalizationAsset(
  usage: Usage,
  kind: 'engraving' | 'mosaic-rivet'
) {
  return personalizationAssetsByUsage[usage][kind]
}

export function getSheathAsset(sheathId: 'kydex' | 'cuir') {
  return sheathAssets[sheathId]
}

export function getRivetColorAsset(color: RivetColor) {
  return rivetColorAssets[color]
}
