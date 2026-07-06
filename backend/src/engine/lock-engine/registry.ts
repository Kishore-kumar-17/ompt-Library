import {
  parsePeoplePortraitPrompt,
  parseProductEcommercePrompt,
  parseFashionApparelPrompt,
  parseMarketingAdsPrompt,
  parseArtIllustrationPrompt,
  parseTrendingViralPrompt,
  parseSocialMediaPrompt,
} from "./parser.js";
import { peopleLockTemplate } from "./locks/people.js";
import { peopleNegativeLocks } from "./negatives/people.js";
import { productLockTemplate } from "./locks/product.js";
import { productNegativeLocks } from "./negatives/product.js";
import { fashionLockTemplate } from "./locks/fashion.js";
import { fashionNegativeLocks } from "./negatives/fashion.js";
import { marketingLockTemplate } from "./locks/marketing.js";
import { marketingNegativeLocks } from "./negatives/marketing.js";
import { artLockTemplate } from "./locks/art.js";
import { artNegativeLocks } from "./negatives/art.js";
import { trendingLockTemplate } from "./locks/trending.js";
import { trendingNegativeLocks } from "./negatives/trending.js";
import { socialLockTemplate } from "./locks/social.js";
import { socialNegativeLocks } from "./negatives/social.js";
import type {
  CategoryId,
  ExtractedPromptFields,
  LockTemplate,
  PromptRecord,
} from "./types.js";

/**
 * Bundles everything the orchestrator needs to produce a lock layer for one
 * category: the lock template, the negative locks, and the parser that turns a
 * prompt's description layer into structured fields.
 */
export interface CategoryEngine {
  template: LockTemplate;
  negatives: string[];
  parse: (prompt: PromptRecord, platformText?: string | null) => ExtractedPromptFields;
}

/**
 * The single extension point for new categories. Only People & Portraits is
 * implemented for the MVP; any unmapped category triggers graceful passthrough
 * in the orchestrator (platform variant returned without a lock layer).
 *
 * Adding Fashion, Product, etc. later = add its parser + locks + negatives and
 * register one entry here. No orchestrator change required.
 */
export const CATEGORY_ENGINES: Partial<Record<CategoryId, CategoryEngine>> = {
  "people-portraits": {
    template: peopleLockTemplate,
    negatives: peopleNegativeLocks,
    parse: parsePeoplePortraitPrompt,
  },
  "product-ecommerce": {
    template: productLockTemplate,
    negatives: productNegativeLocks,
    parse: parseProductEcommercePrompt,
  },
  "fashion-apparel": {
    template: fashionLockTemplate,
    negatives: fashionNegativeLocks,
    parse: parseFashionApparelPrompt,
  },
  "marketing-ads": {
    template: marketingLockTemplate,
    negatives: marketingNegativeLocks,
    parse: parseMarketingAdsPrompt,
  },
  "art-illustration": {
    template: artLockTemplate,
    negatives: artNegativeLocks,
    parse: parseArtIllustrationPrompt,
  },
  "trending-viral": {
    template: trendingLockTemplate,
    negatives: trendingNegativeLocks,
    parse: parseTrendingViralPrompt,
  },
  "social-media": {
    template: socialLockTemplate,
    negatives: socialNegativeLocks,
    parse: parseSocialMediaPrompt,
  },
};

export function getCategoryEngine(categoryId: CategoryId): CategoryEngine | null {
  return CATEGORY_ENGINES[categoryId] ?? null;
}
