import { type SchemaTypeDefinition } from 'sanity'

import { galleryCollection } from './galleryCollection'
import { galleryKnife } from './galleryKnife'
import { piece } from './piece'
import { siteNotice } from './siteNotice'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [piece, galleryCollection, galleryKnife, siteNotice],
}
