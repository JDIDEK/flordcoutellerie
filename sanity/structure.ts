import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { Eye, FolderOpen, Hammer, Image, Images, ShoppingBag } from 'lucide-react'

import { apiVersion } from '../sanity/env'

const structureApiVersion = apiVersion ?? '2025-01-01'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Atelier Flo RD')
    .items([
      // --- BOUTIQUE ---
      S.listItem()
        .title('Boutique')
        .icon(ShoppingBag)
        .child(
          S.list()
            .title('Gestion Boutique')
            .items([
              orderableDocumentListDeskItem({
                id: 'orderable-piece-all',
                title: 'Tous les Couteaux',
                icon: Hammer,
                type: 'piece',
                S,
                context,
              }),
              S.listItem()
                .title('En Stock uniquement')
                .icon(Eye)
                .child(
                  S.documentList()
                    .apiVersion(structureApiVersion)
                    .title('Pièces Disponibles')
                    .filter('_type == "piece" && status == "available"')
                    .defaultOrdering([{ field: 'orderRank', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // --- GALERIE PHOTOS ---
      S.listItem()
        .title('Galerie Photos')
        .icon(Images)
        .child(
          S.list()
            .title('Galerie Photos')
            .items([
              S.listItem()
                .title('Collections')
                .icon(FolderOpen)
                .child(
                  S.documentTypeList('galleryCollection')
                    .title('Collections')
                    .defaultOrdering([{ field: 'orderRank', direction: 'asc' }])
                ),

              S.listItem()
                .title('Entrées de galerie')
                .icon(Image)
                .child(
                  S.documentTypeList('galleryKnife')
                    .title('Entrées de galerie')
                    .defaultOrdering([
                      { field: 'featured', direction: 'desc' },
                      { field: 'orderRank', direction: 'asc' },
                    ])
                ),

              S.divider(),

              S.listItem()
                .title('Entrées par collection')
                .icon(FolderOpen)
                .child(
                  S.documentTypeList('galleryCollection')
                    .title('Collections')
                    .child((collectionId) =>
                      collectionId
                        ? S.documentList()
                            .apiVersion(structureApiVersion)
                            .title('Entrées de la collection')
                            .filter('_type == "galleryKnife" && references($collectionId)')
                            .params({ collectionId })
                            .defaultOrdering([
                              { field: 'featured', direction: 'desc' },
                              { field: 'orderRank', direction: 'asc' },
                            ])
                        : S.documentList().title('Entrées de la collection')
                    )
                ),
            ])
        ),
    ])
