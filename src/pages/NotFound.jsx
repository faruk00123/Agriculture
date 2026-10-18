import { Link } from 'react-router-dom'
import { PageHero, EmptyState } from '../components/UI'
import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <>
      <PageHero title="পৃষ্ঠা পাওয়া যায়নি" desc="আপনি যে লিংকে ক্লিক করেছেন, সেটি নেই অথবা স্থানান্তরিত হয়েছে।" icon="alert" crumbs={[{ label: '৪০৪' }]} />
      <section className="section">
        <div className="container">
          <EmptyState
            icon="alert"
            title="৪০৪ — পৃষ্ঠা পাওয়া যায়নি"
            action={
              <div className="empty__cta">
                <Link to="/" className="btn btn--orange">
                  হোমে ফিরে যান
                </Link>
                <Link to="/products" className="btn btn--ghost">
                  সকল পণ্য দেখুন
                </Link>
              </div>
            }
          />
        </div>
      </section>
    </>
  )
}
