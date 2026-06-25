/**
 * engine-quality.ts — offline quality audit of the engine over the REAL library.
 *
 * Reads prompts_master.xlsx (no DB), runs every prompt through the engine, and
 * reports per-category coverage + a cross-platform lock-consistency check.
 *
 *   cd backend && npx tsx scripts/engine-quality.ts
 */

import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import type { AssembledPromptResult, PromptRecord } from "../src/engine/types.js";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

process.env.DATABASE_URL ??= "postgresql://smoke:smoke@localhost:5432/smoke";
const { assembleFromRecord } = await import("../src/engine/index.js");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXCEL_PATH = path.resolve(__dirname, "../../prompts_master.xlsx");

// Short → canonical category names (mirrors scripts/import-prompts.ts).
const CATEGORY_MAP: Record<string, string> = {
  Fashion: "Fashion & Apparel",
  Marketing: "Marketing & Ads",
  People: "People & Portraits",
  Product: "Product & E-com",
  Social: "Social Media",
};

const PLATFORM_COLUMNS: Array<[string, string]> = [
  ["chatgpt_version", "chatgpt"],
  ["gemini_version", "gemini"],
  ["grok_version", "grok"],
  ["midjourney_version", "midjourney"],
  ["firefly_version", "firefly"],
  ["flux_version", "flux"],
];

function str(v: unknown): string {
  return (v ?? "").toString().trim();
}

function toRecord(row: Record<string, unknown>, i: number): PromptRecord | null {
  const title = str(row.title);
  const base = str(row.base_prompt);
  if (!title || !base) return null;

  const platforms: Record<string, string> = {};
  for (const [col, key] of PLATFORM_COLUMNS) {
    const v = str(row[col]);
    if (v) platforms[key] = v;
  }

  const rawCat = str(row.category);
  return {
    id: `lib:xlsx-${i + 1}`,
    title,
    category: CATEGORY_MAP[rawCat] ?? rawCat,
    description: base,
    basePrompt: base,
    subCategory: str(row.sub_category) || undefined,
    tags: str(row.tags).split(",").map((t) => t.trim()).filter(Boolean),
    platforms,
  };
}

function lockSignature(r: AssembledPromptResult): string {
  return (
    r.lockSection.map((l) => `${l.key}=${l.value}`).join("§") +
    "||" +
    r.negativeLockSection.join("§")
  );
}

// ─── Load ───────────────────────────────────────────────────────────────────

const wb = XLSX.readFile(EXCEL_PATH);
const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(wb.Sheets[wb.SheetNames[0]]);
const records = rows.map(toRecord).filter((r): r is PromptRecord => r !== null);

console.log(`Loaded ${records.length} prompts from prompts_master.xlsx\n`);

// ─── Aggregates ───────────────────────────────────────────────────────────────

interface CatStats {
  total: number;
  valid: number;
  noLocks: number;
  locksResolvedSum: number;
  requiredResolvedSum: number;
  mandatoryTotalSum: number;
  missing: Map<string, number>;
  example?: { title: string; platforms: number; signature: string };
}

const byCategory = new Map<string, CatStats>();
function statsFor(label: string): CatStats {
  let s = byCategory.get(label);
  if (!s) {
    s = { total: 0, valid: 0, noLocks: 0, locksResolvedSum: 0, requiredResolvedSum: 0, mandatoryTotalSum: 0, missing: new Map() };
    byCategory.set(label, s);
  }
  return s;
}

let passthroughCount = 0;
let consistencyChecked = 0;
let platformAssemblies = 0;
const inconsistent: string[] = [];

for (const record of records) {
  const base = assembleFromRecord(record);
  const label = base.categoryLabel;
  const s = statsFor(label);

  s.total += 1;
  const requiredResolved = base.lockSection.filter((l) => l.required).length;
  const mandatoryTotal = requiredResolved + base.validation.missingRequiredFields.length;
  s.locksResolvedSum += base.lockSection.length;
  s.requiredResolvedSum += requiredResolved;
  s.mandatoryTotalSum += mandatoryTotal;
  if (base.validation.valid) s.valid += 1;
  if (base.lockSection.length === 0) s.noLocks += 1;
  if (base.categoryId === null) passthroughCount += 1;
  for (const f of base.validation.missingRequiredFields) {
    s.missing.set(f, (s.missing.get(f) ?? 0) + 1);
  }

  // Cross-platform consistency: lock signature must be identical for every variant.
  const platforms = Object.keys(record.platforms);
  if (platforms.length > 1) {
    const sigs = new Set<string>();
    for (const p of platforms) {
      sigs.add(lockSignature(assembleFromRecord(record, p)));
      platformAssemblies += 1;
    }
    consistencyChecked += 1;
    if (sigs.size > 1) inconsistent.push(`${record.id} "${record.title}" (${sigs.size} distinct lock sets)`);
  }

  if (!s.example && base.categoryId && base.lockSection.length > 0) {
    s.example = { title: record.title, platforms: platforms.length, signature: lockSignature(base) };
  }
}

// ─── Report ───────────────────────────────────────────────────────────────────

console.log("══ PER-CATEGORY COVERAGE ══\n");
const labels = [...byCategory.keys()].sort();
for (const label of labels) {
  const s = byCategory.get(label)!;
  const pctValid = ((s.valid / s.total) * 100).toFixed(0);
  const avgLocks = (s.locksResolvedSum / s.total).toFixed(1);
  const avgReq = (s.requiredResolvedSum / s.total).toFixed(1);
  const avgMand = (s.mandatoryTotalSum / s.total).toFixed(1);
  console.log(`▶ ${label}`);
  console.log(`   prompts: ${s.total}  |  fully-valid: ${s.valid} (${pctValid}%)  |  no-locks: ${s.noLocks}`);
  console.log(`   avg locks resolved: ${avgLocks}  |  avg mandatory resolved: ${avgReq}/${avgMand}`);
  const topMissing = [...s.missing.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (topMissing.length > 0) {
    console.log(`   top missing fields: ${topMissing.map(([f, n]) => `${f} (${n})`).join(", ")}`);
  }
  console.log("");
}

console.log("══ CROSS-PLATFORM CONSISTENCY ══\n");
console.log(`   prompts checked (>1 platform): ${consistencyChecked}`);
console.log(`   total platform assemblies compared: ${platformAssemblies}`);
console.log(`   inconsistent prompts: ${inconsistent.length}`);
if (inconsistent.length > 0) {
  for (const line of inconsistent.slice(0, 20)) console.log(`     ✗ ${line}`);
}
console.log(`   ${inconsistent.length === 0 ? "✅ PASS — locks identical across all platforms" : "❌ FAIL — locks vary by platform"}`);

console.log("\n══ SAMPLE (one per category, locks identical across N platforms) ══\n");
for (const label of labels) {
  const ex = byCategory.get(label)!.example;
  if (ex) console.log(`▶ ${label}: "${ex.title}" — consistent across ${ex.platforms} platforms`);
}

console.log("\n══ TOTALS ══");
const total = records.length;
const validTotal = [...byCategory.values()].reduce((a, s) => a + s.valid, 0);
console.log(`   prompts: ${total}  |  fully-valid: ${validTotal} (${((validTotal / total) * 100).toFixed(0)}%)`);
console.log(`   unresolved-category passthroughs: ${passthroughCount}`);
