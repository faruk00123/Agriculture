import { Link, useParams } from 'react-router-dom'
import { policies } from '../data/content'
import { PageHero, EmptyState, Note } from '../components/UI'

export default function PolicyPage() {
  const { slug = 'terms' } = useParams()
  const p = policies[slug] || policies.terms

  if (!p) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState icon="info" title="নীতিমালা পাওয়া যায়নি" />
        </div>
      </section>
    )
  }

  const crumbs = [
    { label: p.titleBn },
  ]

  return (
    <>
      <PageHero title={p.titleBn} desc="তথ্যসূচক টেমপ্লেট — কোনো আইনগত অঙ্গীকার নয়।" icon="shield" crumbs={crumbs} />
      <section className="section section--tight">
        <div className="container prose">
          <p>{p.introBn}</p>
          {p.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </section>
          ))}

          <Note tone="harvest" icon="info">
            এই পাতাটি শুধুমাত্র ডেমো উপস্থাপনার জন্য তৈরি একটি তথ্যসূচক টেমপ্লেট। প্রকৃত ব্যবসায় এটি অবশ্যই
            প্রযোজ্য আইন ও নিশ্চিতকরণের মাধ্যমে হালনাগাদ করতে হবে।
          </Note>

          <p>
            <Link to="/faq" className="link-btn">
              FAQ পেজে ফিরে যান →
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
