import { Link } from 'react-router-dom'
import { articles } from '../data/content'
import { PageHero, SectionHeading } from '../components/UI'
import Icon from '../components/Icon'

export default function Advice() {
  return (
    <>
      <PageHero
        title="কৃষিপরামর্শ"
        desc="সাধারণ জ্ঞানভিত্তিক কৃষি নিবন্ধ — কোনো নির্দিষ্ট পণ্যের মাত্রা বা প্রয়োগ নির্দেশনা নয়।"
        icon="sprout"
        crumbs={[{ label: 'কৃষিপরামর্শ' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <SectionHeading kicker="নিবন্ধ" title="সর্বশেষ কৃষি তথ্য" />
          <div className="art-grid">
            {articles.map((a) => (
              <Link key={a.slug} to={`/advice/${a.slug}`} className={`art-card tone-${a.tone}`}>
                <span className="art-card__cover">
                  <Icon name={a.icon} size={36} />
                </span>
                <div className="art-card__body">
                  <div className="art-card__meta">
                    <span>{a.category}</span>
                    <span>
                      <Icon name="clock" size={13} /> {a.readTime}
                    </span>
                  </div>
                  <h3>{a.titleBn}</h3>
                  <p>{a.excerptBn}</p>
                  <span className="art-card__more">
                    সম্পূর্ণ পড়ুন <Icon name="arrowRight" size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
