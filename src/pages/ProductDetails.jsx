import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct, relatedTo, products } from '../data/products'
import { getCategory, getSubCategory } from '../data/categories'
import { formatPrice, demoRules, brand } from '../config/brand'
import { useShop } from '../context/ShopContext'
import ProductArt from '../components/Art'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import { QtyStepper, StockChip, DemoBadge, Note, SectionHeading, EmptyState } from '../components/UI'

const TONES = ['mint', 'sky', 'harvest', 'lavender', 'peach', 'coral']

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)
  const { addItem, toggleWishlist, inWishlist } = useShop()
  const [qty, setQty] = useState(1)
  const [tone, setTone] = useState(product?.tone || 'mint')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setQty(1)
    setAdded(false)
    setTone(product?.tone || 'mint')
  }, [product])

  const related = useMemo(() => (product ? relatedTo(product, 4) : []), [product])

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            icon="alert"
            title="পণ্যটি পাওয়া যায়নি"
            desc="লিংকটি সম্ভবত পুরোনো বা পণ্য আইডি সঠিক নয়।"
            action={
              <Link to="/products" className="btn btn--orange">
                সকল পণ্য দেখুন
              </Link>
            }
          />
        </div>
      </section>
    )
  }

  const cat = getCategory(product.category)
  const sub = getSubCategory(product.subcategory)
  const out = product.stock === 'out'
  const wished = inWishlist(product.id)
  const galleryTones = [tone, ...TONES.filter((t) => t !== tone).slice(0, 3)]

  const addToCart = () => {
    addItem(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const buyNow = () => {
    addItem(product.id, qty)
    navigate('/cart')
  }

  return (
    <>
      {/* ── Breadcrumbs ── */}
      <div className="crumbBar">
        <div className="container crumbs" aria-label="ব্রেডক্রাম্ব">
          <Link to="/">হোম</Link>
          <span>
            <Icon name="chevronRight" size={13} />
            <Link to="/products">সকল পণ্য</Link>
          </span>
          <span>
            <Icon name="chevronRight" size={13} />
            <Link to={`/products?cat=${product.category}`}>{cat?.titleBn}</Link>
          </span>
          <span>
            <Icon name="chevronRight" size={13} />
            <Link to={`/products?cat=${product.category}&sub=${product.subcategory}`}>{sub?.titleBn}</Link>
          </span>
          <span>
            <Icon name="chevronRight" size={13} />
            <em>{product.name}</em>
          </span>
        </div>
      </div>

      <section className="section section--tight">
        <div className="container pdp">
          {/* ── Gallery ── */}
          <div className="pdp__gallery">
            <div className={`pdp__stage tone-${galleryTones[0]}`}>
              <ProductArt type={product.art} imageUrl={product.imageUrl} alt={product.name} />
              <span className="pdp__demoTag">
                <DemoBadge small />
              </span>
            </div>
            <div className="pdp__thumbs" role="group" aria-label="রঙের প্রিভিউ (ডেমো)">
              {galleryTones.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  className={`pdp__thumb tone-${t}${i === 0 ? ' is-on' : ''}`}
                  onClick={() => setTone(t)}
                  aria-label={`প্রিভিউ ${i + 1}`}
                  aria-pressed={i === 0}
                >
                  <ProductArt type={product.art} imageUrl={product.imageUrl} alt={product.name} />
                </button>
              ))}
            </div>
          </div>

          {/* ── Summary ── */}
          <div className="pdp__info">
            <div className="pdp__badges">
              <span className="chip chip--mint">{sub?.titleBn}</span>
              <span className="chip">{product.brand}</span>
              <DemoBadge small />
            </div>

            <h1 className="pdp__title">{product.name}</h1>

            <div className="pdp__ratingRow">
              <span className="stars" title={`ডেমো রেটিং ${product.rating}`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Icon
                    key={n}
                    name={n <= Math.round(product.rating) ? 'star' : 'star'}
                    size={16}
                    className={`star${n <= Math.round(product.rating) ? '' : ' star--off'}`}
                  />
                ))}
                <em>
                  {product.rating.toFixed(1)} · ডেমো রিভিউ {product.reviews}টি
                </em>
              </span>
              <StockChip stock={product.stock} />
            </div>

            <div className="pdp__priceBox">
              <div className="price price--lg">
                <strong>{formatPrice(product.price)}</strong>
                {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
              </div>
              {product.oldPrice && (
                <span className="pdp__save">
                  ডেমো সাশ্রয় {formatPrice(product.oldPrice - product.price)}
                </span>
              )}
            </div>

            <dl className="pdp__quick">
              <div>
                <dt>ব্র্যান্ড</dt>
                <dd>{product.brand}</dd>
              </div>
              <div>
                <dt>প্যাক সাইজ</dt>
                <dd>{product.pack || '—'}</dd>
              </div>
              <div>
                <dt>ক্যাটাগরি</dt>
                <dd>{cat?.titleBn}</dd>
              </div>
              <div>
                <dt>ডেমো স্টক</dt>
                <dd>{out ? 'শেষ' : product.stock === 'low' ? 'সীমিত' : 'আছে'}</dd>
              </div>
            </dl>

            <p className="pdp__short">{product.short}</p>

            <div className="pdp__buy">
              <QtyStepper value={qty} onChange={setQty} />
              <button
                type="button"
                className="btn btn--orange btn--lg pdp__add"
                onClick={addToCart}
                disabled={out}
              >
                <Icon name="cart" size={19} />
                {out ? 'স্টক শেষ' : 'কার্টে যোগ করুন'}
              </button>
              <button type="button" className="btn btn--green btn--lg" onClick={buyNow} disabled={out}>
                এখনই কিনুন (ডেমো)
              </button>
              <button
                type="button"
                className={`icon-btn pdp__wish${wished ? ' is-on' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={wished}
                aria-label={wished ? 'উইশলিস্ট থেকে সরান' : 'উইশলিস্টে যোগ করুন'}
              >
                <Icon name={wished ? 'heart-fill' : 'heart'} size={21} />
              </button>
            </div>

            {added && (
              <p className="pdp__added" role="status">
                <Icon name="check" size={16} /> “{product.name}” ({qty}টি) কার্টে যোগ হয়েছে।{' '}
                <Link to="/cart">কার্ট দেখুন</Link>
              </p>
            )}

            <ul className="pdp__perks">
              <li>
                <Icon name="truck" size={17} /> ডেমো ডেলিভারি ফি {formatPrice(demoRules.deliveryFee)} ·{' '}
                {formatPrice(demoRules.freeDeliveryOver)}+ অর্ডারে ফি শূন্য
              </li>
              <li>
                <Icon name="shield" size={17} /> কোনো ব্যক্তিগত তথ্য সংরক্ষণ করা হয় না
              </li>
              <li>
                <Icon name="info" size={17} /> মূল্য ও স্টক কাল্পনিক ডেমো ডেটা
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="section section--tight">
        <div className="container pdp__details">
          <div className="pdp__desc">
            <h2>পণ্যের বর্ণনা</h2>
            <p>{product.description}</p>
            <p>
              পণ্যটির নাম, দাম, স্টক, রেটিং ও রিভিউ সবই এই ওয়েবসাইটের <strong>ডেমো ইন্টারফেস দেখানোর জন্য</strong>{' '}
              তৈরি কাল্পনিক তথ্য। এটি কোনো বাস্তব পণ্যের বিবরণ নয়।
            </p>

            <h3>সুরক্ষা ও ব্যবহার বিষয়ক নোট</h3>
            <Note tone="coral" icon="alert">
              <strong>এই ডেমোতে কোনো মাত্রা, প্রয়োগবিধি, মিশ্রণ অনুপাত, নিরাপত্তা বিরতি, সক্রিয় উপাদান,
              নিবন্ধন নম্বর বা অনুমোদনের তথ্য দেওয়া হয়নি</strong> — কারণ সেগুলো যাচাই করা হয়নি। যেকোনো
              কীটনাশক, ছত্রাকনাশক বা সার ব্যবহারের আগে পণ্যের নিজস্ব লেবেল ও অনুমোদিত উৎসের নির্দেশনা অনুসরণ
              করুন এবং প্রয়োজনে স্থানীয় কৃষি বিশেষজ্ঞের পরামর্শ নিন।
            </Note>

            <h3>সংক্ষিপ্ত তথ্য</h3>
            <p>{product.short}</p>
          </div>

          <aside className="pdp__side">
            <h2>পণ্য তথ্য</h2>
            <table className="infoTable">
              <tbody>
                <tr>
                  <th scope="row">পণ্যের নাম</th>
                  <td>{product.name}</td>
                </tr>
                <tr>
                  <th scope="row">ব্র্যান্ড</th>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <th scope="row">প্রধান ক্যাটাগরি</th>
                  <td>{cat?.titleBn}</td>
                </tr>
                <tr>
                  <th scope="row">সাব-ক্যাটাগরি</th>
                  <td>{sub?.titleBn}</td>
                </tr>
                <tr>
                  <th scope="row">প্যাক সাইজ</th>
                  <td>{product.pack || '—'}</td>
                </tr>
                <tr>
                  <th scope="row">ডেমো মূল্য</th>
                  <td>{formatPrice(product.price)}</td>
                </tr>
                <tr>
                  <th scope="row">ডেমো স্টক</th>
                  <td>{out ? 'শেষ' : product.stock === 'low' ? 'সীমিত' : 'আছে'}</td>
                </tr>
                <tr>
                  <th scope="row">সম্পর্কিত ফসল</th>
                  <td>{product.crops.length ? product.crops.length + 'টি উল্লেখিত' : '—'}</td>
                </tr>
                <tr>
                  <th scope="row">তথ্যের ধরন</th>
                  <td>ডেমো / অযাচাইকৃত</td>
                </tr>
              </tbody>
            </table>

            <div className="pdp__ownerNote">
              <Icon name="user" size={16} />
              <span>
                {brand.ownerLabelBn}
                <small>
                  <Link to="/contact">যোগাযোগ করুন</Link>
                </small>
              </span>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <SectionHeading kicker="সম্পর্কিত" title="একই ক্যাটাগরির পণ্য" />
            <div className="pgrid pgrid--4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <p className="related__more">
              <Link to={`/products?cat=${product.category}&sub=${product.subcategory}`} className="link-btn">
                {sub?.titleBn} ক্যাটাগরির সব পণ্য ({products.filter((p) => p.subcategory === product.subcategory).length}টি) →
              </Link>
            </p>
          </div>
        </section>
      )}
    </>
  )
}
