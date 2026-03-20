# Runbook de Migration Wix vers Vercel et Transfert de Domaine

## Résumé

Ce document décrit la migration complète du site actuel depuis Wix vers ce projet Next.js hébergé sur Vercel, avec l'objectif suivant :

- mettre en ligne le nouveau site sans downtime notable ;
- faire créer et posséder tous les comptes techniques par le client ;
- basculer d'abord le trafic via DNS depuis Wix vers Vercel ;
- transférer ensuite le domaine hors de Wix vers un registrar final ;
- valider techniquement le site avant, pendant et après la mise en ligne ;
- conserver un rollback simple tant que la nouvelle production n'est pas validée.

Décisions retenues pour cette migration :

- stratégie par défaut : déployer et valider d'abord sur Vercel, puis pointer le domaine depuis Wix, puis transférer le domaine hors Wix dans un second temps ;
- hypothèse actuelle : aucune adresse email active du domaine n'est à préserver ;
- vigilance obligatoire : revérifier juste avant le transfert registrar qu'aucun email du domaine n'existe ou n'est utilisé ;
- intégrations cibles conservées : `Vercel`, `Blob`, `Sanity`, `Stripe`, `Resend`.

---

## Vue d'ensemble et ordre des opérations

Ordre strict recommandé :

1. Le client crée les comptes propriétaires.
2. Le prestataire reçoit les accès nécessaires.
3. Le prestataire configure le projet hors production.
4. Le prestataire valide le site sur l'URL `*.vercel.app`.
5. Le prestataire prépare la bascule DNS chez Wix.
6. Le client ou le prestataire applique les enregistrements DNS Wix vers Vercel.
7. Le prestataire valide la production après go-live.
8. Après stabilisation, le client transfère le domaine hors de Wix vers son registrar final.
9. Le prestataire recopie la configuration DNS finale et effectue le nettoyage.

Règle opérationnelle :

- ne jamais mélanger mise en production du site et transfert registrar le même jour ;
- ne jamais supprimer l'ancien site Wix avant validation complète du nouveau site ;
- conserver une capture complète des DNS avant toute modification.

---

## Comptes que le client doit créer

### 1. Vercel

Le client doit créer :

- un compte Vercel à son nom ou au nom de son entreprise ;
- une team Vercel si le projet doit être partagé à plusieurs ;
- un projet Vercel pour ce repo ;
- un Blob store public pour la vidéo ;
- le domaine personnalisé dans le projet Vercel une fois le site prêt.

Le client doit transmettre au prestataire :

- une invitation sur le projet ou la team ;
- l'accès à la configuration du projet ;
- l'accès aux domaines du projet ;
- le token `BLOB_READ_WRITE_TOKEN` via un canal sécurisé si le prestataire ne le crée pas directement dans Vercel.

Le prestataire configure :

- le lien repo -> projet Vercel ;
- les variables d'environnement ;
- le déploiement de preview et production ;
- le Blob public ;
- le domaine et ses redirections ;
- la vidéo finale sur Blob.

### 2. Sanity

Le client doit créer :

- un compte Sanity ;
- un projet Sanity ;
- le dataset de production ;
- les rôles d'accès pour le prestataire.

Le client doit transmettre au prestataire :

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- un `SANITY_WRITE_TOKEN`
- le secret retenu pour `SANITY_WEBHOOK_SECRET`

Le prestataire configure :

- la connexion du front au projet Sanity ;
- le webhook de revalidation ;
- les éventuels accès Studio ;
- les tests de publication et revalidation.

### 3. Stripe

Le client doit créer :

- un compte Stripe ;
- les accès de test et live ;
- les paramètres de l'entreprise ;
- les moyens de paiement souhaités ;
- les accès du prestataire comme collaborateur.

Le client doit transmettre au prestataire :

- `STRIPE_SECRET_KEY` en mode test ;
- `STRIPE_SECRET_KEY` en mode live au moment opportun ;
- `STRIPE_WEBHOOK_SECRET` généré pour l'environnement concerné ;
- les décisions métier sur l'activation immédiate ou non de la vente en ligne.

Le prestataire configure :

- la route de checkout ;
- le webhook Stripe ;
- les URLs de retour ;
- les tests bout en bout en mode test ;
- le smoke test live si la vente est activée dès la mise en ligne.

### 4. Resend

Le client doit créer :

- un compte Resend ;
- un domaine ou sous-domaine d'envoi ;
- un accès facturation si nécessaire ;
- l'invitation du prestataire.

Le client doit transmettre au prestataire :

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_RECIPIENT_EMAIL` si l'adresse de réception doit être différente

Le prestataire configure :

- l'envoi du formulaire de contact ;
- les emails transactionnels ;
- la validation du domaine d'envoi ;
- les tests d'envoi et de réception.

### 5. Registrar / DNS

Le client doit posséder :

- le compte Wix qui gère actuellement le domaine ;
- puis le futur compte registrar final, à son nom, pour héberger le domaine après transfert.

Le client doit transmettre au prestataire :

- l'accès DNS Wix ou une présence disponible pendant la bascule ;
- la confirmation du registrar final choisi ;
- la validation du transfert registrar quand le site est stable.

Le prestataire configure :

- les enregistrements requis par Vercel ;
- la vérification du domaine ;
- la configuration DNS finale chez le nouveau registrar après transfert.

### 6. GitHub

Compte recommandé, pas strictement obligatoire pour faire tourner le site.

Le client devrait créer :

- un compte GitHub personnel ou une organisation ;
- un repo propriétaire du projet ou un transfert du repo existant ;
- une invitation du prestataire avec un rôle adapté.

Le prestataire configure :

- les droits minimum nécessaires ;
- l'intégration GitHub -> Vercel ;
- la stratégie de branches si nécessaire.

---

## Variables d'environnement à préparer

Le projet doit disposer au minimum de ces variables :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-06-01
SANITY_WRITE_TOKEN=
SANITY_WEBHOOK_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_RECIPIENT_EMAIL=
BLOB_READ_WRITE_TOKEN=
NEXT_PUBLIC_APP_URL=
```

Référence repo actuelle : `.env.example`.

Règles :

- ne jamais transmettre les secrets par email non chiffré ;
- stocker les secrets dans Vercel et localement dans `.env.local` ;
- différencier clairement test et production pour Stripe ;
- définir `NEXT_PUBLIC_APP_URL` sur l'URL finale du domaine une fois la bascule terminée.

---

## Actions exactes du client

### Vercel

Checklist client :

- créer le compte ou la team ;
- ajouter un moyen de paiement si nécessaire ;
- créer le projet Vercel ou accepter que le prestataire le crée dans sa team ;
- inviter le prestataire ;
- créer le Blob store en `public access` ;
- confirmer quel domaine sera utilisé en production ;
- valider l'ajout du domaine dans Vercel au moment de la bascule.

### Sanity

Checklist client :

- créer le projet Sanity ;
- confirmer le dataset de production ;
- inviter le prestataire ;
- autoriser la génération d'un token d'écriture ;
- valider l'utilisation du Studio pour la gestion du contenu.

### Stripe

Checklist client :

- créer le compte Stripe ;
- compléter les informations légales ;
- activer les paiements de test ;
- inviter le prestataire ;
- décider si la vente live est activée le jour du go-live ou plus tard ;
- valider le ou les emails liés aux commandes si nécessaire.

### Resend

Checklist client :

- créer le compte Resend ;
- ajouter le domaine ou sous-domaine d'envoi ;
- appliquer les DNS demandés pour la validation si nécessaire ;
- inviter le prestataire ;
- confirmer l'adresse d'expédition ;
- confirmer l'adresse de réception du formulaire de contact.

### Wix / Domaine

Checklist client :

- confirmer que le domaine actif est bien géré chez Wix ;
- confirmer qu'aucun email du domaine n'est utilisé ;
- préparer un accès DNS Wix ;
- valider le moment exact de la bascule ;
- conserver les identifiants Wix pour le transfert futur du domaine ;
- plus tard, déverrouiller le domaine et récupérer le code d'autorisation pour le transfert registrar.

### GitHub

Checklist client :

- créer un compte ou une organisation ;
- créer ou accepter le transfert du repo ;
- inviter le prestataire ;
- confirmer qui garde le rôle admin long terme.

---

## Actions exactes du prestataire

Ordre technique recommandé :

1. Cloner et vérifier le repo.
2. Connecter le repo au projet Vercel.
3. Saisir toutes les variables d'environnement dans Vercel.
4. Configurer Blob en public et téléverser la vidéo finale.
5. Vérifier Sanity et ses webhooks.
6. Vérifier Stripe en mode test et son webhook.
7. Vérifier Resend et le formulaire de contact.
8. Déployer et valider la preview ou production temporaire sur `*.vercel.app`.
9. Préparer les enregistrements DNS Wix vers Vercel.
10. Effectuer la bascule DNS.
11. Vérifier la production sur le vrai domaine.
12. Après stabilisation, accompagner le transfert du domaine hors Wix.
13. Recréer la zone DNS finale chez le nouveau registrar.
14. Nettoyer les anciennes références Wix et, si applicable, les anciennes références Mux.

Checklist détaillée prestataire :

- vérifier que le site build correctement ;
- vérifier que la vidéo hero pointe bien sur Blob ;
- vérifier que `NEXT_PUBLIC_APP_URL` correspond au bon environnement ;
- vérifier les redirections de domaine ;
- récupérer les DNS proposés par Vercel avant intervention dans Wix ;
- documenter l'état avant/après pour rollback ;
- effectuer tous les tests de non-régression après bascule.

---

## DNS et domaine

### A. Pointage Wix vers Vercel

Objectif :

- conserver le domaine chez Wix temporairement ;
- faire servir le nouveau site par Vercel ;
- limiter le risque opérationnel.

Étapes :

1. Ajouter le domaine personnalisé dans Vercel.
2. Noter exactement les enregistrements demandés par Vercel pour l'apex et `www`.
3. Ouvrir la gestion DNS chez Wix.
4. Faire une capture ou un export manuel de tous les DNS existants.
5. Modifier uniquement les enregistrements web nécessaires pour pointer vers Vercel.
6. Attendre la propagation DNS.
7. Vérifier la validation du domaine dans Vercel.
8. Vérifier le certificat SSL.
9. Vérifier le comportement du domaine racine et de `www`.

Points de contrôle :

- le domaine apex doit charger le site Vercel ;
- `www` doit charger le site Vercel ou rediriger selon le comportement choisi ;
- Vercel doit afficher le domaine comme `Valid Configuration` ou équivalent ;
- aucun ancien contenu Wix ne doit encore être servi après propagation effective.

Ne pas faire :

- ne pas supprimer des enregistrements non web sans vérification ;
- ne pas lancer le transfert registrar le même jour ;
- ne pas modifier plusieurs fois les DNS à l'aveugle pendant la propagation.

### B. Transfert du domaine hors Wix

Objectif :

- faire posséder le domaine au client chez son registrar final ;
- centraliser durablement la gestion.

Préconditions :

- le site sert déjà correctement sur Vercel ;
- la production est stable ;
- le client confirme qu'aucun email de domaine n'est actif, ou que tous les enregistrements nécessaires ont été inventoriés.

Étapes :

1. Choisir le registrar final.
2. Relever l'ensemble de la zone DNS actuelle.
3. Déverrouiller le domaine chez Wix.
4. Désactiver la protection de transfert si nécessaire.
5. Récupérer le code d'autorisation.
6. Initier le transfert chez le registrar final.
7. Recréer la zone DNS complète chez le registrar final.
8. Vérifier que les enregistrements web pointent toujours vers Vercel.
9. Attendre la finalisation du transfert.
10. Revérifier SSL, apex, `www`, redirections et éventuels DNS non web.

Points de contrôle :

- le site reste en ligne pendant toute la fenêtre de transfert ;
- le nouveau registrar contient exactement les enregistrements nécessaires ;
- aucune régression n'apparaît après le changement d'autorité DNS si celui-ci a lieu.

---

## Procédure de test détaillée

Chaque test doit être documenté dans un journal simple :

- date et heure ;
- environnement ;
- testeur ;
- résultat ;
- captures d'écran si pertinent ;
- action corrective si échec.

### 1. Checklist de préproduction sur l'URL `vercel.app`

#### Test 1.1 - Chargement général du site

Prérequis :

- déploiement Vercel réussi ;
- variables d'environnement présentes.

Étapes :

1. Ouvrir l'URL de preview ou de production Vercel.
2. Charger la page d'accueil.
3. Naviguer ensuite vers :
   - `/atelier`
   - `/pieces`
   - `/galerie`
   - `/contact`
   - `/sur-mesure`
   - pages légales
4. Revenir à la home.

Résultat attendu :

- toutes les pages répondent ;
- aucune erreur 404 ou 500 ;
- la navigation fonctionne ;
- les styles sont appliqués.

Vérifications dashboard :

- Vercel : déploiement `Ready`, aucun log d'erreur critique.

Si échec :

- consulter les logs Vercel ;
- vérifier les variables d'environnement ;
- relancer un déploiement si nécessaire.

#### Test 1.2 - Responsive

Prérequis :

- site accessible sur preview.

Étapes :

1. Tester en viewport mobile.
2. Tester en viewport tablette.
3. Tester en viewport desktop.
4. Vérifier en particulier la home, le configurateur et la galerie.

Résultat attendu :

- aucun contenu hors écran ;
- aucun chevauchement bloquant ;
- navigation et CTA utilisables ;
- vidéo et sections visuelles correctement cadrées.

Vérifications dashboard :

- aucune spécifique, test visuel navigateur.

Si échec :

- documenter la page, le viewport et le composant concerné ;
- corriger avant go-live.

#### Test 1.3 - Vidéo hero via Blob

Prérequis :

- Blob public configuré ;
- vidéo réuploadée ;
- `videos/main-video.mp4.json` pointe vers Blob.

Étapes :

1. Ouvrir la home.
2. Attendre le chargement du hero.
3. Ouvrir l'inspecteur réseau.
4. Vérifier que la ressource vidéo vient de Blob.
5. Vérifier l'autoplay, le mute, le loop et l'affichage.

Résultat attendu :

- la vidéo se lit ;
- l'URL chargée provient de `blob.vercel-storage.com` ou d'une URL publique Blob ;
- aucune ressource Mux n'est requise pour la lecture finale une fois la migration vidéo terminée.

Vérifications dashboard :

- Vercel / Blob : objet présent et accessible.

Si échec :

- vérifier `BLOB_READ_WRITE_TOKEN` ;
- vérifier le caractère public du Blob store ;
- relancer `pnpm exec next-video sync` avec le MP4 source présent.

#### Test 1.4 - Console et SEO de base

Prérequis :

- preview accessible.

Étapes :

1. Ouvrir la console navigateur sur home et pages clés.
2. Recharger la page.
3. Contrôler le titre, la meta description et l'Open Graph sur quelques pages.

Résultat attendu :

- pas d'erreur console bloquante ;
- métadonnées présentes ;
- pas de ressources CSP bloquées.

Vérifications dashboard :

- Vercel logs si erreur runtime.

Si échec :

- corriger avant bascule DNS.

### 2. Tests CMS / Sanity

#### Test 2.1 - Publication ou modification d'une pièce

Prérequis :

- Sanity opérationnel ;
- Studio accessible ;
- webhook configuré.

Étapes :

1. Ouvrir le Studio Sanity.
2. Modifier une pièce existante ou en créer une de test.
3. Publier la modification.
4. Ouvrir la page front correspondante.

Résultat attendu :

- la donnée apparaît sur le front après publication ;
- l'image et les champs principaux sont visibles.

Vérifications dashboard :

- Sanity : document publié ;
- Vercel : aucune erreur liée à la revalidation.

Si échec :

- vérifier le projet/dataset ;
- vérifier les requêtes front ;
- vérifier la revalidation.

#### Test 2.2 - Webhook de revalidation

Prérequis :

- `SANITY_WEBHOOK_SECRET` configuré ;
- endpoint `/api/revalidate` accessible.

Étapes :

1. Publier une modification dans Sanity.
2. Contrôler si le front se met à jour.
3. Consulter les logs Vercel de la route de revalidation.

Résultat attendu :

- le webhook appelle bien l'API ;
- le contenu est rafraîchi sans déploiement manuel.

Vérifications dashboard :

- Sanity : webhook exécuté ;
- Vercel : réponse 200 côté revalidate.

Si échec :

- vérifier l'URL du webhook ;
- vérifier le secret ;
- vérifier les tags de cache.

### 3. Tests paiement / Stripe

#### Test 3.1 - Parcours de paiement en mode test

Prérequis :

- Stripe en mode test ;
- `STRIPE_SECRET_KEY` test configurée ;
- `STRIPE_WEBHOOK_SECRET` test configuré ;
- au moins une pièce disponible à l'achat.

Étapes :

1. Ajouter une pièce au panier.
2. Lancer le checkout.
3. Finaliser le paiement avec une carte de test Stripe.
4. Attendre la redirection de succès.
5. Vérifier le webhook.
6. Vérifier les effets métier.

Résultat attendu :

- checkout créé ;
- paiement accepté ;
- redirection correcte ;
- webhook reçu ;
- mise à jour Sanity attendue ;
- email éventuel envoyé si configuré.

Vérifications dashboard :

- Stripe : session, paiement et webhook ;
- Vercel : logs `checkout` et `webhook` ;
- Sanity : statut des pièces si concerné ;
- Resend : email transactionnel si actif.

Si échec :

- isoler si l'échec vient du checkout, du webhook, de Sanity ou d'email ;
- ne pas activer la vente live avant résolution.

#### Test 3.2 - Smoke test live post go-live

À faire uniquement si le client active la vente immédiatement.

Prérequis :

- domaine final en production ;
- clés live configurées ;
- validation explicite du client.

Étapes :

1. Effectuer un achat réel contrôlé.
2. Vérifier le succès et le webhook.
3. Vérifier les effets côté back-office.

Résultat attendu :

- transaction réelle complète ;
- données cohérentes dans Stripe et Sanity ;
- email éventuel reçu.

Si échec :

- désactiver temporairement la vente ;
- repasser en investigation avant reprise.

### 4. Tests email / Resend

#### Test 4.1 - Formulaire de contact

Prérequis :

- `RESEND_API_KEY` configurée ;
- `RESEND_FROM_EMAIL` vérifié ;
- `CONTACT_RECIPIENT_EMAIL` renseigné si nécessaire.

Étapes :

1. Aller sur `/contact`.
2. Remplir le formulaire.
3. Soumettre un message de test.
4. Vérifier la réponse UI.
5. Vérifier la boîte de réception cible.

Résultat attendu :

- le formulaire répond avec succès ;
- le mail arrive à la bonne adresse ;
- l'adresse de réponse correspond à l'email saisi dans le formulaire.

Vérifications dashboard :

- Resend : email envoyé ;
- Vercel : pas d'erreur serveur.

Si échec :

- vérifier le domaine d'envoi ;
- vérifier la clé API ;
- vérifier les logs de la route `/api/contact`.

#### Test 4.2 - Email transactionnel post-checkout

Prérequis :

- webhook Stripe actif ;
- Resend opérationnel.

Étapes :

1. Réaliser un paiement test.
2. Attendre le traitement du webhook.
3. Vérifier si l'email attendu est envoyé.

Résultat attendu :

- l'email transactionnel part correctement si le flux est activé.

Vérifications dashboard :

- Resend : email envoyé ;
- Vercel : webhook exécuté sans erreur.

Si échec :

- vérifier la configuration Resend ;
- vérifier la disponibilité de l'email client dans les données de paiement.

### 5. Tests DNS / domaine

#### Test 5.1 - Avant go-live

Prérequis :

- domaine ajouté dans Vercel ;
- DNS Wix non encore modifiés ou en préparation.

Étapes :

1. Noter les DNS actuels.
2. Contrôler le domaine actif actuel.
3. Préparer les nouveaux enregistrements Vercel.

Résultat attendu :

- état de départ documenté ;
- rollback simple possible.

Si échec :

- ne pas lancer la bascule.

#### Test 5.2 - Après bascule DNS

Prérequis :

- DNS Wix modifiés ;
- propagation en cours ou terminée.

Étapes :

1. Tester le domaine apex.
2. Tester `www`.
3. Vérifier le certificat SSL.
4. Vérifier la redirection canonique choisie.
5. Vérifier que le contenu Wix n'est plus servi.

Résultat attendu :

- le domaine sert le site Vercel ;
- SSL valide ;
- apex et `www` se comportent comme prévu.

Vérifications dashboard :

- Vercel : domaine validé ;
- éventuellement un outil DNS public pour confirmer la propagation.

Si échec :

- attendre la propagation si le délai est normal ;
- sinon comparer DNS Wix avec les valeurs Vercel ;
- si nécessaire, repointer temporairement comme avant.

---

## Checklist post-mise en ligne

### J0 - Immédiatement après go-live

- home accessible sur le vrai domaine ;
- pages clés accessibles ;
- navigation fonctionnelle ;
- vidéo hero lisible ;
- contact opérationnel ;
- checkout opérationnel au moins en mode test selon la stratégie retenue ;
- aucun log d'erreur serveur critique ;
- SSL actif ;
- aucun chargement bloqué par CSP ou domaine tiers.

### J+1 - Vérification à froid

- recontrôler toutes les pages principales ;
- recontrôler le formulaire de contact ;
- recontrôler un flux Stripe selon activation ;
- vérifier qu'aucune erreur n'apparaît dans les logs Vercel ;
- vérifier que la publication Sanity continue à se refléter sur le front ;
- confirmer avec le client l'absence d'anomalie métier ou visuelle.

---

## Risques et rollback

### Risques principaux

- mauvaise configuration DNS chez Wix ;
- propagation DNS plus lente que prévu ;
- oubli d'un secret d'environnement ;
- vidéo non correctement migrée vers Blob ;
- webhook Sanity, Stripe ou Resend non opérationnel ;
- suppression involontaire d'un enregistrement DNS utile ;
- transfert registrar lancé trop tôt.

### Règles de prévention

- ne pas supprimer l'ancien site Wix avant validation complète ;
- faire une capture complète des DNS avant modification ;
- centraliser tous les secrets avant déploiement ;
- valider entièrement l'URL `vercel.app` avant bascule du domaine ;
- séparer dans le temps la bascule DNS et le transfert registrar ;
- revérifier l'absence d'email de domaine avant le transfert registrar.

### Procédure de rollback

À appliquer si régression critique immédiatement après la bascule DNS :

1. Identifier si le problème est DNS, application ou intégration.
2. Si le problème est bloquant et non résolu rapidement, remettre temporairement les anciens enregistrements Wix.
3. Vérifier le retour du trafic vers l'ancien site.
4. Corriger hors production.
5. Replanifier une nouvelle fenêtre de bascule.

Définition d'une régression critique :

- site inaccessible ;
- erreurs 500 généralisées ;
- checkout indisponible si la vente devait être active ;
- formulaire de contact inutilisable ;
- domaine principal non résolu ou SSL invalide.

---

## Critères d'acceptation de la migration

La migration est considérée réussie uniquement si :

- le site est validé sur `vercel.app` avant bascule ;
- le domaine apex et `www` servent correctement le site Vercel ;
- la vidéo hero fonctionne depuis Blob ;
- Sanity publie correctement et revalide le front ;
- le formulaire de contact fonctionne ;
- Stripe fonctionne selon le mode retenu ;
- aucun rollback n'est nécessaire à J0 ou J+1 ;
- le client possède les comptes finaux à son nom ;
- le transfert registrar est soit prêt, soit déjà effectué sans régression.

---

## Notes finales

- Tant que le domaine reste chez Wix mais pointe vers Vercel, le site est déjà correctement migré côté hébergement.
- Le transfert du domaine hors Wix est une étape d'ownership et de centralisation, pas une condition préalable à la mise en ligne.
- Avant le transfert registrar, refaire une vérification finale des DNS non web même si l'hypothèse actuelle est qu'aucun email du domaine n'est actif.
