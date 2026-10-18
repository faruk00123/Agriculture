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
    <article className={`flex flex-col bg-white border border-border rounded-lg shadow-sm overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md tone-${product.tone}`}>
      <div className="relative aspect-[4/3] grid place-items-center p-2.5 overflow-hidden">
        <Link to={`/product/${product.id}`} className="w-full h-full grid place-items-center" aria-label={`${product.name} — বিস্তারিত`}>
          <ProductArt type={product.art} imageUrl={product.imageUrl} alt={product.name} />
        </Link>

        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
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

      <div className="p-3 md:p-4 flex flex-col gap-1.5">
        <div className="flex justify-between text-sm text-ink-soft">
          <span className="pcard__brand">{product.brand}</span>
          <span className="pcard__cat">{sub?.titleBn || cat?.titleBn}</span>
        </div>

        <h3 className="text-base md:text-lg leading-tight break-words">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="flex justify-between flex-wrap gap-1 text-sm text-ink-soft">
          {product.pack && <span>প্যাক: {product.pack}</span>}
          <span className="flex items-center gap-1" title={`ডেমো রেটিং ${product.rating} (রিভিউ ${product.reviews})`}>
            <Icon name="star" size={13} className="star" />
            {product.rating.toFixed(1)}
            <em>({product.reviews})</em>
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
          </div>
          <StockChip stock={product.stock} />
        </div>

        <div className="flex justify-between gap-2 mt-0.5 flex-wrap">
          <Link to={`/product/${product.id}`} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm bg-[#1f29370f] text-ink hover:bg-[#1f29371a] transition-colors">
            বিস্তারিত
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm bg-gradient-to-b from-orange to-orange2 text-[#1F2937] shadow-sm hover:brightness-[1.02] transition-colors disabled:opacity-50"
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
