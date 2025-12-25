# Agent Guide - Flor D'Coutellerie

Ce fichier sert de guide rapide pour travailler dans ce repo.

## Apercu
- Site Next.js (App Router) pour un atelier de coutellerie.
- Contenu gere par Sanity (pieces et galerie).
- Paiement via Stripe, emails via Resend.
- Video hero geree par next-video.

## Stack technique
- Next.js 16, React 19, TypeScript.
- Tailwind CSS v4 (styles dans `styles/globals.css`).
- Sanity Studio embarque dans `app/studio`.
- Stripe + Resend pour le checkout.
- next-video pour les assets video.

## Demarrage rapide
1. Installer les deps: `pnpm install`
2. Copier `.env` vers `.env.local` et remplir les variables.
3. Lancer le dev: `pnpm dev`
4. Ouvrir `http://localhost:3000` (site) et `http://localhost:3000/studio` (CMS).

## Scripts utiles
- `pnpm dev`: serveur Next + `npx next-video sync -w`
- `pnpm build`: build production
- `pnpm start`: demarrer le build
- `pnpm lint`: lint ESLint

## Structure du repo
- `app/`: pages et API routes (App Router).
- `app/api/checkout`: creation de session Stripe.
- `app/api/webhook`: webhook Stripe -> Sanity + email.
- `app/api/revalidate`: webhook Sanity -> revalidation.
- `components/`: composants UI et layout.
- `lib/`: helpers (Stripe, requetes Sanity, types).
- `sanity/`: schemas, structure Studio, client.
- `styles/`: CSS global et tokens visuels.
- `videos/`: sources video pour next-video.
- `public/`: assets statiques.

## CMS (Sanity)
- Config principale: `sanity.config.ts`.
- Schemas: `sanity/schemaTypes/piece.ts`, `sanity/schemaTypes/galleryImage.ts`.
- Les requetes GROQ sont dans `lib/sanity/queries.ts`.
- Les types utilises par le front sont dans `lib/sanity/types.ts`.
- Si tu ajoutes un champ Sanity, pense a le declarer dans le schema,
  mettre a jour les types, et ajuster les requetes.

## Cache et revalidation
- Les requetes Sanity utilisent des tags Next: `piece` et `galleryImage`.
- `POST /api/revalidate` valide la signature Sanity et revalide le tag `piece`.

## Paiement et emails
- `POST /api/checkout`:
  - Charge les pieces Sanity.
  - Cree une session Stripe avec metadata `pieceIds`.
  - Utilise `NEXT_PUBLIC_APP_URL` pour les URLs de retour.
- `POST /api/webhook`:
  - Verifie la signature Stripe.
  - Marque les pieces comme `sold` dans Sanity.
  - Envoie un email via Resend si un email client est disponible.

## Variables d'environnement
Remplir dans `.env.local` (ne pas committer les secrets):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_WRITE_TOKEN` (droits ecriture)
- `SANITY_WEBHOOK_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `MUX_TOKEN_ID`
- `MUX_TOKEN_SECRET`
- `NEXT_PUBLIC_APP_URL`

## Notes pour contribuer
- Utiliser l'alias `@/` pour les imports internes (voir `tsconfig.json`).
- Preferer `pnpm` (presence de `pnpm-lock.yaml`).
- Pour les videos, ajouter les fichiers dans `videos/` puis executer
  `npx next-video sync` si besoin.
