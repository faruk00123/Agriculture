/**
 * Runtime smoke test (headless Chrome via puppeteer-core).
 *
 *   npm run dev              # in one terminal
 *   node scripts/smoke.mjs   # in another
 *
 * Visits every route once, captures uncaught page errors + console errors,
 * and asserts the page rendered a heading and did not crash. This is what
 * catches things such as a missing import that only blows up at runtime.
 *
 * puppeteer-core is NOT a project dependency — install it locally only when
 * you want to run this:  npm i --no-save puppeteer-core
 */
import puppeteer from 'puppeteer-core'

const BASE = process.env.AUDIT_BASE || 'http://localhost:5173/'
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const ROUTES = [
  '/',
  '/products',
  '/products?cat=fertilizers&sub=organic-fertilizer',
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
  '/return-policy',
  '/privacy-policy',
  '/terms',
  '/does-not-exist',
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900 })

let current = ''
const problems = []
page.on('pageerror', (err) => problems.push({ route: current, kind: 'pageerror', msg: String(err) }))
page.on('console', (msg) => {
  if (msg.type() === 'error') problems.push({ route: current, kind: 'console', msg: msg.text() })
})

for (const route of ROUTES) {
  current = route
  await page.goto(BASE + '#' + route, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 200))
  const facts = await page.evaluate(() => ({
    h1: document.querySelector('main h1, main h2, main h3')?.textContent?.trim()?.slice(0, 40) || '',
    mainEmpty: (document.querySelector('#main')?.childElementCount || 0) === 0,
    scrollX: window.scrollX,
    hasHorizontalScrollbar: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
    imgNoAlt: [...document.images].filter((i) => i.alt === null).length,
  }))
  if (!facts.h1) problems.push({ route, kind: 'no-heading', msg: 'no h1/h2/h3 inside <main>' })
  if (facts.mainEmpty) problems.push({ route, kind: 'empty-main', msg: '#main has no children' })
  if (facts.hasHorizontalScrollbar) problems.push({ route, kind: 'x-overflow', msg: 'document scrolls horizontally' })
  if (facts.brokenImages) problems.push({ route, kind: 'broken-image', msg: `${facts.brokenImages} image(s) failed to load` })
  if (facts.imgNoAlt) problems.push({ route, kind: 'img-no-alt', msg: `${facts.imgNoAlt} image(s) without alt` })
}

await browser.close()

if (problems.length === 0) {
  console.log(`OK — ${ROUTES.length} routes rendered with no console/page errors and no horizontal scroll.`)
} else {
  console.log(`${problems.length} problem(s):`)
  for (const p of problems) console.log(`  [${p.kind}] ${p.route} — ${p.msg}`)
  process.exitCode = 1
}
