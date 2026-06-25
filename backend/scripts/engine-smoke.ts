/**
 * engine-smoke.ts
 * ---------------
 * No-DB smoke test for the Prompt Intelligence Engine. Exercises the full
 * orchestrator logic (platform selection -> category resolution -> parse ->
 * validate -> assemble) on in-memory PromptRecords, without touching Postgres.
 *
 * Usage:
 *   cd backend
 *   npx tsx scripts/engine-smoke.ts
 *
 * Exits 0 when every assertion passes, 1 otherwise.
 */

import type { PromptRecord } from "../src/engine/types.js";

// db/client.ts throws at import time when DATABASE_URL is unset. The pure path
// never issues a query, so a dummy URL (lazy connection) is enough to load the
// module. Must be set BEFORE the dynamic import below.
process.env.DATABASE_URL ??= "postgresql://smoke:smoke@localhost:5432/smoke";

const { assembleFromRecord } = await import("../src/engine/index.js");

// ─── Fixtures ───────────────────────────────────────────────────────────────

const portrait: PromptRecord = {
  id: "lib:smoke-portrait",
  title: "Software Engineer Portrait",
  category: "People & Portraits",
  description:
    "Subject: Software engineer. Focused and confident, looking at camera. " +
    "Standing portrait with hands casually in pockets, wearing a grey hoodie, " +
    "against a brick wall. Chest-up composition with soft window light. " +
    "Editorial workplace portrait.",
  platforms: {
    midjourney:
      "software engineer portrait :: grey hoodie :: brick wall :: chest-up :: --ar 4:5 --v 6.1",
  },
};

const product: PromptRecord = {
  id: "lib:smoke-product",
  title: "Matte Ceramic Mug Hero Shot",
  // "Product & E-com" is the seed data's category string — exercises the alias fix.
  category: "Product & E-com",
  description:
    "Product: Matte ceramic mug. Three-quarter view with the label facing camera, " +
    "hero scale that fills the frame, centered in the shot, full product visible and " +
    "unobstructed. Studio packshot against a seamless marble surface, lit with a soft " +
    "softbox and rim light. Matte ceramic finish, minimal premium commercial style.",
  platforms: {
    chatgpt: "Editorial packshot of a matte ceramic mug on a seamless marble surface ...",
  },
};

const fashion: PromptRecord = {
  id: "lib:smoke-fashion",
  title: "Emerald Slip Dress Editorial",
  category: "Fashion & Apparel",
  description:
    "Model: Female model. Wearing an emerald silk slip dress, full-length garment visible, " +
    "flowing bias-cut fit. Three-quarter turn with hand on hip, full-body composition under " +
    "soft daylight. Silk fabric. Vogue editorial.",
  platforms: { midjourney: "emerald silk slip dress editorial :: full-body :: --ar 4:5" },
};

const unsupported: PromptRecord = {
  id: "lib:smoke-unknown",
  title: "Architectural Interior Shot",
  category: "Architecture", // does not resolve to any CategoryId → graceful passthrough
  description: "A minimalist concrete interior with soft daylight.",
  platforms: { chatgpt: "Architectural interior of a minimalist concrete room ..." },
};

// ─── Assertion helpers ──────────────────────────────────────────────────────

const failures: string[] = [];
function check(label: string, condition: boolean): void {
  console.log(`${condition ? "✅" : "❌"} ${label}`);
  if (!condition) failures.push(label);
}

// ─── Case 1: People & Portraits → full lock layer ───────────────────────────

console.log("\n── Case 1: People & Portraits ──");
const result = assembleFromRecord(portrait, "midjourney");

check("category resolved to people-portraits", result.categoryId === "people-portraits");
check("selected requested platform (midjourney)", result.selectedPlatform === "midjourney");
check("lockSection is populated", result.lockSection.length > 0);
check(
  "Subject lock present",
  result.lockSection.some((l) => l.key === "subject" && l.value.trim().length > 0),
);
check(
  "all mandatory locks resolved (validation.valid)",
  result.validation.valid && result.validation.missingRequiredFields.length === 0,
);
check("negativeLockSection is populated", result.negativeLockSection.length > 0);
check("finalAssembledText has LOCK LAYER", result.finalAssembledText.includes("LOCK LAYER"));
check("finalAssembledText has NEGATIVE LOCKS", result.finalAssembledText.includes("NEGATIVE LOCKS"));

console.log("\n── Assembled portrait output ──\n");
console.log(result.finalAssembledText);
if (result.validation.missingRequiredFields.length > 0) {
  console.log("\nmissingRequiredFields:", result.validation.missingRequiredFields);
}

// ─── Case 2: Product & Ecommerce → full lock layer (+ alias fix) ────────────

console.log("\n── Case 2: Product & Ecommerce ──");
const productResult = assembleFromRecord(product, "chatgpt");

check(
  "\"Product & E-com\" alias resolved to product-ecommerce",
  productResult.categoryId === "product-ecommerce",
);
check("lockSection is populated", productResult.lockSection.length > 0);
check(
  "Product lock present",
  productResult.lockSection.some((l) => l.key === "product" && l.value.trim().length > 0),
);
check(
  "all mandatory product locks resolved (validation.valid)",
  productResult.validation.valid && productResult.validation.missingRequiredFields.length === 0,
);
check("negativeLockSection is populated", productResult.negativeLockSection.length > 0);
check("finalAssembledText has LOCK LAYER", productResult.finalAssembledText.includes("LOCK LAYER"));
check(
  "no People-specific warnings leak into product validation",
  !productResult.validation.warnings.some((w) => /hand position|style dna/i.test(w)),
);

console.log("\n── Assembled product output ──\n");
console.log(productResult.finalAssembledText);
if (productResult.validation.missingRequiredFields.length > 0) {
  console.log("\nmissingRequiredFields:", productResult.validation.missingRequiredFields);
}

// ─── Case 3: unsupported category → graceful passthrough ────────────────────

console.log("\n── Case 3: graceful passthrough ──");
const passthrough = assembleFromRecord(unsupported);

check("lockSection is empty", passthrough.lockSection.length === 0);
check("negativeLockSection is empty", passthrough.negativeLockSection.length === 0);
check(
  "passthrough warning present",
  passthrough.validation.warnings.some((w) => w.includes("No lock template")),
);
check(
  "finalAssembledText is the platform variant",
  passthrough.finalAssembledText === unsupported.platforms.chatgpt,
);

// ─── Case 4: Fashion & Apparel → full lock layer ────────────────────────────

console.log("\n── Case 4: Fashion & Apparel ──");
const fashionResult = assembleFromRecord(fashion, "midjourney");

check("category resolved to fashion-apparel", fashionResult.categoryId === "fashion-apparel");
check("lockSection is populated", fashionResult.lockSection.length > 0);
check(
  "Garment lock present",
  fashionResult.lockSection.some((l) => l.key === "garment" && l.value.trim().length > 0),
);
check(
  "all mandatory fashion locks resolved (validation.valid)",
  fashionResult.validation.valid && fashionResult.validation.missingRequiredFields.length === 0,
);
check("negativeLockSection is populated", fashionResult.negativeLockSection.length > 0);

console.log("\n── Assembled fashion output ──\n");
console.log(fashionResult.finalAssembledText);
if (fashionResult.validation.missingRequiredFields.length > 0) {
  console.log("\nmissingRequiredFields:", fashionResult.validation.missingRequiredFields);
}

// ─── Case 5: platform fallback ──────────────────────────────────────────────

console.log("\n── Case 5: platform fallback ──");
const fallback = assembleFromRecord(portrait, "seedream"); // not present on record
check("fell back to an available platform", fallback.selectedPlatform === "midjourney");
check(
  "fallback warning present",
  fallback.validation.warnings.some((w) => w.toLowerCase().includes("not available")),
);

// ─── Case 6: remaining categories (Marketing / Art / Trending / Social) ─────

console.log("\n── Case 6: remaining categories ──");

const moreCategories: Array<{ label: string; expected: string; keyLock: string; record: PromptRecord }> = [
  {
    label: "Marketing & Ads",
    expected: "marketing-ads",
    keyLock: "ctaSpace",
    record: {
      id: "lib:smoke-mkt",
      title: "Energy Drink Launch Ad",
      category: "Marketing & Ads",
      description:
        "Hero: Young athlete. Product: Energy drink can. Mid-jump celebrating, energetic. " +
        "Centered hero with negative space for copy on the right. Brand colors: electric blue and lime. " +
        "High-key studio light. Bold campaign editorial.",
      platforms: { chatgpt: "Bold launch ad for an energy drink with a mid-jump athlete ..." },
    },
  },
  {
    label: "Art & Illustration",
    expected: "art-illustration",
    keyLock: "renderingStyle",
    record: {
      id: "lib:smoke-art2",
      title: "Watercolor Fox Spirit",
      category: "Art & Illustration",
      description:
        "Style: Storybook watercolor. Character: Fox spirit. Curled and alert, serene. " +
        "Palette: warm autumn ochres and teal. Soft diffused glow. Loose watercolor wash with ink " +
        "linework. Setting: misty forest. Centered character vignette.",
      platforms: { chatgpt: "Storybook watercolor illustration of a fox spirit ..." },
    },
  },
  {
    label: "Trending & Viral",
    expected: "trending-viral",
    keyLock: "visualHook",
    record: {
      id: "lib:smoke-trend",
      title: "Giant Floating Donut",
      category: "Trending & Viral",
      description:
        "Subject: Pedestrian. Surreal giant floating donut over the street as the visual hook. " +
        "Amazed, looking up and pointing. Low-angle hero vertical. Bright midday pop. " +
        "Hyper-saturated pastels. Surreal viral trend.",
      platforms: { chatgpt: "Surreal viral shot of a giant floating donut over a street ..." },
    },
  },
  {
    label: "Social Media",
    expected: "social-media",
    keyLock: "crop",
    record: {
      id: "lib:smoke-social",
      title: "Cafe Creator Reel Cover",
      category: "Social Media",
      description:
        "Subject: Lifestyle creator. Holding a latte and smiling, warm and upbeat. " +
        "Centered vertical with headroom for text. 9:16 vertical. Soft window light. " +
        "Brand colors: cream and sage. Cozy lifestyle creator.",
      platforms: { chatgpt: "Cozy lifestyle creator reel cover with a latte ..." },
    },
  },
];

for (const { label, expected, keyLock, record } of moreCategories) {
  const r = assembleFromRecord(record, "chatgpt");
  check(`${label}: resolved to ${expected}`, r.categoryId === expected);
  check(`${label}: lock layer populated`, r.lockSection.length > 0);
  check(`${label}: key lock "${keyLock}" present`, r.lockSection.some((l) => l.key === keyLock));
  check(
    `${label}: all mandatory locks resolved`,
    r.validation.valid && r.validation.missingRequiredFields.length === 0,
  );
  check(`${label}: negative locks present`, r.negativeLockSection.length > 0);
  check(`${label}: no leaked warnings`, r.validation.warnings.length === 0);
}

// ─── Result ─────────────────────────────────────────────────────────────────

console.log(`\n${failures.length === 0 ? "✅ ALL CHECKS PASSED" : `❌ ${failures.length} CHECK(S) FAILED`}`);
if (failures.length > 0) {
  for (const f of failures) console.log(`   - ${f}`);
  process.exit(1);
}
