import { Link, useParams } from 'react-router-dom'
import { brand } from '../config/brand'
import { articles, getArticle } from '../data/content'
import { PageHero, EmptyState, Note, SectionHeading } from '../components/UI'
import Icon from '../components/Icon'

export default function Article() {
  const { slug } = useParams()
  const a = getArticle(slug)
  const others = articles.filter((x) => x.slug !== slug).slice(0, 2)

  if (!a) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            icon="info"
            title="নিবন্ধটি পাওয়া যায়নি"
            action={
              <Link to="/advice" className="btn btn--orange">
                সব নিবন্ধ দেখুন
              </Link>
            }
          />
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHero
        title={a.titleBn}
        desc={a.excerptBn}
        icon={a.icon}
        crumbs={[
          { label: 'কৃষিপরামর্শ', to: '/advice' },
          { label: a.titleBn },
        ]}
      />

      <section className="section section--tight">
        <div className="container article">
          <article className="article__main">
            <div className="article__meta">
              <span className="chip">{a.category}</span>
              <span>
                <Icon name="clock" size={14} /> {a.readTime}
              </span>
            </div>

            <div className="prose">
              {a.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <Note tone="harvest" icon="alert">
              এই নিবন্ধটি সাধারণ তথ্য প্রদানের জন্য লেখা হয়েছে। এটি কোনো পণ্যের মাত্রা, প্রয়োগবিধি, নিরাপত্তা
              বিরতি বা নিবন্ধন তথ্য নয়। বাস্তব ব্যবহারের আগে পণ্যের লেবেল ও স্থানীয় কৃষি বিশেষজ্ঞের পরামর্শ
              নিন।
            </Note>
          </article>

          <aside className="article__side">
            <div className="panel">
              <h3>
                <Icon name="leaf" size={18} /> অন্যান্য নিবন্ধ
              </h3>
              <ul className="sideList">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link to={`/advice/${o.slug}`}>
                      <span className={`sideList__ico tone-${o.tone}`}>
                        <Icon name={o.icon} size={18} />
                      </span>
                      <div>
                        <strong>{o.titleBn}</strong>
                        <small>{o.category}</small>
                      </div>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/advice" className="link-btn">
                    সব নিবন্ধ দেখুন →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="panel panel--mint">
              <h3>
                <Icon name="shield" size={18} /> জরুরি নোট
              </h3>
              <p>
                {brand.nameBn} কোনো পেশাদার কৃষি পরামর্শের বিকল্প নয়। নিরাপত্তা নিশ্চিত করতে সবসময় লেবেল
                অনুসরণ করুন।
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
