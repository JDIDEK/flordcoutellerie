import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Image de galerie',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'galleryImage', hidden: true }),
    defineField({
      name: 'title',
      title: 'Titre (Sanity)',
      type: 'string',
      description: 'Nom pour identifier cette image dans Sanity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Texte affiché sur le site',
      type: 'string',
      description: 'Ce qui apparaît sur la carte dans la galerie du site',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Collection',
      type: 'string',
      options: {
        list: [
          { title: 'Cuisine', value: 'cuisine' },
          { title: 'Pliants', value: 'pliants' },
          { title: 'Outdoors', value: 'outdoors' },
          { title: 'Chasse', value: 'chasse' },
        ],
        layout: 'radio',
      },
      description: 'Catégorie de collection utilisée sur la page Galerie.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'title',
      label: 'label',
      category: 'category',
    },
    prepare({ media, title, label, category }) {
      const categoryLabels: Record<string, string> = {
        cuisine: 'Cuisine',
        pliants: 'Pliants',
        outdoors: 'Outdoors',
        chasse: 'Chasse',
      }
      const categoryText = category ? categoryLabels[category] ?? category : null

      return {
        title: title || 'Sans titre',
        subtitle: [categoryText, label].filter(Boolean).join(' - '),
        media: media,
      }
    },
  },
})
