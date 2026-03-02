import type { UsageOption } from '../types'

export const usageOptions: UsageOption[] = [
  {
    id: 'cuisine',
    label: 'Cuisine',
    description: 'Amateur comme professionnels',
    imageSrc: '/assets/images/couteaux/dessins/Kiritsuke_-_TOUT.png',
    imageAlt: 'Dessin de couteau cuisine',
  },
  {
    id: 'pliant',
    label: 'Pliant',
    description: 'Couteau de poche, EDC',
    imageSrc: '/assets/images/couteaux/dessins/Kiritsuke_-_Sans_fond.png',
    imageAlt: 'Dessin de couteau pliant',
  },
  {
    id: 'outdoor',
    label: 'Outdoor',
    description: 'Bushcraft, camping, survie',
    imageSrc: '/assets/images/couteaux/dessins/Kiritsuke_-_Sans_motif_lame_et_fond.png',
    imageAlt: 'Dessin de couteau outdoor',
  },
  {
    id: 'chasse',
    label: 'Chasse',
    description: 'Cuisine en extérieur, dépeçage',
    disabled: true,
  },
]
