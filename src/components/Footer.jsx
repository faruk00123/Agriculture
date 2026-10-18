import { Link } from 'react-router-dom'
import { brand, contactLinks } from '../config/brand'
import { mainCategories, subCategories } from '../data/categories'
import { LogoMark } from './Logo'
import Icon from './Icon'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        {/* ── Brand ── */}
        <div className="footer__brand">
          <div className="footer__logo">
            <LogoMark size={46} variant="dark" />
            <span>
              <strong>{brand.nameBn}</strong>
              <small>{brand.name}</small>
            </span>
          </div>
          <p className="footer__desc">
            বাংলাদেশের কৃষকদের জন্য ফসল সুরক্ষা, সার, বীজ ও কৃষি সহায়ক উপকরণের একটি ফ্রন্টএন্ড ডেমো
            ই-কমার্স অভিজ্ঞতা। {brand.tagline}
          </p>
          <p className="footer__owner">
            <Icon name="user" size={15} /> {brand.ownerLabelBn}
          </p>
        </div>

        {/* ── Product categories ── */}
        <nav className="footer__col" aria-label="পণ্য ক্যাটাগরি">
          <h3>পণ্য ক্যাটাগরি</h3>
          <ul>
            {mainCategories.map((c) => (
              <li key={c.slug}>
                <Link to={`/products?cat=${c.slug}`}>{c.titleBn}</Link>
              </li>
            ))}
            {subCategories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to={`/products?cat=${c.parent}&sub=${c.slug}`}>{c.titleBn}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Customer support ── */}
        <nav className="footer__col" aria-label="গ্রাহক সেবা">
          <h3>গ্রাহক সেবা</h3>
          <ul>
            <li>
              <Link to="/products">সকল পণ্য</Link>
            </li>
            <li>
              <Link to="/categories">ক্যাটাগরি</Link>
            </li>
            <li>
              <Link to="/advice">কৃষিপরামর্শ</Link>
            </li>
            <li>
              <Link to="/faq">সাধারণ জিজ্ঞাসা (FAQ)</Link>
            </li>
            <li>
              <Link to="/cart">শপিং কার্ট</Link>
            </li>
            <li>
              <Link to="/wishlist">উইশলিস্ট</Link>
            </li>
          </ul>
        </nav>

        {/* ── Contact ── */}
        <div className="footer__col footer__contact">
          <h3>যোগাযোগ</h3>
          <ul className="footer__contactList">
            <li>
              <Link to="/about">
                <Icon name="user" size={16} /> {brand.ownerLabel}
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <Icon name="mail" size={16} /> আমাদের সম্পর্কে ও যোগাযোগ
              </Link>
            </li>
            <li>
              <a href={contactLinks.tel}>
                <Icon name="phone" size={16} /> {brand.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contactLinks.mail}>
                <Icon name="mail" size={16} /> {brand.email}
              </a>
            </li>
            <li className="footer__addr">
              <Icon name="location" size={16} /> <span>{brand.addressBn}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Policies ── */}
      <div className="footer__mid">
        <div className="container footer__midInner">
          <nav className="footer__policies" aria-label="নীতিমালা">
            <Link to="/shipping-policy">ডেলিভারি নীতি</Link>
            <Link to="/return-policy">রিটার্ন নীতি</Link>
            <Link to="/privacy-policy">গোপনীয়তা নীতি</Link>
            <Link to="/terms">শর্তাবলি</Link>
          </nav>
          <p className="footer__demo">
            <Icon name="info" size={15} /> এটি ফ্রন্টএন্ড ডেমো — কোনো প্রকৃত অর্ডার, পেমেন্ট বা ডেলিভারি নেই।
          </p>
        </div>
      </div>

      {/* ── Bottom ── */}
      <div className="footer__bottom">
        <div className="container footer__bottomInner">
          <p>
            © {year} {brand.nameBn} ({brand.name}) — {brand.ownerLabel}
          </p>
          <p className="footer__fine">
            সকল পণ্য ও মূল্য কাল্পনিক ডেমো ডেটা · ট্রেডমার্ক/ডোমেইন যাচাইকৃত নয়
          </p>
        </div>
      </div>
    </footer>
  )
}
