import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { 
  ShoppingBag, 
  Images, 
  Star, 
  Hammer,
  Eye
} from 'lucide-react'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Atelier Flo RD')
    .items([
      // --- COUTEAUX SIGNATURE (ACCUEIL) ---
      orderableDocumentListDeskItem({
        id: 'orderable-piece-signature',
        title: 'Couteaux Signature (Accueil)',
        icon: Star,
        type: 'piece',
        filter: '_type == "piece" && highlightOnHome == true',
        S,
        context,
      }),

      S.divider(),

      // --- BOUTIQUE ---
      S.listItem()
        .title('Boutique')
        .icon(ShoppingBag)
        .child(
          S.list()
            .title('Gestion Boutique')
            .items([
              // Tout le stock
              orderableDocumentListDeskItem({
                id: 'orderable-piece-all',
                title: 'Tous les Couteaux',
                icon: Hammer,
                type: 'piece',
                S,
                context,
              }),

              // Filtre rapide : Disponibles
              S.listItem()
                .title('En Stock uniquement')
                .icon(Eye)
                .child(
                  S.documentList()
                    .title('Pièces Disponibles')
                    .filter('_type == "piece" && status == "available"')
                    .defaultOrdering([{ field: 'orderRank', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // --- GALERIE PHOTOS ---
      orderableDocumentListDeskItem({
        id: 'orderable-gallery',
        title: 'Galerie Photos',
        icon: Images,
        type: 'galleryImage',
        S,
        context,
      }),
    ])