import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { brand, contactLinks } from '../config/brand'
import { useShop } from '../context/ShopContext'
import Icon from './Icon'
import Logo from './Logo'
import SearchOverlay from './SearchOverlay'

const PRIMARY_NAV = [
  { to: '/', label: 'হোম', end: true },
  { to: '/products', label: 'সকল পণ্য' },
  { to: '/categories', label: 'ক্যাটাগরি' },
  { to: '/products?cat=crop-protection', label: 'ফসল সুরক্ষা' },
  { to: '/products?cat=fertilizers', label: 'সার' },
  { to: '/products?cat=seeds', label: 'বীজ' },
  { to: '/products?cat=accessories', label: 'কৃষি সহায়ক' },
  { to: '/advice', label: 'কৃষিপরামর্শ' },
  { to: '/about', label: 'আমাদের সম্পর্কে' },
  { to: '/contact', label: 'যোগাযোগ' },
]

const DRAWER_GROUPS = [
  { title: 'প্রধান', links: PRIMARY_NAV.slice(0, 3) },
  {
    title: 'কেনাকাটা',
    links: PRIMARY_NAV.slice(3, 7),
  },
  {
    title: 'জানুন',
    links: PRIMARY_NAV.slice(7),
  },
]

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
    try {
      document.body.classList.remove('menu-open')
      document.body.style.overflow = ''
    } catch (e) {}
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

  /* body scroll lock + escape for the mobile drawer */
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.classList.add('menu-open')
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
      const focusable = drawerRef.current?.querySelectorAll('a, button')
      focusable?.[0]?.focus()
    }, 60)
    return () => {
      document.body.classList.remove('menu-open')
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [menuOpen])

  const navLinkClass = ({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`

  return (
    <>

      <header className={`sticky top-0 z-[900] backdrop-blur-[6px] ${scrolled ? 'shadow-[0_6px_30px_rgba(6,47,40,.18)]' : ''}`}>
        <div className="max-w-max mx-auto px-4 md:px-5 grid grid-cols-[auto_1fr_auto] gap-4 items-center bg-gradient-to-b from-green700 to-green600 text-[#FFF8EC] py-2 border-b border-[rgba(255,248,236,.14)]">
          <button
            ref={burgerRef}
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/20 transition-colors md:hidden"
            aria-label={menuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>

          <Logo variant="dark" size={44} className="header__logo" />

          <button
            type="button"
            className="hidden lg:inline-flex items-center gap-2 bg-white/15 border border-[rgba(255,248,236,.24)] px-3 py-2 rounded-full text-[#FFF8EC] text-sm"
            onClick={() => setSearchOpen(true)}
            aria-label="পণ্য অনুসন্ধান খুলুন"
          >
            <Icon name="search" size={18} />
            <span>পণ্য খুঁজুন…</span>
          </button>

          <div className="flex items-center gap-1.5 min-w-0 flex-nowrap">
            <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/20 transition-colors"
              onClick={() => setSearchOpen(true)}
              aria-label="অনুসন্ধান"
            >
              <Icon name="search" size={21} />
            </button>

            <Link to="/wishlist" className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/20 transition-colors" aria-label={`উইশলিস্ট (${wishlistCount}টি পণ্য)`}>
              <Icon name="heart" size={21} />
              {wishlistCount > 0 && <span className="badge badge--lime">{wishlistCount}</span>}
            </Link>

            <Link to="/cart" className="relative inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-gradient-to-b from-orange to-orange2 text-[#1F2937] font-extrabold min-w-0" aria-label={`কার্ট (${cartCount}টি পণ্য)`}>
              <Icon name="cart" size={22} />
              <span className="flex flex-col leading-none text-left min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                <small className="text-[.8rem] font-bold">কার্ট</small>
                <strong className="text-[.95rem]">{cartCount} টি</strong>
              </span>
              {cartCount > 0 && <span className="badge badge--orange">{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* ── Primary navigation ── */}
        <nav className="bg-green700 text-[#FFF8EC] border-b border-[rgba(255,248,236,.12)] py-4" aria-label="প্রধান নেভিগেশন">
          <div className="max-w-max mx-auto px-4 md:px-5 flex items-center justify-between gap-4 py-1">
            <ul className="hidden lg:flex gap-1 flex-wrap">
              {PRIMARY_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => {
                      const active = item.to.includes('?')
                        ? location.search.includes(item.to.split('?')[1])
                        : isActive
                      return `inline-flex items-center gap-1 px-2 py-1 rounded-full font-bold opacity-90 hover:opacity-100 hover:bg-white/10 transition-colors ${active ? 'bg-[rgba(213,243,106,0.16)] text-lime opacity-100' : ''}`
                    }}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="hidden lg:flex items-center gap-1.5 opacity-90 text-[0.98rem]">
              <Icon name="user" size={15} />
              <span>{brand.ownerLabelBn}</span>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ── */}
      <div className={`fixed inset-0 z-[950] pointer-events-none max-w-full ${menuOpen ? 'pointer-events-auto' : ''}`} id="mobile-drawer" aria-hidden={!menuOpen}>
        <div className={`absolute inset-0 bg-[rgba(6,47,40,0.4)] transition-opacity duration-200 ease-out ${menuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeMenu} />
        <aside className={`absolute top-0 bottom-0 left-0 w-[min(86vw,360px)] max-w-full bg-gradient-to-b from-green700 to-[#05251F] text-[#FFF8EC] flex flex-col transition-transform duration-[250ms] ease-out overflow-y-auto overscroll-contain ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`} ref={drawerRef} role="dialog" aria-modal="true" aria-label="মেনু">
          <div className="flex items-center justify-between px-3 py-2.5">
            <Logo variant="dark" size={40} />
            <button type="button" className="icon-btn" onClick={closeMenu} aria-label="মেনু বন্ধ করুন">
              <Icon name="close" size={22} />
            </button>
          </div>

          <button
            type="button"
            className="mx-3 mb-2 flex items-center gap-2 px-3 py-2 rounded-full bg-white/15 border border-[rgba(255,248,236,.24)]"
            onClick={() => {
              closeMenu()
              setSearchOpen(true)
            }}
          >
            <Icon name="search" size={18} /> পণ্য খুঁজুন…
          </button>

          <div className="flex-1 overflow-auto px-3 flex flex-col gap-4">
            {DRAWER_GROUPS.map((group) => (
              <div className="flex flex-col gap-2" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((l) => (
                    <li key={l.to}>
                      <NavLink
                        to={l.to}
                        end={l.end}
                        className={({ isActive }) => `flex items-center justify-between px-2 py-2 rounded-md ${isActive ? 'bg-[rgba(213,243,106,0.16)] text-lime' : ''}`}
                        onClick={closeMenu}
                      >
                        {l.label}
                        <Icon name="chevronRight" size={16} />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="drawer__group">
              <h3>অতিরিক্ত</h3>
              <ul>
                <li>
                  <NavLink to="/faq" className="flex items-center justify-between px-2 py-2 rounded-md" onClick={closeMenu}>
                    সাধারণ জিজ্ঞাসা <Icon name="chevronRight" size={16} />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/wishlist" className="drawer__link" onClick={closeMenu}>
                    উইশলিস্ট <Icon name="chevronRight" size={16} />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/shipping-policy" className="drawer__link" onClick={closeMenu}>
                    নীতিমালা <Icon name="chevronRight" size={16} />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-3 flex flex-col gap-1.5 opacity-90">
            <a href={contactLinks.tel} onClick={closeMenu}>
              <Icon name="phone" size={16} /> {brand.phoneDisplay}
            </a>
            <a href={contactLinks.mail} onClick={closeMenu}>
              <Icon name="mail" size={16} /> {brand.email}
            </a>
            <p>
              <Icon name="location" size={16} /> {brand.addressBn}
            </p>
          </div>
        </aside>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
