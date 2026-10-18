import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext'
import { brand } from './config/brand'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import Contact from './pages/Contact'
import Advice from './pages/Advice'
import Article from './pages/Article'
import Faq from './pages/Faq'
import PolicyPage from './pages/PolicyPage'
import NotFound from './pages/NotFound'

/** Reset scroll + keep the browser title in sync with brand config. */
function RouteEffects() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname, location.search])

  useEffect(() => {
    const path = location.pathname
    const map = [
      ['/product/', 'পণ্য বিস্তারিত'],
      ['/products', 'সকল পণ্য'],
      ['/categories', 'ক্যাটাগরি'],
      ['/cart', 'শপিং কার্ট'],
      ['/checkout', 'চেকআউট'],
      ['/wishlist', 'উইশলিস্ট'],
      ['/about', 'আমাদের সম্পর্কে'],
      ['/contact', 'যোগাযোগ'],
      ['/advice', 'কৃষিপরামর্শ'],
      ['/faq', 'সাধারণ জিজ্ঞাসা'],
      ['/shipping-policy', 'ডেলিভারি নীতি'],
      ['/return-policy', 'রিটার্ন নীতি'],
      ['/privacy-policy', 'গোপনীয়তা নীতি'],
      ['/terms', 'শর্তাবলি'],
    ]
    const hit = map.find(([p]) => path.startsWith(p))
    document.title = hit ? `${hit[1]} | ${brand.nameBn}` : brand.seo.title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', brand.seo.description)
  }, [location.pathname])

  return null
}

export default function App() {
  return (
    <HashRouter>
      <ShopProvider>
        <a href="#main" className="skip-link">
          মূল কনটেন্টে যান
        </a>
        <RouteEffects />
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/advice" element={<Advice />} />
            <Route path="/advice/:slug" element={<Article />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/shipping-policy" element={<PolicyPage slug="shipping-policy" />} />
            <Route path="/return-policy" element={<PolicyPage slug="return-policy" />} />
            <Route path="/privacy-policy" element={<PolicyPage slug="privacy-policy" />} />
            <Route path="/terms" element={<PolicyPage slug="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ShopProvider>
    </HashRouter>
  )
}
