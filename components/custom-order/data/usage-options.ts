import type { UsageOption } from '../types'

export const usageOptions: UsageOption[] = [
  {
    id: 'cuisine',
    label: 'Cuisine',
    description: 'Amateur comme professionnels',
  },
  {
    id: 'pliant',
    label: 'Pliant',
    description: 'Couteau de poche, EDC',
  },
  {
    id: 'outdoor',
    label: 'Outdoor',
    description: 'Bushcraft, camping, survie',
  },
  {
    id: 'chasse',
    label: 'Chasse',
    description: 'En cours de développement',
    disabled: true,
  },
]
