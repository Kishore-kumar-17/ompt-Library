// ─── Image Lock Layer — additive, route-level only ─────────────────────────────
// routes/builder.ts and routes/improver.ts both used to hardcode empty
// lockSection/negativeLocks regardless of what the engine produced. Real lock
// generation (generateLocks/NEGATIVE_LOCKS) already exists and is proven
// working — the rule-engine improve path builds it internally and then
// discards it before the response. This computes the same data independently
// at the route layer, using whatever category the route already has on hand
// (Builder: the user's own chip selection; Improver: the detected/overridden
// category already surfaced via metadata.category) — deliberately NOT wired
// into engine/modules/*.ts, so it can't change the prompt text itself or risk
// existing generation quality.

import { generateLocks } from "../engine/rule-engine/lock-generator.js";
import { NEGATIVE_LOCKS } from "../engine/rule-engine/dictionaries.js";
import type { RuleEngineCategory } from "../engine/rule-engine/types.js";

const VALID_CATEGORIES: RuleEngineCategory[] = ["people", "fashion", "product", "art", "social"];

// Builder.tsx's image category chips use their own UI-friendly keys
// ("people-portraits", "product-ecommerce", ...) rather than the rule
// engine's category enum directly — map the known ones, default the rest.
const BUILDER_CATEGORY_MAP: Record<string, RuleEngineCategory> = {
  "people-portraits":  "people",
  "product-ecommerce": "product",
  "fashion-apparel":   "fashion",
  "marketing-ads":     "social",
  "art-illustration":  "art",
  "trending-viral":    "social",
  "social-media":      "social",
};

function resolveCategory(category: string | null | undefined): RuleEngineCategory {
  if (!category) return "people";
  if (VALID_CATEGORIES.includes(category as RuleEngineCategory)) return category as RuleEngineCategory;
  return BUILDER_CATEGORY_MAP[category] ?? "people";
}

export interface LockSectionItem {
  key: string;
  label: string;
  value: string;
  required: boolean;
}

export function computeImageLocks(category: string | null | undefined): { lockSection: LockSectionItem[]; negativeLocks: string[] } {
  const cat = resolveCategory(category);
  const locks = generateLocks(cat, null);

  const lockSection: LockSectionItem[] = [
    { key: "orientation", label: "Orientation", value: locks.orientation, required: true },
    { key: "framing",     label: "Framing",     value: locks.framing,     required: true },
    { key: "light",       label: "Light",       value: locks.light,       required: true },
  ];
  if (locks.hand) {
    lockSection.push({ key: "hand", label: "Hand Position", value: locks.hand, required: false });
  }

  return { lockSection, negativeLocks: NEGATIVE_LOCKS[cat] ?? NEGATIVE_LOCKS.people };
}
