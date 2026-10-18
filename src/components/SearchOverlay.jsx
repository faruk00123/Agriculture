import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { mainCategories, subCategories } from '../data/categories'
import { formatPrice } from '../config/brand'
import Icon from './Icon'

/** Expanding search panel with live suggestions from local product data. */
export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 40)
      return () => clearTimeout(t)
    }
    setQ('')
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && open && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    const catHit = [...mainCategories, ...subCategories].filter((c) =>
      c.titleBn.toLowerCase().includes(term)
    )
    const prodHit = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.pack.includes(term)
    )
    return [
      ...catHit.slice(0, 3).map((c) => ({ type: 'category', key: c.slug, label: c.titleBn })),
      ...prodHit.slice(0, 6).map((p) => ({ type: 'product', key: p.id, label: p.name, price: p.price, pack: p.pack })),
    ]
  }, [q])

  const submit = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    onClose()
    navigate(`/products?q=${encodeURIComponent(q.trim())}`)
  }

  const go = (item) => {
    onClose()
    if (item.type === 'category') navigate(`/products?cat=${item.key}`)
    else navigate(`/product/${item.key}`)
  }

  if (!open) return null

  return (
    <div className="search-panel" role="dialog" aria-modal="true" aria-label="পণ্য অনুসন্ধান">
      <div className="search-panel__backdrop" onClick={onClose} />
      <div className="search-panel__inner">
        <form className="search-panel__form" onSubmit={submit} role="search">
          <Icon name="search" size={20} className="search-panel__ico" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="পণ্যের নাম, ব্র্যান্ড বা ক্যাটাগরি লিখুন…"
            aria-label="পণ্য অনুসন্ধান"
            className="search-panel__input"
          />
          <button type="submit" className="btn btn--orange btn--sm">
            অনুসন্ধান
          </button>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="অনুসন্ধান বন্ধ করুন">
            <Icon name="close" size={20} />
          </button>
        </form>

        {q.trim() && (
          <div className="search-panel__results">
            {results.length === 0 ? (
              <p className="search-panel__empty">“{q}” এর জন্য কিছু পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।</p>
            ) : (
              <ul>
                {results.map((r) => (
                  <li key={`${r.type}-${r.key}`}>
                    <button type="button" onClick={() => go(r)} className="search-suggestion">
                      <Icon name={r.type === 'category' ? 'grid' : 'package'} size={17} />
                      <span className="search-suggestion__label">
                        {r.label}
                        {r.pack && <em> · {r.pack}</em>}
                      </span>
                      {r.price ? <strong>{formatPrice(r.price)}</strong> : <span className="chip chip--mint">ক্যাটাগরি</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {!q.trim() && (
          <div className="search-panel__hints">
            <span>জনপ্রিয়:</span>
            {['কীটনাশক', 'সার', 'ধানের বীজ', 'স্প্রেয়ার'].map((h) => (
              <button key={h} type="button" className="chip chip--mint" onClick={() => setQ(h)}>
                {h}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
