import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'

import { AutoSlugInput } from '../components/autoSlugInput'
import { slugifyString } from '../lib/slugify'

export const galleryCollection = defineType({
  name: 'galleryCollection',
  title: 'Collection galerie',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'galleryCollection', hidden: true }),

    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Nom affiché sur la page galerie et dans la page de collection.',
    }),

    defineField({
      name: 'slug',
      title: 'Lien (slug)',
      type: 'slug',
      options: {
        source: 'title',
        slugify: slugifyString,
      },
      components: { input: AutoSlugInput },
      validation: (rule) => rule.required(),
      description: 'Utilisé pour l’URL, par exemple /galerie/cuisine.',
    }),

    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
        }),
      ],
      description: 'Image affichée sur la page principale de la galerie.',
    }),

    defineField({
      name: 'description',
      title: 'Texte court',
      type: 'text',
      rows: 3,
      description: 'Texte affiché sous le titre sur la carte et en introduction de page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'coverImage',
    },
  },
})
