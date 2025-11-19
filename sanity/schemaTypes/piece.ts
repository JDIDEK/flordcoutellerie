import { defineField, defineType } from 'sanity'

export const piece = defineType({
  name: 'piece',
  title: 'Pièce',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom du couteau',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Cuisine', value: 'cuisine' },
          { title: 'Outdoor', value: 'outdoor' },
          { title: 'Pliants', value: 'pliants' },
          { title: 'Sur mesure', value: 'sur-mesure' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Disponible', value: 'available' },
          { title: 'Réservé', value: 'reserved' },
          { title: 'Vendu', value: 'sold' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Prix (€)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Prix original (€)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'steel',
      title: 'Acier',
      type: 'string',
    }),
    defineField({
      name: 'layers',
      title: 'Couches',
      type: 'string',
    }),
    defineField({
      name: 'hrc',
      title: 'Dureté (HRC)',
      type: 'string',
    }),
    defineField({
      name: 'handle',
      title: 'Manche',
      type: 'string',
    }),
    defineField({
      name: 'length',
      title: 'Longueur',
      type: 'string',
    }),
    defineField({
      name: 'weight',
      title: 'Poids',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Caractéristiques',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'steelSummary',
      title: 'Texte court pour la section signature',
      type: 'string',
    }),
    defineField({
      name: 'highlightOnHome',
      title: 'Mettre en avant en home',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'homeOrder',
      title: 'Ordre en signature',
      type: 'number',
      description: 'Ordre d’affichage dans la section Signature knives',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'mainImage',
    },
  },
})
