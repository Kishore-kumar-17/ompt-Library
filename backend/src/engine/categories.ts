import type { CategoryId } from "./types.js";

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  "people-portraits": "People & Portraits",
  "fashion-apparel": "Fashion & Apparel",
  "product-ecommerce": "Product & Ecommerce",
  "marketing-ads": "Marketing & Ads",
  "art-illustration": "Art & Illustration",
  "trending-viral": "Trending & Viral",
  "social-media": "Social Media",
};

const CATEGORY_ALIASES: Record<string, CategoryId> = {
  "people & portraits": "people-portraits",
  "people and portraits": "people-portraits",
  portraits: "people-portraits",
  portrait: "people-portraits",
  people: "people-portraits",

  "fashion & apparel": "fashion-apparel",
  "fashion and apparel": "fashion-apparel",
  fashion: "fashion-apparel",
  apparel: "fashion-apparel",

  "product & ecommerce": "product-ecommerce",
  "product & e-commerce": "product-ecommerce",
  "product & e-com": "product-ecommerce",
  "product and ecommerce": "product-ecommerce",
  "product and e-commerce": "product-ecommerce",
  product: "product-ecommerce",
  ecommerce: "product-ecommerce",
  "e-commerce": "product-ecommerce",
  "e-com": "product-ecommerce",

  "marketing & ads": "marketing-ads",
  "marketing and ads": "marketing-ads",
  marketing: "marketing-ads",
  ads: "marketing-ads",
  advertising: "marketing-ads",

  "art & illustration": "art-illustration",
  "art and illustration": "art-illustration",
  art: "art-illustration",
  illustration: "art-illustration",

  "trending & viral": "trending-viral",
  "trending and viral": "trending-viral",
  trending: "trending-viral",
  viral: "trending-viral",

  "social media": "social-media",
  social: "social-media",
};

export function normalizeCategoryLabel(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function resolveCategoryId(categoryLabel: string): CategoryId | null {
  return CATEGORY_ALIASES[normalizeCategoryLabel(categoryLabel)] ?? null;
}

export function getCategoryLabel(categoryId: CategoryId): string {
  return CATEGORY_LABELS[categoryId];
}

export function isSupportedCategory(categoryLabel: string): boolean {
  return resolveCategoryId(categoryLabel) !== null;
}
