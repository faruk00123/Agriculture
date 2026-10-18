/**
 * Product artwork renderer. Keeps SVG fallback but allows using image URLs
 * from data (imageUrl) for realistic photographic product images.
 */
const C = {
  deep: '#083D32',
  dark: '#0B5D45',
  mid: '#168E5A',
  cream: '#FFF8EC',
  lime: '#D5F36A',
  orange: '#FF9F1C',
  white: '#FFFFFF',
}

const Label = ({ x, y, w, h, accent = C.lime }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="4" fill={C.cream} />
    <rect x={x} y={y} width={w} height={Math.max(5, h * 0.2)} rx="2" fill={accent} />
    <path
      d={`M${x + w / 2} ${y + h * 0.8}c0-6 4-10 11-11 1 7-4 11-11 11Z`}
      fill={C.mid}
      transform={`translate(${-5} ${-2})`}
    />
    <path d={`M${x + w / 2 - 4} ${y + h * 0.78}c3-3 6-5 9-6`} stroke={C.dark} strokeWidth="1.2" fill="none" strokeLinecap="round" />
  </g>
)

const Shadow = () => <ellipse cx="60" cy="107" rx="26" ry="5" fill="#0B5D45" opacity="0.12" />

const ART = {
  bottle: (
    <g>
      <Shadow />
      <rect x="53" y="14" width="14" height="11" rx="2.5" fill={C.deep} />
      <rect x="56" y="23" width="8" height="12" fill={C.dark} />
      <rect x="44" y="33" width="32" height="70" rx="10" fill={C.dark} />
      <rect x="48" y="40" width="5" height="20" rx="2.5" fill={C.white} opacity="0.2" />
      <Label x="44" y="56" w="32" h="32" />
    </g>
  ),
  jerrycan: (
    <g>
      <Shadow />
      <rect x="42" y="12" width="26" height="10" rx="5" fill={C.deep} />
      <rect x="44" y="18" width="7" height="18" fill={C.deep} />
      <rect x="66" y="20" width="16" height="14" rx="4" fill={C.deep} />
      <rect x="34" y="34" width="52" height="68" rx="8" fill={C.dark} />
      <rect x="38" y="40" width="6" height="16" rx="3" fill={C.white} opacity="0.18" />
      <Label x="34" y="56" w="52" h="32" />
    </g>
  ),
  sachet: (
    <g>
      <Shadow />
      <rect x="36" y="24" width="48" height="74" rx="4" fill={C.mid} />
      <rect x="33" y="17" width="54" height="12" rx="3" fill={C.deep} />
      <rect x="33" y="93" width="54" height="12" rx="3" fill={C.deep} />
      <path d="M33 29h54M33 93h54" stroke={C.lime} strokeWidth="1.6" strokeDasharray="4 4" />
      <Label x="41" y="42" w="38" h="34" />
    </g>
  ),
  granule: (
    <g>
      <Shadow />
      <path d="M40 28l4-10h32l4 10Z" fill={C.deep} />
      <rect x="34" y="26" width="52" height="76" rx="6" fill={C.dark} />
      <Label x="41" y="36" w="38" h="24" />
      <rect x="41" y="66" width="38" height="30" rx="4" fill={C.cream} />
      <circle cx="50" cy="76" r="4" fill={C.lime} />
      <circle cx="62" cy="84" r="4.5" fill={C.mid} />
      <circle cx="72" cy="74" r="3.5" fill={C.orange} />
      <circle cx="57" cy="70" r="3" fill={C.mid} />
    </g>
  ),
  jar: (
    <g>
      <Shadow />
      <rect x="41" y="14" width="38" height="13" rx="4" fill={C.deep} />
      <rect x="39" y="27" width="42" height="75" rx="9" fill={C.mid} />
      <rect x="43" y="34" width="5" height="16" rx="2.5" fill={C.white} opacity="0.2" />
      <Label x="39" y="46" w="42" h="30" />
      <rect x="45" y="82" width="30" height="14" rx="4" fill={C.cream} />
      <circle cx="53" cy="89" r="3" fill={C.orange} />
      <circle cx="62" cy="87" r="2.6" fill={C.lime} />
      <circle cx="69" cy="91" r="2.4" fill={C.mid} />
    </g>
  ),
  bag: (
    <g>
      <Shadow />
      <path d="M41 28l4-10h30l4 10Z" fill={C.deep} />
      <path d="M36 28h48l4 68a8 8 0 0 1-8 9H40a8 8 0 0 1-8-9Z" fill={C.dark} />
      <path d="M34 44h52" stroke={C.lime} strokeWidth="2" strokeDasharray="6 5" />
      <Label x="41" y="54" w="38" h="34" />
      <path d="M46 94h28" stroke={C.mid} strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  sack: (
    <g>
      <Shadow />
      <rect x="51" y="16" width="18" height="9" rx="4" fill={C.deep} />
      <path d="M38 36c0-7 8-11 22-11s22 4 22 11l-4 64a8 8 0 0 1-8 7H50a8 8 0 0 1-8-7Z" fill={C.mid} />
      <path d="M44 30c5-4 27-4 32 0" stroke={C.deep} strokeWidth="3" fill="none" strokeLinecap="round" />
      <Label x="43" y="54" w="34" h="32" />
    </g>
  ),
  'small-bottle': (
    <g>
      <Shadow />
      <rect x="54" y="20" width="13" height="11" rx="2.5" fill={C.deep} />
      <rect x="57" y="29" width="7" height="9" fill={C.dark} />
      <rect x="46" y="37" width="29" height="65" rx="8" fill={C.mid} />
      <rect x="50" y="43" width="4" height="14" rx="2" fill={C.white} opacity="0.22" />
      <Label x="46" y="58" w="29" h="26" />
      <circle cx="53" cy="92" r="3" fill={C.lime} />
      <circle cx="63" cy="94" r="3" fill={C.lime} />
      <circle cx="68" cy="88" r="2.4" fill={C.lime} />
    </g>
  ),
  can: (
    <g>
      <Shadow />
      <path d="M50 34c0-9 4-14 10-14s10 5 10 14" stroke={C.deep} strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="36" y="30" width="48" height="9" rx="3" fill={C.deep} />
      <rect x="38" y="37" width="44" height="65" rx="6" fill={C.dark} />
      <rect x="42" y="44" width="6" height="16" rx="3" fill={C.white} opacity="0.18" />
      <Label x="38" y="58" w="44" h="32" />
      <path d="M60 74c3 3.4 4.8 5.6 4.8 7.8a4.8 4.8 0 0 1-9.6 0c0-2.2 1.8-4.4 4.8-7.8Z" fill={C.mid} />
    </g>
  ),
  'soil-bag': (
    <g>
      <Shadow />
      <path d="M41 30l4-10h30l4 10Z" fill={C.deep} />
      <path d="M36 28h48l4 68a8 8 0 0 1-8 9H40a8 8 0 0 1-8-9Z" fill={C.dark} />
      <rect x="42" y="50" width="36" height="46" rx="5" fill={C.cream} />
      <path d="M44 96c3-13 9-20 16-20s13 7 16 20Z" fill={C.deep} />
      <path d="M60 74V62" stroke={C.mid} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 68c-5 0-8-3-8-8 5 0 8 3 8 8Z" fill={C.mid} />
      <path d="M60 65c0-4 3-7 8-7 0 4-3 7-8 7Z" fill={C.lime} />
      <rect x="42" y="40" width="36" height="7" rx="3" fill={C.lime} />
    </g>
  ),
  'rice-packet': (
    <g>
      <Shadow />
      <path d="M37 26h46a4 4 0 0 1 4 4v72a4 4 0 0 1-4 4H37a4 4 0 0 1-4-4V30a4 4 0 0 1 4-4Z" fill={C.dark} />
      <circle cx="60" cy="34" r="4" fill={C.cream} />
      <rect x="40" y="44" width="40" height="18" rx="3" fill={C.cream} />
      <path d="M60 47v12M55 50c3 0 5 2 5 5-3 0-5-2-5-5ZM65 50c-3 0-5 2-5 5 3 0 5-2 5-5Z" stroke={C.dark} strokeWidth="1.4" fill="none" />
      <rect x="42" y="68" width="36" height="30" rx="4" fill={C.cream} />
      <ellipse cx="52" cy="78" rx="3.4" ry="5.4" fill={C.lime} transform="rotate(-20 52 78)" />
      <ellipse cx="63" cy="84" rx="3.4" ry="5.4" fill={C.lime} transform="rotate(15 63 84)" />
      <ellipse cx="70" cy="75" rx="3" ry="4.8" fill={C.lime} transform="rotate(-8 70 75)" />
      <ellipse cx="54" cy="91" rx="3" ry="4.6" fill={C.lime} transform="rotate(25 54 91)" />
    </g>
  ),
  'veg-packet': (
    <g>
      <Shadow />
      <path d="M37 26h46a4 4 0 0 1 4 4v72a4 4 0 0 1-4 4H37a4 4 0 0 1-4-4V30a4 4 0 0 1 4-4Z" fill={C.mid} />
      <circle cx="60" cy="34" r="4" fill={C.cream} />
      <rect x="40" y="44" width="40" height="16" rx="3" fill={C.cream} />
      <path d="M46 52h28" stroke={C.mid} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="60" cy="83" r="15" fill={C.orange} />
      <path d="m53 70 7 3 7-3-3 6h-8Z" fill={C.mid} />
      <path d="M60 70v-4" stroke={C.deep} strokeWidth="2.4" strokeLinecap="round" />
    </g>
  ),
  'corn-bag': (
    <g>
      <Shadow />
      <path d="M41 30l4-10h30l4 10Z" fill={C.deep} />
      <path d="M36 28h48l4 68a8 8 0 0 1-8 9H40a8 8 0 0 1-8-9Z" fill={C.orange} />
      <rect x="42" y="44" width="36" height="8" rx="4" fill={C.cream} />
      <path d="M60 56c6 4.4 9.5 10.6 9.5 17.6S66 86 60 90.4c-6-4.4-9.5-10.6-9.5-17.6S54 60.4 60 56Z" fill={C.lime} />
      <path d="M55 64h10M54 71h12M55 78h10M60 58v31" stroke={C.deep} strokeWidth="1.4" />
      <path d="M44 60c-2 6-1 12 3 17" stroke={C.cream} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  knapsack: (
    <g>
      <Shadow />
      <path d="M42 36c-7 9-7 30 0 40" stroke={C.deep} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M78 36c7 9 7 30 0 40" stroke={C.deep} strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="45" y="20" width="30" height="11" rx="4" fill={C.deep} />
      <rect x="32" y="28" width="56" height="66" rx="12" fill={C.mid} />
      <rect x="37" y="36" width="7" height="22" rx="3.5" fill={C.white} opacity="0.2" />
      <rect x="36" y="86" width="48" height="9" rx="4" fill={C.deep} />
      <rect x="44" y="50" width="32" height="24" rx="4" fill={C.cream} />
      <path d="M60 56v12M55 62h10" stroke={C.mid} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M88 58c8 2 10 8 10 16v6" stroke={C.deep} strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="94" y="80" width="18" height="7" rx="3.5" fill={C.deep} />
      <path d="M112 78l6-3m-6 9 6 3" stroke={C.lime} strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  'hand-sprayer': (
    <g>
      <Shadow />
      <path d="M46 48h30V34h-9l-4-8H50a5 5 0 0 0-5 5v13Z" fill={C.deep} />
      <rect x="74" y="26" width="14" height="7" rx="3" fill={C.deep} />
      <circle cx="94" cy="24" r="3" fill={C.lime} />
      <circle cx="103" cy="30" r="2.4" fill={C.lime} />
      <circle cx="97" cy="35" r="2" fill={C.lime} />
      <rect x="44" y="47" width="32" height="55" rx="9" fill={C.mid} />
      <rect x="48" y="53" width="5" height="14" rx="2.5" fill={C.white} opacity="0.2" />
      <Label x="44" y="68" w="32" h="26" />
    </g>
  ),
  nozzle: (
    <g>
      <Shadow />
      <path d="M44 38h30l12 20-12 20H44L32 58Z" fill={C.dark} />
      <circle cx="59" cy="58" r="10" fill={C.cream} />
      <circle cx="59" cy="58" r="4.5" fill={C.deep} />
      <path d="M88 48 110 36M88 55l22-6M88 61h22M88 67l22 6M88 74l20 12" stroke={C.mid} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="106" cy="27" r="3" fill={C.lime} />
      <circle cx="114" cy="70" r="3" fill={C.lime} />
    </g>
  ),
  ppe: (
    <g>
      <Shadow />
      <path d="M34 54c0-9 12-14 26-14s26 5 26 14v10c0 13-12 24-26 24S34 77 34 64Z" fill={C.cream} stroke={C.dark} strokeWidth="3" />
      <path d="M34 56 22 48M86 56l12-8M34 68l-12 8M86 68l12 8" stroke={C.dark} strokeWidth="3" strokeLinecap="round" />
      <path d="M38 60h44M38 68h44" stroke={C.dark} strokeWidth="2.4" />
      <circle cx="60" cy="76" r="7" fill={C.lime} stroke={C.dark} strokeWidth="2.4" />
    </g>
  ),
  glove: (
    <g>
      <Shadow />
      <g opacity="0.45" transform="translate(18 -6)">
        <path d="M44 100V70l-7-10a6 6 0 1 1 10-6l5 7V48a6 6 0 0 1 12 0v12V44a6 6 0 0 1 12 0v30a26 26 0 0 1-12 24Z" fill={C.dark} />
      </g>
      <path d="M44 102V72l-7-10a6 6 0 1 1 10-6l5 7V50a6 6 0 0 1 12 0v14V46a6 6 0 0 1 12 0v32a26 26 0 0 1-12 24Z" fill={C.mid} />
      <rect x="36" y="96" width="44" height="12" rx="5" fill={C.deep} />
      <path d="M46 84h30" stroke={C.cream} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="5 5" />
    </g>
  ),
  drip: (
    <g>
      <Shadow />
      <circle cx="58" cy="62" r="32" fill="none" stroke={C.dark} strokeWidth="6" />
      <circle cx="58" cy="62" r="22" fill="none" stroke={C.dark} strokeWidth="5" />
      <circle cx="58" cy="62" r="12" fill="none" stroke={C.mid} strokeWidth="5" />
      <circle cx="58" cy="62" r="5" fill={C.lime} />
      <path d="M88 76c8 4 12 10 14 18" stroke={C.dark} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="76" y="44" width="10" height="12" rx="3" fill={C.orange} />
      <path d="M104 60c2.6 3 4 4.8 4 6.6a4 4 0 0 1-8 0c0-1.8 1.4-3.6 4-6.6Z" fill={C.mid} />
      <path d="M30 104h60" stroke={C.deep} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
    </g>
  ),
  tool: (
    <g>
      <Shadow />
      <rect x="34" y="14" width="14" height="9" rx="4" fill={C.deep} />
      <path d="M41 22v44" stroke={C.deep} strokeWidth="6" strokeLinecap="round" />
      <path d="M31 64h20v14a10 10 0 0 1-20 0Z" fill={C.dark} />
      <rect x="72" y="14" width="14" height="9" rx="4" fill={C.deep} />
      <path d="M79 22v40" stroke={C.deep} strokeWidth="6" strokeLinecap="round" />
      <path d="M70 62v30M79 62v34M88 62v30" stroke={C.dark} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M67 64h24" stroke={C.dark} strokeWidth="5.5" strokeLinecap="round" />
    </g>
  ),
}

export function ProductArt({ type, className = '', imageUrl, alt = '' }) {
  const art = ART[type] || ART.bag
  const hasImg = imageUrl && typeof imageUrl === 'string' && imageUrl.trim().length > 0

  if (hasImg) {
    return (
      <>
        <img
          src={imageUrl}
          alt={alt}
          className={`art art--img ${className}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            const fallback = e.currentTarget.nextElementSibling
            if (fallback && fallback.tagName === 'svg') {
              fallback.style.display = 'block'
            }
          }}
        />
        {/* ছবি লোড না হলে দেখানোর জন্য লুকানো SVG ফলব্যাক */}
        <svg viewBox="0 0 120 120" className={`art ${className}`} role="presentation" focusable="false" style={{ display: 'none' }}>
          {art}
        </svg>
      </>
    )
  }

  return (
    <svg viewBox="0 0 120 120" className={`art ${className}`} role="presentation" focusable="false">
      {art}
    </svg>
  )
}

export default ProductArt
