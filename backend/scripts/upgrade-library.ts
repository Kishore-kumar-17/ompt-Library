/**
 * upgrade-library.ts
 * ------------------
 * Reads the frontend prompt library (library-platforms.ts), and for every prompt
 * × platform variant produces the UPGRADED structure:
 *
 *     <descriptive AI-specific prompt>  +  LOCK LAYER  +  NEGATIVE LOCKS
 *
 * The old "**LOCKS - ORIENTATION/FRAMING/LIGHT**" block is REPLACED with the
 * engine's clean lock layer. Output → library-platforms-locked.ts (original
 * untouched). Offline — no database needed.
 *
 *   cd backend && npx tsx scripts/upgrade-library.ts
 */

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

process.env.DATABASE_URL ??= "postgresql://smoke:smoke@localhost:5432/smoke";
const { assembleFromRecord } = await import("../src/engine/index.js");
const { platformVersions } = (await import("../../frontend/src/app/lib/library-platforms.js")) as {
  platformVersions: Record<string, Record<string, string>>;
};
const { imageLibraryPrompts } = (await import("../../frontend/src/app/lib/library-data.js")) as {
  imageLibraryPrompts: Array<{ slug: string; title?: string; category?: string; description?: string }>;
};
import type { PromptRecord } from "../src/engine/types.js";

// slug (e.g. "ART-CUL-001") → authoritative metadata (real title + category).
const metaBySlug = new Map(imageLibraryPrompts.map((p) => [p.slug, p]));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, "../../frontend/src/app/lib/library-platforms-locked.ts");

// Prompt-id prefix → category label (the engine resolves these to CategoryIds).
const PREFIX_MAP: Record<string, string> = {
  ART: "Art & Illustration",
  FAS: "Fashion & Apparel",
  MKT: "Marketing & Ads",
  PEO: "People & Portraits",
  PRD: "Product & E-com",
  SOC: "Social Media",
  VRL: "Trending & Viral",
};

// Matches the "\n\n" that separates the descriptive prompt from the OLD lock
// block (handles ChatGPT/Gemini/Grok/Firefly "**LOCKS -**", Flux "**X LOCK:**",
// and Midjourney ":: ORIENTATION").
const OLD_LOCK_BLOCK =
  /\n\n(?=\*\*(?:LOCKS|ORIENTATION|GEOMETRY|FRAMING|LIGHT|MATERIAL|CLOTHING)\b|::\s*(?:ORIENTATION|GEOMETRY|FRAMING|LIGHT|MATERIAL|CLOTHING)\b)/;

function stripOldLocks(text: string): string {
  const m = text.match(OLD_LOCK_BLOCK);
  return (m ? text.slice(0, m.index) : text).trimEnd();
}

const out: Record<string, Record<string, string>> = {};
let withLocks = 0;
let passthrough = 0;
let strippedCount = 0;
const unknownPrefixes = new Set<string>();

for (const [id, variants] of Object.entries(platformVersions)) {
  const prefix = id.split("-")[0];
  const meta = metaBySlug.get(id);
  const category = meta?.category ?? PREFIX_MAP[prefix] ?? "";
  if (!category) unknownPrefixes.add(prefix);

  const stripped: Record<string, string> = {};
  for (const [plat, txt] of Object.entries(variants)) {
    const s = stripOldLocks(txt);
    if (s.length !== txt.trimEnd().length) strippedCount += 1;
    stripped[plat] = s;
  }

  const record: PromptRecord = {
    id: `lib:${id}`,
    // Real title (never the raw id) so subject/product locks don't leak the id.
    title: meta?.title ?? "",
    category,
    description: meta?.description ?? stripped.flux ?? stripped.chatgpt ?? Object.values(stripped)[0],
    platforms: stripped,
  };

  out[id] = {};
  let hadLock = false;
  for (const plat of Object.keys(variants)) {
    const r = assembleFromRecord(record, plat);
    out[id][plat] = r.finalAssembledText;
    if (r.lockSection.length > 0) hadLock = true;
  }
  hadLock ? (withLocks += 1) : (passthrough += 1);
}

const header =
  "// AUTO-GENERATED — do not edit by hand.\n" +
  "// Upgraded prompt structure: descriptive AI-specific prompt + engine LOCK LAYER + NEGATIVE LOCKS.\n" +
  "// The old **LOCKS - …** blocks were replaced with the engine's clean lock layer.\n" +
  "// Regenerate: cd backend && npx tsx scripts/upgrade-library.ts\n\n";
const body = `export const platformVersions: Record<string, Record<string, string>> = ${JSON.stringify(out, null, 2)};\n`;
fs.writeFileSync(OUT_PATH, header + body, "utf8");

console.log(`✅ Wrote ${OUT_PATH}`);
console.log(`   prompts: ${Object.keys(out).length}  |  with lock layer: ${withLocks}  |  passthrough: ${passthrough}`);
console.log(`   platform variants with an old lock block stripped: ${strippedCount}`);
if (unknownPrefixes.size) console.log("   ⚠️ unknown id prefixes (no category):", [...unknownPrefixes]);
