import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products, productBrands } from '../data/products'
import { mainCategories, subCategories, allCategoryOptions } from '../data/categories'
import { crops, problems } from '../data/content'
import { formatPrice } from '../config/brand'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'
import { PageHero, EmptyState, Note, SectionHeading } from '../components/UI'

const SORTS = [
  { value: 'default', label: 'স্বাভাবিক সাজানো' },
  { value: 'price-asc', label: 'দাম: কম থেকে বেশি' },
  { value: 'price-desc', label: 'দাম: বেশি থেকে কম' },
  { value: 'name', label: 'নাম (ক → য)' },
  { value: 'newest', label: 'নতুন প্রথমে' },
  { value: 'rating', label: 'রেটিং (ডেমো)' },
]

const PRICE_BANDS = [
  { label: '৳৫০০ পর্যন্ত', min: '', max: '500' },
  { label: '৳৫০০ – ৳১০০০', min: '500', max: '1000' },
  { label: '৳১০০০ – ৳৩০০০', min: '1000', max: '3000' },
  { label: '৳৩০০০+', min: '3000', max: '' },
]

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [panelOpen, setPanelOpen] = useState(false)

  const q = params.get('q') || ''
  const cat = params.get('cat') || ''
  const sub = params.get('sub') || ''
  const brandF = params.get('brand') || ''
  const crop = params.get('crop') || ''
  const problem = params.get('problem') || ''
  const tag = params.get('tag') || ''
  const min = params.get('min') || ''
  const max = params.get('max') || ''
  const sort = params.get('sort') || 'default'
  const [searchText, setSearchText] = useState(q)

  useEffect(() => setSearchText(q), [q])

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const clearAll = () => setParams(new URLSearchParams(), { replace: true })

  const activeCount = [q, cat, sub, brandF, crop, problem, tag, min, max].filter(Boolean).length

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    let out = products.filter((p) => {
      if (term) {
        const subTitle = subCategories.find((s) => s.slug === p.subcategory)?.titleBn || ''
        const hay = `${p.name} ${p.brand} ${p.pack} ${subTitle}`.toLowerCase()
        if (!hay.includes(term)) return false
      }
      if (cat && p.category !== cat && p.subcategory !== cat) return false
      if (sub && p.subcategory !== sub) return false
      if (brandF && p.brand !== brandF) return false
      if (crop && !p.crops.includes(crop)) return false
      if (problem && !p.problems.includes(problem)) return false
      if (tag && !p.tags.includes(tag)) return false
      if (min && p.price < Number(min)) return false
      if (max && p.price > Number(max)) return false
      return true
    })

    out = [...out]
    if (sort === 'price-asc') out.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') out.sort((a, b) => b.price - a.price)
    else if (sort === 'name') out.sort((a, b) => a.name.localeCompare(b.name, 'bn'))
    else if (sort === 'newest') out.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
    else if (sort === 'rating') out.sort((a, b) => b.rating - a.rating)
    else out.sort((a, b) => b.reviews - a.reviews)
    return out
  }, [q, cat, sub, brandF, crop, problem, tag, min, max, sort])

  const catLabel = cat ? allCategoryOptions.find((c) => c.slug === cat)?.titleBn : ''
  const crumbTitle = catLabel || (q ? `“${q}” এর ফলাফল` : 'সকল পণ্য')

  const chips = [
    q && { key: 'q', label: `অনুসন্ধান: ${q}` },
    cat && { key: 'cat', label: `ক্যাটাগরি: ${catLabel}` },
    sub && { key: 'sub', label: `সাব: ${subCategories.find((s) => s.slug === sub)?.titleBn || sub}` },
    brandF && { key: 'brand', label: `ব্র্যান্ড: ${brandF}` },
    crop && { key: 'crop', label: `ফসল: ${crops.find((c) => c.slug === crop)?.titleBn || crop}` },
    problem && { key: 'problem', label: `সমস্যা: ${problems.find((p) => p.slug === problem)?.titleBn || problem}` },
    tag && { key: 'tag', label: 'ডেমো অফার' },
    min && { key: 'min', label: `সর্বনিম্ন ${formatPrice(min)}` },
    max && { key: 'max', label: `সর্বোচ্চ ${formatPrice(max)}` },
  ].filter(Boolean)

  return (
    <>
      <PageHero
        title={crumbTitle}
        desc="নাম, ক্যাটাগরি, ব্র্যান্ড, ফসল ও দামের ভিত্তিতে ফিল্টার করুন — সবই স্থানীয় ডেমো ডেটা।"
        icon="grid"
        crumbs={[{ label: 'সকল পণ্য' }]}
      />

      <section className="section section--tight">
        <div className="container">
          {/* ── Toolbar ── */}
          <div className="catalog__bar">
            <button
              type="button"
              className="btn btn--ghost btn--sm relative lg:hidden"
              aria-expanded={panelOpen}
              aria-controls="filter-panel"
              onClick={() => setPanelOpen((v) => !v)}
            >
              <Icon name="filter" size={17} /> ফিল্টার
              {activeCount > 0 && <span className="badge badge--orange">{activeCount}</span>}
            </button>

            <p className="catalog__count" role="status">
              <strong>{list.length}</strong> টি পণ্য পাওয়া গেছে
            </p>

            <label className="catalog__sort">
              <span>সাজানো:</span>
              <select value={sort} onChange={(e) => setParam('sort', e.target.value === 'default' ? '' : e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {chips.length > 0 && (
            <div className="chipRow">
              {chips.map((c) => (
                <button key={c.key} type="button" className="chip chip--removable" onClick={() => setParam(c.key, '')}>
                  {c.label} <Icon name="close" size={13} />
                </button>
              ))}
              <button type="button" className="chip chip--clear" onClick={clearAll}>
                সব ফিল্টার মুছুন
              </button>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
            {/* ── Filters ── */}
            <aside
              id="filter-panel"
              className={`filters h-fit${panelOpen ? ' is-open' : ''} lg:sticky lg:top-4`}
              aria-label="পণ্য ফিল্টার"
            >
              <form
                className="flex flex-col gap-3 p-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  const term = searchText.trim()
                  term ? setParam('q', term) : setParam('q', '')
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="flex items-center gap-1.5 text-[1.05rem]">
                    <Icon name="filter" size={17} /> ফিল্টার
                  </h2>
                  <button type="button" className="link-btn lg:hidden" onClick={() => setPanelOpen(false)}>
                    বন্ধ করুন
                  </button>
                  {activeCount > 0 && (
                    <button type="button" className="link-btn" onClick={clearAll}>
                      মুছুন
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="filter-label" htmlFor="f-search">
                    পণ্যের নাম
                  </label>
                  <div className="filter-search">
                    <input
                      id="f-search"
                      type="search"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="যেমন: সার, স্প্রেয়ার…"
                    />
                    <button type="submit" className="btn btn--green btn--sm shrink-0">
                      খুঁজুন
                    </button>
                  </div>
                </div>

                <div className="filter-group">
                  <label className="filter-label" htmlFor="f-cat">
                    ক্যাটাগরি
                  </label>
                  <select
                    id="f-cat"
                    value={cat}
                    onChange={(e) => {
                      const v = e.target.value
                      const next = new URLSearchParams(params)
                      v ? next.set('cat', v) : next.delete('cat')
                      next.delete('sub')
                      setParams(next, { replace: true })
                    }}
                  >
                    <option value="">সব ক্যাটাগরি</option>
                    {mainCategories.map((c) => (
                      <optgroup key={c.slug} label={c.titleBn}>
                        <option value={c.slug}>সব — {c.titleBn}</option>
                        {subCategories
                          .filter((s) => s.parent === c.slug)
                          .map((s) => (
                            <option key={s.slug} value={s.slug}>
                              &nbsp;&nbsp;— {s.titleBn}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label" htmlFor="f-brand">
                    ব্র্যান্ড
                  </label>
                  <select id="f-brand" value={brandF} onChange={(e) => setParam('brand', e.target.value)}>
                    <option value="">সব ব্র্যান্ড</option>
                    {productBrands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label" htmlFor="f-crop">
                    ফসল
                  </label>
                  <select id="f-crop" value={crop} onChange={(e) => setParam('crop', e.target.value)}>
                    <option value="">সব ফসল</option>
                    {crops.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.titleBn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <span className="filter-label">দামের রেঞ্জ (৳)</span>
                  <div className="filter-price">
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={min}
                      onChange={(e) => setParam('min', e.target.value)}
                      placeholder="থেকে"
                      aria-label="সর্বনিম্ন দাম"
                    />
                    <span>—</span>
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={max}
                      onChange={(e) => setParam('max', e.target.value)}
                      placeholder="পর্যন্ত"
                      aria-label="সর্বোচ্চ দাম"
                    />
                  </div>
                  <div className="filter-bands">
                    {PRICE_BANDS.map((b) => {
                      const on = min === b.min && max === b.max
                      return (
                        <button
                          key={b.label}
                          type="button"
                          className={`chip${on ? ' is-on' : ''}`}
                          onClick={() => {
                            const next = new URLSearchParams(params)
                            b.min ? next.set('min', b.min) : next.delete('min')
                            b.max ? next.set('max', b.max) : next.delete('max')
                            setParams(next, { replace: true })
                          }}
                        >
                          {b.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="filter-group">
                  <label className="filter-label" htmlFor="f-sort">
                    সাজানো
                  </label>
                  <select
                    id="f-sort"
                    value={sort}
                    onChange={(e) => setParam('sort', e.target.value === 'default' ? '' : e.target.value)}
                  >
                    {SORTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="button" className="btn btn--ghost btn--sm" onClick={clearAll}>
                  সব ফিল্টার মুছুন
                </button>
              </form>
            </aside>

            {/* ── Results ── */}
            <div className="flex min-w-0 flex-col gap-4">
              {list.length === 0 ? (
                <EmptyState
                  icon="search"
                  title="কোনো পণ্য পাওয়া যায়নি"
                  desc="ফিল্টার বা অনুসন্ধানের শব্দ পরিবর্তন করে আবার চেষ্টা করুন।"
                  action={
                    <button type="button" className="btn btn--orange" onClick={clearAll}>
                      সব ফিল্টার মুছুন
                    </button>
                  }
                />
              ) : (
                <div className="product-grid product-grid--3">
                  {list.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}

              {list.length > 0 && (
                <p className="catalog__foot">
                  মোট {list.length} / {products.length} টি ডেমো পণ্য দেখানো হচ্ছে।
                </p>
              )}
            </div>
          </div>

          <div className="catalog__note">
            <Note tone="sky" icon="info">
              সকল দাম, স্টক, ছাড় ও রেটিউ কাল্পনিক ডেমো ডেটা। কোনো পণ্যের নিবন্ধন বা নির্দেশনার দাবি নেই।
            </Note>
          </div>
        </div>
      </section>

      {/* SEO-ish helpful links */}
      <section className="section section--tight section--tint">
        <div className="container">
          <SectionHeading kicker="দ্রুত প্রবেশ" title="জনপ্রিয় ফিল্টার" />
          <div className="quickLinks">
            {mainCategories.map((c) => (
              <Link key={c.slug} to={`/products?cat=${c.slug}`} className={`quickLink tone-${c.tone}`}>
                <Icon name={c.icon} size={20} />
                {c.titleBn}
              </Link>
            ))}
            {['insecticide', 'fungicide', 'herbicide', 'organic-fertilizer', 'micronutrient', 'rice-seed', 'sprayer', 'irrigation'].map(
              (slug) => {
                const s = subCategories.find((x) => x.slug === slug)
                if (!s) return null
                return (
                  <Link key={slug} to={`/products?cat=${s.parent}&sub=${slug}`} className={`quickLink tone-${s.tone}`}>
                    <Icon name={s.icon} size={18} />
                    {s.titleBn}
                  </Link>
                )
              }
            )}
            <Link to="/products?tag=sale" className="quickLink tone-coral">
              <Icon name="tag" size={18} /> ডেমো অফার
            </Link>
            <Link to="/products?sort=newest" className="quickLink tone-lavender">
              <Icon name="package" size={18} /> নতুন পণ্য
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
