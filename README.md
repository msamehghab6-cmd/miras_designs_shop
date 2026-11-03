# Mira's Designs

A standalone copy of the original Mira's Designs website. This version keeps the original React pages, styling, animations, product cards, and navigation while removing Replit-specific development plugins and configuration.

## Run locally

You need Node.js 20+ and npm or pnpm.

```bash
npm install
npm run dev
```

Open the local address printed by Vite (usually http://localhost:5173).

## Create a production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`. Upload that folder to a static host such as Netlify, Vercel, or another static hosting provider.

## Pages included

- `/` Home
- `/shop` Shop
- `/order` Order form
- `/contact` Contact
- `/privacy` Privacy

Hosting fallback files are included for Netlify (`public/_redirects`) and Vercel (`vercel.json`) so direct visits to these pages work.

## Important note about orders

The original order form validates the fields and then shows an on-screen confirmation. It does **not** currently send or store submissions. Connect an email service or backend before relying on it to receive real customer orders.

## External resources

The handwritten and sans-serif fonts load from Google Fonts. The rest of the interface is included in this project.
