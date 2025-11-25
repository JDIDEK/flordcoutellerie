Phase 2 : Le Panier d'Achat (Frontend)
Prompt 2 :

"J'ai besoin d'un store global pour gérer le panier. Installe zustand et crée le fichier hooks/use-cart.ts qui permet d'ajouter, supprimer et vider le panier. Il doit persister les données dans le localStorage."

Prompt 3 :

"Crée le composant components/cart-sheet.tsx (en utilisant shadcn/ui sheet). Il doit afficher la liste des articles du panier, le total, et un bouton pour passer à la caisse. Ajoute aussi le petit bouton avec l'icône de sac et le badge de quantité pour l'intégrer dans ma Navbar."

Phase 3 : Paiement Stripe (Backend)
Prompt 4 :

"Crée la route API app/api/checkout/route.ts. Elle doit recevoir une liste d'IDs produits, vérifier leur prix réel dans Sanity pour la sécurité, et créer une session Stripe Checkout. N'oublie pas d'inclure les métadonnées pour le webhook et d'activer la création de facture automatique."

Phase 4 : Automatisation après-vente (Webhooks)
Prompt 5 :

"Crée la route app/api/webhook/route.ts pour gérer l'événement checkout.session.completed de Stripe.

Elle doit récupérer les IDs des produits vendus.

Elle doit utiliser un client Sanity avec un token d'écriture pour passer leur statut à 'sold'.

Elle doit envoyer un email de confirmation simple au client via Resend."

Phase 5 : Finalisation de l'UI
Prompt 6 :

"Modifie le composant ProductCard (et la page détail produit) pour que le bouton 'Acheter' ajoute l'article au panier via le hook useCart au lieu de simplement rediriger. Si l'article est 'sold', le bouton doit être désactivé."