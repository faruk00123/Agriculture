import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { PageHero, EmptyState } from '../components/UI'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlistProducts, wishlistCount } = useShop()

  return (
    <>
      <PageHero
        title="উইশলিস্ট"
        desc="আপনার প্রিয় ডেমো পণ্যগুলো এখানে রাখা থাকবে (শুধু আপনার ব্রাউজারে)।"
        icon="heart"
        crumbs={[{ label: 'উইশলিস্ট' }]}
      />

      <section className="section section--tight">
        <div className="container">
          {wishlistCount === 0 ? (
            <EmptyState
              icon="heart"
              title="উইশলিস্ট খালি"
              desc="পণ্যের হার্ট আইকনে চাপ দিয়ে প্রিয় পণ্য যোগ করুন।"
              action={
                <Link to="/products" className="btn btn--orange">
                  পণ্য দেখুন
                </Link>
              }
            />
          ) : (
            <>
              <div className="product-grid product-grid--3">
                {wishlistProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <p className="mt-4 text-center text-ink-soft">মোট {wishlistCount}টি পণ্য আপনার উইশলিস্টে আছে।</p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
