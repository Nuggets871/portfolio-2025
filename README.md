# Portfolio Angular minimal (Angular + Tailwind CSS + daisyUI)

Un starter très simple pour créer un portfolio avec Angular, Tailwind CSS et daisyUI. Configuration minimale, prête à l’emploi.

## Prérequis
- Node.js 18.19+ ou 20+
- Bun 1.1+ (https://bun.sh)

## Installation (avec Bun)
```bash
bun install
```

## Démarrer en local (avec Bun)
```bash
bun run start
```
Puis ouvrez http://localhost:4200 dans votre navigateur.

## Build de production (avec Bun)
```bash
bun run build
```
Les fichiers seront générés dans `dist/portfolio`.

## Structure
- `src/main.ts` : bootstrap de l’application (standalone)
- `src/app/app.component.ts` : composant racine avec un exemple UI (daisyUI)
- `src/index.html` : point d’entrée (inclut data-theme="light")
- `src/styles.css` : directives Tailwind (@tailwind base, components, utilities)
- `tailwind.config.js` : activation de daisyUI
- `postcss.config.js` : configuration PostCSS pour Tailwind
- `angular.json` : configuration du builder Angular (application)

## Thèmes daisyUI
Vous pouvez changer le thème en modifiant l’attribut `data-theme` dans `src/index.html` (ex: `dark`, `cupcake`, etc.).

## Personnalisation rapide
- Remplacez le texte de l’en-tête/hero dans `app.component.ts`.
- Ajoutez vos images dans `src/assets` et utilisez-les dans vos composants.

Bon dev !
