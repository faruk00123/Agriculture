/**
 * ────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR BRAND + BUSINESS IDENTITY
 * ────────────────────────────────────────────────────────────────
 *  Approved brand name: KrishiProhori (কৃষিপ্রহরী)
 *  To rename the website later, change ONLY this file
 *  (+ the SVG wordmarks in /public and the <title> in index.html).
 *
 *  Owner name is NOT the brand name. Keep them separate.
 * ────────────────────────────────────────────────────────────────
 */

export const brand = {
  /* ── Identity ─────────────────────────────────────────── */
  name: 'KrishiProhori',
  nameBn: 'কৃষিপ্রহরী',
  tagline: 'কৃষকের আস্থায়, ফসলের সুরক্ষায়',
  taglineEn: "In farmers' trust, in crop protection",
  shortName: 'কৃষিপ্রহরী',

  /* ── Owner (kept visually separate from the brand) ───── */
  owner: 'Md. Omar Faruk',
  ownerBn: 'মোঃ ওমর ফারুক',
  ownerLabel: 'Owned by Md. Omar Faruk',
  ownerLabelBn: 'স্বত্বাধিকারী: মোঃ ওমর ফারুক',

  /* ── Contact / business details ──────────────────────── */
  phone: '+8801328086411',
  phoneDisplay: '+880 1328-086411',
  phoneBn: '০১৩২৮-০৮৬৪১১',
  email: 'omar013faruka@gmail.com',
  address: 'Barishal, Barishal Sadar, Bangladesh',
  addressBn: 'বরিশাল, বরিশাল সদর, বাংলাদেশ',
  country: 'বাংলাদেশ',
  market: 'Bangladesh',

  /* ── Commerce / locale ───────────────────────────────── */
  currency: { code: 'BDT', symbol: '৳', nameBn: 'বাংলাদেশি টাকা' },
  primaryLanguage: 'বাংলা',
  locale: 'bn-BD',

  /* ── Logo assets (files live in /public) ─────────────── */
  logo: {
    horizontalLight: './logo-horizontal-light.svg',
    horizontalDark: './logo-horizontal-dark.svg',
    icon: './logo-icon.svg',
    favicon: './favicon.svg',
  },

  /* ── SEO (mirrored in index.html) ────────────────────── */
  seo: {
    title: 'কৃষিপ্রহরী | কৃষকের আস্থায়, ফসলের সুরক্ষায়',
    description:
      'কৃষিপ্রহরী — বাংলাদেশের কৃষকের জন্য কীটনাশক, ছত্রাকনাশক, আগাছানাশক, সার, বীজ ও কৃষি সরঞ্জামের ফ্রন্টএন্ড ডেমো ই-কমার্স।',
  },
}

/**
 * Demonstration-commerce rules.
 * These are UI demo values shown on screen — NOT real offers,
 * delivery terms or business policies.
 */
export const demoRules = {
  deliveryFee: 120,
  freeDeliveryOver: 5000,
  discount: { percent: 7, minSubtotal: 10000 },
  labels: {
    demoBadge: 'ডেমো ডেটা',
    demoNotice:
      'এই ওয়েবসাইট একটি ফ্রন্টএন্ড ডেমো। দাম, স্টক, ছাড় ও রিভিউ কাল্পনিক উদাহরণ মাত্র।',
    noRealOrder:
      'কোনো প্রকৃত অর্ডার পাঠানো, সংরক্ষণ বা শেয়ার করা হয়নি। কোনো পেমেন্ট নেই।',
  },
}

export const contactLinks = {
  tel: `tel:${brand.phone}`,
  mail: `mailto:${brand.email}`,
}

export const formatPrice = (value) =>
  `${brand.currency.symbol}${Number(value || 0).toLocaleString('bn-BD')}`

export const formatPriceEn = (value) =>
  `${brand.currency.symbol}${Number(value || 0).toLocaleString('en-IN')}`

export default brand
