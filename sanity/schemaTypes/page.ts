import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page du site',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (about, sur-mesure, galerie, etc.)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
