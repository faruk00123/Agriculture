# কৃষিপ্রহরী · KrishiProhori

A **frontend-only** agricultural e-commerce demo for Bangladesh — crop
protection, fertilisers, seeds and farm equipment. Built with **React +
Vite**, styled entirely with **Tailwind CSS v3** (no second styling system).

> ⚠️ **This is a demo.** There is no backend, database, authentication,
> payment or delivery. Products, prices, stock, discounts, ratings and
> reviews are fictional sample data. No pesticide dosage, application rate,
> safety interval, active ingredient, registration number or approval claim
> is provided anywhere.

---

## Stack

| Layer | Choice |
|---|---|
| UI | React 18 (function components + hooks) |
| Routing | React Router 6 (`HashRouter`, so the build works from any static path) |
| Styling | Tailwind CSS 3.4 + PostCSS + Autoprefixer |
| Build | Vite 5 (Node ≥ 18.17) |
| State | React Context (`ShopContext` — cart + wishlist), persisted in `localStorage` |
| Data | Local JS modules under `src/data` |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run preview    # serve the production build
```

## Styling architecture

Tailwind is the single source of truth for colour, radius and shadow. There
are exactly **two** global stylesheets:

1. `src/styles/tailwind.css` — design tokens, `@layer base` element styles,
   focus-visible rings, form/select normalisation, reduced-motion support.
2. `src/styles/components.css` — reusable *atoms and section layouts* built
   from Tailwind utilities with `@apply` (`@layer components`).

Everything else is utility classes written directly in the JSX. Tailwind's
`content` scanner cannot see classes composed at runtime
(`tone-${tone}`, `flag--${flag}`…), so the finite sets are listed explicitly
in the `safelist` in `tailwind.config.js`.

### Breakpoints

The layouts are designed for phones **and** tablets, laptops, desktops and
large desktops — mobile-only is explicitly *not* the goal.

| Range | Header navigation | Notes |
|---|---|---|
| 320–767 | burger → off-canvas drawer | single-column grids |
| 768–1023 | burger + compact scrollable quick-nav strip | 2-column grids |
| 1024–1279 | full desktop nav | 3-column product grids, sticky filters/summary |
| ≥ 1280 | full desktop nav | 4-column product grids, page content capped at 1180px |

Custom steps `xs: 400px` and `3xl: 1600px` are added in `tailwind.config.js`.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`) and a
  keyboard-only **skip link** to `#main`.
- Visible `:focus-visible` outlines on every interactive element.
- Labelled inputs and icon-only buttons (`aria-label`), `aria-modal` drawer
  with focus trap and Escape-to-close.
- `prefers-reduced-motion` disables transitions/animations.
- Images carry `alt` text; decorative icons are hidden from assistive tech.

## Project structure

```
src/
  components/   Header, Footer, ProductCard, UI atoms, Icon, Logo, SearchOverlay, Art
  context/      ShopContext (cart + wishlist + demo totals)
  config/       brand.js (name, owner, contact, demo rules)
  data/         products.js, categories.js, content.js
  pages/        Home, Products, Categories, ProductDetails, Cart, Checkout,
                Wishlist, About, Contact, Advice, Article, Faq, PolicyPage, NotFound
  styles/       tailwind.css, components.css
scripts/        dev-only audit tooling (not shipped)
docs/           audit-checklist.md
```

## Dev tooling (optional)

`scripts/` holds two headless-Chrome checks used while building the UI.
`puppeteer-core` is **not** a project dependency — install it only when you
want to run them (they reuse your installed Chrome):

```bash
npm i --no-save puppeteer-core
npm run dev                # in one terminal
node scripts/audit.mjs     # responsive overflow + header mode + a11y sweep
node scripts/smoke.mjs     # runtime crash / console-error sweep over all routes
node scripts/check-classes.mjs   # find className tokens missing from the built CSS
```

Override the target with `AUDIT_BASE` and the browser with `CHROME_PATH`.

## Deployment

The app is a static bundle and is Vercel-ready (`vercel.json` runs
`npm run build` and publishes `dist/`).

- `.vercelignore` keeps `node_modules/`, `dist/`, `docs/` and `scripts/` out
  of the upload so Vercel performs a clean `npm install` + build.
- `dist/` is **not** committed (it is in `.gitignore`) — the build output
  must never be checked in.
