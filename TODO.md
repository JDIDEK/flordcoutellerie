# TODO

## 1. Design & migration visuelle
- [ ] Appliquer la direction artistique validée à `globals.css`, `Navigation`, `HomeHeroSection`, CTA et autres blocs pour refléter la nouvelle palette, typographie et hiérarchie.
- [ ] Remplacer les visuels placeholders par les photos/vidéos atelier définitives et ajuster leurs `sizes`, formats et overlays.
- [ ] Documenter les tokens/règles responsive pour que la refonte reste cohérente, simple à maintenir et prête pour la mise à jour du client.
- [ ] Préparer l’inventaire Wix + planifier la bascule DNS de `flordcoutellerie.com` (redirections, enregistrements mail, monitoring).

## 2. Catalogue & boutique
- [ ] Finaliser le schéma Sanity des pièces (statuts, images, features, prix, mise en avant) et former ton client à créer/modifier les documents.
- [ ] Alimenter `app/pieces` et les cards avec ces données dynamiques puis préparer les états (disponible, réservé, vendu).
- [ ] Construire un tunnel e-commerce complet (panier, checkout Stripe, confirmation) et automatiser la facturation/emails transactionnels.
- [ ] Ajouter une couche back-office/fidélité : suivi des commandes, exports comptables, tracking conversions + TVA/frais d’expédition.

## 3. Contact & CRM
- [ ] Remplacer le `mailto:` par une API route sécurisée (validation, options anti-spam) qui envoie un email via Resend/Brevo et enregistre le message.
- [ ] Ajouter un feedback utilisateur (loading, erreurs, confirmation) et un filtrage anti-spam (honeypot, rate limit, reCAPTCHA si nécessaire).
- [ ] Centraliser les messages entrants dans la stack de ton choix (Notion, Slack, CRM) pour que ton client puisse répondre sans changer de boîte mail.

## 4. Formation & adhésion
- [ ] Esquisser les futures routes (`/formation`, `/formation/[module]`, `/espace-membre`) et créer des placeholders graphiques pour les modules en rédaction.
- [ ] Concevoir le modèle de contenu Sanity pour la formation (chapitres, ressources, tarifs, accès) et la logique d’adhésion (rôles, abonnement).
- [ ] Préparer l’intégration avec le e-commerce (achat de formation, renouvellement adhésion, facturation) et les workflows de communication (newsletters, rappels).
- [ ] Organiser les ressources (vidéos, PDF, animations) pour que ton client and sa graphiste puissent les publier quand elles seront prêtes.

## 5. Sanity & expérience back-office
- [ ] Structurer le Studio avec des sections/explications claires, champs obligatoires et validations précises pour faciliter les mises à jour content.
- [ ] Créer une checklist de publication (image, statut, prix, tags) pour réduire les erreurs à la mise en ligne.
- [ ] Maintenir le webhook `/api/revalidate` pour purger les tags `pieces`/`piece:<slug>` à chaque publication et documenter les variables d’environnement (Sanity + Stripe, etc.).
- [ ] Former ton client rapide sur le Studio : guide de saisie, workflows de mise à jour et point de contact en cas de question.
