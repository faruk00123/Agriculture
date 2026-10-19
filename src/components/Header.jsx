import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { brand, contactLinks } from '../config/brand'
import { useShop } from '../context/ShopContext'
import Icon from './Icon'
import Logo from './Logo'
import SearchOverlay from './SearchOverlay'

/* The three trailing links only fit from the large-laptop breakpoint up;
   below that they live in the drawer (and the tablet strip covers the
   shopping links). */
const PRIMARY_NAV = [
  { to: '/', label: 'হোম', end: true },
  { to: '/products', label: 'সকল পণ্য' },
  { to: '/categories', label: 'ক্যাটাগরি' },
  { to: '/products?cat=crop-protection', label: 'ফসল সুরক্ষা' },
  { to: '/products?cat=fertilizers', label: 'সার' },
  { to: '/products?cat=seeds', label: 'বীজ' },
  { to: '/products?cat=accessories', label: 'কৃষি সহায়ক' },
  { to: '/advice', label: 'কৃষিপরামর্শ', wide: true },
  { to: '/about', label: 'আমাদের সম্পর্কে', wide: true },
  { to: '/contact', label: 'যোগাযোগ', wide: true },
]

/* Tablet (768–1023px): a compact, horizontally scrollable link strip
   instead of squeezing the desktop navbar into a narrow screen. */
const TABLET_NAV = PRIMARY_NAV.slice(0, 7)

const DRAWER_GROUPS = [
  { title: 'প্রধান', links: PRIMARY_NAV.slice(0, 3) },
  { title: 'কেনাকাটা', links: PRIMARY_NAV.slice(3, 7) },
  { title: 'জানুন', links: PRIMARY_NAV.slice(7) },
]

const navLinkClass = (isActive) =>
  [
    'inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 font-bold transition-colors',
    isActive
      ? 'bg-lime/15 text-lime'
      : 'text-[#FFF8EC]/90 hover:bg-white/10 hover:text-[#FFF8EC]',
  ].join(' ')

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef(null)
  const burgerRef = useRef(null)
  const location = useLocation()
  const { cartCount, wishlistCount } = useShop()

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.classList.remove('menu-open')
    document.body.style.overflow = ''
  }

  /* close overlays whenever navigation happens */
  useEffect(() => {
    closeMenu()
    setSearchOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* body scroll lock + focus trap + Escape for the drawer */
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.classList.add('menu-open')
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeMenu()
        burgerRef.current?.focus()
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          last.focus()
          e.preventDefault()
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus()
          e.preventDefault()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => {
      drawerRef.current?.querySelectorAll('a, button')?.[0]?.focus()
    }, 60)
    return () => {
      document.body.classList.remove('menu-open')
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [menuOpen])

  const isActive = (item) => {
    const [path, query] = item.to.split('?')
    const pathOk = location.pathname === path || (!item.end && location.pathname.startsWith(`${path}/`))
    if (!pathOk) return false
    if (item.end) return location.pathname === path
    if (!query) return !location.search
    const have = new URLSearchParams(location.search)
    for (const [k, v] of new URLSearchParams(query)) if (have.get(k) !== v) return false
    return true
  }

  return (
    <>
      <header
        className={`sticky top-0 sm:static z-[900] bg-gradient-to-b from-green700 to-green600 text-[#FFF8EC] ${
          scrolled ? 'shadow-[0_6px_30px_rgba(6,47,40,.18)]' : ''
        }`}
      >
        {/* ── Top bar: menu · logo · search · actions ── */}
        <div className="border-b border-[#FFF8EC]/15">
          <div className="container flex items-center gap-2 py-2 sm:gap-3 sm:py-2.5">
            <button
              ref={burgerRef}
              data-audit="burger"
              type="button"
              className="icon-btn lg:hidden"
              aria-label={menuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
            </button>

            <Logo variant="dark" size={40} className="mr-auto" englishClass="hidden xs:block" />

            <button
              type="button"
              className="hidden min-w-0 max-w-md flex-1 items-center gap-2 rounded-full border border-[#FFF8EC]/25 bg-white/10 px-3.5 py-2 text-left text-sm text-[#FFF8EC] transition-colors hover:bg-white/20 lg:flex"
              onClick={() => setSearchOpen(true)}
              aria-label="পণ্য অনুসন্ধান খুলুন"
            >
              <Icon name="search" size={18} />
              <span className="truncate">পণ্য, ব্র্যান্ড বা ক্যাটাগরি খুঁজুন…</span>
            </button>

            <div className="flex shrink-0 items-center gap-1.5">
              <a
                href={contactLinks.tel}
                className="hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-semibold text-[#FFF8EC]/90 transition-colors hover:bg-white/10 hover:text-[#FFF8EC] xl:flex"
              >
                <Icon name="phone" size={16} />
                {brand.phoneDisplay}
              </a>

              <button
                type="button"
                className="icon-btn lg:hidden"
                onClick={() => setSearchOpen(true)}
                aria-label="অনুসন্ধান"
              >
                <Icon name="search" size={20} />
              </button>

              <Link to="/wishlist" className="icon-btn relative" aria-label={`উইশলিস্ট (${wishlistCount}টি পণ্য)`}>
                <Icon name="heart" size={20} />
                {wishlistCount > 0 && <span className="badge badge--lime">{wishlistCount}</span>}
              </Link>

              <Link
                to="/cart"
                className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-orange to-orange2 px-2.5 py-1.5 font-extrabold text-ink shadow-sm transition hover:shadow-md"
                aria-label={`কার্ট (${cartCount}টি পণ্য)`}
              >
                <Icon name="cart" size={21} />
                <span className="hidden flex-col leading-none sm:flex">
                  <small className="text-[.72rem] font-bold">কার্ট</small>
                  <strong className="text-[.9rem]">{cartCount} টি</strong>
                </span>
                {cartCount > 0 && <span className="badge badge--orange sm:hidden">{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Tablet strip (768–1023px) ── */}
        <nav
          data-audit="tablet-nav"
          aria-label="দ্রুত নেভিগেশন"
          className="hidden border-b border-[#FFF8EC]/10 bg-green700/40 md:block lg:hidden"
        >
          <div className="container">
            <ul className="flex items-center gap-1 overflow-x-auto py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABLET_NAV.map((item) => (
                <li key={item.to} className="shrink-0">
                  <NavLink to={item.to} end={item.end} className={navLinkClass(isActive(item))}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ── Desktop navigation (≥1024px) ── */}
        <nav
          data-audit="desktop-nav"
          aria-label="প্রধান নেভিগেশন"
          className="hidden border-b border-[#FFF8EC]/10 lg:block"
        >
          <div className="container flex items-center justify-between gap-4">
            <ul className="flex flex-wrap items-center gap-0.5 py-1.5">
              {PRIMARY_NAV.map((item) => (
                <li key={item.to} className={item.wide ? 'hidden xl:block' : ''}>
                  <NavLink to={item.to} end={item.end} className={navLinkClass(isActive(item))}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="hidden shrink-0 items-center gap-1.5 text-[.95rem] text-[#FFF8EC]/90 xl:flex">
              <Icon name="user" size={15} />
              <span>{brand.ownerLabelBn}</span>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile / tablet drawer (below 1024px) ── */}
      <div
        className={`fixed inset-0 z-[950] max-w-full ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        id="mobile-drawer"
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-[#062f28]/45 transition-opacity duration-200 ease-out ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />
        <aside
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="মেনু"
          className={`absolute inset-y-0 left-0 flex w-[min(86vw,360px)] max-w-full flex-col overflow-y-auto overscroll-contain bg-gradient-to-b from-green700 to-[#05251F] text-[#FFF8EC] transition-transform duration-200 ease-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-3 py-2.5">
            <Logo variant="dark" size={38} />
            <button type="button" className="icon-btn" onClick={closeMenu} aria-label="মেনু বন্ধ করুন">
              <Icon name="close" size={22} />
            </button>
          </div>

          <button
            type="button"
            className="mx-3 mb-3 flex items-center gap-2 rounded-full border border-[#FFF8EC]/25 bg-white/10 px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-white/20"
            onClick={() => {
              closeMenu()
              setSearchOpen(true)
            }}
          >
            <Icon name="search" size={18} /> পণ্য খুঁজুন…
          </button>

          <div className="flex flex-1 flex-col gap-5 px-3 pb-2">
            {DRAWER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-1.5 text-[.95rem] font-bold uppercase tracking-wide text-[#FFF8EC]/65">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-0.5">
                  {group.links.map((l) => (
                    <li key={l.to}>
                      <NavLink
                        to={l.to}
                        end={l.end}
                        onClick={closeMenu}
                        className={({ isActive: a }) =>
                          `flex items-center justify-between rounded-sm px-2.5 py-2.5 font-semibold transition-colors ${
                            isActive(l) || a ? 'bg-lime/15 text-lime' : 'hover:bg-white/10'
                          }`
                        }
                      >
                        {l.label}
                        <Icon name="chevronRight" size={16} />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="mb-1.5 text-[.95rem] font-bold uppercase tracking-wide text-[#FFF8EC]/65">
                অতিরিক্ত
              </h3>
              <ul className="flex flex-col gap-0.5">
                {[
                  { to: '/faq', label: 'সাধারণ জিজ্ঞাসা' },
                  { to: '/wishlist', label: 'উইশলিস্ট' },
                  { to: '/shipping-policy', label: 'নীতিমালা' },
                ].map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      onClick={closeMenu}
                      className="flex items-center justify-between rounded-sm px-2.5 py-2.5 font-semibold transition-colors hover:bg-white/10"
                    >
                      {l.label}
                      <Icon name="chevronRight" size={16} />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 p-3 text-sm text-[#FFF8EC]/90">
            <a href={contactLinks.tel} onClick={closeMenu} className="flex items-center gap-2">
              <Icon name="phone" size={16} /> {brand.phoneDisplay}
            </a>
            <a href={contactLinks.mail} onClick={closeMenu} className="flex items-center gap-2">
              <Icon name="mail" size={16} /> {brand.email}
            </a>
            <p className="flex items-start gap-2 text-[#FFF8EC]/90">
              <Icon name="location" size={16} /> <span>{brand.addressBn}</span>
            </p>
          </div>
        </aside>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
