import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { brand, formatPrice } from '../config/brand'
import { divisions } from '../data/content'
import Icon from '../components/Icon'
import ProductArt from '../components/Art'
import { PageHero, Note, EmptyState, DemoBadge } from '../components/UI'

const EMPTY_FORM = {
  fullName: '',
  phone: '',
  email: '',
  division: '',
  district: '',
  upazila: '',
  address: '',
  notes: '',
}

const required = (v) => v.trim().length > 0

const phoneBangladesh = (v) => {
  const s = v.trim()
  if (!s) return false
  const num = s.replace(/[^\d+]/g, '')
  if (s.startsWith('+')) return /^\+880\d{10}$/.test(num)
  if (s.startsWith('0')) return /^01\d{9}$/.test(s)
  if (s.startsWith('1')) return /^1\d{9}$/.test(s)
  if (s.startsWith('880')) return /^8801\d{9}$/.test(num)
  return /^01\d{9}$/.test(s)
}

const emailLite = (v) => {
  const s = v.trim()
  if (!s) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

export default function Checkout() {
  const navigate = useNavigate()
  const { lines, totals, cartCount, clearCart } = useShop()
  const [form, setForm] = useState(EMPTY_FORM)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const districts = useMemo(() => {
    const d = divisions.find((x) => x.slug === form.division)
    return d ? d.districts : []
  }, [form.division])

  const errors = useMemo(() => {
    const e = {}
    if (!required(form.fullName)) e.fullName = 'পূর্ণ নাম দিতে হবে'
    if (!phoneBangladesh(form.phone)) e.phone = 'বাংলাদেশি ফোন নম্বর সঠিক নয়'
    if (!emailLite(form.email)) e.email = 'ইমেইল ঠিকানা সঠিক নয়'
    if (!required(form.division)) e.division = 'বিভাগ নির্বাচন করতে হবে'
    if (!required(form.district)) e.district = 'জেলা নির্বাচন করতে হবে'
    if (!required(form.upazila)) e.upazila = 'উপজেলা দিতে হবে'
    if (!required(form.address)) e.address = 'বিস্তারিত ঠিকানা দিতে হবে'
    return e
  }, [form])

  const isValid = Object.keys(errors).length === 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value, ...(name === 'division' ? { district: '' } : {}) }))
  }

  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

  const placeDemoOrder = (e) => {
    e.preventDefault()
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      division: true,
      district: true,
      upazila: true,
      address: true,
    })
    if (!isValid) return
    setSubmitted(true)
    setTimeout(() => setForm(EMPTY_FORM), 300)
  }

  if (lines.length === 0 && !submitted) {
    return (
      <>
        <PageHero title="চেকআউট" desc="কার্ট খালি থাকলে চেকআউট সম্ভব নয়।" icon="cart" crumbs={[{ label: 'চেকআউট' }]} />
        <section className="section">
          <div className="container">
            <EmptyState
              icon="cart"
              title="কার্ট খালি"
              desc="প্রথমে কার্টে কিছু পণ্য যোগ করুন।"
              action={
                <Link to="/products" className="btn btn--orange">
                  পণ্য দেখুন
                </Link>
              }
            />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero
        title="চেকআউট (ডেমো)"
        desc="এই ফর্মটি সম্পূর্ণ ব্রাউজারে চলে। কোনো তথ্য সার্ভারে পাঠানো হয় না।"
        icon="shield"
        crumbs={[{ label: 'চেকআউট' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="checkout">
            {/* ── Demo confirmation ── */}
            {submitted ? (
              <div className="checkout__success" role="status">
                <span className="checkout__ok">
                  <Icon name="check" size={30} />
                </span>
                <h1>ডেমো অর্ডার সফলভাবে সম্পন্ন হয়েছে</h1>
                <p>
                  এটি একটি ফ্রন্টএন্ড ডেমো। কোনো প্রকৃত অর্ডার পাঠানো, সংরক্ষণ বা শেয়ার করা হয়নি। কোনো
                  পেমেন্ট গেটওয়ে ব্যবহার করা হয়নি।
                </p>
                <div className="checkout__successActions">
                  <button
                    type="button"
                    className="btn btn--orange"
                    onClick={() => {
                      clearCart()
                      navigate('/products')
                    }}
                  >
                    নতুন করে কেনাকাটা
                  </button>
                  <Link to="/" className="btn btn--ghost">
                    হোমে ফিরে যান
                  </Link>
                </div>
                <Note tone="mint" icon="shield">
                  <strong>{brand.nameBn}:</strong> {brand.ownerLabelBn} · ব্যক্তিগত তথ্য কোথাও সংরক্ষিত হয়নি।
                  <br />
                  এই কনফার্মেশন স্ক্রিনটি শুধু ব্রাউজারে দেখানো হয়েছে।
                </Note>
              </div>
            ) : (
              <>
                <form className="checkout__form" onSubmit={placeDemoOrder} noValidate>
                  {/* Customer */}
                  <fieldset className="cardField">
                    <legend>
                      <Icon name="user" size={18} /> গ্রাহকের তথ্য
                    </legend>
                    <div className="formGrid">
                      <label className={`field${touched.fullName && errors.fullName ? ' has-error' : ''}`}>
                        <span>পূর্ণ নাম *</span>
                        <input
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="যেমন: মোঃ ওমর ফারুক"
                        />
                        {touched.fullName && errors.fullName && <em className="error">{errors.fullName}</em>}
                      </label>

                      <label className={`field${touched.phone && errors.phone ? ' has-error' : ''}`}>
                        <span>ফোন নম্বর *</span>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="যেমন: 01328086411 বা +8801328086411"
                          inputMode="tel"
                        />
                        {touched.phone && errors.phone && <em className="error">{errors.phone}</em>}
                        <small className="help">বাংলাদেশি মোবাইল নম্বর (01xxxxxxxxx)</small>
                      </label>

                      <label className={`field field--full${touched.email && errors.email ? ' has-error' : ''}`}>
                        <span>ইমেইল (ঐচ্ছিক)</span>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="example@gmail.com"
                          inputMode="email"
                        />
                        {touched.email && errors.email && <em className="error">{errors.email}</em>}
                      </label>
                    </div>
                  </fieldset>

                  {/* Address */}
                  <fieldset className="cardField">
                    <legend>
                      <Icon name="location" size={18} /> ডেলিভারি ঠিকানা
                    </legend>
                    <div className="formGrid">
                      <label className={`field${touched.division && errors.division ? ' has-error' : ''}`}>
                        <span>বিভাগ *</span>
                        <select
                          name="division"
                          value={form.division}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">বিভাগ নির্বাচন করুন</option>
                          {divisions.map((d) => (
                            <option key={d.slug} value={d.slug}>
                              {d.titleBn}
                            </option>
                          ))}
                        </select>
                        {touched.division && errors.division && <em className="error">{errors.division}</em>}
                      </label>

                      <label className={`field${touched.district && errors.district ? ' has-error' : ''}`}>
                        <span>জেলা *</span>
                        <select
                          name="district"
                          value={form.district}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!districts.length}
                        >
                          <option value="">জেলা নির্বাচন করুন</option>
                          {districts.map((ds) => (
                            <option key={ds} value={ds}>
                              {ds}
                            </option>
                          ))}
                        </select>
                        {touched.district && errors.district && <em className="error">{errors.district}</em>}
                      </label>

                      <label className={`field${touched.upazila && errors.upazila ? ' has-error' : ''}`}>
                        <span>উপজেলা *</span>
                        <input
                          name="upazila"
                          value={form.upazila}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="যেমন: বরিশাল সদর"
                        />
                        {touched.upazila && errors.upazila && <em className="error">{errors.upazila}</em>}
                      </label>

                      <label className={`field field--full${touched.address && errors.address ? ' has-error' : ''}`}>
                        <span>গ্রাম, এলাকা, বিস্তারিত ঠিকানা *</span>
                        <textarea
                          name="address"
                          rows="2"
                          value={form.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="বাসা নং, রাস্তা, পাড়া ইত্যাদি লিখুন"
                        />
                        {touched.address && errors.address && <em className="error">{errors.address}</em>}
                      </label>

                      <label className="field field--full">
                        <span>অর্ডার নোট (ঐচ্ছিক)</span>
                        <textarea
                          name="notes"
                          rows="1"
                          value={form.notes}
                          onChange={handleChange}
                          placeholder="বিশেষ নির্দেশনা থাকলে লিখুন"
                        />
                      </label>
                    </div>
                  </fieldset>

                  <Note tone="harvest" icon="info">
                    <strong>ফ্রন্টএন্ড ডেমো:</strong> নিচের “ডেমো অর্ডার দিন” বাটনে চাপলে শুধু ব্রাউজারে ডেমো
                    কনফার্মেশন দেখানো হবে। কোনো তথ্য সংরক্ষণ বা পাঠানো হয় না।
                  </Note>

                  <div className="checkout__actions">
                    <Link to="/cart" className="btn btn--ghost">
                      <Icon name="arrowLeft" size={17} /> কার্টে ফিরে যান
                    </Link>
                    <button type="submit" className="btn btn--orange btn--lg" disabled={!isValid}>
                      <Icon name="check" size={19} /> ডেমো অর্ডার দিন
                    </button>
                  </div>
                </form>

                {/* Order summary */}
                <aside className="summary h-fit" aria-label="অর্ডার সারাংশ">
                  <div className="summary__head">
                    <h2>অর্ডার সারাংশ</h2>
                    <DemoBadge small />
                  </div>
                  <p className="summary__count">{cartCount}টি পণ্য</p>

                  <div className="flex flex-col">
                    {lines.map((l) => (
                      <div className="summary-line" key={l.id}>
                        <div className={`summary-line__art tone-${l.product.tone}`}>
                          <ProductArt type={l.product.art} imageUrl={l.product.imageUrl} alt={l.product.name} />
                        </div>
                        <div className="summary-line__info">
                          <h4 className="leading-snug">{l.product.name}</h4>
                          <small>
                            {l.qty} × {formatPrice(l.product.price)} · {l.product.pack}
                          </small>
                        </div>
                        <strong className="shrink-0">{formatPrice(l.lineTotal)}</strong>
                      </div>
                    ))}
                  </div>

                  <dl className="summary__list">
                    <div>
                      <dt>পণ্যের মোট</dt>
                      <dd>{formatPrice(totals.subtotal)}</dd>
                    </div>
                    <div>
                      <dt>ডেমো ছাড়</dt>
                      <dd className={totals.discount ? 'is-green' : ''}>
                        {totals.discount ? `− ${formatPrice(totals.discount)}` : formatPrice(0)}
                      </dd>
                    </div>
                    <div>
                      <dt>ডেমো ডেলিভারি ফি</dt>
                      <dd>{totals.delivery === 0 ? 'শূন্য' : formatPrice(totals.delivery)}</dd>
                    </div>
                    <div className="summary__total">
                      <dt>সর্বমোট</dt>
                      <dd>{formatPrice(totals.total)}</dd>
                    </div>
                  </dl>

                  <Note tone="sky" icon="shield">
                    কোনো ব্যক্তিগত তথ্য সংরক্ষণ বা প্রেরণ করা হয় না।
                  </Note>
                </aside>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
