import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const LIB = ROOT + "/frontend/src/app/lib";
const LOCKED_FILE = LIB + "/library-platforms-locked.ts";
const VARS_FILE = LIB + "/library-variables.ts";
const OUT_FILE = process.env.OUT_FILE; // workflow result json

// ── token dictionary (mirror of backend/src/engine/variables.ts) ──
const DICT = {
  BRAND: { label: "Brand", type: "text", placeholder: "e.g. Nike, Apple" },
  PRODUCT: { label: "Product", type: "image", placeholder: "e.g. running sneakers" },
  COLOR: { label: "Color", type: "color", placeholder: "e.g. electric blue" },
  TAGLINE: { label: "Tagline", type: "text", placeholder: "e.g. Just Do It" },
  SUBJECT: { label: "Subject", type: "text", placeholder: "person: age, skin, hair, expression" },
  OUTFIT: { label: "Outfit", type: "text", placeholder: "clothing, fabric, colour, details" },
  SETTING: { label: "Setting", type: "text", placeholder: "location, backdrop, environment" },
  PALETTE: { label: "Colour palette", type: "text", placeholder: "dominant colours (names or hex)" },
  STYLE_REFERENCE: { label: "Style reference", type: "text", placeholder: "photographer or publication" },
  EXCLUDE: { label: "Exclude", type: "text", placeholder: "artefacts / features to avoid" },
  MODEL: { label: "Model", type: "text", placeholder: "e.g. female model, 20s" },
  LOCATION: { label: "Location", type: "text", placeholder: "e.g. rooftop at dusk" },
  GARMENT: { label: "Garment", type: "text", placeholder: "e.g. tailored trench coat" },
  STYLE: { label: "Style", type: "text", placeholder: "e.g. watercolor, line art" },
  THEME: { label: "Theme", type: "text", placeholder: "e.g. festival of lights" },
  TEXT: { label: "Headline", type: "text", placeholder: "e.g. SALE 50% OFF" },
  LOGO: { label: "Logo", type: "image", placeholder: "brand logo image" },
  MOOD: { label: "Mood", type: "select", options: ["serene", "dramatic", "playful", "luxurious", "energetic", "moody", "confident", "nostalgic"] },
  SEASON: { label: "Season", type: "select", options: ["Spring", "Summer", "Autumn", "Winter"] },
};
function fieldForToken(name, def) {
  const d = DICT[name];
  const base = d ? { name, ...d } : { name, label: name.toLowerCase().split("_").map((w) => w[0].toUpperCase() + w.slice(1)).join(" "), type: "text", placeholder: `Your ${name.toLowerCase().replace(/_/g, " ")}` };
  if (def) base.default = def;
  return base;
}

const LOCK_MARKER = "\n\nLOCK LAYER";
const TOK = /\[[A-Z0-9_]+\]/g;
function splitDesc(t) { const i = t.indexOf(LOCK_MARKER); return i === -1 ? [t, ""] : [t.slice(0, i), t.slice(i)]; }

// ── load originals ──
const lockedTxt = fs.readFileSync(LOCKED_FILE, "utf8");
const platformVersions = JSON.parse(lockedTxt.slice(lockedTxt.indexOf("{"), lockedTxt.lastIndexOf("}") + 1));
const promptVariables = {};
try {
  const vt = fs.readFileSync(VARS_FILE, "utf8");
  Object.assign(promptVariables, JSON.parse(vt.slice(vt.indexOf("{"), vt.lastIndexOf("}") + 1)));
} catch {}

// ── load workflow results ──
const results = JSON.parse(fs.readFileSync(OUT_FILE, "utf8")).result;

let updated = 0, reverted = 0, noTokens = 0, lockGuard = 0;
const report = {};
for (const r of results) {
  if (!r || !r.slug || !r.platforms) continue;
  const slug = r.slug;
  const orig = platformVersions[slug];
  if (!orig) continue;
  const platforms = Object.keys(orig);
  // tokens per platform (descriptive only)
  const perPlat = {};
  for (const p of platforms) perPlat[p] = new Set((r.platforms[p] || "").match(TOK) || []);
  const allTok = [...new Set(platforms.flatMap((p) => [...perPlat[p]]))];
  // Accept tokens present in at least 2/3 of platforms (e.g. 4 of 6)
  const minPlats = Math.ceil(platforms.length * 0.67);
  const accepted = allTok.filter((tk) => platforms.filter((p) => perPlat[p].has(tk)).length >= minPlats);
  const rejected = allTok.filter((tk) => !accepted.includes(tk));
  const defaults = {}; for (const v of r.variables || []) if (v.default) defaults[v.name] = v.default;

  const newVersions = {};
  for (const p of platforms) {
    let desc = r.platforms[p];
    if (desc == null) { desc = splitDesc(orig[p])[0]; } // agent dropped a platform -> keep original descriptive
    // revert fully rejected tokens to their default
    for (const tk of rejected) {
      const name = tk.slice(1, -1);
      if (defaults[name]) { desc = desc.split(tk).join(defaults[name]); reverted++; }
    }
    // for accepted tokens missing in this specific platform, revert just here
    for (const tk of accepted) {
      if (!perPlat[p].has(tk)) {
        const name = tk.slice(1, -1);
        if (defaults[name]) { desc = desc.split(tk).join(defaults[name]); reverted++; }
      }
    }
    const lockPart = splitDesc(orig[p])[1]; // original locks, untouched
    if (TOK.test(lockPart)) { lockGuard++; } // should never happen
    newVersions[p] = lockPart ? desc + lockPart : desc;
  }
  platformVersions[slug] = newVersions;

  const finalTokens = accepted;
  if (finalTokens.length) {
    promptVariables[slug] = finalTokens.map((tk) => fieldForToken(tk.slice(1, -1), defaults[tk.slice(1, -1)]));
    updated++;
  } else {
    noTokens++;
  }
  report[slug] = finalTokens.map((t) => t.slice(1, -1));
}

// ── write outputs ──
const lockedHeader =
  "// AUTO-GENERATED — do not edit by hand.\n" +
  "// Prompt structure: descriptive (with [TOKEN] variable layer) + engine LOCK LAYER + NEGATIVE LOCKS.\n" +
  "// Variable layer templatized via the prompt-intelligence workflow.\n\n" +
  "export const platformVersions: Record<string, Record<string, string>> = ";
fs.writeFileSync(LOCKED_FILE, lockedHeader + JSON.stringify(platformVersions, null, 2) + ";\n", "utf8");

const varsHeader =
  "// AUTO-GENERATED — do not edit by hand.\n" +
  "// Maps a prompt slug to the typed variable fields ([TOKEN] placeholders) in its descriptive layer.\n" +
  'import type { VariableField } from "./api";\n\n' +
  "export const promptVariables: Record<string, VariableField[]> = ";
fs.writeFileSync(VARS_FILE, varsHeader + JSON.stringify(promptVariables, null, 2) + ";\n", "utf8");

// ── coverage report ──
const counts = {};
for (const toks of Object.values(report)) for (const t of toks) counts[t] = (counts[t] || 0) + 1;
console.log(`results processed: ${results.length}`);
console.log(`slugs with variables: ${updated}`);
console.log(`slugs with NO swappable tokens: ${noTokens}`);
console.log(`inconsistent tokens reverted to default: ${reverted}`);
console.log(`tokens leaked into locks (should be 0): ${lockGuard}`);
console.log(`total promptVariables entries now: ${Object.keys(promptVariables).length}`);
console.log("token distribution:", JSON.stringify(counts, null, 0));
