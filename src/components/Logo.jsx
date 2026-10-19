import { Link } from 'react-router-dom'
import { brand } from '../config/brand'

/**
 * Brand mark: an "O" ring (owner's initial) broken by a leaf,
 * with a sprout growing inside — original concept for KrishiProhori.
 * variant: 'light' (for light backgrounds) | 'dark' (for deep green surfaces)
 */
export function LogoMark({ size = 44, variant = 'light', className = '' }) {
  const c =
    variant === 'dark'
      ? { ring: '#FFF8EC', leaf: '#D5F36A', rib: '#083D32', stem: '#FFF8EC', leafL: '#D5F36A', leafR: '#168E5A', bud: '#D5F36A' }
      : { ring: '#0B5D45', leaf: '#168E5A', rib: '#D5F36A', stem: '#0B5D45', leafL: '#168E5A', leafR: '#0B5D45', bud: '#D5F36A' }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`h-auto w-auto shrink-0 ${className}`}
      role="img"
      aria-label={`${brand.name} logo`}
    >
      <path d="M45.19 14.16 A23 23 0 1 0 54.78 29.8" fill="none" stroke={c.ring} strokeWidth="7" strokeLinecap="round" />
      <path d="M45.19 14.16 Q61 15 54.78 29.8 Q48 22 45.19 14.16 Z" fill={c.leaf} />
      <path d="M47.2 17.8 Q53.4 21.2 53.4 26.8" fill="none" stroke={c.rib} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 46 V30.5" fill="none" stroke={c.stem} strokeWidth="4" strokeLinecap="round" />
      <path d="M32 37.5 C27 37.5 23.5 34 22.5 29 C27.5 28 31 32 32 37.5 Z" fill={c.leafL} />
      <path d="M32 43 C37 43 40.5 39.5 41.5 34.5 C36.5 33.5 33 37.5 32 43 Z" fill={c.leafR} />
      <circle cx="32" cy="28.5" r="3.2" fill={c.bud} />
    </svg>
  )
}

/**
 * Horizontal logo: mark + Bengali wordmark + English wordmark.
 * The owner's name is deliberately NOT part of the wordmark.
 */
export default function Logo({
  variant = 'light',
  size = 44,
  showEnglish = true,
  className = '',
  englishClass = '',
  to = '/',
}) {
  return (
    <Link
      to={to}
      className={`flex shrink-0 items-center gap-2 ${variant === 'dark' ? 'text-[#FFF8EC]' : 'text-green700'} ${className}`}
      aria-label={`${brand.nameBn} — হোম`}
    >
      <LogoMark size={size} variant={variant} />
      <span className="flex min-w-0 flex-col">
        {/* Bengali script needs a line-height above 1 or the matras/reph get
            clipped by the tight flex row — do not add `truncate` here. */}
        <span className="text-[clamp(1.05rem,1.6vw,1.25rem)] font-extrabold leading-tight tracking-tight">
          {brand.nameBn}
        </span>
        {showEnglish && (
          <span
            className={`hidden font-manrope text-[.7rem] font-extrabold uppercase leading-tight tracking-[.24em] opacity-90 sm:text-[.8rem] ${englishClass}`}
          >
            {brand.name}
          </span>
        )}
      </span>
    </Link>
  )
}
