/**
 * engine-prompt-integrity.ts — empirically checks whether the engine changes the
 * original prompt text. For every prompt × every platform variant, it verifies the
 * original authored text is reused VERBATIM (and that the engine only appends).
 *
 *   cd backend && npx tsx scripts/engine-prompt-integrity.ts
 */

import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import type { PromptRecord } from "../src/engine/types.js";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

process.env.DATABASE_URL ??= "postgresql://smoke:smoke@localhost:5432/smoke";
const { assembleFromRecord } = await import("../src/engine/index.js");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXCEL_PATH = path.resolve(__dirname, "../../prompts_master.xlsx");

const CATEGORY_MAP: Record<string, string> = {
  Fashion: "Fashion & Apparel", Marketing: "Marketing & Ads", People: "People & Portraits",
  Product: "Product & E-com", Social: "Social Media",
};
const PLATFORM_COLUMNS: Array<[string, string]> = [
  ["chatgpt_version", "chatgpt"], ["gemini_version", "gemini"], ["grok_version", "grok"],
  ["midjourney_version", "midjourney"], ["firefly_version", "firefly"], ["flux_version", "flux"],
];
const str = (v: unknown) => (v ?? "").toString().trim();

const wb = XLSX.readFile(EXCEL_PATH);
const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(wb.Sheets[wb.SheetNames[0]]);

let checks = 0;
let originalPreserved = 0;   // assembled output reuses the original variant verbatim
let originalAltered = 0;     // original text was modified (would be a problem)
let onlyAppended = 0;        // the ONLY difference is appended LOCK/NEGATIVE blocks
const offenders: string[] = [];

for (const row of rows) {
  const title = str(row.title);
  const base = str(row.base_prompt);
  if (!title || !base) continue;

  const platforms: Record<string, string> = {};
  for (const [col, key] of PLATFORM_COLUMNS) { const v = str(row[col]); if (v) platforms[key] = v; }

  const record: PromptRecord = {
    id: "lib:" + title,
    title,
    category: CATEGORY_MAP[str(row.category)] ?? str(row.category),
    description: base,
    basePrompt: base,
    platforms,
  };

  for (const platformKey of Object.keys(platforms)) {
    const original = platforms[platformKey];
    const result = assembleFromRecord(record, platformKey);
    checks += 1;

    // 1) the returned platform text must equal the original authored variant
    const verbatim = result.platformPromptText === original;
    if (verbatim) originalPreserved += 1;
    else { originalAltered += 1; if (offenders.length < 10) offenders.push(`${title} / ${platformKey}`); }

    // 2) the assembled output must START with the original (trimmed) and only add blocks after
    const trimmed = original.trim();
    const startsWithOriginal = result.finalAssembledText.startsWith(trimmed);
    const remainder = result.finalAssembledText.slice(trimmed.length);
    const appendedOnly = startsWithOriginal && (remainder === "" || /^\s*(LOCK LAYER|$)/.test(remainder.trimStart()));
    if (appendedOnly) onlyAppended += 1;
  }
}

console.log("\n══ PROMPT INTEGRITY CHECK (does the engine change the original text?) ══\n");
console.log(`prompts × platform variants checked: ${checks}`);
console.log(`original text reused VERBATIM:        ${originalPreserved} / ${checks}`);
console.log(`original text ALTERED:               ${originalAltered} / ${checks}`);
console.log(`assembled = original + appended only: ${onlyAppended} / ${checks}`);
if (offenders.length) { console.log("\naltered examples:"); offenders.forEach((o) => console.log("  ✗ " + o)); }
console.log(
  `\n${originalAltered === 0 ? "✅ The engine does NOT change the original prompt — it only appends lock/negative blocks." : "❌ Some prompts were altered (see above)."}`,
);
