import { defineField, defineType } from 'sanity'

export const siteNotice = defineType({
  name: 'siteNotice',
  title: 'Message d\'information',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Activer le message',
      type: 'boolean',
      initialValue: false,
      description:
        'Quand activé, le message s’affiche sur Contact, Sur Mesure et Pièces Disponibles.',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: "Message d'information",
      validation: (rule) => rule.max(80),
      description: 'Titre court affiché au-dessus du message.',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!context.document?.enabled) {
            return true
          }

          if (typeof value === 'string' && value.trim().length > 0) {
            return true
          }

          return 'Ajoutez un message si le bandeau est activé.'
        }),
      description:
        'Texte unique partagé entre Contact, Sur Mesure et Pièces Disponibles. Les retours à la ligne sont conservés.',
    }),
  ],
  preview: {
    select: {
      enabled: 'enabled',
      title: 'title',
      message: 'message',
    },
    prepare({ enabled, title, message }) {
      return {
        title: title || 'Message d\'information',
        subtitle: enabled
          ? message || 'Message actif'
          : 'Désactivé',
      }
    },
  },
})
