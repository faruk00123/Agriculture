import { Link } from 'react-router-dom'
import { brand, contactLinks } from '../config/brand'
import { mainCategories, subCategories } from '../data/categories'
import { LogoMark } from './Logo'
import Icon from './Icon'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-[#0b5d45] to-[#031814] text-[#FFF8EC] mt-auto">
      <div className="max-w-max mx-auto px-4 md:px-5 grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] py-6 md:py-9">
        {/* ── Brand ── */}
        <div className="footer__brand">
          <div className="flex items-center gap-2 mb-2.5">
            <LogoMark size={46} variant="dark" />
            <span>
              <strong>{brand.nameBn}</strong>
              <small>{brand.name}</small>
            </span>
          </div>
          <p className="text-[#FFF8EC]/90 mb-2">
            বাংলাদেশের কৃষকদের জন্য ফসল সুরক্ষা, সার, বীজ ও কৃষি সহায়ক উপকরণের একটি ফ্রন্টএন্ড ডেমো
            ই-কমার্স অভিজ্ঞতা। {brand.tagline}
          </p>
          <p className="flex items-center gap-1.5 text-[#FFF8EC]/90">
            <Icon name="user" size={15} /> {brand.ownerLabelBn}
          </p>
        </div>

        {/* ── Product categories ── */}
        <nav className="flex flex-col gap-2" aria-label="পণ্য ক্যাটাগরি">
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
          <ul className="flex flex-col gap-2.5">
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
            <li className="flex items-start gap-2">
              <Icon name="location" size={16} /> <span>{brand.addressBn}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Policies ── */}
      <div className="border-t border-[rgba(255,248,236,.18)] border-b border-[rgba(255,248,236,.18)]">
        <div className="max-w-max mx-auto px-4 md:px-5 flex flex-wrap justify-between gap-2.5 py-2.5">
          <nav className="flex flex-wrap gap-2.5" aria-label="নীতিমালা">
            <Link to="/shipping-policy">ডেলিভারি নীতি</Link>
            <Link to="/return-policy">রিটার্ন নীতি</Link>
            <Link to="/privacy-policy">গোপনীয়তা নীতি</Link>
            <Link to="/terms">শর্তাবলি</Link>
          </nav>
          <p className="flex items-center gap-1.5 text-[#FFF8EC]/90">
            <Icon name="info" size={15} /> এটি ফ্রন্টএন্ড ডেমো — কোনো প্রকৃত অর্ডার, পেমেন্ট বা ডেলিভারি নেই।
          </p>
        </div>
      </div>

      {/* ── Bottom ── */}
      <div className="bg-[#020b09]">
        <div className="max-w-max mx-auto px-4 md:px-5 flex flex-wrap justify-between gap-1.5 py-2">
          <p>
            © {year} {brand.nameBn} ({brand.name}) — {brand.ownerLabel}
          </p>
          <p className="text-[#FFF8EC]/65 text-sm">
            সকল পণ্য ও মূল্য কাল্পনিক ডেমো ডেটা · ট্রেডমার্ক/ডোমেইন যাচাইকৃত নয়
          </p>
        </div>
      </div>
    </footer>
  )
}
