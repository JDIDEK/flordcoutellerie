import { defineField, defineType } from 'sanity'

export const piece = defineType({
  name: 'piece',
  title: 'Pièce',
  type: 'document',
  // Définition des onglets
  groups: [
    { name: 'main', title: '📝 Infos', default: true },
    { name: 'tech', title: '⚙️ Technique' },
    { name: 'sales', title: '💰 Vente & Stock' },
    { name: 'home', title: '⭐ Accueil' },
  ],
  fields: [
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
          { title: '🟢 Disponible', value: 'available' },
          { title: '🟠 Réservé', value: 'reserved' },
          { title: '🔴 Vendu', value: 'sold' },
        ],
        layout: 'radio', // Boutons radio horizontaux
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
      name: 'slug',
      title: 'Lien (Slug)',
      type: 'slug',
      options: { source: 'title' },
      group: 'sales',
      validation: (rule) => rule.required(),
    }),

    // --- ONGLET TECHNIQUE ---
    defineField({
      name: 'steel',
      title: 'Acier',
      type: 'string',
      group: 'tech',
    }),
    defineField({
      name: 'handle',
      title: 'Manche',
      type: 'string',
      group: 'tech',
    }),
    defineField({
      name: 'features',
      title: 'Caractéristiques (Liste)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'tech',
    }),

    // --- ONGLET ACCUEIL ---
    defineField({
      name: 'highlightOnHome',
      title: 'Afficher dans "Signature Knives" (Accueil)',
      type: 'boolean',
      initialValue: false,
      group: 'home',
    }),
    defineField({
      name: 'homeOrder',
      title: 'Ordre d’affichage',
      type: 'number',
      group: 'home',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      price: 'price',
      media: 'mainImage',
    },
    prepare({ title, status, price, media }) {
      const emojis = { available: '🟢', reserved: '🟠', sold: '🔴' }
      return {
        title: title,
        subtitle: `${emojis[status as keyof typeof emojis] || ''} ${price ? price + '€' : ''}`,
        media: media,
      }
    },
  },
})