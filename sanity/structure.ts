import type { StructureResolver } from 'sanity/structure'
import { 
  ShoppingBag, 
  Images, 
  FileText, 
  Star, 
  Hammer,
  Eye
} from 'lucide-react'

export const structure: StructureResolver = (S) =>
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
              S.listItem()
                .title('Couteaux Signature (Accueil)')
                .icon(Star)
                .child(
                  S.documentList()
                    .title('Sélection Accueil')
                    .filter('_type == "piece" && highlightOnHome == true')
                    .defaultOrdering([{field: 'homeOrder', direction: 'asc'}])
                ),
              
              S.divider(),

              // 2. Tout le stock
              S.documentTypeListItem('piece')
                .title('Tous les Couteaux')
                .icon(Hammer),

              // 3. Filtre rapide : Disponibles
              S.listItem()
                .title('En Stock uniquement')
                .icon(Eye)
                .child(
                  S.documentList()
                    .title('Pièces Disponibles')
                    .filter('_type == "piece" && status == "available"')
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