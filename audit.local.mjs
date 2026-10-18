import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const BASE = 'http://localhost:5173/'
const OUT = 'C:/Users/OMAR/AppData/Local/Temp/opencode/shots'
fs.mkdirSync(OUT, { recursive: true })

const widths = [320, 360, 375, 390, 414, 768, 1024, 1280, 1440]
const routes = ['', '#/products', '#/product/p015', '#/categories', '#/cart']

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const report = []

for (const w of widths) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 })
  for (const r of routes) {
    await page.goto(BASE + r, { waitUntil: 'networkidle0' })
    await new Promise((s) => setTimeout(s, 300))
    const res = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth
      const doc = document.documentElement.scrollWidth
      const over = []
      document.querySelectorAll('body *').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.width === 0 && rect.height === 0) return
        if (rect.right > vw + 1 || rect.left < -1) {
          const cs = getComputedStyle(el)
          if (cs.position === 'fixed') return
          over.push({
            sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
          })
        }
      })
      return { vw, doc, scroll: window.scrollX, over: over.slice(0, 12) }
    })
    if (res.doc > res.vw + 1 || res.over.length) {
      report.push({ width: w, route: r || '#/', ...res })
    }
  }
  // screenshot home only
  await page.goto(BASE, { waitUntil: 'networkidle0' })
  await new Promise((s) => setTimeout(s, 250))
  await page.screenshot({ path: `${OUT}/home-${w}.png`, fullPage: false })
  await page.close()
}
function r0(r) { return false }

/* ── mobile menu behaviour ── */
const menuTests = []
for (const w of [320, 360, 375, 414, 768, 1024, 1440]) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: 800 })
  await page.goto(BASE, { waitUntil: 'networkidle0' })
  const burgerVisible = await page.evaluate(() => {
    const b = document.querySelector('.header__burger')
    if (!b) return 'MISSING'
    return getComputedStyle(b).display !== 'none'
  })
  const navVisible = await page.evaluate(() => {
    const n = document.querySelector('.nav__list')
    if (!n) return 'MISSING'
    return getComputedStyle(n).display
  })
  const t = { width: w, burgerVisible, navListDisplay: navVisible }
  if (burgerVisible === true) {
    await page.click('.header__burger')
    await new Promise((s) => setTimeout(s, 400))
    t.afterOpen = await page.evaluate(() => {
      const d = document.querySelector('.drawer')
      const p = document.querySelector('.drawer__panel')
      const r = p.getBoundingClientRect()
      const links = [...p.querySelectorAll('a.drawer__link')].map((a) => {
        const ar = a.getBoundingClientRect()
        return { text: a.textContent.trim().slice(0, 24), top: Math.round(ar.top), bottom: Math.round(ar.bottom), h: Math.round(ar.height) }
      })
      const bodyScroll = getComputedStyle(document.body).overflow
      return {
        open: d.classList.contains('is-open'),
        ariaExpanded: document.querySelector('.header__burger').getAttribute('aria-expanded'),
        panelLeft: Math.round(r.left), panelRight: Math.round(r.right),
        panelWidth: Math.round(r.width),
        vw: document.documentElement.clientWidth,
        drawerZ: getComputedStyle(d).zIndex,
        headerZ: getComputedStyle(document.querySelector('.header')).zIndex,
        linkCount: links.length,
        linksInView: links.filter((l) => l.top >= 0 && l.bottom <= window.innerHeight).length,
        bodyOverflow: bodyScroll,
        docScrollWidth: document.documentElement.scrollWidth,
      }
    })
    await page.screenshot({ path: `${OUT}/menu-${w}.png` })
    // click first drawer link -> should navigate + close
    await page.click('.drawer__link')
    await new Promise((s) => setTimeout(s, 500))
    t.afterLinkClick = await page.evaluate(() => ({
      open: document.querySelector('.drawer').classList.contains('is-open'),
      hash: location.hash,
      bodyOverflow: document.body.style.overflow,
      ariaExpanded: document.querySelector('.header__burger').getAttribute('aria-expanded'),
    }))
    // reopen then click backdrop
    await page.click('.header__burger')
    await new Promise((s) => setTimeout(s, 350))
    await page.mouse.click(await page.evaluate(() => window.innerWidth - 20), 400)
    await new Promise((s) => setTimeout(s, 350))
    t.afterBackdropClick = await page.evaluate(() => ({
      open: document.querySelector('.drawer').classList.contains('is-open'),
      bodyOverflow: document.body.style.overflow,
    }))
    // escape
    await page.click('.header__burger')
    await new Promise((s) => setTimeout(s, 350))
    await page.keyboard.press('Escape')
    await new Promise((s) => setTimeout(s, 300))
    t.afterEscape = await page.evaluate(() => ({
      open: document.querySelector('.drawer').classList.contains('is-open'),
      focusIsBurger: document.activeElement === document.querySelector('.header__burger'),
    }))
  }
  menuTests.push(t)
  await page.close()
}

fs.writeFileSync(`${OUT}/report.json`, JSON.stringify({ overflow: report, menu: menuTests }, null, 2))
console.log(JSON.stringify({ overflow: report, menu: menuTests }, null, 2))
await browser.close()
