import { type SchemaTypeDefinition } from 'sanity'
import { piece } from './piece'
import { galleryImage } from './galleryImage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    piece, 
    galleryImage,
  ],
}
