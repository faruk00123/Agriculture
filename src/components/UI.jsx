import { Link } from 'react-router-dom'
import Icon from './Icon'

/* ── Section heading ── */
export function SectionHeading({ kicker, title, desc, action, align = 'left' }) {
  return (
    <div className={`sec-head sec-head--${align}`}>
      <div className="sec-head__text">
        {kicker && (
          <span className="kicker">
            <Icon name="leaf" size={14} /> {kicker}
          </span>
        )}
        <h2>{title}</h2>
        {desc && <p>{desc}</p>}
      </div>
      {action && <div className="sec-head__action">{action}</div>}
    </div>
  )
}

/* ── Buttons ── */
export function BtnLink({ to, variant = 'orange', children, className = '', ...rest }) {
  return (
    <Link to={to} className={`btn btn--${variant} ${className}`} {...rest}>
      {children}
    </Link>
  )
}

/* ── Quantity stepper ── */
export function QtyStepper({ value, onChange, min = 1, max = 99, label = 'পরিমাণ' }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="পরিমাণ কমান"
      >
        <Icon name="minus" size={16} />
      </button>
      <input
        className="qty__value"
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value)
          if (Number.isFinite(n)) onChange(Math.min(max, Math.max(min, Math.floor(n))))
        }}
        aria-label={label}
      />
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="পরিমাণ বাড়ান"
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  )
}

/* ── Stock chip ── */
export function StockChip({ stock }) {
  if (stock === 'out') return <span className="stock stock--out">স্টক শেষ</span>
  if (stock === 'low') return <span className="stock stock--low">স্টক সীমিত</span>
  return <span className="stock stock--in">স্টকে আছে</span>
}

/* ── Demo badge ── */
export function DemoBadge({ small = false }) {
  return (
    <span className={`demo-badge${small ? ' demo-badge--sm' : ''}`} title="কাল্পনিক প্রদর্শন ডেটা">
      ডেমো ডেটা
    </span>
  )
}

/* ── Page hero (inner pages) ── */
export function PageHero({ title, desc, icon = 'leaf', crumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="crumbs" aria-label="ব্রেডক্রাম্ব">
            <Link to="/">হোম</Link>
            {crumbs.map((c) => (
              <span key={c.label}>
                <Icon name="chevronRight" size={13} />
                {c.to ? <Link to={c.to}>{c.label}</Link> : <em>{c.label}</em>}
              </span>
            ))}
          </nav>
        )}
        <div className="page-hero__row">
          <div>
            <h1>{title}</h1>
            {desc && <p>{desc}</p>}
          </div>
          <span className="page-hero__ico">
            <Icon name={icon} size={34} />
          </span>
        </div>
      </div>
    </section>
  )
}

/* ── Empty state ── */
export function EmptyState({ icon = 'package', title, desc, action }) {
  return (
    <div className="empty">
      <span className="empty__ico">
        <Icon name={icon} size={34} />
      </span>
      <h3>{title}</h3>
      {desc && <p>{desc}</p>}
      {action}
    </div>
  )
}

/* ── Callout boxes ── */
export function Note({ tone = 'harvest', icon = 'info', children }) {
  return (
    <div className={`note note--${tone}`} role="note">
      <Icon name={icon} size={18} />
      <div>{children}</div>
    </div>
  )
}

export default SectionHeading
