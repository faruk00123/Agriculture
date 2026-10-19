import { Link } from 'react-router-dom'
import { brand, contactLinks } from '../config/brand'
import { mainCategories, subCategories } from '../data/categories'
import { LogoMark } from './Logo'
import Icon from './Icon'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-[radial-gradient(1200px_80%_at_50%_0%,#0B5D45_0%,#031814_100%)] text-[#FFF8EC]">
      <div className="container grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-8 lg:py-10">
        {/* ── Brand ── */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-3 flex items-center gap-2">
            <LogoMark size={46} variant="dark" />
            <span className="flex flex-col leading-none">
              <strong className="text-[1.15rem] font-extrabold">{brand.nameBn}</strong>
              <small className="font-manrope text-[.82rem] font-extrabold uppercase tracking-[.24em] opacity-80">
                {brand.name}
              </small>
            </span>
          </div>
          <p className="mb-2 max-w-[42ch] text-[#FFF8EC]/85">
            বাংলাদেশের কৃষকদের জন্য ফসল সুরক্ষা, সার, বীজ ও কৃষি সহায়ক উপকরণের একটি ফ্রন্টএন্ড ডেমো
            ই-কমার্স অভিজ্ঞতা। {brand.tagline}
          </p>
          <p className="flex items-center gap-1.5 text-[#FFF8EC]/90">
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
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link to="/about" className="flex items-start gap-2">
                <Icon name="user" size={16} /> <span>{brand.ownerLabel}</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-start gap-2">
                <Icon name="mail" size={16} /> <span>আমাদের সম্পর্কে ও যোগাযোগ</span>
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
            <li>
              <Icon name="location" size={16} /> <span>{brand.addressBn}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Policies ── */}
      <div className="border-y border-[#FFF8EC]/20">
        <div className="container flex flex-wrap items-center justify-between gap-2.5 py-3">
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="নীতিমালা">
            <Link to="/shipping-policy" className="font-bold text-[#FFF8EC]/85 hover:text-lime">
              ডেলিভারি নীতি
            </Link>
            <Link to="/return-policy" className="font-bold text-[#FFF8EC]/85 hover:text-lime">
              রিটার্ন নীতি
            </Link>
            <Link to="/privacy-policy" className="font-bold text-[#FFF8EC]/85 hover:text-lime">
              গোপনীয়তা নীতি
            </Link>
            <Link to="/terms" className="font-bold text-[#FFF8EC]/85 hover:text-lime">
              শর্তাবলি
            </Link>
          </nav>
          <p className="flex items-center gap-1.5 text-[#FFF8EC]/85">
            <Icon name="info" size={15} /> এটি ফ্রন্টএন্ড ডেমো — কোনো প্রকৃত অর্ডার, পেমেন্ট বা ডেলিভারি নেই।
          </p>
        </div>
      </div>

      {/* ── Bottom ── */}
      <div className="bg-[#020b09]">
        <div className="container flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
          <p className="text-[#FFF8EC]/85">
            © {year} {brand.nameBn} ({brand.name}) — {brand.ownerLabel}
          </p>
          <p className="text-sm text-[#FFF8EC]/65">
            সকল পণ্য ও মূল্য কাল্পনিক ডেমো ডেটা · ট্রেডমার্ক/ডোমেইন যাচাইকৃত নয়
          </p>
        </div>
      </div>
    </footer>
  )
}
