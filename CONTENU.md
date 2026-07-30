# CONTENU.md — Guide éditorial MMA

Ce document recense tout le contenu textuel du site, les images nécessaires et les informations à personnaliser avant la mise en ligne.

## Informations à vérifier / compléter

### Coordonnées

| Champ | Valeur actuelle | À vérifier |
|-------|----------------|------------|
| Téléphone | +261 37 17 777 77 | ✅ à confirmer |
| Email | contact@mmamaritime.com | ✅ à confirmer |
| Adresse | Zone Portuaire, Toamasina 501 | ✅ à confirmer |

### Dates et chiffres

| Champ | Valeur | Source |
|-------|--------|--------|
| Années d'expérience | +15 ans | À vérifier selon année de fondation |
| Nombre de ports | 6 | Toamasina, Ehoala, Mahajanga, Antsiranana, Nosy Be, Toliara |

---

## Pages du site

### Page d'accueil (`/fr` et `/en`)

**Sections :**
1. **Hero** — Accroche principale, 2 boutons CTA
2. **TrustBar** — 4 chiffres clés
3. **Services** — 3 cartes de prestations
4. **Pourquoi MMA** — 4 arguments
5. **Ports** — 6 ports en carte + liste
6. **Processus** — 5 étapes d'une escale
7. **CTA** — Appel à l'action
8. **Contact** — Formulaire + coordonnées

---

### Pages de services

**Consignation** (`/fr/services/consignation`)
- 8 prestations listées
- 5 questions/réponses FAQ

**Manning** (`/fr/services/manning`)
- 6 prestations listées
- Section conformité MLC 2006
- 5 questions/réponses FAQ

**Logistique** (`/fr/services/logistique`)
- 6 prestations listées
- 5 questions/réponses FAQ

---

### Page Ports (`/fr/ports`)

Descriptions détaillées des 6 ports :
1. Toamasina — Hub principal Madagascar
2. Ehoala — Port minier QMM
3. Mahajanga — Axe Afrique de l'Est
4. Antsiranana — Grande rade naturelle
5. Nosy Be — Port touristique
6. Toliara — Porte du Grand Sud

---

### Page À propos (`/fr/a-propos`)

- Histoire de l'entreprise
- Mission
- 4 valeurs (Intégrité, Réactivité, Expertise locale, Conformité)
- Agréments (APMF, MLC 2006, STCW)
- Équipe

---

### Page Contact (`/fr/contact`)

- Formulaire (Nom, Société, Email, Navire, Port, Service, Message)
- Informations de contact
- Badge disponibilité 24h/24

---

## Images à préparer

| Nom fichier | Dimensions | Usage |
|-------------|-----------|-------|
| `/public/og-image.png` | 1200×630px | Partage réseaux sociaux |
| `/public/img/hero-bg.jpg` | 1920×1080px | Fond hero (optionnel) |
| `/public/img/port-toamasina.jpg` | 800×600px | Carte port Toamasina |
| `/public/img/port-ehoala.jpg` | 800×600px | Carte port Ehoala |
| `/public/img/port-mahajanga.jpg` | 800×600px | Carte port Mahajanga |
| `/public/img/port-antsiranana.jpg` | 800×600px | Carte port Antsiranana |
| `/public/img/port-nosybe.jpg` | 800×600px | Carte port Nosy Be |
| `/public/img/port-toliara.jpg` | 800×600px | Carte port Toliara |

---

## Logos

| Fichier | Usage |
|---------|-------|
| `/public/brand/logo.svg` | Header sur fond clair |
| `/public/brand/logo-light.svg` | Header sur fond sombre, footer |

Les SVG actuels sont des placeholders fonctionnels. Remplacer par le logo officiel MMA au format SVG.

---

## Traductions

Les fichiers de traduction sont dans :
- `src/messages/fr.json` (français)
- `src/messages/en.json` (anglais)

Toute modification de texte doit être faite dans les deux fichiers pour maintenir la cohérence.

---

## Activation de l'email

1. Créer un compte Resend : https://resend.com
2. Vérifier le domaine `mmamaritime.com`
3. Créer une clé API
4. Ajouter dans `.env.local` : `RESEND_API_KEY=re_xxxxx`
5. Décommenter le bloc email dans `src/app/api/contact/route.ts`

---

## Checklist avant mise en ligne

- [ ] Vérifier et corriger les coordonnées (tel, email, adresse)
- [ ] Remplacer les logos SVG placeholder par le logo officiel
- [ ] Préparer et placer les images dans `/public/img/`
- [ ] Créer l'image OG (`/public/og-image.png`)
- [ ] Configurer Resend et activer l'envoi d'emails
- [ ] Configurer les variables d'environnement en production
- [ ] Vérifier la résolution DNS du domaine `mmamaritime.com`
- [ ] Tester le formulaire de contact en production
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Vérifier les balises hreflang avec un outil SEO
- [ ] Tester l'accessibilité avec axe ou WAVE
- [ ] Tester la navigation au clavier
- [ ] Tester sur mobile (iOS Safari, Android Chrome)
