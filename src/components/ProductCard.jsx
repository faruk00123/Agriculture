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

/**
 * Product card — fixed image ratio, clamped title and a bottom-aligned
 * action row so every card in a grid lines up on every breakpoint.
 */
export default function ProductCard({ product }) {
  const { addItem, toggleWishlist, inWishlist } = useShop()
  const cat = getCategory(product.category)
  const sub = getSubCategory(product.subcategory)
  const wished = inWishlist(product.id)
  const out = product.stock === 'out'
  const showTag = product.tags.find((t) => t === 'new' || t === 'sale')

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-md">
      <div className={`relative aspect-[4/3] overflow-hidden p-3 tone-${product.tone}`}>
        <Link
          to={`/product/${product.id}`}
          className="grid h-full w-full place-items-center"
          aria-label={`${product.name} — বিস্তারিত`}
        >
          <ProductArt type={product.art} imageUrl={product.imageUrl} alt={product.name} />
        </Link>

        <div className="absolute left-2 top-2 flex flex-col items-start gap-1.5">
          {showTag && <span className={`flag flag--${showTag}`}>{TAG_LABEL[showTag]}</span>}
          <DemoBadge small />
        </div>

        <button
          type="button"
          className={`absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white/95 text-ink shadow-sm transition-colors hover:bg-white ${
            wished ? 'text-[#FF4D4D]' : ''
          }`}
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={wished ? `${product.name} উইশলিস্ট থেকে সরান` : `${product.name} উইশলিস্টে যোগ করুন`}
        >
          <Icon name={wished ? 'heart-fill' : 'heart'} size={18} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2 text-xs text-ink-soft">
          <span className="truncate font-semibold">{product.brand}</span>
          <span className="shrink-0 text-right">{sub?.titleBn || cat?.titleBn}</span>
        </div>

        <h3 className="line-clamp-2 text-[1.02rem] leading-snug">
          <Link to={`/product/${product.id}`} className="hover:text-green600">
            {product.name}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm text-ink-soft">
          {product.pack && <span>প্যাক: {product.pack}</span>}
          <span className="flex items-center gap-1" title={`ডেমো রেটিং ${product.rating} (রিভিউ ${product.reviews})`}>
            <Icon name="star" size={14} className="star" />
            {product.rating.toFixed(1)}
            <em className="not-italic">({product.reviews})</em>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p className="flex items-baseline gap-2">
            <strong className="text-[1.15rem] text-ink">{formatPrice(product.price)}</strong>
            {product.oldPrice && <del className="text-sm text-ink-soft">{formatPrice(product.oldPrice)}</del>}
          </p>
          <StockChip stock={product.stock} />
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <Link to={`/product/${product.id}`} className="btn btn--ghost btn--sm">
            বিস্তারিত
          </Link>
          <button
            type="button"
            className="btn btn--orange btn--sm"
            onClick={() => addItem(product.id, 1)}
            disabled={out}
            aria-label={out ? `${product.name} — স্টক শেষ` : `${product.name} কার্টে যোগ করুন`}
          >
            <Icon name="cart" size={16} />
            {out ? 'শেষ' : 'কার্টে'}
          </button>
        </div>
      </div>
    </article>
  )
}
