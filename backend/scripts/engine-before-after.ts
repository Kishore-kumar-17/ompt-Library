/**
 * engine-before-after.ts — shows the exact text the engine adds to a real prompt.
 *   cd backend && npx tsx scripts/engine-before-after.ts ["Title substring"] [platform]
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

const TITLE = process.argv[2] ?? "Banarasi Saree Portrait";
const PLATFORM = process.argv[3] ?? "chatgpt";

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
const row = rows.find((r) => str(r.title).toLowerCase().includes(TITLE.toLowerCase()));
if (!row) { console.error(`No prompt matching "${TITLE}"`); process.exit(1); }

const platforms: Record<string, string> = {};
for (const [col, key] of PLATFORM_COLUMNS) { const v = str(row[col]); if (v) platforms[key] = v; }

const record: PromptRecord = {
  id: "lib:demo",
  title: str(row.title),
  category: CATEGORY_MAP[str(row.category)] ?? str(row.category),
  description: str(row.base_prompt),
  basePrompt: str(row.base_prompt),
  platforms,
};

const result = assembleFromRecord(record, PLATFORM);

console.log(`\nPROMPT: "${record.title}"  |  category: ${result.categoryLabel}  |  platform: ${result.selectedPlatform}\n`);
console.log("═".repeat(80));
console.log("BEFORE — the original authored prompt (what you'd send today)");
console.log("═".repeat(80));
console.log(result.platformPromptText);
console.log("\n" + "═".repeat(80));
console.log("AFTER — the engine's assembled output (SAME prompt + appended layers)");
console.log("═".repeat(80));
console.log(result.finalAssembledText);
console.log("\n" + "─".repeat(80));
console.log("WHAT CHANGED: the BEFORE text is unchanged and reused verbatim.");
console.log("The engine only APPENDED the 'LOCK LAYER' and 'NEGATIVE LOCKS' blocks below it.");
console.log("Those locks are extracted FROM this prompt — they restate its own decisions.");
