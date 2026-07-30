# MMA — Madagascar Maritime Agency

Site web officiel de Madagascar Maritime Agency — agence maritime agréée APMF proposant la consignation de navires, le manning et la logistique portuaire dans les grands ports de Madagascar.

## Stack technique

- **Framework**: Next.js 14 (App Router)
- **Langage**: TypeScript 5
- **Styling**: Tailwind CSS 3 + @tailwindcss/typography
- **Animations**: Framer Motion 12
- **Internationalisation**: next-intl 4 (FR / EN)
- **UI Primitives**: Radix UI (Dialog, NavigationMenu, Accordion, Select)
- **Email**: Resend (pré-configuré, à activer)
- **Fonts**: Space Grotesk · Inter · Fraunces (Google Fonts via next/font)

## Démarrage rapide

```bash
# Installer les dépendances (déjà fait si le projet est cloné)
npm install

# Mode développement
npm run dev

# Build de production
npm run build

# Lancer en production
npm start
```

## Configuration

Copiez `.env.example` vers `.env.local` et remplissez les valeurs :

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'emails du formulaire de contact |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (pour les métadonnées OG) |

## Activer l'email de contact

1. Créer un compte sur [resend.com](https://resend.com)
2. Ajouter votre clé API dans `.env.local`
3. Dans `src/app/api/contact/route.ts`, décommenter le bloc Resend
4. Adapter l'adresse `from` à votre domaine vérifié chez Resend

## Structure du projet

```
src/
├── app/
│   ├── [locale]/              # Pages (fr + en)
│   │   ├── layout.tsx         # Layout racine avec polices et JSON-LD
│   │   ├── page.tsx           # Page d'accueil
│   │   ├── a-propos/
│   │   ├── contact/
│   │   ├── ports/
│   │   └── services/
│   │       ├── consignation/
│   │       ├── manning/
│   │       └── logistique/
│   ├── api/contact/route.ts   # API Route formulaire de contact
│   ├── globals.css            # Styles globaux Tailwind
│   ├── sitemap.ts             # Sitemap auto-généré
│   └── robots.ts              # robots.txt
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Navigation fixe responsive + langue
│   │   └── Footer.tsx         # Pied de page avec colonnes
│   ├── sections/              # Sections de la page d'accueil
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── Services.tsx
│   │   ├── WhyMma.tsx
│   │   ├── PortsCovered.tsx
│   │   ├── Process.tsx
│   │   ├── CtaSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── AnimatedCounter.tsx  # Compteur animé au scroll
│       └── ScrollReveal.tsx     # Révélation au scroll (Framer Motion)
├── i18n/
│   ├── routing.ts             # Définition des locales (fr, en)
│   └── request.ts             # Config next-intl par requête
├── messages/
│   ├── fr.json                # Traductions françaises
│   └── en.json                # Traductions anglaises
└── middleware.ts              # Middleware next-intl (redirection locale)
```

## Images requises

Voir `public/img/README.txt` pour la liste complète des images à placer.

L'image OpenGraph (`/public/og-image.png`) est également à créer.

## Ports couverts

- **Toamasina** (Tamatave) — Port principal, siège opérationnel MMA
- **Ehoala** (Fort-Dauphin) — Port minier en eau profonde
- **Mahajanga** (Majunga) — Côte nord-ouest
- **Antsiranana** (Diego-Suarez) — Extrême-nord
- **Nosy Be** — Port touristique
- **Toliara** (Tuléar) — Côte sud-ouest

## Internationalisation

Le site est disponible en français (`/fr/...`) et en anglais (`/en/...`). Le français est la langue par défaut. Les textes de traduction sont dans `src/messages/fr.json` et `src/messages/en.json`.

## Déploiement

### Vercel (recommandé)

```bash
vercel deploy
```

Ou connecter le dépôt GitHub à Vercel pour le déploiement automatique.

### Variables d'environnement en production

À configurer dans le tableau de bord Vercel :
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Conformité SEO

- Métadonnées par page (title, description, OG, Twitter Card)
- Schema.org JSON-LD (Organization + Service)
- Sitemap XML automatique
- Hreflang pour le multilinguisme
- Robots.txt
- Balises alt sur toutes les images
- Structure H1/H2/H3 sémantique
- WCAG AA (contraste, focus visible, ARIA)
