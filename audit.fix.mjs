import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const BASE = 'http://localhost:5173/'
const OUT = 'C:/Users/OMAR/AppData/Local/Temp/opencode/shots-fixed'
fs.mkdirSync(OUT, { recursive: true })

const widths = [320, 360, 375, 390, 414, 768, 1024, 1280, 1440]
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const report = []
for (const w of widths) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: 900 })
  await page.goto(BASE, { waitUntil: 'networkidle0' })
  await new Promise((s)=>setTimeout(s,250))
  await page.screenshot({ path: `${OUT}/home-${w}.png`, fullPage: false })
  await page.goto(BASE + '#/products', { waitUntil: 'networkidle0' })
  await new Promise((s)=>setTimeout(s,250))
  await page.screenshot({ path: `${OUT}/products-${w}.png`, fullPage: false })
  await page.goto(BASE + '#/product/p015', { waitUntil: 'networkidle0' })
  await new Promise((s)=>setTimeout(s,250))
  await page.screenshot({ path: `${OUT}/pdp-${w}.png`, fullPage: false })
  await page.close()
}

// menu tests
const menu=[]
for(const w of [320,360,375,414]){
  const p=await browser.newPage()
  await p.setViewport({width:w,height:800})
  await p.goto(BASE,{waitUntil:'networkidle0'})
  const burger = await p.$('.header__burger')
  await burger.click()
  await new Promise(s=>setTimeout(s,400))
  const afterOpen=await p.evaluate(()=>{
    const d=document.querySelector('.drawer')
    const p2=document.querySelector('.drawer__panel')
    const r=p2.getBoundingClientRect()
    const vw=document.documentElement.clientWidth
    const doc=document.documentElement.scrollWidth
    return {open:d.classList.contains('is-open'), left:Math.round(r.left), right:Math.round(r.right), vw, doc, bodyO:getComputedStyle(document.body).overflow}
  })
  await p.screenshot({path:`${OUT}/menu-open-${w}.png`})
  const firstLink=await p.$('.drawer__link')
  if(firstLink){ await firstLink.click(); await new Promise(s=>setTimeout(s,400)) }
  const afterLink=await p.evaluate(()=>({open:document.querySelector('.drawer').classList.contains('is-open'), bodyO:getComputedStyle(document.body).overflow, hash:location.hash}))
  menu.push({w,afterOpen,afterLink})
  await p.close()
}
fs.writeFileSync(`${OUT}/menu.json`, JSON.stringify(menu,null,2))
await browser.close()
console.log('ok')
