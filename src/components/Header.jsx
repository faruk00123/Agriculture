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

      <header className={`header${scrolled ? ' header--stuck' : ''}`}>
        <div className="container header__top">
          <button
            ref={burgerRef}
            type="button"
            className="icon-btn header__burger"
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
            className="header__search"
            onClick={() => setSearchOpen(true)}
            aria-label="পণ্য অনুসন্ধান খুলুন"
          >
            <Icon name="search" size={18} />
            <span>পণ্য খুঁজুন…</span>
          </button>

          <div className="header__actions">
            <button
              type="button"
              className="icon-btn header__searchBtn"
              onClick={() => setSearchOpen(true)}
              aria-label="অনুসন্ধান"
            >
              <Icon name="search" size={21} />
            </button>

            <Link to="/wishlist" className="icon-btn header__wish" aria-label={`উইশলিস্ট (${wishlistCount}টি পণ্য)`}>
              <Icon name="heart" size={21} />
              {wishlistCount > 0 && <span className="badge badge--lime">{wishlistCount}</span>}
            </Link>

            <Link to="/cart" className="cart-btn" aria-label={`কার্ট (${cartCount}টি পণ্য)`}>
              <Icon name="cart" size={22} />
              <span className="cart-btn__text">
                <small>কার্ট</small>
                <strong>{cartCount} টি</strong>
              </span>
              {cartCount > 0 && <span className="badge badge--orange">{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* ── Primary navigation ── */}
        <nav className="nav" aria-label="প্রধান নেভিগেশন">
          <div className="container nav__inner">
            <ul className="nav__list">
              {PRIMARY_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => {
                      const active = item.to.includes('?')
                        ? location.search.includes(item.to.split('?')[1])
                        : isActive
                      return `nav__link${active ? ' is-active' : ''}`
                    }}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="nav__owner">
              <Icon name="user" size={15} />
              <span>{brand.ownerLabelBn}</span>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ── */}
      <div className={`drawer${menuOpen ? ' is-open' : ''}`} id="mobile-drawer" aria-hidden={!menuOpen}>
        <div className="drawer__backdrop" onClick={closeMenu} />
        <aside className="drawer__panel" ref={drawerRef} role="dialog" aria-modal="true" aria-label="মেনু">
          <div className="drawer__head">
            <Logo variant="dark" size={40} />
            <button type="button" className="icon-btn" onClick={closeMenu} aria-label="মেনু বন্ধ করুন">
              <Icon name="close" size={22} />
            </button>
          </div>

          <button
            type="button"
            className="drawer__search"
            onClick={() => {
              closeMenu()
              setSearchOpen(true)
            }}
          >
            <Icon name="search" size={18} /> পণ্য খুঁজুন…
          </button>

          <div className="drawer__body">
            {DRAWER_GROUPS.map((group) => (
              <div className="drawer__group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((l) => (
                    <li key={l.to}>
                      <NavLink
                        to={l.to}
                        end={l.end}
                        className={({ isActive }) => `drawer__link${isActive ? ' is-active' : ''}`}
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
                  <NavLink to="/faq" className="drawer__link" onClick={closeMenu}>
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

          <div className="drawer__foot">
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
