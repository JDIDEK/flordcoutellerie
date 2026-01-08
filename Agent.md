# Agent Guide - Flor D'Coutellerie

Ce fichier sert de guide rapide pour travailler dans ce repo.

## Aperçu
- Site Next.js (App Router) pour un atelier de coutellerie artisanale.
- Contenu géré par Sanity (pièces et galerie).
- Paiement via Stripe, emails via Resend.
- Vidéo hero gérée par next-video.
- **Configurateur sur-mesure** : wizard multi-étapes pour commander des couteaux personnalisés.

## Stack technique
- Next.js 16, React 19, TypeScript.
- Tailwind CSS v4 (styles dans `styles/globals.css`).
- Sanity Studio embarqué dans `app/studio`.
- Stripe + Resend pour le checkout.
- next-video pour les assets vidéo.
- shadcn/ui pour les composants UI.

## Démarrage rapide
1. Installer les deps: `pnpm install`
2. Copier `.env` vers `.env.local` et remplir les variables.
3. Lancer le dev: `pnpm dev`
4. Ouvrir `http://localhost:3000` (site) et `http://localhost:3000/studio` (CMS).

## Scripts utiles
- `pnpm dev`: serveur Next + `npx next-video sync -w`
- `pnpm build`: build production
- `pnpm start`: démarrer le build
- `pnpm lint`: lint ESLint

## Structure du repo
```
app/
├── api/
│   ├── checkout/     # Création session Stripe
│   ├── webhook/      # Webhook Stripe → Sanity + email
│   └── revalidate/   # Webhook Sanity → revalidation
├── sur-mesure/       # Page configurateur sur-mesure
├── pieces/           # Galerie des pièces
├── atelier/          # Page atelier
├── contact/          # Page contact
└── studio/           # Sanity Studio

components/
├── custom-order/     # ⭐ Module configurateur sur-mesure
│   ├── CustomOrderWizard.tsx   # Composant principal
│   ├── types.ts                # Types TypeScript
│   ├── reducer.ts              # État React (useReducer)
│   ├── helpers.ts              # Fonctions utilitaires
│   ├── data/                   # Données statiques (options)
│   ├── steps/                  # Composants d'étapes
│   └── ui/                     # Composants UI réutilisables
├── sections/         # Sections de page (Hero, Footer, etc.)
└── ui/               # Composants shadcn/ui

lib/
├── stripe.ts         # Client Stripe
├── utils.ts          # Utilitaires
└── sanity/           # Client et queries Sanity

sanity/
├── schemaTypes/      # Schémas Sanity
├── structure.ts      # Structure Studio
└── lib/              # Client, image helper
```

## Configurateur Sur-Mesure (⭐ Module principal)

### Architecture
Le configurateur est un wizard multi-étapes utilisant `useReducer` pour la gestion d'état.

### Flux par usage
1. **Cuisine** : Forme → Acier → (Damasteel) → Guillochage → Manche → Composition → Personnalisation
2. **Pliant** : Mécanisme → Forme → Acier → (Damasteel) → Guillochage principal → Guillochage platines → Manche → Composition → Personnalisation
3. **Outdoor** : Utilisation → Forme → Acier → (Damasteel) → Guillochage → Manche → Composition → Personnalisation → Étui
4. **Chasse** : Forme → Acier → (Damasteel) → Guillochage → Manche → Composition → Personnalisation → Étui

### Fichiers clés
- `types.ts` : Interfaces (WizardConfig, StepId, Action, etc.)
- `reducer.ts` : Actions et état initial
- `helpers.ts` : `getSteps()`, `isStepComplete()`, `getPatternScale()`
- `data/` : Options statiques par étape (formes, aciers, manches, etc.)
- `steps/` : Composants React pour chaque étape

### Ajouter une nouvelle étape
1. Créer le composant dans `steps/`
2. L'exporter dans `steps/index.ts`
3. Ajouter le StepId dans `types.ts`
4. Ajouter le case dans `isStepComplete()` (helpers.ts)
5. Ajouter l'étape dans `getSteps()` (helpers.ts)
6. Ajouter le case dans `renderStepContent()` (CustomOrderWizard.tsx)

### Données (data/)
- `usage-options.ts` : 4 usages (cuisine, pliant, outdoor, chasse)
- `kitchen-forms.ts` : Formes cuisine (Nakiri, Gyuto, etc.)
- `pliant-options.ts` : Mécanismes et formes pliant
- `outdoor-options.ts` : Intensités et formes outdoor
- `chasse-forms.ts` : Formes chasse
- `steel-options.ts` : Options acier par usage
- `damasteel-patterns.ts` : Motifs Damasteel (9 grandes lames, 24 petites lames)
- `guillochage-options.ts` : Motifs guillochage
- `handle-options.ts` : Familles de manche
- `sheath-options.ts` : Options étui

### Design UI
- Cards rectangulaires : nom à gauche, photo à droite
- Grille 2 colonnes sur desktop, 1 sur mobile
- Bordure primary quand sélectionné
- Notes en italique sous la description

## CMS (Sanity)
- Config principale: `sanity.config.ts`.
- Schémas: `sanity/schemaTypes/piece.ts`, `sanity/schemaTypes/galleryImage.ts`.
- Les requêtes GROQ sont dans `lib/sanity/queries.ts`.
- Les types utilisés par le front sont dans `lib/sanity/types.ts`.
- Si tu ajoutes un champ Sanity, pense à le déclarer dans le schéma,
  mettre à jour les types, et ajuster les requêtes.

## Cache et revalidation
- Les requêtes Sanity utilisent des tags Next: `piece` et `galleryImage`.
- `POST /api/revalidate` valide la signature Sanity et revalide le tag `piece`.

## Paiement et emails
- `POST /api/checkout`:
  - Charge les pièces Sanity.
  - Crée une session Stripe avec metadata `pieceIds`.
  - Utilise `NEXT_PUBLIC_APP_URL` pour les URLs de retour.
- `POST /api/webhook`:
  - Vérifie la signature Stripe.
  - Marque les pièces comme `sold` dans Sanity.
  - Envoie un email via Resend si un email client est disponible.

## Variables d'environnement
Remplir dans `.env.local` (ne pas committer les secrets):
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_WRITE_TOKEN          # droits écriture
SANITY_WEBHOOK_SECRET
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
RESEND_API_KEY
RESEND_FROM_EMAIL
MUX_TOKEN_ID
MUX_TOKEN_SECRET
NEXT_PUBLIC_APP_URL
```

## Conventions de code
- Utiliser l'alias `@/` pour les imports internes (voir `tsconfig.json`).
- Préférer `pnpm` (présence de `pnpm-lock.yaml`).
- Composants React : PascalCase, fichiers .tsx
- Données/helpers : camelCase, fichiers .ts
- Toujours typer avec TypeScript
- Pour les vidéos, ajouter les fichiers dans `videos/` puis exécuter `npx next-video sync`

## Checklist avant PR
- [ ] `pnpm lint` passe sans erreur
- [ ] `pnpm build` réussit
- [ ] Types TypeScript corrects
- [ ] Tester les flux du configurateur sur-mesure
- [ ] Vérifier responsive (mobile/desktop)
