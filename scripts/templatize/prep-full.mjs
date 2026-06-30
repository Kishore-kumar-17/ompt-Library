import fs from "fs";
const ROOT = "C:/Users/bot/Pictures/Prompt Library/prompt-library-backend";
const LIB = ROOT + "/frontend/src/app/lib";
const OUTDIR = process.env.SP + "/inputs";
fs.mkdirSync(OUTDIR, { recursive: true });

const lockedTxt = fs.readFileSync(`${LIB}/library-platforms-locked.ts`, "utf8");
const dataTxt = fs.readFileSync(`${LIB}/library-data.ts`, "utf8");
const platformVersions = JSON.parse(lockedTxt.slice(lockedTxt.indexOf("{"), lockedTxt.lastIndexOf("}") + 1));
const data = JSON.parse(dataTxt.slice(dataTxt.indexOf("= [") + 2, dataTxt.lastIndexOf("]") + 1));
const catOf = {}; for (const p of data) if (p.slug) catOf[p.slug] = p.category || "";

const CAT_ID = {
  "Art & Illustration": "art-illustration", "People & Portraits": "people-portraits",
  "Fashion & Apparel": "fashion-apparel", "Product & E-com": "product-ecommerce", "Product & Ecommerce": "product-ecommerce",
  "Marketing & Ads": "marketing-ads", "Trending & Viral": "trending-viral", "Social Media": "social-media",
};
const WL = {
  "marketing-ads": ["BRAND", "PRODUCT", "COLOR", "TAGLINE"],
  "product-ecommerce": ["PRODUCT", "BRAND", "COLOR", "SETTING"],
  "fashion-apparel": ["SUBJECT", "OUTFIT", "SETTING", "PALETTE", "MOOD", "STYLE_REFERENCE", "EXCLUDE"],
  "people-portraits": ["SUBJECT", "OUTFIT", "SETTING", "PALETTE", "MOOD", "STYLE_REFERENCE", "EXCLUDE"],
  "art-illustration": ["SUBJECT", "STYLE", "PALETTE", "THEME"],
  "trending-viral": ["SUBJECT", "THEME", "COLOR", "TEXT"],
  "social-media": ["BRAND", "SUBJECT", "COLOR", "TEXT"],
};
const LOCK_MARKER = "\n\nLOCK LAYER";
const TOKEN_RE = /\[[A-Z0-9_]+\]/;
function splitDesc(t) { const i = t.indexOf(LOCK_MARKER); return i === -1 ? [t, ""] : [t.slice(0, i), t.slice(i)]; }
function isTokenized(variants) { return Object.values(variants).some((t) => TOKEN_RE.test(splitDesc(t)[0])); }

const slugs = Object.keys(platformVersions);
let written = 0, skipped = 0;
const todo = [];
for (const slug of slugs) {
  const variants = platformVersions[slug];
  if (isTokenized(variants)) { skipped++; continue; } // already has tokens (e.g. MKT-ADC-001)
  const cat = catOf[slug] || "";
  const catId = CAT_ID[cat] || null;
  const whitelist = catId ? WL[catId] : [...new Set(Object.values(WL).flat())];
  const descByPlatform = {}, lockByPlatform = {};
  for (const [plat, txt] of Object.entries(variants)) { const [d, l] = splitDesc(txt); descByPlatform[plat] = d; lockByPlatform[plat] = l; }
  fs.writeFileSync(`${OUTDIR}/${slug}.json`, JSON.stringify({ slug, category: cat, catId, whitelist, descByPlatform, lockByPlatform }));
  written++; todo.push(slug);
}
fs.writeFileSync(process.env.SP + "/todo-slugs.json", JSON.stringify(todo));
console.log(`total slugs: ${slugs.length}`);
console.log(`per-slug input files written: ${written}`);
console.log(`skipped (already tokenized): ${skipped}`);
console.log(`todo list saved: ${todo.length} slugs`);
