/**
 * Dev-only helper: find className tokens used in JSX that never make it into
 * the compiled stylesheet. Such tokens are either dead legacy class names or
 * classes purged by Tailwind — both worth reviewing.
 *
 * Usage: node scripts/check-classes.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const DIST = join(ROOT, 'dist', 'assets')

const files = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(jsx?|tsx?)$/.test(name)) files.push(p)
  }
}
walk(SRC)

const cssFile = readdirSync(DIST).find((f) => f.endsWith('.css'))
const css = readFileSync(join(DIST, cssFile), 'utf8')

const used = new Map() // token -> Set(files)
const addTokens = (raw, file) => {
  // Template holes (`${expr}`) produce partial tokens such as `btn--`;
  // replace each hole with a marker and drop any token that touches it.
  const marked = raw.replace(/\$\{[^}]*\}/g, '\u0000')
  marked
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t && !t.includes('\u0000'))
    .forEach((t) => {
      if (!used.has(t)) used.set(t, new Set())
      used.get(t).add(relative(ROOT, file))
    })
}

for (const file of files) {
  const text = readFileSync(file, 'utf8')
  // className="a b c"  |  className={'a b'}
  for (const m of text.matchAll(/className\s*=\s*(["'])([^"']*)\1/g)) addTokens(m[2], file)
  // className={`a b ${x} c`}
  for (const m of text.matchAll(/className\s*=\s*\{`([^`]*)`\}/g)) addTokens(m[1], file)
}

// does the compiled CSS contain this class as a selector?
// Tailwind escapes special characters (`.`, `/`, `:`, `[`, …) with a
// backslash inside selectors, so allow an optional backslash before each.
const inCss = (token) => {
  const pattern = token
    .split('')
    .map((ch) => (/[A-Za-z0-9_-]/.test(ch) ? ch : `\\\\?${ch.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}`))
    .join('')
  return new RegExp(`\\.${pattern}(?![\\w-])`).test(css)
}

const missing = [...used.entries()].filter(([t]) => !inCss(t))

if (missing.length === 0) {
  console.log('OK — every static className token is present in the built CSS.')
} else {
  console.log(`Potentially undefined / purged classes (${missing.length}):\n`)
  for (const [token, where] of missing.sort()) {
    console.log(`  ${token}   ← ${[...where].join(', ')}`)
  }
}
