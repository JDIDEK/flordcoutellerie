import { type SchemaTypeDefinition } from 'sanity'
import { piece } from './piece'
import { galleryImage } from './galleryImage'
import { page } from './page'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    piece, 
    galleryImage, 
    page,
  ],
}
