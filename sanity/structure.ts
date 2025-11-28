import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { 
  ShoppingBag, 
  Images, 
  FileText, 
  Star, 
  Hammer,
  Eye
} from 'lucide-react'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Atelier Flo RD')
    .items([
      // --- SECTION 1 : BOUTIQUE ---
      S.listItem()
        .title('Boutique')
        .icon(ShoppingBag)
        .child(
          S.list()
            .title('Gestion Boutique')
            .items([
              // 1. Lien rapide vers les couteaux en page d'accueil
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

              // 2. Tout le stock
              orderableDocumentListDeskItem({
                id: 'orderable-piece-all',
                title: 'Tous les Couteaux',
                icon: Hammer,
                type: 'piece',
                S,
                context,
              }),

              // 3. Filtre rapide : Disponibles
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

      // --- SECTION 2 : MÉDIAS ---
      S.listItem()
        .title('Galerie Photos')
        .icon(Images)
        .child(S.documentTypeList('galleryImage')),

      // --- SECTION 3 : PAGES ---
      S.listItem()
        .title('Contenus du Site')
        .icon(FileText)
        .child(S.documentTypeList('page')),
    ])
