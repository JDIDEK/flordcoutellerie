# TODO

## Refonte graphique complète
- [ ] Construire un design system aligné sur la DA Flo RD (palette officielle, typo, iconographie) et l'appliquer à `globals.css`, aux composants communs (`Navigation`, `HomeHeroSection`, CTA, cards, etc.).
- [ ] Remplacer tous les visuels placeholders par les photos/vidéos atelier validées, gérer leur optimisation (formats, tailles, `Image` Next).
- [ ] Décliner de nouveaux gabarits pour les pages clés (accueil, atelier, pièces, sur-mesure, contact) en intégrant storytelling, micro-interactions et hiérarchie éditoriale cohérente.
- [ ] Documenter le système (tokens, composants, règles responsive) pour faciliter l'évolution future.

## Sortie de Wix et conservation du domaine
- [ ] Préparer l’inventaire des contenus Wix (textes, médias, SEO) et planifier leur reprise dans l’app Next.
- [ ] Choisir une plateforme d’hébergement (ex. Vercel) et configurer les pipelines (environnements, variables, r/w, sauvegardes).
- [ ] Planifier la bascule DNS de `flordcoutellerie.com` (zones A/CNAME, éventuels enregistrements mail) avec fenêtre de transition et monitoring.
- [ ] Mettre en place les redirections 301 des anciennes URLs Wix vers les nouvelles routes Next + vérifier via crawler que le SEO est préservé.

## Optimisations mobiles et performances
- [x] Revoir les sections plein écran (`home-hero`, `video-scroll`, galerie horizontale) pour proposer des variantes sans surcharge sur <768px (hauteurs auto, animations désactivées, images adaptées).
- [x] Optimiser les vidéos/images (posters, compression, `loading="lazy"`, `sizes` adaptés) et implémenter des breakpoints spécifiques.
- [ ] Rendre Lenis/smooth scroll optionnel en respectant `prefers-reduced-motion` et offrir un fallback natif.
- [ ] Mettre en place une batterie de tests Lighthouse/Chrome UX ciblant mobile + budgets de performance dans CI.

## Boutique en ligne complète
- [ ] Remplacer les tableaux statiques de `app/pieces` par un vrai catalogue (CMS ou base) avec gestion de stock, prix, variantes et médias.
- [ ] Concevoir un tunnel e-commerce (panier, checkout, confirmation) avec paiement sécurisé (Stripe/PayPal) et génération automatique des factures.
- [ ] Créer un back-office pour suivre commandes, statut, expéditions, emails transactionnels et export comptable.
- [ ] Intégrer tracking (analytics, conversions) et prévoir les évolutions TVA, frais d’expédition, codes promo.

## Formulaire de contact fiable
- [ ] Remplacer le `mailto:` de `app/contact/page.tsx` par une route API sécurisée (validation, rate limiting, logs) ou un service tiers (Resend, Brevo).
- [ ] Ajouter feedback utilisateur (loading, succès/erreur, confirmation email) + anti-spam (honeypot, reCAPTCHA, filtrage IP).
- [ ] Centraliser les messages dans un outil (CRM, Notion, Slack webhook) pour ne rien perdre.

## Espace “formation / adhésion” à préparer
- [ ] Définir l’architecture de navigation/URL (ex. `/formation`, `/formation/[slug]`, `/espace-membre`) et créer les pages placeholders avec le design système.
- [ ] Concevoir le modèle de contenu (formations, modules, calendrier, tarifs) et la stratégie d’accès (authentification, rôles, abonnement/paiement récurrent).
- [ ] Prévoir l’intégration avec le futur e-commerce (achat de formation, renouvellement adhésion, facturation) et tracer les points de calendrier (newsletter, rappels).
- [ ] Documenter les besoins techniques/métier pour pouvoir alimenter l’espace dès que le contenu sera prêt.
