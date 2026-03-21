import { defineType, defineField } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const galleryKnife = defineType({
  name: 'galleryKnife',
  title: 'Entrée de galerie',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'galleryKnife', hidden: true }),

    defineField({
      name: 'name',
      title: 'Nom du couteau',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Affiché au-dessus des photos sur le site.',
    }),

    defineField({
      name: 'description',
      title: 'Description légère',
      type: 'string',
      description: 'Une ligne courte sous le nom (ex: "Damas — Olivier et résine bleue").',
    }),

    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'galleryCollection' }],
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value?._ref || typeof context.document?.category === 'string') {
            return true
          }

          return 'Sélectionnez une collection.'
        }),
      description: 'Choisissez la collection dans laquelle cette entrée doit apparaître.',
    }),

    defineField({
      name: 'category',
      title: 'Ancienne catégorie',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) => !document?.category,
      description:
        'Valeur héritée de l’ancienne galerie. Rattachez cette entrée à une collection pour finaliser la migration.',
    }),

    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette', 'dimensions'],
          },
          fields: [
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              description: "Description courte pour l'accessibilité.",
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      validation: (rule) => rule.min(1).error('Au moins une photo est requise.'),
      description: 'Ajoutez plusieurs photos. La première sera la grande image principale.',
    }),

    defineField({
      name: 'featured',
      title: 'Mise en avant',
      type: 'boolean',
      initialValue: false,
      description: 'Si activé, ce couteau apparaît en premier dans sa collection.',
    }),
  ],

  preview: {
    select: {
      name: 'name',
      description: 'description',
      collectionTitle: 'collection.title',
      legacyCategory: 'category',
      featured: 'featured',
      image0: 'images.0',
    },
    prepare({ name, description, collectionTitle, legacyCategory, featured, image0 }) {
      const legacyCategoryLabels: Record<string, string> = {
        cuisine: 'Cuisine',
        pliants: 'Pliants',
        outdoors: 'Outdoors',
        chasse: 'Chasse',
      }
      const cat =
        collectionTitle ||
        (legacyCategory
          ? (legacyCategoryLabels[legacyCategory] ?? legacyCategory)
          : '⚠️ Sans collection')
      const star = featured ? ' ★' : ''

      return {
        title: `${name || 'Sans nom'}${star}`,
        subtitle: [cat, description].filter(Boolean).join(' — '),
        media: image0,
      }
    },
  },
})
