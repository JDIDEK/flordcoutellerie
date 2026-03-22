const pair = (source, destination) => ({ source, destination })

const pairAll = (sources, destination) =>
  sources.map((source) => pair(source, destination))

const legacyAssetRewrites = [
  ...pairAll(
    ['/assets/Logo/Logo-Noir-Petit.svg', '/assets/images/Logo-Noir-Petit.svg'],
    '/media/brand/logos/logo-noir-petit.svg'
  ),
  ...pairAll(
    ['/assets/Logo/Logo-Noir-Grand.svg', '/assets/images/Logo-Noir-Grand.svg'],
    '/media/brand/logos/logo-noir-grand.svg'
  ),
  ...pairAll(
    ['/assets/Logo/Logo-Clair-Petit.svg', '/assets/images/Logo-Clair-Petit.svg'],
    '/media/brand/logos/logo-clair-petit.svg'
  ),
  ...pairAll(
    ['/assets/Logo/Logo-Clair-Grand.svg', '/assets/images/Logo-Clair-Grand.svg'],
    '/media/brand/logos/logo-clair-grand.svg'
  ),
  ...pairAll(
    ['/assets/Images/flo/flo.png', '/assets/images/flo/flo.png'],
    '/media/brand/apple/flo.png'
  ),
  pair('/placeholder.svg', '/media/site/placeholders/default.svg'),

  pair(
    '/assets/images/couteaux/artisan-knife-blade-damascus-steel-dark-workshop.jpg',
    '/media/catalog/pieces/artisan-knife-blade-damascus-steel-dark-workshop.webp'
  ),
  pair(
    '/assets/images/couteaux/bushcraft-survival-knife-outdoor-blade.jpg',
    '/media/catalog/pieces/bushcraft-survival-knife-outdoor-blade.webp'
  ),
  pair(
    '/assets/images/couteaux/damascus-steel-chef-knife-gyuto-kitchen.jpg',
    '/media/catalog/pieces/damascus-steel-chef-knife-gyuto-kitchen.webp'
  ),
  pair(
    '/assets/images/couteaux/folding-pocket-knife-damascus-premium.jpg',
    '/media/catalog/pieces/folding-pocket-knife-damascus-premium.webp'
  ),
  pair(
    '/assets/images/couteaux/nakiri-vegetable-knife-steel-blade.jpg',
    '/media/catalog/pieces/nakiri-vegetable-knife-steel-blade.webp'
  ),
  pair(
    '/assets/images/couteaux/santoku-kitchen-knife-damascus-japanese.jpg',
    '/media/catalog/pieces/santoku-kitchen-knife-damascus-japanese.webp'
  ),
  pair(
    '/assets/images/couteaux/yanagiba-sushi-knife-damascus-steel.jpg',
    '/media/catalog/pieces/yanagiba-sushi-knife-damascus-steel.webp'
  ),
  pair(
    '/assets/images/couteaux/dessins/Kiritsuke_-_TOUT.png',
    '/media/catalog/drawings/kiritsuke-full.webp'
  ),
  pair(
    '/assets/images/couteaux/dessins/Kiritsuke_-_Sans_fond.png',
    '/media/catalog/drawings/kiritsuke-no-background.webp'
  ),
  pair(
    '/assets/images/couteaux/dessins/Kiritsuke_-_Sans_motif_lame_et_fond.png',
    '/media/catalog/drawings/kiritsuke-no-pattern-no-background.webp'
  ),

  ...[
    ['aegir', 'aegir'],
    ['baldur', 'baldur'],
    ['bifrost', 'bifrost'],
    ['bjorkmans%20Twist', 'bjorkmans-twist'],
    ['dense%20twist', 'dense-twist'],
    ['draupner', 'draupner'],
    ['fafnir', 'fafnir'],
    ['grabak', 'grabak'],
    ['grossrosen', 'grossrosen'],
    ['gysinge', 'gysinge'],
    ['hakkapella', 'hakkapella'],
    ['heimskringla', 'heimskringla'],
    ['hugin', 'hugin'],
    ['ladder', 'ladder'],
    ['loki', 'loki'],
    ['munin', 'munin'],
    ['nidhogg', 'nidhogg'],
    ['odin%20heim', 'odin-heim'],
    ['odins%20eye', 'odins-eye'],
    ['rose', 'rose'],
    ['sparse%20twist', 'sparse-twist'],
    ['svavner', 'svavner'],
    ['thor', 'thor'],
    ['vinland', 'vinland'],
    ['yggdrasil', 'yggdrasil'],
  ].map(([legacyName, canonicalName]) =>
    pair(
      `/assets/Images/Damasteel/${legacyName}.webp`,
      `/media/custom-order/shared/damasteel/${canonicalName}.webp`
    )
  ),

  ...[
    ['Fleuri', 'fleuri'],
    ['Losange-Pointe', 'losange-pointe'],
    ['Normand', 'normand'],
    ['Ronce', 'ronce'],
    ['Sablier', 'sablier'],
    ['Sablier%20Pliant', 'sablier-pliant'],
    ['Scandinave', 'scandinave'],
    ['Scandinave%20Pliant', 'scandinave-pliant'],
    ['Soleil', 'soleil'],
    ['Ondul%C3%A9%20Pliant', 'ondule-pliant'],
  ].map(([legacyName, canonicalName]) =>
    pair(
      `/assets/Images/Guillochage/${legacyName}.webp`,
      `/media/custom-order/shared/guillochage/${canonicalName}.webp`
    )
  ),

  ...[
    ['bois', 'bois'],
    ['synth%C3%A9tique', 'synthetique'],
    ['animal', 'animal'],
    ['exceptionnel', 'exceptionnel'],
  ].map(([legacyName, canonicalName]) =>
    pair(
      `/assets/Images/Sheath/${legacyName}.webp`,
      `/media/custom-order/shared/handle-materials/${canonicalName}.webp`
    )
  ),

  ...[
    ['Gyuto', 'gyuto'],
    ['Nakiri', 'nakiri'],
    ['Kiritsuke', 'kiritsuke'],
    ['Bunka', 'bunka'],
    ['Santoku', 'santoku'],
    ['Petty', 'petty'],
    ['Yanagiba', 'yanagiba'],
  ].map(([legacyName, canonicalName]) =>
    pair(
      `/assets/Images/kitchen/kitchen-forms/${legacyName}.webp`,
      `/media/custom-order/cuisine/forms/${canonicalName}.webp`
    )
  ),

  ...[
    ['14C28N', '14c28n'],
    ['VG10', 'vg10'],
    ['Damasteel', 'damasteel'],
  ].map(([legacyName, canonicalName]) =>
    pair(
      `/assets/Images/kitchen/kitchen-steels/${legacyName}.webp`,
      `/media/custom-order/cuisine/steels/${canonicalName}.webp`
    )
  ),
  ...[
    ['14C28N', '14c28n'],
    ['VG10', 'vg10'],
    ['Damasteel', 'damasteel'],
  ].map(([legacyName, canonicalName]) =>
    pair(
      `/assets/Images/folding/folding-steels/${legacyName}.webp`,
      `/media/custom-order/pliant/steels/${canonicalName}.webp`
    )
  ),
  ...[
    ['14C28N', '14c28n'],
    ['N690CO', 'n690co'],
    ['Damasteel', 'damasteel'],
  ].map(([legacyName, canonicalName]) =>
    pair(
      `/assets/Images/outdoor/outdoor-forms/outdoor-steels/${legacyName}.webp`,
      `/media/custom-order/outdoor/steels/${canonicalName}.webp`
    )
  ),

  pair(
    '/assets/Images/folding/folding-mechanism/crant%20plat.webp',
    '/media/custom-order/pliant/mechanisms/cran-plat.webp'
  ),
  pair(
    '/assets/Images/folding/folding-mechanism/piemontais.webp',
    '/media/custom-order/pliant/mechanisms/piemontais.webp'
  ),
  pair(
    '/assets/Images/outdoor/outdoor-forms/mod%C3%A9r%C3%A9.webp',
    '/media/custom-order/outdoor/forms/moderee.webp'
  ),
  pair(
    '/assets/Images/outdoor/outdoor-forms/intensif.webp',
    '/media/custom-order/outdoor/forms/intensive.webp'
  ),

  ...[
    ['/assets/Images/kitchen/kitchen-handle/simple.webp', '/media/custom-order/cuisine/handles/simple.webp'],
    ['/assets/Images/kitchen/kitchen-handle/compos%C3%A9.webp', '/media/custom-order/cuisine/handles/compose.webp'],
    ['/assets/Images/folding/folding-handle/simple.webp', '/media/custom-order/pliant/handles/simple.webp'],
    ['/assets/Images/folding/folding-handle/compos%C3%A9.webp', '/media/custom-order/pliant/handles/compose.webp'],
    ['/assets/Images/outdoor/outdoor-handle/simple.webp', '/media/custom-order/outdoor/handles/simple.webp'],
    ['/assets/Images/outdoor/outdoor-handle/compos%C3%A9.webp', '/media/custom-order/outdoor/handles/compose.webp'],
  ].map(([source, destination]) => pair(source, destination)),

  ...[
    ['/assets/Images/kitchen/kitchen-personalization/engraving/gravure.webp', '/media/custom-order/cuisine/personalization/engraving/engraving.webp'],
    ['/assets/Images/kitchen/kitchen-personalization/mosaic-rivet/rivet%20mosaique.webp', '/media/custom-order/cuisine/personalization/mosaic-rivet/mosaic-rivet.webp'],
    ['/assets/Images/folding/folding-personalization/engraving/gravure.webp', '/media/custom-order/pliant/personalization/engraving/engraving.webp'],
    ['/assets/Images/folding/folding-personalization/engraving/rivet%20mosaique.webp', '/media/custom-order/pliant/personalization/mosaic-rivet/mosaic-rivet.webp'],
    ['/assets/Images/outdoor/outdoor-personalization/engraving/gravure.webp', '/media/custom-order/outdoor/personalization/engraving/engraving.webp'],
    ['/assets/Images/outdoor/outdoor-personalization/mosaic-rivet/rivet%20mosaique.webp', '/media/custom-order/outdoor/personalization/mosaic-rivet/mosaic-rivet.webp'],
  ].map(([source, destination]) => pair(source, destination)),

  ...[
    ['copper-rivet', 'copper-rivet'],
    ['brass-rivet', 'brass-rivet'],
    ['stainless-rivet', 'stainless-rivet'],
  ].map(([legacyName, canonicalName]) =>
    pair(
      `/assets/Images/outdoor/outdoor-personalization/casual-rivet/${legacyName}.webp`,
      `/media/custom-order/shared/rivet-colors/${canonicalName}.webp`
    )
  ),

  ...[
    ['kydex', 'kydex'],
    ['cuir', 'cuir'],
  ].map(([legacyName, canonicalName]) =>
    pair(
      `/assets/Images/outdoor/outdoor-cases/${legacyName}.webp`,
      `/media/custom-order/outdoor/sheaths/${canonicalName}.webp`
    )
  ),
]

export { legacyAssetRewrites }
