import { useMemo, useState } from 'react'
import { brand, contactLinks } from '../config/brand'
import { PageHero, Note } from '../components/UI'
import Icon from '../components/Icon'

const FIELDS = [
  { name: 'name', label: 'নাম', placeholder: 'আপনার নাম লিখুন', required: true, type: 'text' },
  { name: 'phone', label: 'ফোন নম্বর', placeholder: '01XXXXXXXXX', required: true, type: 'tel' },
  { name: 'email', label: 'ইমেইল (ঐচ্ছিক)', placeholder: 'example@gmail.com', required: false, type: 'email' },
  { name: 'subject', label: 'বিষয় (ঐচ্ছিক)', placeholder: 'যেমন: পণ্য তথ্য', required: false, type: 'text' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const errors = useMemo(() => {
    const e = {}
    if (!form.name.trim()) e.name = 'নাম দিতে হবে'
    if (!/^01\d{9}$/.test(form.phone.trim().replace(/\s|-/g, ''))) e.phone = 'সঠিক মোবাইল নম্বর দিন'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'সঠিক ইমেইল দিন'
    if (!form.message.trim()) e.message = 'বার্তা লিখতে হবে'
    return e
  }, [form])

  const valid = Object.keys(errors).length === 0

  return (
    <>
      <PageHero
        title="যোগাযোগ"
        desc="সরাসরি ফোন বা ইমেইলে যোগাযোগ করুন। নিচের ফর্মটি ফ্রন্টএন্ড ডেমো — কোনো বার্তা পাঠানো হয় না।"
        icon="phone"
        crumbs={[{ label: 'যোগাযোগ' }]}
      />

      <section className="section section--tight">
        <div className="container contact">
          <div className="contact__grid">
            {/* Info */}
            <aside className="contact__info">
              <h2>যোগাযোগের তথ্য</h2>
              <ul>
                <li>
                  <span className="cico">
                    <Icon name="user" size={18} />
                  </span>
                  <div>
                    <small>স্বত্বাধিকারী</small>
                    <strong>{brand.ownerLabel}</strong>
                    <em>{brand.ownerBn}</em>
                  </div>
                </li>
                <li>
                  <span className="cico">
                    <Icon name="phone" size={18} />
                  </span>
                  <div>
                    <small>ফোন</small>
                    <a href={contactLinks.tel}>{brand.phoneDisplay}</a>
                  </div>
                </li>
                <li>
                  <span className="cico">
                    <Icon name="mail" size={18} />
                  </span>
                  <div>
                    <small>ইমেইল</small>
                    <a href={contactLinks.mail}>{brand.email}</a>
                  </div>
                </li>
                <li>
                  <span className="cico">
                    <Icon name="location" size={18} />
                  </span>
                  <div>
                    <small>ঠিকানা</small>
                    <span>{brand.addressBn}</span>
                  </div>
                </li>
              </ul>

              <Note tone="mint" icon="shield">
                এই ফর্মের মাধ্যমে কোনো তথ্য সংগ্রহ, সংরক্ষণ বা প্রেরণ করা হয় না।
              </Note>
            </aside>

            {/* Form */}
            <form
              className="contact__form"
              onSubmit={(e) => {
                e.preventDefault()
                setTouched({ name: true, phone: true, email: true, message: true })
                if (!valid) return
                setSent(true)
                setTimeout(() => setSent(false), 2600)
                setForm({ name: '', phone: '', email: '', subject: '', message: '' })
                setTouched({})
              }}
              noValidate
            >
              <h2>বার্তা পাঠান (ডেমো)</h2>
              {sent && (
                <p className="form-ok" role="status">
                  <Icon name="check" size={16} /> ডেমো কনফার্মেশন: আপনার বার্তা পাঠানো হয়েছে (ভূমিকা অনুযায়ী
                  প্রকৃত প্রেরণ নেই)।
                </p>
              )}

              <div className="formGrid">
                {FIELDS.map((f) => (
                  <label
                    key={f.name}
                    className={`field${f.name === 'subject' || f.name === 'email' ? ' field--half' : f.name === 'message' ? ' field--full' : ''}${touched[f.name] && errors[f.name] ? ' has-error' : ''}`}
                  >
                    <span>
                      {f.label} {f.required ? '*' : ''}
                    </span>
                    <input
                      name={f.name}
                      type={f.type}
                      value={form[f.name]}
                      onChange={(e) => setForm((x) => ({ ...x, [e.target.name]: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, [f.name]: true }))}
                      placeholder={f.placeholder}
                    />
                    {touched[f.name] && errors[f.name] && <em className="error">{errors[f.name]}</em>}
                  </label>
                ))}
                <label className={`field field--full${touched.message && errors.message ? ' has-error' : ''}`}>
                  <span>বার্তা *</span>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={(e) => setForm((x) => ({ ...x, [e.target.name]: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    placeholder="আপনার বার্তা লিখুন"
                  />
                  {touched.message && errors.message && <em className="error">{errors.message}</em>}
                </label>
              </div>

              <div className="contact__actions">
                <button type="submit" className="btn btn--orange btn--lg" disabled={!valid}>
                  বার্তা পাঠান (ডেমো)
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
