// Browser-level QA sweep of the Improver page (headed Chromium via Playwright).
// Mirrors qa-builder-playwright.mjs's approach: drive the real UI, capture the
// real /api/improver/improve network response for verification. Improver has
// no category/enhancement chips (unlike Builder) — its real axes are family,
// platform, prompt format (image only), and the post-result category override
// (image only). Also runs an echo-regression check per family: feed the
// improved output back in and confirm it actually changes, since that's the
// exact "echoes unchanged input" bug class fixed earlier in this codebase
// (engine/modules/improver.ts, engine/video/ai-improver.ts, engine/website/ai-improver.ts).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_URL = "http://localhost:5173";
const OUT_JSON = path.join(__dirname, "..", "..", "Improver_QA_Results.json");

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function clickExact(scope, text) {
  await scope.getByText(text, { exact: true }).first().click();
}

async function clickChip(page, heading, chipLabel, headingExact = true) {
  const headingLoc = headingExact
    ? page.getByText(heading, { exact: true })
    : page.getByText(new RegExp("^" + escapeRegExp(heading)));
  const group = headingLoc.first().locator("xpath=following-sibling::div[1]");
  await group.getByText(chipLabel, { exact: true }).click();
}

const IMAGE_PLATFORM_LABELS = { chatgpt: "ChatGPT", gemini: "Gemini", grok: "Grok", midjourney: "Midjourney", firefly: "Firefly", flux: "FLUX" };
const VIDEO_PLATFORM_LABELS = { veo: "Veo", kling: "Kling", seedance: "Seedance", higgsfield: "Higgsfield", pika: "Pika Labs" };
const WEBSITE_PLATFORM_LABELS = { lovable: "Lovable", bolt: "Bolt.new", v0: "v0", cursor: "Cursor", chatgpt: "ChatGPT Canvas", claude: "Claude Artifacts", gemini: "Gemini", grok: "Grok" };
function platformLabel(family, key) {
  const map = family === "image" ? IMAGE_PLATFORM_LABELS : family === "video" ? VIDEO_PLATFORM_LABELS : WEBSITE_PLATFORM_LABELS;
  return map[key] || key;
}

const RULE_ENGINE_CATEGORY_LABELS = {
  people: "People & Portraits",
  fashion: "Fashion & Apparel",
  product: "Product & Ecommerce",
  art: "Art & Illustration",
  social: "Social & Content",
};

async function goToImprover(page) {
  await page.goto(FRONTEND_URL, { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: "Improver", exact: true }).first().click().catch(async () => {
    await clickExact(page, "Improver");
  });
  await page.getByText("Original prompt", { exact: true }).waitFor({ state: "visible", timeout: 10000 });
}

async function selectFamily(page, family) {
  const label = family === "image" ? "Image" : family === "video" ? "Video" : "Website";
  await clickExact(page, label);
}

async function fillInput(page, text) {
  const box = page.locator("#improver-input");
  await box.fill("");
  await box.fill(text);
}

// Word-set Jaccard similarity — mirrors the app's own tooSimilar() heuristic
// (engine/video/ai-improver.ts, engine/website/ai-improver.ts) so this script
// flags the same failure class the app itself guards against.
function tooSimilar(a, b) {
  const words = (s) => new Set(s.toLowerCase().match(/[a-z0-9]+/g) || []);
  const wa = words(a), wb = words(b);
  if (wa.size === 0 || wb.size === 0) return false;
  let shared = 0;
  for (const w of wa) if (wb.has(w)) shared++;
  return shared / (wa.size + wb.size - shared) > 0.82;
}

async function runImprove(page) {
  const [resp] = await Promise.all([
    page.waitForResponse((r) => r.url().includes("/api/improver/improve"), { timeout: 60000 }),
    page.getByText("Improve prompt", { exact: false }).first().click(),
  ]);
  const status = resp.status();
  let body = null;
  try { body = await resp.json(); } catch { /* non-JSON error body */ }
  return { status, body };
}

async function runCase(tc, page) {
  const start = Date.now();
  const record = { ...tc, ok: false, ms: 0, error: null, response: null, echoCheck: null };
  try {
    await goToImprover(page);
    await selectFamily(page, tc.family);

    // Platform buttons render right after family select; click after family so the correct list is mounted.
    const platLabel = platformLabel(tc.family, tc.platform);
    await page.getByText(platLabel, { exact: true }).first().click();

    if (tc.family === "image" && tc.promptFormat === "json") {
      await clickChip(page, "Prompt Format", "JSON", true);
    }

    await fillInput(page, tc.input);
    const { status, body } = await runImprove(page);

    if (status !== 200) {
      record.error = `HTTP ${status}: ${JSON.stringify(body).slice(0, 300)}`;
      record.ms = Date.now() - start;
      return record;
    }

    record.response = {
      improvedLen: (body.improved || "").length,
      categoryId: body.categoryId,
      categoryLabel: body.categoryLabel,
      appliedChanges: (body.changes || []).filter((c) => c.applied).length,
      totalChanges: (body.changes || []).length,
      hasLockSection: !!body.lockSection && Object.keys(body.lockSection).length > 0,
      hasJsonPrompt: !!body.jsonPrompt,
      improvedSnippet: (body.improved || "").slice(0, 220),
    };
    await page.getByText("What changed", { exact: true }).waitFor({ timeout: 10000 });

    // Category override — image family only, using the just-rendered override buttons.
    if (tc.categoryOverride) {
      const overrideLabel = RULE_ENGINE_CATEGORY_LABELS[tc.categoryOverride];
      const before = body.improved || "";
      await page.getByText("Detected category", { exact: false }).waitFor({ timeout: 5000 });
      const [resp2] = await Promise.all([
        page.waitForResponse((r) => r.url().includes("/api/improver/improve"), { timeout: 60000 }),
        clickExact(page, overrideLabel),
      ]);
      const body2 = await resp2.json().catch(() => null);
      record.overrideResult = body2
        ? { categoryId: body2.categoryId, categoryLabel: body2.categoryLabel, improvedLen: (body2.improved || "").length, changedFromBefore: (body2.improved || "") !== before }
        : { error: `HTTP ${resp2.status()}` };
    }

    // Echo-regression check: feed the improved output back in, confirm it's not an unchanged echo.
    if (tc.echoRegression) {
      const roundTripInput = body.improved || body.finalAssembledText || "";
      if (roundTripInput) {
        await fillInput(page, roundTripInput);
        const { status: s2, body: body2 } = await runImprove(page);
        if (s2 === 200 && body2) {
          const similar = tooSimilar(roundTripInput, body2.improved || "");
          record.echoCheck = {
            ok: !similar,
            inputLen: roundTripInput.length,
            outputLen: (body2.improved || "").length,
            identical: roundTripInput.trim() === (body2.improved || "").trim(),
            tooSimilar: similar,
            inputSnippet: roundTripInput.slice(0, 400),
            outputSnippet: (body2.improved || "").slice(0, 400),
          };
        } else {
          record.echoCheck = { ok: false, error: `HTTP ${s2}` };
        }
      }
    }

    record.ok = true;
  } catch (e) {
    record.error = String(e && e.message ? e.message : e).slice(0, 400);
  }
  record.ms = Date.now() - start;
  return record;
}

// ─── Test matrix ────────────────────────────────────────────────────────────

const IMAGE_CASES = [
  { family: "image", platform: "midjourney", promptFormat: "text", input: "a woman standing near a window", categoryOverride: "fashion", echoRegression: true },
  { family: "image", platform: "chatgpt",   promptFormat: "text", input: "product shot of a watch", categoryOverride: "art", echoRegression: false },
  { family: "image", platform: "flux",      promptFormat: "text", input: "a painting of a mountain landscape", categoryOverride: "product", echoRegression: false },
  { family: "image", platform: "gemini",    promptFormat: "text", input: "instagram post about a new sneaker drop", categoryOverride: "people", echoRegression: false },
  { family: "image", platform: "grok",      promptFormat: "text", input: "a model wearing a leather jacket on the street", categoryOverride: "social", echoRegression: false },
];

const IMAGE_JSON_CASES = [
  { family: "image", platform: "midjourney", promptFormat: "json", input: '{"subject":"a chef plating a dish","style":"editorial photography","lighting":"studio"}', echoRegression: true },
  { family: "image", platform: "chatgpt",    promptFormat: "json", input: '{"subject":"a lighthouse in a storm","style":"oil painting"}', echoRegression: false },
];

const VIDEO_CASES = [
  { family: "video", platform: "veo",        input: "a lone astronaut walking across a red desert", echoRegression: true },
  { family: "video", platform: "kling",      input: "a sneaker rotating on a pedestal with light trails", echoRegression: false },
  { family: "video", platform: "seedance",   input: "a barista making latte art in slow motion", echoRegression: false },
  { family: "video", platform: "higgsfield", input: "a dancer moving through a field of fireflies at dusk", echoRegression: false },
];

const WEBSITE_CASES = [
  { family: "website", platform: "lovable", input: "A premium Japanese restaurant in Mumbai with omakase dining and a sake bar", echoRegression: true },
  { family: "website", platform: "bolt",    input: "An online store selling handmade ceramics", echoRegression: false },
  { family: "website", platform: "v0",      input: "A photographer's portfolio site with a dark, minimal aesthetic", echoRegression: false },
  { family: "website", platform: "cursor",  input: "A SaaS dashboard for managing freelance invoices and contracts", echoRegression: false },
];

function buildMatrix() {
  return [...IMAGE_CASES, ...IMAGE_JSON_CASES, ...VIDEO_CASES, ...WEBSITE_CASES];
}

async function main() {
  let cases = buildMatrix();
  const offset = process.env.QA_OFFSET ? parseInt(process.env.QA_OFFSET, 10) : 0;
  const limit = process.env.QA_LIMIT ? parseInt(process.env.QA_LIMIT, 10) : null;
  cases = limit ? cases.slice(offset, offset + limit) : cases.slice(offset);
  console.log(`Improver QA sweep — ${cases.length} cases (headed Chromium)\n`);

  const browser = await chromium.launch({ headless: false, slowMo: 60 });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const results = [];
  let i = 0;
  for (const tc of cases) {
    i++;
    const label = `[${i}/${cases.length}] ${tc.family}${tc.promptFormat === "json" ? " (json)" : ""} @ ${tc.platform}${tc.categoryOverride ? ` -> override:${tc.categoryOverride}` : ""}${tc.echoRegression ? " +echo" : ""}`;
    process.stdout.write(label + " ... ");
    const rec = await runCase(tc, page);
    const echoNote = rec.echoCheck ? (rec.echoCheck.ok ? " [echo:OK]" : ` [echo:FLAG ${rec.echoCheck.identical ? "IDENTICAL" : "TOO-SIMILAR"}]`) : "";
    console.log(rec.ok ? `OK (${rec.ms}ms, ${rec.response?.improvedLen ?? 0} chars)${echoNote}` : `FAIL — ${rec.error}`);
    results.push(rec);
    fs.writeFileSync(OUT_JSON, JSON.stringify(results, null, 2));
  }

  await browser.close();
  const okCount = results.filter((r) => r.ok).length;
  const echoFlags = results.filter((r) => r.echoCheck && !r.echoCheck.ok);
  console.log(`\nDone. ${okCount}/${results.length} passed. Echo-regression flags: ${echoFlags.length}. Raw results: ${OUT_JSON}`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
