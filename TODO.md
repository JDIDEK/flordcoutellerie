# Priorités immédiates

1. **Stabiliser la base Sanity**
   - Structurer les schémas (`piece`, `page`, `galleryImage`, futur `formation`) pour que le client puisse publier sans erreur.
   - Documenter `/api/revalidate`, les variables (`NEXT_PUBLIC_SANITY_*`, `SANITY_WEBHOOK_SECRET`, clés Stripe/Resend) et maintenir le webhook actif.
   - Préparer la formation utilisateur : sections claires dans Studio + checklist de publication.

2. **Mettre en ligne les produits “prêts à vendre”**
   - Bricoler le catalogue `app/pieces` avec les champs Sanity (statut, prix, image, features) et passer à un affichage dynamique.
   - Concevoir panier + checkout (Stripe Checkout) avec génération automatique de facture/email.
   - Ajouter tracking + suivi de commandes (export, hooks, webhooks, statut)

3. **Refonte graphique / responsive**
   - Appliquer la DA sur `Navigation`, hero, CTA, cartes, etc., puis valider l’adaptive/mobile.
   - Gérer les visuels (taille, overlay, video) en cohérence avec la nouvelle palette.
   - Finaliser la migration DNS du domaine.

4. **Formulaire de contact & CRM**
   - Remplacer le `mailto:` par une API route sécurisée (validation, rate limit, anti-spam) envoyant des emails via Resend et logguant dans Notion/Slack.
   - Ajouter feedback UX (loading, erreurs, confirmation par email).

5. **Préparer la formation en ligne + adhésion**
   - Esquisser `/formation`, `/espace-membre` et les maquettes.
   - Définir les contenus Sanity + accès payant (modèles, rôles, paiements récurrents).
   - Intégrer les workflows e-commerce (achat d’accès, relance).

# Fiche de solution (choix)

- **Sanity pour quoi ?**
  - Contenu éditable : pièces, pages, textes, visuels, modules formation (OK).
  - Ne gère pas : paiement/facturation, données clients, auth de membres (utiliser Stripe/Auth0/webhooks).

- **Paiement / facturation**
  - Choix : Stripe Checkout + Billing.
  - Pourquoi : contrôle total, génération PDF/automatisation, possibilité d’extensions (adhésion, renouvelement).
  - Relier : webhook Stripe → `/api/revalidate` + logic pour envoyer PDF/confirmation.

- **Webhook Sanity**
  - Pourquoi : invalider les tags `pieces` et `piece:<slug>` dès qu’un document est publié/édité.
  - À garder active avec le secret (`SANITY_WEBHOOK_SECRET`) et le header `x-sanity-webhook-signature`.
