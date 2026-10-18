import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { brand, contactLinks, formatPrice } from '../config/brand'
import { mainCategories, subCategories } from '../data/categories'
import { countByCategory, countBySubCategory, byTag, products } from '../data/products'
import { crops, problems, articles, serviceHighlights } from '../data/content'
import ProductCard from '../components/ProductCard'
import HeroArt from '../components/HeroArt'
import Icon from '../components/Icon'
import { SectionHeading, DemoBadge, Note } from '../components/UI'

export default function Home() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  const featured = useMemo(() => byTag('featured').slice(0, 8), [])
  const popular = useMemo(() => byTag('popular').slice(0, 4), [])
  const fresh = useMemo(() => byTag('new').slice(0, 4), [])
  const latestArticles = useMemo(() => articles.slice(0, 3), [])
  const saleCount = useMemo(() => byTag('sale').length, [])

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : '/products')
  }

  const stats = [
    { value: `${products.length}+`, label: 'ডেমো পণ্য' },
    { value: `${mainCategories.length}`, label: 'প্রধান ক্যাটাগরি' },
    { value: `${subCategories.length}`, label: 'সাব-ক্যাটাগরি' },
    { value: '৮টি বিভাগ', label: 'সেবার সম্ভাবনা' },
  ]

  return (
    <>
      {/* ═════════ 1. Hero ═════════ */}
      <section className="bg-gradient-to-b from-[#0D6C4E] to-green700 text-[#FFF8EC] py-12 md:py-14">
        <div className="max-w-max mx-auto px-4 md:px-5 grid lg:grid-cols-[1.2fr_1fr] gap-6 items-center">
          <div className="hero__content">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-sm font-bold bg-lime text-green700 mb-3">
              <Icon name="sprout" size={15} /> {brand.nameBn} · {brand.name}
            </span>
            <h1>
              কৃষকের আস্থায়,
              <br />
              <em>ফসলের সুরক্ষায়</em>
            </h1>
            <p className="text-[#FFF8EC]/80 mt-2 mb-4 max-w-[660px]">
              কীটনাশক, ছত্রাকনাশক, আগাছানাশক, রাসায়নিক ও জৈব সার, মাইক্রোনিউট্রিয়েন্ট, বীজ, স্প্রেয়ার ও
              সেচের উপকরণ — সবকিছু এক জায়গায় দেখুন। এটি একটি ফ্রন্টএন্ড ডেমো ওয়েবসাইট।
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Link to="/products" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold bg-gradient-to-b from-orange to-orange2 text-[#1F2937] shadow-sm hover:brightness-[1.02] hover:shadow-md transition-all active:translate-y-px">
                <Icon name="cart" size={19} /> পণ্য দেখুন
              </Link>
              <Link to="/categories" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold bg-transparent text-[#FFF8EC] border-2 border-[rgba(255,248,236,0.4)] hover:brightness-105 transition-colors">
                <Icon name="grid" size={18} /> ক্যাটাগরি দেখুন
              </Link>
            </div>

            <form className="flex items-center gap-2 bg-white/15 border border-[rgba(255,248,236,.24)] px-2 py-1.5 rounded-full max-w-[560px]" onSubmit={submitSearch} role="search">
              <Icon name="search" size={19} />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="যেমন: কীটনাশক, সার, ধানের বীজ…"
                aria-label="হোমপেজ পণ্য অনুসন্ধান"
              />
              <button type="submit" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full font-bold bg-green500 text-white hover:bg-green600 transition-colors">
                অনুসন্ধান
              </button>
            </form>

            <ul className="flex flex-wrap gap-2 mt-4">
              <li>
                <Icon name="shield" size={16} /> নিরাপদ ব্রাউজিং
              </li>
              <li>
                <Icon name="phone" size={16} /> {brand.phoneDisplay}
              </li>
              <li>
                <Icon name="location" size={16} /> {brand.addressBn}
              </li>
            </ul>
          </div>

          <div className="hero__artWrap">
            <HeroArt />
            <span className="float-card float-card--1">
              <Icon name="leaf" size={17} />
              <strong>ফসল সুরক্ষা</strong>
              <small>কীট · ছত্রাক · আগাছা</small>
            </span>
            <span className="float-card float-card--2">
              <Icon name="sprout" size={17} />
              <strong>সার ও পুষ্টি</strong>
              <small>রাসায়নিক · জৈব · মাইক্রো</small>
            </span>
            <span className="float-card float-card--3">
              <Icon name="star" size={16} className="star" />
              <strong>{formatPrice(120)}</strong>
              <small>ডেমো ডেলিভারি ফি</small>
            </span>
          </div>
        </div>

        <div className="max-w-max mx-auto px-4 md:px-5">
          <ul className="hero__stats">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════ 2. Categories ═════════ */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionHeading
            kicker="ক্যাটাগরি"
            title="পণ্য ক্যাটাগরি অনুযায়ী দেখুন"
            desc="চারটি প্রধান গ্রুপ ও ১৯টি সাব-ক্যাটাগরি — সবই ডেমো ডেটা দিয়ে পূর্ণ।"
            action={
              <Link to="/categories" className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm bg-[#1f29370f] text-ink hover:bg-[#1f29371a] transition-colors">
                সব ক্যাটাগরি <Icon name="arrowRight" size={16} />
              </Link>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {mainCategories.map((c) => (
              <Link key={c.slug} to={`/products?cat=${c.slug}`} className={`cat-card tone-${c.tone}`}>
                <span className="cat-card__ico">
                  <Icon name={c.icon} size={28} />
                </span>
                <h3>{c.titleBn}</h3>
                <p>{c.descBn}</p>
                <span className="cat-card__count">{countByCategory(c.slug)}টি পণ্য</span>
                <span className="cat-card__go">
                  দেখুন <Icon name="arrowRight" size={15} />
                </span>
              </Link>
            ))}
          </div>

          <ul className="subcat-chips">
            {subCategories.map((s) => (
              <li key={s.slug}>
                <Link to={`/products?cat=${s.parent}&sub=${s.slug}`} className={`chip tone-${s.tone}`}>
                  <Icon name={s.icon} size={14} />
                  {s.titleBn}
                  <em>{countBySubCategory(s.slug)}</em>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════ 3. Featured ═════════ */}
      <section className="py-16 md:py-20 bg-bg-tint">
        <div className="container">
          <SectionHeading
            kicker="নির্বাচিত"
            title="ফিচার্ড পণ্যসমূহ"
            desc="ডেমো ক্যাটালগ থেকে বাছাই করা কয়েকটি পণ্য। দাম ও স্টক কাল্পনিক।"
            action={
              <Link to="/products" className="btn btn--ghost btn--sm">
                সব পণ্য <Icon name="arrowRight" size={16} />
              </Link>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ 4. Popular ═════════ */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionHeading
            kicker="চাহিদা অনুযায়ী"
            title="জনপ্রিয় পণ্য"
            desc="ডেমো রিভিউ ও তার্কিকভাবে সাজানো জনপ্রিয় এন্ট্রি।"
            action={
              <Link to="/products?sort=rating" className="btn btn--ghost btn--sm">
                আরও দেখুন <Icon name="arrowRight" size={16} />
              </Link>
            }
          />
          <div className="pgrid pgrid--4">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ 5. New arrivals ═════════ */}
      <section className="py-16 md:py-20 bg-bg2">
        <div className="container">
          <SectionHeading
            kicker="নতুন যোগ"
            title="সদ্য যোগ হওয়া পণ্য"
            desc="সাম্প্রতিক যোগ হওয়া ডেমো এন্ট্রি সমূহ (তারিখ অনুযায়ী সাজানো)।"
            action={
              <Link to="/products?sort=newest" className="btn btn--ghost btn--sm">
                নতুন সব <Icon name="arrowRight" size={16} />
              </Link>
            }
          />
          <div className="pgrid pgrid--4">
            {fresh.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ 6. Shop by crop ═════════ */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionHeading
            kicker="ফসল অনুযায়ী"
            title="কোন ফসলের জন্য কী দরকার?"
            desc="আপনার ফসল বেছে নিন — সেই ফসলের সঙ্গে সম্পর্কিত ডেমো পণ্য দেখাবে।"
          />
          <ul className="crop-grid">
            {crops.map((c) => (
              <li key={c.slug}>
                <Link to={`/products?crop=${c.slug}`} className={`crop-chip tone-${c.tone}`}>
                  <span className="crop-chip__ico">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <span className="crop-chip__name">{c.titleBn}</span>
                  <em>{products.filter((p) => p.crops.includes(c.slug)).length} টি</em>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════ 7. Shop by problem ═════════ */}
      <section className="py-16 md:py-20 bg-bg-tint">
        <div className="container">
          <SectionHeading
            kicker="সমস্যা অনুযায়ী"
            title="সমস্যা ধরে পণ্য খুঁজুন"
            desc="জমিতে যে সমস্যা দেখছেন, সেটি বেছে নিয়ে সম্ভাব্য ডেমো সমাধান দেখুন।"
          />
          <div className="prob-grid">
            {problems.map((p) => {
              const count = products.filter((x) => x.problems.includes(p.slug)).length
              return (
                <Link key={p.slug} to={`/products?problem=${p.slug}`} className={`prob-card tone-${p.tone}`}>
                  <span className="prob-card__ico">
                    <Icon name={p.icon} size={24} />
                  </span>
                  <h3>{p.titleBn}</h3>
                  <p>{p.descBn}</p>
                  <span className="prob-card__count">{count}টি পণ্য</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═════════ 8. Promo banner ═════════ */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="promo">
            <div className="promo__left">
              <span className="promo__tag">
                <Icon name="gift" size={16} /> ডেমো প্রোমোশন
              </span>
              <h2>
                ডেমো অফার: {saleCount}টি পণ্যে <em>৭% ছাড়</em> দেখানো হচ্ছে
              </h2>
              <p>
                উপরের কার্ট নীতি অনুযায়ী {formatPrice(10000)}+ সাবটোটালে ৭% ডেমো ছাড় এবং{' '}
                {formatPrice(5000)}+ অর্ডারে ডেমো ডেলিভারি ফি শূন্য দেখানো হয়। এগুলো কাল্পনিক মান।
              </p>
              <div className="promo__cta">
                <Link to="/products?tag=sale" className="btn btn--orange btn--lg">
                  ডেমো অফার দেখুন <Icon name="arrowRight" size={17} />
                </Link>
                <Link to="/faq" className="btn btn--ghost btn--lg btn--onLight">
                  কীভাবে কাজ করে?
                </Link>
              </div>
            </div>
            <div className="promo__right">
              <span className="promo__pct">৭%</span>
              <span className="promo__pctLabel">ডেমো ছাড়</span>
              <ul>
                <li>
                  <Icon name="check" size={16} /> কার্টে স্বয়ংক্রিয় হিসাব
                </li>
                <li>
                  <Icon name="check" size={16} /> কোনো সার্ভার নেই
                </li>
                <li>
                  <Icon name="check" size={16} /> কোনো পেমেন্ট নেই
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ 9. Knowledge articles ═════════ */}
      <section className="py-16 md:py-20 bg-bg-tint">
        <div className="container">
          <SectionHeading
            kicker="কৃষিপরামর্শ"
            title="কৃষি জ্ঞান নিবন্ধ"
            desc="সাধারণ ও নিরাপদ তথ্যভিত্তিক লেখা — কোনো নির্দিষ্ট পণ্যের নির্দেশনা নয়।"
            action={
              <Link to="/advice" className="btn btn--ghost btn--sm">
                সব নিবন্ধ <Icon name="arrowRight" size={16} />
              </Link>
            }
          />
          <div className="art-grid">
            {latestArticles.map((a) => (
              <Link key={a.slug} to={`/advice/${a.slug}`} className={`art-card tone-${a.tone}`}>
                <span className="art-card__cover">
                  <Icon name={a.icon} size={34} />
                </span>
                <div className="art-card__body">
                  <div className="art-card__meta">
                    <span>{a.category}</span>
                    <span>
                      <Icon name="clock" size={13} /> {a.readTime}
                    </span>
                  </div>
                  <h3>{a.titleBn}</h3>
                  <p>{a.excerptBn}</p>
                  <span className="art-card__more">
                    পড়ুন <Icon name="arrowRight" size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ 10. Customer service ═════════ */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionHeading kicker="গ্রাহক সেবা" title="কেনা-বেচা সহজ ও স্বচ্ছ" desc="সেবার বৈশিষ্ট্য ও সরাসরি যোগাযোগের উপায়।" />
          <div className="svc-grid">
            {serviceHighlights.map((s) => (
              <div key={s.titleBn} className={`svc-card tone-${s.tone}`}>
                <span className="svc-card__ico">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3>{s.titleBn}</h3>
                <p>{s.descBn}</p>
              </div>
            ))}
          </div>

          <div className="contact-strip">
            <div className="contact-strip__item">
              <Icon name="phone" size={20} />
              <div>
                <small>ফোন</small>
                <a href={contactLinks.tel}>{brand.phoneDisplay}</a>
              </div>
            </div>
            <div className="contact-strip__item">
              <Icon name="mail" size={20} />
              <div>
                <small>ইমেইল</small>
                <a href={contactLinks.mail}>{brand.email}</a>
              </div>
            </div>
            <div className="contact-strip__item">
              <Icon name="location" size={20} />
              <div>
                <small>ঠিকানা</small>
                <span>{brand.addressBn}</span>
              </div>
            </div>
            <Link to="/contact" className="btn btn--orange">
              যোগাযোগ করুন <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════ 11. About the business ═════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0b5d45] to-[#062f28] text-[#FFF8EC]">
        <div className="container about-band">
          <div className="about-band__text">
            <span className="kicker kicker--lime">
              <Icon name="leaf" size={14} /> আমাদের সম্পর্কে
            </span>
            <h2>{brand.nameBn} — কৃষি পণ্যের বিশ্বস্ত ডিজিটাল প্রদর্শনী</h2>
            <p>
              এই ওয়েবসাইটটি বাংলাদেশের ক্রেতাদের ফসল সুরক্ষা পণ্য, সার, উদ্ভিদ পুষ্টি উপকরণ, বীজ ও কৃষি
              সহায়ক সরঞ্জাম অনুসন্ধান, তুলনা ও কার্টে রাখার সুবিধা দিতে তৈরি একটি ফ্রন্টএন্ড ডেমো।
            </p>
            <ul className="tick-list">
              <li>
                <Icon name="check" size={16} /> ক্যাটাগরি, ব্র্যান্ড, ফসল ও দামের ফিল্টার
              </li>
              <li>
                <Icon name="check" size={16} /> কার্ট, উইশলিস্ট ও চেকআউট ডেমো প্রবাহ
              </li>
              <li>
                <Icon name="check" size={16} /> কোনো ব্যক্তিগত তথ্য সংরক্ষণ বা পাঠানো হয় না
              </li>
            </ul>
            <div className="hero__cta">
              <Link to="/about" className="btn btn--lime">
                আমাদের সম্পর্কে জানুন
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full font-bold bg-transparent text-[#FFF8EC] border-2 border-[rgba(255,248,236,0.4)]">
                যোগাযোগ
              </Link>
            </div>
          </div>

          <aside className="owner-card">
            <span className="owner-card__ico">
              <Icon name="user" size={26} />
            </span>
            <small>স্বত্বাধিকারী</small>
            <h3>{brand.owner}</h3>
            <p>{brand.ownerBn}</p>
            <hr />
            <a href={contactLinks.tel}>
              <Icon name="phone" size={15} /> {brand.phoneDisplay}
            </a>
            <a href={contactLinks.mail}>
              <Icon name="mail" size={15} /> {brand.email}
            </a>
            <span className="owner-card__addr">
              <Icon name="location" size={15} /> {brand.addressBn}
            </span>
            <DemoBadge />
          </aside>
        </div>
      </section>

      {/* ═════════ Safety note ═════════ */}
      <section className="py-6 md:py-10">
        <div className="container">
          <Note tone="harvest" icon="alert">
            <strong>গুরুত্বপূর্ণ:</strong> {brand.nameBn} কোনো পণ্যের মাত্রা, প্রয়োগবিধি, নিরাপত্তা বিরতি বা
            নিবন্ধন তথ্য প্রদান করে না। প্রকৃত ব্যবহারের আগে পণ্যের লেবেল ও অনুমোদিত উৎসের নির্দেশনা অনুসরণ করুন।
          </Note>
        </div>
      </section>
    </>
  )
}
