# edge.solvinter

Statisk `Next.js`-site för Solvinter Edge, konfigurerad för att kunna publiceras gratis via GitHub Pages.

## Kom igång

```bash
npm install
npm run dev
```

Öppna sedan `http://localhost:3000`.

## Deploy

Projektet är förberett för GitHub Pages via GitHub Actions:

1. pusha repot till GitHub
2. slå på GitHub Pages med källa `GitHub Actions`
3. workflowen bygger och publicerar statiska filer från Next.js

Vid deploy i GitHub Actions sätts `basePath` och `assetPrefix` automatiskt till `/edge.solvinter`, så sidan fungerar som projektsajt.
