/**
 * Category structure — reused by header, homepage, categories page,
 * filters and footer. Counts are computed from /data/products.js.
 * Icons reference the inline <Icon /> set in components/Icon.jsx.
 */

export const mainCategories = [
  {
    slug: 'crop-protection',
    titleBn: 'ফসল সুরক্ষা',
    titleEn: 'Crop Protection',
    descBn: 'কীট, ছত্রাক ও আগাছা নিয়ন্ত্রণের ডেমো পণ্যসমূহ',
    icon: 'shield',
    tone: 'mint',
  },
  {
    slug: 'fertilizers',
    titleBn: 'সার ও উদ্ভিদ পুষ্টি',
    titleEn: 'Fertilizers & Nutrition',
    descBn: 'রাসায়নিক, জৈব সার ও মাটির উন্নয়নের ডেমো পণ্য',
    icon: 'sprout',
    tone: 'harvest',
  },
  {
    slug: 'seeds',
    titleBn: 'বীজ',
    titleEn: 'Seeds',
    descBn: 'ধান, সবজি ও ভুট্টার ডেমো বীজ সংগ্রহ',
    icon: 'seed',
    tone: 'peach',
  },
  {
    slug: 'accessories',
    titleBn: 'কৃষি সহায়ক উপকরণ',
    titleEn: 'Agri Accessories',
    descBn: 'স্প্রেয়ার, সেচ ও সুরক্ষামূলক সরঞ্জামের ডেমো পণ্য',
    icon: 'sprayer',
    tone: 'sky',
  },
]

export const subCategories = [
  /* ── Crop protection ── */
  { slug: 'insecticide', titleBn: 'কীটনাশক', parent: 'crop-protection', icon: 'bug', tone: 'mint' },
  { slug: 'fungicide', titleBn: 'ছত্রাকনাশক', parent: 'crop-protection', icon: 'fungus', tone: 'lavender' },
  { slug: 'herbicide', titleBn: 'আগাছানাশক', parent: 'crop-protection', icon: 'weed', tone: 'harvest' },
  { slug: 'other-control', titleBn: 'অন্যান্য বালাই দমনকারী পণ্য', parent: 'crop-protection', icon: 'beetle', tone: 'sky' },
  { slug: 'bio-control', titleBn: 'জৈব বালাইনাশক', parent: 'crop-protection', icon: 'leaf', tone: 'mint' },

  /* ── Fertilizers & plant nutrition ── */
  { slug: 'chemical-fertilizer', titleBn: 'রাসায়নিক সার', parent: 'fertilizers', icon: 'bag', tone: 'harvest' },
  { slug: 'organic-fertilizer', titleBn: 'জৈব সার', parent: 'fertilizers', icon: 'compost', tone: 'mint' },
  { slug: 'micronutrient', titleBn: 'মাইক্রোনিউট্রিয়েন্ট', parent: 'fertilizers', icon: 'droplet', tone: 'sky' },
  { slug: 'plant-nutrition', titleBn: 'উদ্ভিদের পুষ্টি উপকরণ', parent: 'fertilizers', icon: 'flask', tone: 'lavender' },
  { slug: 'soil-improver', titleBn: 'মাটির উন্নয়ন উপকরণ', parent: 'fertilizers', icon: 'soil', tone: 'peach' },

  /* ── Seeds ── */
  { slug: 'rice-seed', titleBn: 'ধানের বীজ', parent: 'seeds', icon: 'rice', tone: 'mint' },
  { slug: 'vegetable-seed', titleBn: 'সবজির বীজ', parent: 'seeds', icon: 'tomato', tone: 'coral' },
  { slug: 'maize-seed', titleBn: 'ভুট্টার বীজ', parent: 'seeds', icon: 'corn', tone: 'harvest' },
  { slug: 'other-seed', titleBn: 'অন্যান্য কৃষিবীজ', parent: 'seeds', icon: 'seedling', tone: 'sky' },

  /* ── Agricultural accessories ── */
  { slug: 'sprayer', titleBn: 'স্প্রেয়ার', parent: 'accessories', icon: 'sprayer', tone: 'sky' },
  { slug: 'spray-nozzle', titleBn: 'স্প্রে নোজল', parent: 'accessories', icon: 'nozzle', tone: 'lavender' },
  { slug: 'protective-equipment', titleBn: 'সুরক্ষামূলক সরঞ্জাম', parent: 'accessories', icon: 'mask', tone: 'peach' },
  { slug: 'irrigation', titleBn: 'সেচের উপকরণ', parent: 'accessories', icon: 'irrigation', tone: 'mint' },
  { slug: 'farm-tool', titleBn: 'কৃষি সরঞ্জাম', parent: 'accessories', icon: 'tool', tone: 'harvest' },
]

export const getCategory = (slug) =>
  mainCategories.find((c) => c.slug === slug) || null

export const getSubCategory = (slug) =>
  subCategories.find((c) => c.slug === slug) || null

export const subCategoriesOf = (parentSlug) =>
  subCategories.filter((c) => c.parent === parentSlug)

export const allCategoryOptions = [...mainCategories, ...subCategories]
