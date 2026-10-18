import { faqs } from '../data/content'
import { PageHero, Note } from '../components/UI'
import Icon from '../components/Icon'

export default function Faq() {
  return (
    <>
      <PageHero
        title="সাধারণ জিজ্ঞাসা (FAQ)"
        desc="এই ডেমো ওয়েবসাইট সম্পর্কে সবচেয়ে সাধারণ প্রশ্নের উত্তর।"
        icon="info"
        crumbs={[{ label: 'FAQ' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="accordion">
            {faqs.map((f, i) => (
              <details className="accordion__item" key={i} open={i === 0}>
                <summary>
                  <Icon name="chevronRight" size={16} className="accArrow" />
                  {f.q}
                </summary>
                <div className="accordion__body">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>

          <Note tone="mint" icon="shield">
            ডেমো নীতির সারসংক্ষেপ: ব্যক্তিগত তথ্য সংরক্ষণ/প্রেরণ হয় না · কোনো পেমেন্ট নেই · অর্ডার প্রকৃত নয় ·
            পণ্য তথ্য যাচাইকৃত নয়।
          </Note>
        </div>
      </section>
    </>
  )
}
