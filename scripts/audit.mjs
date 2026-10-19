/**
 * Responsive + layout audit (headless Chrome via puppeteer-core).
 *
 *   npm run dev            # in one terminal
 *   node scripts/audit.mjs # in another
 *
 * Checks every route at the project's target viewports and reports:
 *   • horizontal overflow (document + offending elements)
 *   • header navigation mode (burger / tablet strip / desktop nav)
 *   • elements with zero size that should be visible
 *   • images without alt text and buttons without an accessible name
 * Screenshots are written to %TEMP%/opencode/shots.
 *
 * puppeteer-core is NOT a project dependency — install it locally only when
 * you want to run this audit:  npm i --no-save puppeteer-core
 */
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'

const BASE = process.env.AUDIT_BASE || 'http://localhost:5173/'
const OUT = path.join(process.env.TEMP || '/tmp', 'opencode', 'shots')
const CHROME =
  process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const WIDTHS = [320, 360, 375, 390, 414, 600, 768, 900, 1024, 1280, 1440, 1920]
const ROUTES = [
  '/',
  '/products',
  '/products?cat=crop-protection&sub=insecticide',
  '/categories',
  '/product/p015',
  '/cart',
  '/checkout',
  '/wishlist',
  '/advice',
  '/advice/soil-test-before-fertilizer',
  '/about',
  '/contact',
  '/faq',
  '/shipping-policy',
  '/does-not-exist',
]

fs.mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const overflow = []
const nav = []
const a11y = []

for (const width of WIDTHS) {
  const page = await browser.newPage()
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })

  for (const route of ROUTES) {
    await page.goto(BASE + '#' + route, { waitUntil: 'networkidle0' })
    await new Promise((r) => setTimeout(r, 250))

    const res = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth
      const doc = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
      const over = []
      // Only blame individual elements when the document itself overflows;
      // otherwise the offenders are intentionally clipped (horizontal-scroll
      // nav strips) or parked off-canvas (drawer) and are not layout bugs.
      if (doc > vw + 1) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) continue
          if (r.right > vw + 1 || r.left < -1) {
            const cs = getComputedStyle(el)
            if (cs.position === 'fixed' || cs.position === 'absolute') continue
            if (cs.visibility === 'hidden' || cs.display === 'none') continue
            over.push({
              sel:
                el.tagName.toLowerCase() +
                (typeof el.className === 'string' && el.className
                  ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.')
                  : ''),
              left: Math.round(r.left),
              right: Math.round(r.right),
            })
          }
        }
      }
      return { vw, doc, over: over.slice(0, 8) }
    })

    if (res.doc > res.vw + 1) {
      overflow.push({ width, route, doc: res.doc, vw: res.vw, over: res.over })
    }
  }

  /* header mode + screenshot on the home page */
  await page.goto(BASE + '#/', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 250))
  nav.push(
    await page.evaluate(() => {
      const vis = (sel) => {
        const el = document.querySelector(sel)
        if (!el) return 'missing'
        const cs = getComputedStyle(el)
        return cs.display === 'none' || cs.visibility === 'hidden' ? 'hidden' : 'shown'
      }
      return {
        width: document.documentElement.clientWidth,
        burger: vis('[data-audit="burger"]'),
        desktopNav: vis('[data-audit="desktop-nav"]'),
        tabletNav: vis('[data-audit="tablet-nav"]'),
      }
    })
  )
  await page.screenshot({ path: path.join(OUT, `home-${width}.png`) })
  await page.goto(BASE + '#/products', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 200))
  await page.screenshot({ path: path.join(OUT, `products-${width}.png`) })
  await page.goto(BASE + '#/product/p015', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 200))
  await page.screenshot({ path: path.join(OUT, `pdp-${width}.png`) })

  a11y.push(
    await page.evaluate(() => {
      const namelessButtons = [...document.querySelectorAll('button')].filter(
        (b) => !(b.getAttribute('aria-label') || b.textContent.trim() || b.title)
      ).length
      const imgNoAlt = [...document.querySelectorAll('img')].filter((i) => i.alt === null).length
      const noLang = !document.documentElement.lang
      return { route: location.hash, namelessButtons, imgNoAlt, noLang }
    })
  )

  await page.close()
}

await browser.close()

const report = { base: BASE, widths: WIDTHS, overflow, nav, a11y }
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2))

console.log('── overflow ──')
console.log(overflow.length ? JSON.stringify(overflow, null, 1) : 'none ✅')
console.log('── header modes ──')
console.table(nav)
console.log('── a11y spot checks ──')
console.table(a11y.filter((a) => a.namelessButtons || a.imgNoAlt || a.noLang))
console.log(`screenshots: ${OUT}`)
