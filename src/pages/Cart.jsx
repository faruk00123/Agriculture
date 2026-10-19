import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { formatPrice, demoRules, brand } from '../config/brand'
import ProductArt from '../components/Art'
import Icon from '../components/Icon'
import { QtyStepper, EmptyState, Note, PageHero } from '../components/UI'

export default function Cart() {
  const navigate = useNavigate()
  const { lines, totals, setQty, removeItem, clearCart, cartCount } = useShop()

  if (lines.length === 0) {
    return (
      <>
        <PageHero title="আপনার কার্ট" desc="কার্ট এখন খালি। পণ্য যোগ করলে এখানে দেখা যাবে।" icon="cart" crumbs={[{ label: 'কার্ট' }]} />
        <section className="section">
          <div className="container">
            <EmptyState
              icon="cart"
              title="আপনার কার্ট খালি"
              desc="পছন্দের পণ্য কার্টে যোগ করুন — কার্টের তথ্য শুধু আপনার ব্রাউজারে থাকে।"
              action={
                <div className="empty__cta">
                  <Link to="/products" className="btn btn--orange btn--lg">
                    পণ্য কিনতে যান
                  </Link>
                  <Link to="/categories" className="btn btn--ghost btn--lg">
                    ক্যাটাগরি দেখুন
                  </Link>
                </div>
              }
            />
          </div>
        </section>
      </>
    )
  }

  const progress = Math.min(100, Math.round((totals.subtotal / demoRules.freeDeliveryOver) * 100))
  const remaining = Math.max(0, demoRules.freeDeliveryOver - totals.subtotal)

  return (
    <>
      <PageHero
        title="আপনার কার্ট"
        desc={`${cartCount}টি পণ্য · মোট ${formatPrice(totals.total)} (ডেমো হিসাব)`}
        icon="cart"
        crumbs={[{ label: 'কার্ট' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="cart">
            <div className="cart__list">
              {/* header row (desktop) */}
              <div className="cart__headRow" aria-hidden="true">
                <span>পণ্য</span>
                <span>পরিমাণ</span>
                <span>মোট</span>
              </div>

              {lines.map((line) => (
                <article className="cart-row" key={line.id}>
                  <div className="cart-row__main">
                    <Link to={`/product/${line.id}`} className={`cart-row__art tone-${line.product.tone}`}>
                      <ProductArt type={line.product.art} imageUrl={line.product.imageUrl} alt={line.product.name} />
                    </Link>
                    <div className="cart-row__info">
                      <span className="text-sm font-semibold text-ink-soft">{line.product.brand}</span>
                      <h3 className="text-[1.02rem] leading-snug">
                        <Link to={`/product/${line.id}`} className="hover:text-green600">
                          {line.product.name}
                        </Link>
                      </h3>
                      <p className="cart-row__meta">
                        {line.product.pack && <span>প্যাক: {line.product.pack}</span>}
                        <span>একক: {formatPrice(line.product.price)}</span>
                      </p>
                      <div className="cart-row__controls">
                        <QtyStepper
                          value={line.qty}
                          onChange={(v) => setQty(line.id, v)}
                          label={`${line.product.name} পরিমাণ`}
                        />
                        <button
                          type="button"
                          className="icon-btn icon-btn--light"
                          onClick={() => removeItem(line.id)}
                          aria-label={`${line.product.name} কার্ট থেকে সরান`}
                        >
                          <Icon name="trash" size={17} />
                        </button>
                      </div>
                      <p className="cart-row__lineTotal">
                        সাবটোটাল: <strong>{formatPrice(line.lineTotal)}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="cart-row__qty" aria-hidden="true">
                    <QtyStepper value={line.qty} onChange={(v) => setQty(line.id, v)} label="পরিমাণ" />
                  </div>

                  <div className="cart-row__total">
                    <strong>{formatPrice(line.lineTotal)}</strong>
                  </div>
                </article>
              ))}

              <div className="cart__actions">
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    if (window.confirm('কার্টের সব পণ্য মুছে ফেলবেন?')) clearCart()
                  }}
                >
                  <Icon name="trash" size={15} /> কার্ট খালি করুন
                </button>
                <Link to="/products" className="link-btn">
                  <Icon name="arrowLeft" size={15} /> আরও পণ্য দেখুন
                </Link>
              </div>
            </div>

            {/* ── Order summary ── */}
            <aside className="summary" aria-label="অর্ডার সারাংশ">
              <h2>অর্ডার সারাংশ</h2>

              <div className="summary__progress">
                <p>
                  {remaining > 0 ? (
                    <>
                      আর <strong>{formatPrice(remaining)}</strong> যোগ করলে ডেমো ডেলিভারি ফি শূন্য
                    </>
                  ) : (
                    <>
                      <Icon name="check" size={15} /> ডেমো ডেলিভারি ফি শূন্য হয়েছে
                    </>
                  )}
                </p>
                <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>

              <dl className="summary__list">
                <div>
                  <dt>পণ্যের মোট ({cartCount}টি)</dt>
                  <dd>{formatPrice(totals.subtotal)}</dd>
                </div>
                <div>
                  <dt>
                    ডেমো ছাড় ({demoRules.discount.percent}%)
                    {totals.discount === 0 && <small> · {formatPrice(demoRules.discount.minSubtotal)}+ এ</small>}
                  </dt>
                  <dd className={totals.discount ? 'is-green' : ''}>
                    {totals.discount ? `− ${formatPrice(totals.discount)}` : formatPrice(0)}
                  </dd>
                </div>
                <div>
                  <dt>ডেমো ডেলিভারি ফি</dt>
                  <dd>{totals.delivery === 0 ? 'শূন্য' : formatPrice(totals.delivery)}</dd>
                </div>
                <div className="summary__total">
                  <dt>সর্বমোট (পরিশোধযোগ্য)</dt>
                  <dd>{formatPrice(totals.total)}</dd>
                </div>
              </dl>

              <button
                type="button"
                className="btn btn--orange btn--lg btn--block"
                onClick={() => navigate('/checkout')}
              >
                চেকআউটে যান <Icon name="arrowRight" size={17} />
              </button>
              <Link to="/products" className="btn btn--ghost btn--block">
                কেনা-বেচা চালিয়ে যান
              </Link>

              <Note tone="mint" icon="shield">
                এটি ফ্রন্টএন্ড ডেমো। কোনো পেমেন্ট বা প্রকৃত অর্ডার নেই, এবং ব্যক্তিগত তথ্য কোথাও পাঠানো হয় না।
              </Note>

              <p className="flex items-center gap-1.5 text-sm text-ink-soft">
                <Icon name="user" size={14} /> {brand.ownerLabelBn}
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
