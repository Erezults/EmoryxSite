# Emoryx — Marketing Website

The marketing site for the [Emoryx](https://emoryx.erezults.com) iOS app — a local-first private vault.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Turbopack**
- **Tailwind CSS v4**
- **react-markdown** + remark-gfm for legal pages
- Custom i18n (EN / HE) with RTL support
- Edge-rendered Open Graph image (`/opengraph-image`)
- Deployed on **Vercel** at `emoryx.erezults.com`

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
```

## Pages

| Path        | Purpose                                                  |
|-------------|----------------------------------------------------------|
| `/`         | Landing — hero, features, pricing, trust strip, footer   |
| `/privacy`  | Privacy Policy (EN + HE)                                 |
| `/terms`    | Terms of Service (EN + HE)                               |
| `/support`  | FAQ + mailto                                             |

## Editing legal content

Source: `content/{privacy,terms}.{en,he}.md`

These are duplicated in the parent app repo at
`Emoryx/docs/legal/`. Keep the EN files in sync; translate HE accordingly.

## Editing copy

UI strings live in `lib/i18n.tsx` as keyed dictionaries (`en` / `he`).

## Notes

- No analytics, no cookies, no third-party trackers — by design.
- Language toggle persists choice in `localStorage`.
- `?lang=he` / `?lang=en` query params override and persist the choice
  (useful for sharing direct links in either language).
- The `opengraph-image.tsx` route renders dynamically via `next/og` (Satori)
  — Satori does not support `conic-gradient`; use linear gradients only.

## Deploy

Pushes to `main` auto-deploy on Vercel.

---

© 2026 Erez Cohen
