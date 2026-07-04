/**
 * Templatize the image library's DESCRIPTIVE layer with [TOKEN] placeholders so the
 * variable layer can personalize prompts. The LOCK LAYER / NEGATIVE LOCKS are left
 * untouched (locks must stay invariant — they never carry tokens).
 *
 * Per slug, one AI call tokenizes all platform variants consistently; the lock part
 * is split off on "LOCK LAYER" and re-attached verbatim. Typed VariableField[] are
 * derived from the engine dictionary (not the model), then written to
 * frontend/src/app/lib/library-variables.ts. library-platforms-locked.ts is rewritten
 * with the tokenized descriptive text.
 *
 * Resumable: slugs whose descriptive portion already contains a [TOKEN] are skipped.
 *
 * Usage: cd backend && npx tsx scripts/templatize-library.ts [--only A,B] [--limit N] [--workers N]
 */
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_LIB = path.resolve(__dirname, "../../frontend/src/app/lib");
const LOCKED_FILE = path.join(FRONTEND_LIB, "library-platforms-locked.ts");
const VARS_FILE = path.join(FRONTEND_LIB, "library-variables.ts");

const { default: Anthropic } = await import("@anthropic-ai/sdk");
const { resolveCategoryId } = await import("../src/engine/categories.js");
const { extractVariables, fieldForToken, CATEGORY_VARIABLES, VARIABLE_DICTIONARY } = await import("../src/engine/variables.js");
const { platformVersions } = (await import("../../frontend/src/app/lib/library-platforms-locked.js")) as {
  platformVersions: Record<string, Record<string, string>>;
};
const { imageLibraryPrompts } = (await import("../../frontend/src/app/lib/library-data.js")) as {
  imageLibraryPrompts: Array<{ slug: string; title?: string; category?: string }>;
};
import type { VariableField, CategoryId } from "../src/engine/types.js";

// ─── CLI ─────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const getArg = (name: string) => {
  const i = argv.indexOf(name);
  return i !== -1 ? argv[i + 1] : undefined;
};
const onlySet = getArg("--only") ? new Set(getArg("--only")!.split(",")) : null;
const limit = getArg("--limit") ? Number(getArg("--limit")) : Infinity;
const workers = getArg("--workers") ? Number(getArg("--workers")) : 4;

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("ANTHROPIC_API_KEY is not set. Aborting.");
  process.exit(1);
}
const client = new Anthropic({ apiKey });

const LOCK_MARKER = "\n\nLOCK LAYER";
const TOKEN_RE = /\[[A-Z0-9_]+\]/;

const categoryBySlug = new Map<string, string>();
for (const p of imageLibraryPrompts) if (p.slug) categoryBySlug.set(p.slug, p.category ?? "");

/** Split a stored platform text into [descriptive, lockPart]. lockPart starts at "LOCK LAYER". */
function splitDescriptive(text: string): [string, string] {
  const idx = text.indexOf(LOCK_MARKER);
  if (idx === -1) return [text, ""];
  return [text.slice(0, idx), text.slice(idx)]; // lockPart keeps its leading "\n\nLOCK LAYER"
}

function slugIsTokenized(variants: Record<string, string>): boolean {
  return Object.values(variants).some((t) => TOKEN_RE.test(splitDescriptive(t)[0]));
}

interface SlugResult {
  slug: string;
  variants: Record<string, string>; // tokenized-descriptive + lockPart re-attached
  variables: VariableField[];
}

async function templatizeSlug(slug: string): Promise<SlugResult | null> {
  const variants = platformVersions[slug]!;
  const catId = resolveCategoryId(categoryBySlug.get(slug) ?? "") as CategoryId | null;
  const whitelist = catId ? CATEGORY_VARIABLES[catId] : Object.keys(VARIABLE_DICTIONARY);

  // Descriptive portions to tokenize (keyed by platform); keep lock parts aside.
  const descByPlatform: Record<string, string> = {};
  const lockByPlatform: Record<string, string> = {};
  for (const [plat, text] of Object.entries(variants)) {
    const [desc, lock] = splitDescriptive(text);
    descByPlatform[plat] = desc;
    lockByPlatform[plat] = lock;
  }

  const system = `You insert [TOKEN] placeholders into image-prompt DESCRIPTIONS so a user can personalize them. You NEVER rewrite, summarize, or reorder the prose — you only replace the few swappable noun phrases with an UPPER_SNAKE [TOKEN].

Rules:
- Allowed tokens for this category: ${whitelist.map((t) => `[${t}]`).join(", ")}. You may also use a clearly-named custom [TOKEN] if needed.
- Only bracket genuinely swappable content: the brand, the product/object, the accent color, the subject/person, the headline text — whatever a user would change to make it "theirs".
- NEVER bracket structural/compositional wording, camera specs, palette hex codes, lighting, or style descriptors.
- Use the SAME tokens consistently across every platform variant.
- Use at most 4 distinct tokens. If nothing is swappable, return the text unchanged.
- Output the descriptions verbatim except for the inserted [TOKEN]s — same words, same order, same punctuation.
- For each token, also report its "default": the exact original phrase you replaced (taken from the first platform variant), so the form can pre-fill with the original wording.

Return ONLY valid JSON: {"platforms":{"<platform>":"<tokenized description>", ...},"variables":[{"name":"SUBJECT","default":"<original phrase replaced>"}]}`;

  const user = `Category: ${categoryBySlug.get(slug) || "unknown"}\n\nDescriptions as JSON:\n${JSON.stringify(descByPlatform)}`;

  const resp = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    system,
    messages: [{ role: "user", content: user }],
  });
  const raw = resp.content.filter((b: any) => b.type === "text").map((b: any) => b.text).join("");
  const cleaned = raw.replace(/```json?\s*/g, "").replace(/```\s*/g, "").trim();
  let parsed: { platforms: Record<string, string>; variables?: Array<{ name: string; default?: string }> };
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("no JSON in response");
    parsed = JSON.parse(m[0]);
  }

  // Re-attach lock parts; guarantee no token leaked into a lock layer.
  const out: Record<string, string> = {};
  for (const plat of Object.keys(variants)) {
    const tokenizedDesc = (parsed.platforms?.[plat] ?? descByPlatform[plat]).trimEnd();
    const lock = lockByPlatform[plat];
    if (lock && TOKEN_RE.test(lock)) throw new Error(`token leaked into LOCK LAYER for ${slug}/${plat}`);
    out[plat] = lock ? `${tokenizedDesc}${lock}` : tokenizedDesc;
  }

  // Authoritative token set = tokens actually present in the tokenized text. Type via
  // the engine dictionary; attach the model-reported default (original phrase).
  const defaults = new Map<string, string>();
  for (const v of parsed.variables ?? []) if (v.name && v.default) defaults.set(v.name, v.default);
  const seen = new Map<string, VariableField>();
  for (const plat of Object.keys(out)) {
    for (const f of extractVariables(splitDescriptive(out[plat])[0])) {
      if (!seen.has(f.name)) seen.set(f.name, { ...fieldForToken(f.name), default: defaults.get(f.name) });
    }
  }
  return { slug, variants: out, variables: [...seen.values()] };
}

// ─── Load existing variables map (merge across runs) ─────────────────────────
const promptVariables: Record<string, VariableField[]> = {};
try {
  const existing = (await import("../../frontend/src/app/lib/library-variables.js")) as {
    promptVariables?: Record<string, VariableField[]>;
  };
  Object.assign(promptVariables, existing.promptVariables ?? {});
} catch { /* stub or absent */ }

function writeOutputs() {
  const lockedHeader =
    "// AUTO-GENERATED — do not edit by hand.\n" +
    "// Upgraded prompt structure: descriptive (with [TOKEN] variable layer) + engine LOCK LAYER + NEGATIVE LOCKS.\n" +
    "// Regenerate locks: cd backend && npx tsx scripts/upgrade-library.ts\n" +
    "// Templatize variables: cd backend && npx tsx scripts/templatize-library.ts\n\n" +
    "export const platformVersions: Record<string, Record<string, string>> = ";
  fs.writeFileSync(LOCKED_FILE, lockedHeader + JSON.stringify(platformVersions, null, 2) + ";\n", "utf8");

  const varsHeader =
    "// AUTO-GENERATED by backend/scripts/templatize-library.ts — do not edit by hand.\n" +
    "// Maps a prompt slug to the typed variable fields ([TOKEN] placeholders) in its descriptive layer.\n" +
    'import type { VariableField } from "./api";\n\n' +
    "export const promptVariables: Record<string, VariableField[]> = ";
  fs.writeFileSync(VARS_FILE, varsHeader + JSON.stringify(promptVariables, null, 2) + ";\n", "utf8");
}

// ─── Run ─────────────────────────────────────────────────────────────────────
let slugs = Object.keys(platformVersions);
if (onlySet) slugs = slugs.filter((s) => onlySet.has(s));
slugs = slugs.filter((s) => !slugIsTokenized(platformVersions[s]!)).slice(0, limit);

console.log(`Templatizing ${slugs.length} slugs (workers=${workers})\n`);
let ok = 0, fail = 0, done = 0;

async function runPool() {
  let cursor = 0;
  async function worker() {
    while (cursor < slugs.length) {
      const slug = slugs[cursor++]!;
      try {
        const res = await templatizeSlug(slug);
        if (res) {
          platformVersions[slug] = res.variants;
          if (res.variables.length) promptVariables[slug] = res.variables;
          ok++;
          console.log(`  OK   ${slug} — [${res.variables.map((v) => v.name).join(", ")}]`);
        }
      } catch (e: any) {
        fail++;
        console.log(`  FAIL ${slug} — ${e?.message ?? e}`);
      }
      if (++done % 10 === 0) writeOutputs(); // checkpoint
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, workers) }, worker));
}

await runPool();
writeOutputs();
console.log(`\nDone. OK: ${ok} | Fail: ${fail} | Skipped(existing): ${Object.keys(platformVersions).length - slugs.length}`);
