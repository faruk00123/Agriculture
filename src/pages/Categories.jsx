import { Link } from 'react-router-dom'
import { mainCategories, subCategories, subCategoriesOf } from '../data/categories'
import { countByCategory, countBySubCategory, products } from '../data/products'
import { crops, problems } from '../data/content'
import { PageHero, SectionHeading, Note } from '../components/UI'
import Icon from '../components/Icon'

export default function Categories() {
  return (
    <>
      <PageHero
        title="পণ্য ক্যাটাগরি"
        desc="৪টি প্রধান ক্যাটাগরি ও ১৯টি সাব-ক্যাটাগরি — প্রতিটি কার্ডে প্রকৃত ডেমো ডেটার পণ্যসংখ্যা।"
        icon="grid"
        crumbs={[{ label: 'ক্যাটাগরি' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="catGroups">
            {mainCategories.map((main) => {
              const subs = subCategoriesOf(main.slug)
              return (
                <section key={main.slug} className="catGroup">
                  <div className={`catGroup__head tone-${main.tone}`}>
                    <span className="catGroup__ico">
                      <Icon name={main.icon} size={26} />
                    </span>
                    <div>
                      <h2>{main.titleBn}</h2>
                      <p>{main.descBn}</p>
                    </div>
                    <Link to={`/products?cat=${main.slug}`} className="btn btn--green btn--sm">
                      {countByCategory(main.slug)}টি পণ্য দেখুন
                    </Link>
                  </div>

                  <div className="catGroup__grid">
                    {subs.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/products?cat=${s.parent}&sub=${s.slug}`}
                        className={`subCat tone-${s.tone}`}
                      >
                        <span className="subCat__ico">
                          <Icon name={s.icon} size={22} />
                        </span>
                        <span className="subCat__text">
                          <strong>{s.titleBn}</strong>
                          <small>{countBySubCategory(s.slug)}টি ডেমো পণ্য</small>
                        </span>
                        <Icon name="chevronRight" size={17} className="subCat__go" />
                      </Link>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHeading kicker="অতিরিক্ত" title="ফসল ও সমস্যা অনুযায়ী ব্রাউজ" desc="ক্যাটাগরি ছাড়াও দুই ভাবে পণ্য খোঁজা যায়।" />
          <div className="browseBlocks">
            <div className="browseBlock">
              <h3>
                <Icon name="rice" size={18} /> ফসল অনুযায়ী
              </h3>
              <ul className="chipRow chipRow--wrap">
                {crops.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/products?crop=${c.slug}`} className={`chip tone-${c.tone}`}>
                      {c.titleBn}
                      <em>{products.filter((p) => p.crops.includes(c.slug)).length}</em>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="browseBlock">
              <h3>
                <Icon name="alert" size={18} /> সমস্যা অনুযায়ী
              </h3>
              <ul className="chipRow chipRow--wrap">
                {problems.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/products?problem=${p.slug}`} className={`chip tone-${p.tone}`}>
                      {p.titleBn}
                      <em>{products.filter((x) => x.problems.includes(p.slug)).length}</em>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Note tone="mint" icon="info">
            সব সংখ্যা <strong>{products.length}</strong>টি স্থানীয় ডেমো পণ্যের উপর ভিত্তি করে গণনা করা — কোনো
            সার্ভার বা বাস্তব তালিকা নয়।
          </Note>
        </div>
      </section>
    </>
  )
}
