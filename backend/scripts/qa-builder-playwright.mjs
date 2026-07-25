// Browser-level QA sweep of the Builder page (headed Chromium via Playwright).
// Drives the real UI (family / category / sub-category / prompting type /
// enhancement chips / platform / Generate) and captures each real
// /api/builder/generate network response for verification, rather than
// scraping the rendered <pre> (which reformats output per family).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_URL = "http://localhost:5173";
const OUT_JSON = path.join(__dirname, "..", "..", "Builder_QA_Results.json");

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// UI shows human labels, not the internal category keys used by the API/test data.
const IMAGE_CATEGORY_LABELS = {
  "people-portraits": "People & Portraits",
  "product-ecommerce": "Product & Ecommerce",
  "fashion-apparel": "Fashion & Apparel",
  "marketing-ads": "Marketing & Ads",
  "art-illustration": "Art & Illustration",
  "trending-viral": "Trending & Viral",
  "social-media": "Social Media",
};
const VIDEO_CATEGORY_LABELS = {
  cinematic: "Cinematic & Film",
  commercial: "Advertising & Commercial",
  "social-media": "Social Media Videos",
  product: "Product & E-Commerce",
  education: "Education & Explainers",
  creative: "Creative & Entertainment",
};

// UI shows platform display names, not the internal keys used by the API.
const IMAGE_PLATFORM_LABELS = { chatgpt: "ChatGPT", gemini: "Gemini", grok: "Grok", midjourney: "Midjourney", firefly: "Firefly", flux: "FLUX" };
const VIDEO_PLATFORM_LABELS = { veo: "Veo", kling: "Kling", seedance: "Seedance", higgsfield: "Higgsfield", pika: "Pika Labs" };
const WEBSITE_PLATFORM_LABELS = { lovable: "Lovable", bolt: "Bolt.new", v0: "v0", cursor: "Cursor", chatgpt: "ChatGPT Canvas", claude: "Claude Artifacts", gemini: "Gemini", grok: "Grok" };
function platformLabel(family, key) {
  const map = family === "image" ? IMAGE_PLATFORM_LABELS : family === "video" ? VIDEO_PLATFORM_LABELS : WEBSITE_PLATFORM_LABELS;
  return map[key] || key;
}

async function clickExact(scope, text) {
  await scope.getByText(text, { exact: true }).first().click();
}

// Locate a chip-group's option container by its heading text, then click one option.
// `headingExact=false` allows headings with trailing decorative text (e.g. "Category - determines lock layer").
async function clickChip(page, heading, chipLabel, headingExact = true) {
  const headingLoc = headingExact
    ? page.getByText(heading, { exact: true })
    : page.getByText(new RegExp("^" + escapeRegExp(heading)));
  const group = headingLoc.first().locator("xpath=following-sibling::div[1]");
  await group.getByText(chipLabel, { exact: true }).click();
}

async function goToBuilder(page) {
  await page.goto(FRONTEND_URL, { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: "Builder", exact: true }).first().click().catch(async () => {
    // Nav may render as a button/div instead of a real link — fall back to a generic text click.
    await clickExact(page, "Builder");
  });
  await page.getByText("What are you creating?", { exact: true }).waitFor({ state: "visible", timeout: 10000 });
}

async function selectFamily(page, family) {
  const label = family === "image" ? "Image" : family === "video" ? "Video" : "Website";
  await clickChip(page, "What are you creating?", label, true);
}

async function fillIdea(page, idea) {
  const box = page.locator("#builder-idea");
  await box.fill("");
  await box.fill(idea);
}

async function openEnhancements(page) {
  const btn = page.getByText("Enhancements", { exact: false }).first();
  const panel = page.locator("text=Optional").first();
  // The panel toggles via the "Enhancements" row button; only open if not already open
  // (detect by presence of the "Style" chip-group heading, only rendered when expanded).
  const alreadyOpen = await page.getByText("Style", { exact: true }).count();
  if (alreadyOpen === 0) {
    await btn.click();
  }
}

async function runCase(page, tc, log) {
  const start = Date.now();
  const record = { ...tc, ok: false, ms: 0, error: null, response: null };
  try {
    await goToBuilder(page);
    await selectFamily(page, tc.family);

    if (tc.family === "website") {
      await clickChip(page, "Website type", tc.category, true);
      if (tc.subCategory) {
        await page.getByText("Subcategory", { exact: true }).waitFor({ timeout: 5000 });
        await clickExact(page, tc.subCategory);
      }
    } else if (tc.family === "video") {
      await fillIdea(page, tc.idea);
      await clickChip(page, "Category", VIDEO_CATEGORY_LABELS[tc.category] || tc.category, false);
    }

    if (tc.family === "image") {
      await fillIdea(page, tc.idea);
      await clickChip(page, "Category", IMAGE_CATEGORY_LABELS[tc.category] || tc.category, false);
    } else if (tc.family !== "video") {
      await fillIdea(page, tc.idea);
    }

    if (tc.platform) {
      await clickChip(page, "Platform", platformLabel(tc.family, tc.platform), true);
    }

    if (tc.family === "image" && tc.promptFormat === "json") {
      await clickChip(page, "Prompt Format", "JSON", true);
    }

    if (tc.enhancements && Object.keys(tc.enhancements).length > 0) {
      await openEnhancements(page);
      for (const [group, value] of Object.entries(tc.enhancements)) {
        if (Array.isArray(value)) {
          for (const v of value) await clickChip(page, group, v, true);
        } else {
          await clickChip(page, group, value, true);
        }
      }
    }

    const [resp] = await Promise.all([
      page.waitForResponse((r) => r.url().includes("/api/builder/generate"), { timeout: 60000 }),
      page.getByText("Generate Prompt", { exact: false }).first().click(),
    ]);

    const status = resp.status();
    let body = null;
    try { body = await resp.json(); } catch { /* non-JSON error body */ }

    if (status !== 200) {
      record.error = `HTTP ${status}: ${JSON.stringify(body).slice(0, 300)}`;
    } else {
      record.response = {
        promptLen: (body.prompt || "").length,
        categoryLabel: body.categoryLabel,
        hasLockSection: !!body.lockSection && Object.keys(body.lockSection).length > 0,
        hasNegativeLocks: Array.isArray(body.negativeLocks) && body.negativeLocks.length > 0,
        hasJsonPrompt: !!body.jsonPrompt,
        promptSnippet: (body.prompt || "").slice(0, 220),
      };
      // Confirm the DOM actually reflects success (not just network 200 racing a client-side error).
      // Website family's header reads "Website Prompt" instead of "Generated Prompt".
      const successHeader = tc.family === "website" ? "Website Prompt" : "Generated Prompt";
      await page.getByText(successHeader, { exact: false }).first().waitFor({ timeout: 10000 });
      record.ok = true;
    }
  } catch (e) {
    record.error = String(e && e.message ? e.message : e).slice(0, 400);
  }
  record.ms = Date.now() - start;
  log(record);
  return record;
}

// ─── Test matrix ────────────────────────────────────────────────────────────

const IMAGE_CASES = [
  { category: "people-portraits",  idea: "a samurai standing in rain at night", platform: "midjourney", enhancements: { Lighting: "Neon", Mood: "Dramatic" } },
  { category: "product-ecommerce", idea: "luxury perfume bottle on marble surface", platform: "chatgpt", enhancements: { Setting: "Studio", Palette: "Warm" } },
  { category: "fashion-apparel",   idea: "model wearing a flowing red silk gown", platform: "flux", enhancements: { "Camera / Shot Type": "Editorial", Style: "Cinematic" } },
  { category: "marketing-ads",     idea: "energy drink can splashing with ice", platform: "gemini", enhancements: { Palette: "Vibrant", Mood: "Energetic" } },
  { category: "art-illustration",  idea: "a floating city above the clouds", platform: "midjourney", enhancements: { Style: "Watercolor", Mood: "Peaceful" } },
  { category: "trending-viral",    idea: "a cat wearing sunglasses on a skateboard", platform: "grok", enhancements: { Style: "3D Render" } },
  { category: "social-media",      idea: "influencer filming a morning routine", platform: "firefly", enhancements: { Setting: "Home", Lighting: "Morning Light" } },
];

const IMAGE_JSON_CASES = [
  { category: "people-portraits",  idea: "a chef plating a dish in an open kitchen", platform: "midjourney" },
  { category: "product-ecommerce", idea: "wireless headphones floating on a gradient background", platform: "chatgpt" },
  { category: "art-illustration",  idea: "a lighthouse in a storm, oil painting style", platform: "flux" },
];

const VIDEO_CASES = [
  { category: "cinematic",    idea: "a lone astronaut walking across a red desert", platform: "veo", enhancements: { "Camera Movement": "Drone Ascent", Style: "Cinematic" } },
  { category: "commercial",   idea: "a sneaker rotating on a pedestal with light trails", platform: "kling", enhancements: { Duration: "10s", Pacing: "Fast & Dynamic" } },
  { category: "social-media", idea: "a barista latte art time-lapse", platform: "veo", enhancements: { Sound: undefined } }, // placeholder replaced below
  { category: "product",      idea: "a smartwatch showcasing its display features", platform: "seedance", enhancements: { "Camera Movement": "Dolly In" } },
  { category: "education",    idea: "explaining how photosynthesis works with animation", platform: "veo", enhancements: { Style: "Motion Graphics" } },
  { category: "creative",     idea: "a dancer moving through a field of fireflies at dusk", platform: "higgsfield", enhancements: { Mood: "Mysterious", Pacing: "Slow & Dreamy" } },
];
// Fix the placeholder above (Sound Design is the real chip-group heading).
VIDEO_CASES[2].enhancements = { "Sound Design": "Music Only", Duration: "15s" };

const WEBSITE_CASES = [];
const WEBSITE_MATRIX = [
  { category: "Business Website", subs: ["Restaurant / Cafe", "Clinic / Healthcare", "Educational Institute", "Boutique / Retail", "Real Estate", "Legal / Law Firm", "Service Business"], idea: "A modern local business needing an online presence", platform: "lovable" },
  { category: "E-Commerce", subs: ["Single Product", "Multi-Product", "Fashion Store", "Subscription Box", "Digital Products"], idea: "An online store selling curated goods", platform: "bolt" },
  { category: "Portfolio / Creator Site", subs: ["Photographer", "Designer", "Writer / Blogger", "Developer", "Artist"], idea: "A creative professional showcasing their work", platform: "v0" },
  { category: "Apps & SaaS Interface", subs: ["Dashboard", "Landing + App", "Developer Tool"], idea: "A SaaS product for managing team workflows", platform: "cursor" },
  { category: "Landing Page", subs: ["SaaS Product", "Personal Brand", "Course / Info Product", "Event / Conference"], idea: "A high-converting landing page launch", platform: "lovable" },
];
const WEBSITE_ENH_ROTATION = [
  { Style: "Minimal", Palette: "Light" },
  { Style: "Bold", Audience: "B2C" },
  { Mood: "Elegant", Palette: "Dark" },
  { Style: "Corporate", Audience: "B2B" },
  { Pages: ["Home", "Pricing", "Contact"] },
];
WEBSITE_MATRIX.forEach((group) => {
  group.subs.forEach((sub, i) => {
    WEBSITE_CASES.push({
      category: group.category,
      subCategory: sub,
      idea: `${group.idea} — ${sub}`,
      platform: group.platform,
      enhancements: WEBSITE_ENH_ROTATION[i % WEBSITE_ENH_ROTATION.length],
    });
  });
});

function buildMatrix() {
  const cases = [];
  for (const c of IMAGE_CASES) cases.push({ family: "image", promptFormat: "text", ...c });
  for (const c of IMAGE_JSON_CASES) cases.push({ family: "image", promptFormat: "json", ...c });
  for (const c of VIDEO_CASES) cases.push({ family: "video", ...c });
  for (const c of WEBSITE_CASES) cases.push({ family: "website", ...c });
  return cases;
}

async function main() {
  let cases = buildMatrix();
  const offset = process.env.QA_OFFSET ? parseInt(process.env.QA_OFFSET, 10) : 0;
  const limit = process.env.QA_LIMIT ? parseInt(process.env.QA_LIMIT, 10) : null;
  cases = limit ? cases.slice(offset, offset + limit) : cases.slice(offset);
  console.log(`Builder QA sweep — ${cases.length} cases (headed Chromium)\n`);

  const browser = await chromium.launch({ headless: false, slowMo: 60 });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const results = [];
  let i = 0;
  for (const tc of cases) {
    i++;
    const label = `[${i}/${cases.length}] ${tc.family}/${tc.category}${tc.subCategory ? "/" + tc.subCategory : ""}${tc.promptFormat === "json" ? " (json)" : ""} @ ${tc.platform}`;
    process.stdout.write(label + " ... ");
    const rec = await runCase(page, tc, () => {});
    console.log(rec.ok ? `OK (${rec.ms}ms, ${rec.response?.promptLen ?? 0} chars)` : `FAIL — ${rec.error}`);
    results.push(rec);
    fs.writeFileSync(OUT_JSON, JSON.stringify(results, null, 2));
  }

  await browser.close();

  const okCount = results.filter((r) => r.ok).length;
  console.log(`\nDone. ${okCount}/${results.length} passed. Raw results: ${OUT_JSON}`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
