import { defineType, defineField } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Image de galerie',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Atelier', value: 'atelier' },
          { title: 'Détails', value: 'details' },
          { title: 'Work in Progress', value: 'wip' },
        ],
      },
    }),
    defineField({
      name: 'legend',
      title: 'Légende',
      type: 'string',
    }),
  ],
})
