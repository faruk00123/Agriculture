# Audit checklist — KrishiProhori (কৃষিপ্রহরী)

Audit performed on the existing Vite + React + **Tailwind CSS v3 (3.4.19)** project.
No Tailwind v4 instructions are used anywhere (v3 `tailwind.config.js` + `postcss.config.js` + `@tailwind` directives).

## A. Lost styling after the Tailwind migration

| # | Problem found | Where |
|---|---|---|
| A1 | **All CSS design tokens were deleted** (`tokens.css` removed in commit `0969482`). `--bg`, `--ink`, `--ink-soft`, `--border`, `--green-*`, `--orange*`, `--lime`, `--gold`, `--sky`, `--peach`, `--coral`, `--lavender`, `--r-*`, `--shadow-*`, `--ease`, `--max` were referenced but never defined → every rule in `base.css` silently fell back to browser defaults (transparent surfaces, wrong colours, no padding). | `src/styles/base.css` |
| A2 | **`home.css` (474 lines) deleted** but still referenced by JSX. This one file carried the *whole* design system for Home, Products, Product details, Cart, Checkout, Contact, Advice/Article, Categories, policy and prose pages. Everything using `.pgrid`, `.cat-card`, `.promo`, `.art-grid`, `.svc-grid`, `.prob-grid`, `.crop-grid`, `.contact-strip`, `.about-band`, `.owner-card`, `.float-card`, `.hero__stats`, `.page-hero`, `.pdp*`, `.cart*`, `.summary*`, `.checkout*`, `.contact*`, `.article*`, `.catGroup*`, `.browseBlock*`, `.panel`, `.sideList`, `.infoTable`, `.quickLinks`, `.filters`, `.catalog*`, `.prose__grid`, `.owner-panel` rendered **completely unstyled**. | `src/pages/*`, `src/components/UI.jsx` |
| A3 | **`header.css` deleted** → `.logo`, `.logo__bn`, `.logo__en`, `.nav__link`, `.nav__owner`, `.header__burger`, `.search-panel*`, `.drawer*` unstyled. | `src/components/Header.jsx`, `Logo.jsx`, `SearchOverlay.jsx` |
| A4 | **`footer.css` deleted** → footer column/logo/typography helpers unstyled. | `src/components/Footer.jsx` |
| A5 | **`product.css` / `pages.css` / `mobile-fixes.css` deleted** → product image sizing rules, select chevron, qty spinner hiding, number-input handling, mobile grid collapse all gone. | global |
| A6 | Product card `flag*`, `pcard__wish`, `star`, `star--off`, `price`, `stock*`, `pcard` classes have **no definition at all** (never existed in the deleted files either) → tag pills, wishlist button and stock colours unstyled. | `src/components/ProductCard.jsx` |
| A7 | `tone-*` colour helpers survived only as plain CSS in `base.css`; every other tone usage (chips, cards, stages) had no rule. | global |

## B. Functional bugs found while auditing

| # | Problem | Where |
|---|---|---|
| B1 | **`Article.jsx` crashes** — uses `brand.nameBn` but never imports `brand` → `ReferenceError`, blank page on every `/advice/:slug` route. | `src/pages/Article.jsx` |
| B2 | **Missing `seedling` icon** used by the "অন্যান্য কৃষিবীজ" sub-category (`Icon` returns `null` for unknown names) → empty icon slot on Categories page and Home chips. | `src/data/categories.js`, `src/components/Icon.jsx` |
| B3 | `art-grid--3` class used by `/advice` but never defined in any version of the CSS (no-op). | `src/pages/Advice.jsx` |
| B4 | Dead code: `navLinkClass` in `Header.jsx` is defined and never used. | `src/components/Header.jsx` |

## C. Responsive / layout issues

| # | Problem |
|---|---|
| C1 | No tablet (600–1023px) navigation: the desktop navbar switched off at 1024px and the phone drawer took over — "desktop navbar squeezed into a tablet" or "phone menu on a tablet". |
| C2 | Header top bar (burger + logo + search + wishlist + cart) had no small-screen compaction → cramped/overlapping actions at 320–414px; the full "কার্ট · n টি" text stayed visible on phones. |
| C3 | Product/category/article/service grids had **no large-desktop cap** — at 1600–1920px they stretched into very wide cells with huge whitespace. |
| C4 | `body { overflow-x: hidden }` masked overflow instead of fixing it (and creates a scroll container that can break `position: sticky`). |
| C5 | Global `img, svg { height: auto }` fought with the `object-fit: contain/cover` sizing used for product photographs, causing letterbox/stretch inconsistencies; mixed portrait (800×1200) and landscape (800×533) product photos were cropped unpredictably. |
| C6 | Product cards had ragged bottoms — no equal-height behaviour and no bottom-aligned action row. |
| C7 | Cart row / product info tables / footer link columns degenerated at 600–900px (single unreadable columns, or 3 columns squeezed). |
| C8 | Hero floating cards overlapped the hero text on narrow tablets; hero search input inherited a light input style on the dark hero background. |
| C9 | Checkout/contact form grids collapsed at 768px only (too late for ~700px tablets in landscape). |
| C10 | Filters panel on `/products` was always rendered with no mobile/tablet collapse behaviour. |

## D. Accessibility

| # | Problem |
|---|---|
| D1 | No visible keyboard focus styles anywhere (buttons/links/inputs) after the utility migration. |
| D2 | Search inputs, price inputs and the sort control lacked accessible labels in some places. |
| D3 | Reduced-motion preference was handled by `tokens.css` — deleted, so it no longer applies. |
| D4 | Icon-only controls (wishlist, cart remove, hamburger) — labels existed but needed verifying after rewrite. |

## E. Deployment / build

| # | Problem |
|---|---|
| E1 | `vercel.json` + `package.json` are fine (Vite 5, Node ≥18.17), but the repo shipped with a **committed `dist/`** and leftover root-level audit scripts (`audit.local.mjs`, `audit.fix.mjs`, `sum.local.cjs`) that pull in `puppeteer-core` (never installed) — while `node_modules` was not excluded from the upload, Vercel did not run a clean install, so it executed the committed Windows `node_modules/.bin/vite` shim → `Permission denied` → `exit 126`. |
| E2 | Invalid/unknown `allowScripts` key in `package.json`. |
| E3 | No `.vercelignore` (so `node_modules/`, `dist/`, audit scripts and docs would be uploaded). |
| E4 | `README.md` is effectively empty. |

## F. Work plan

1. Re-create the design tokens + base element styles inside Tailwind's `@layer base` (single global entry point).
2. Migrate every deleted layout/component rule into Tailwind: reusable atoms in `@layer components` (`@apply`-based) and page markup expressed with Tailwind utilities in JSX.
3. Delete `base.css` once its rules are migrated (no orphan stylesheet left behind).
4. Rewrite Header (mobile / tablet / laptop / desktop nav), Footer, ProductCard, UI atoms, SearchOverlay, Home and all inner pages with Tailwind utilities.
5. Fix bugs B1–B4.
6. Add responsive rules for 320 → 1920 (including tablet nav and large-desktop caps), verify no horizontal overflow with a headless Chrome audit.
7. Fix the Vercel build cause (clean install, `.vercelignore`, remove dead scripts, fix `package.json`).
8. Run lint/build and report.

## G. Resolution (current state)

All items above are addressed:

- **A1–A7** — Tokens live in `tailwind.config.js`; `base.css` was migrated
  into `@layer base` (`tailwind.css`) and deleted. Every deleted layout rule
  (`home.css`, `header.css`, `footer.css`, `product.css`, `pages.css`,
  `mobile-fixes.css`) is now expressed as Tailwind composition in
  `src/styles/components.css` or as utilities in the JSX. No orphan
  stylesheet remains.
- **B1** — `brand` imported in `Article.jsx`; route renders again.
- **B2** — `seedling` icon added to `Icon.jsx`.
- **B3** — `art-grid--3` (undefined) removed; `.art-grid` already caps at 3
  columns.
- **B4** — `navLinkClass` is now used by both the tablet strip and desktop nav.
- **C1–C10** — Header has three distinct nav modes (drawer / tablet strip /
  desktop nav); grids step 1 → 2 → 3 → 4 columns with a large-desktop cap;
  the filter panel collapses below `lg`; `overflow-x: hidden` on `body` was
  removed and real overflow fixed.
- **D1–D4** — Focus-visible ring, reduced-motion, labels and icon-button
  names are in place; the audit's a11y spot checks report no issues.
- **E1–E4** — Dead root scripts removed; `allowScripts` removed from
  `package.json`; `.vercelignore` added; `dist/` untracked; README written.

### Verification

- `npm run build` — succeeds (CSS ≈ 78 kB / 11 kB gzip, JS ≈ 322 kB / 100 kB gzip).
- `node scripts/check-classes.mjs` — every static `className` token is present
  in the built CSS.
- `node scripts/smoke.mjs` — all 18 routes render with no console/page errors
  and no horizontal scroll.
- `node scripts/audit.mjs` — **no horizontal overflow** and no a11y findings
  across 320, 360, 375, 390, 414, 600, 768, 900, 1024, 1280, 1440, 1920px;
  header modes are `drawer` (≤ 767), `drawer + tablet strip` (768–1023) and
  `desktop nav` (≥ 1024).

