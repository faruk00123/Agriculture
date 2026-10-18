import { Link } from 'react-router-dom'
import { formatPrice } from '../config/brand'
import { getCategory, getSubCategory } from '../data/categories'
import { useShop } from '../context/ShopContext'
import ProductArt from './Art'
import Icon from './Icon'
import { DemoBadge, StockChip } from './UI'

const TAG_LABEL = {
  new: 'নতুন',
  sale: 'ছাড়',
  featured: 'নির্বাচিত',
  popular: 'জনপ্রিয়',
}

export default function ProductCard({ product }) {
  const { addItem, toggleWishlist, inWishlist } = useShop()
  const cat = getCategory(product.category)
  const sub = getSubCategory(product.subcategory)
  const wished = inWishlist(product.id)
  const out = product.stock === 'out'
  const showTag = product.tags.find((t) => t === 'new' || t === 'sale')

  return (
    <article className={`pcard tone-${product.tone}`}>
      <div className="pcard__media">
        <Link to={`/product/${product.id}`} className="pcard__art" aria-label={`${product.name} — বিস্তারিত`}>
          <ProductArt type={product.art} imageUrl={product.imageUrl} alt={product.name} />
        </Link>

        <div className="pcard__flags">
          {showTag && <span className={`flag flag--${showTag}`}>{TAG_LABEL[showTag]}</span>}
          <DemoBadge small />
        </div>

        <button
          type="button"
          className={`pcard__wish${wished ? ' is-on' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={wished ? `${product.name} উইশলিস্ট থেকে সরান` : `${product.name} উইশলিস্টে যোগ করুন`}
        >
          <Icon name={wished ? 'heart-fill' : 'heart'} size={18} />
        </button>
      </div>

      <div className="pcard__body">
        <div className="pcard__meta">
          <span className="pcard__brand">{product.brand}</span>
          <span className="pcard__cat">{sub?.titleBn || cat?.titleBn}</span>
        </div>

        <h3 className="pcard__title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="pcard__sub">
          {product.pack && <span>প্যাক: {product.pack}</span>}
          <span className="pcard__rating" title={`ডেমো রেটিং ${product.rating} (রিভিউ ${product.reviews})`}>
            <Icon name="star" size={13} className="star" />
            {product.rating.toFixed(1)}
            <em>({product.reviews})</em>
          </span>
        </div>

        <div className="pcard__priceRow">
          <div className="price">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
          </div>
          <StockChip stock={product.stock} />
        </div>

        <div className="pcard__actions">
          <Link to={`/product/${product.id}`} className="btn btn--ghost btn--sm">
            বিস্তারিত
          </Link>
          <button
            type="button"
            className="btn btn--orange btn--sm pcard__add"
            onClick={() => addItem(product.id, 1)}
            disabled={out}
            aria-label={out ? `${product.name} — স্টক শেষ` : `${product.name} কার্টে যোগ করুন`}
          >
            <Icon name="cart" size={16} />
            {out ? 'স্টক শেষ' : 'কার্টে'}
          </button>
        </div>
      </div>
    </article>
  )
}
