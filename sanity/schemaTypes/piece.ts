import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

import { AutoSlugInput } from '../components/autoSlugInput'
import { slugifyString } from '../lib/slugify'

export const piece = defineType({
  name: 'piece',
  title: 'Pièce',
  type: 'document',
  groups: [
    { name: 'main', title: 'Infos', default: true },
    { name: 'tech', title: 'Technique' },
    { name: 'sales', title: 'Vente & Stock' },
  ],
  fields: [
    orderRankField({ type: 'piece', hidden: true }),

    // --- ONGLET INFOS ---
    defineField({
      name: 'title',
      title: 'Nom du couteau',
      type: 'string',
      group: 'main',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Photo principale',
      type: 'image',
      options: { hotspot: true },
      group: 'main',
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie photos',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
      group: 'main',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'main',
    }),

    // --- ONGLET VENTE ---
    defineField({
      name: 'status',
      title: 'Disponibilité',
      type: 'string',
      group: 'sales',
      options: {
        list: [
          { title: 'Disponible', value: 'available' },
          { title: 'Réservé', value: 'reserved' },
          { title: 'Vendu', value: 'sold' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'price',
      title: 'Prix (€)',
      type: 'number',
      group: 'sales',
    }),
    defineField({
      name: 'reservationId',
      title: 'Réservation active',
      type: 'string',
      group: 'sales',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'reservedAt',
      title: 'Réservé le',
      type: 'datetime',
      group: 'sales',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'reservationExpiresAt',
      title: 'Réservation expire le',
      type: 'datetime',
      group: 'sales',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'orderSessionId',
      title: 'Session de commande Stripe',
      type: 'string',
      group: 'sales',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'paymentIntentId',
      title: 'Payment Intent Stripe',
      type: 'string',
      group: 'sales',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'soldAt',
      title: 'Vendu le',
      type: 'datetime',
      group: 'sales',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'orderProcessedAt',
      title: 'Commande traitée le',
      type: 'datetime',
      group: 'sales',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'slug',
      title: 'Lien (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        slugify: slugifyString,
      },
      components: { input: AutoSlugInput },
      group: 'sales',
      validation: (rule) => rule.required(),
    }),

    // --- ONGLET TECHNIQUE ---
    defineField({
      name: 'features',
      title: 'Caractéristiques',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'tech',
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      price: 'price',
      media: 'mainImage',
    },
    prepare({ title, status, price, media }) {
      const emojis: Record<string, string> = { available: '🟢', reserved: '🟠', sold: '🔴' }
      return {
        title,
        subtitle: `${emojis[status] || ''} ${price ? price + '€' : ''}`,
        media,
      }
    },
  },
})