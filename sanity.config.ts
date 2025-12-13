'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { Iframe } from 'sanity-plugin-iframe-pane'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

// Configuration de l'aperçu (Site à droite, Formulaire à gauche)
function defaultDocumentNode(S: any, { schemaType }: any) {
  if (['piece', 'galleryImage'].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc: any) => {
             const domain = 'http://localhost:3000' // Changez si en prod
             const slug = doc?.slug?.current
             
             if (schemaType === 'piece' && slug) return `${domain}/pieces/${slug}`
             if (schemaType === 'galleryImage') return `${domain}/galerie`
             
             return domain
          },
          reload: { button: true },
        })
        .title('Aperçu Site'),
    ])
  }
  return S.document().views([S.view.form()])
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})