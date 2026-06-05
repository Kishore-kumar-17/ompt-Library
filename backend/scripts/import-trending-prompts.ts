/**
 * import-trending-prompts.ts
 * --------------------------
 * Imports 70 Trending & Viral prompts from "Viral Prompts .xlsx" into pl_prompts.
 * Images are named vi01.png/jpg … vi70.jpg and must already be copied to
 * frontend/public/images/ before running this script.
 *
 * Usage:
 *   cd backend
 *   npx tsx scripts/import-trending-prompts.ts
 *
 * Safe to re-run — uses ON CONFLICT (slug) DO UPDATE to refresh image_url.
 */

// @ts-ignore
import XLSX from "xlsx";
import postgres from "postgres";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config({ path: new URL("../.env", import.meta.url).pathname });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXCEL_PATH = path.resolve(__dirname, "../../Viral Prompts .xlsx");
const PLATFORMS  = ["chatgpt", "gemini", "grok", "midjourney", "firefly", "flux"] as const;
const CATEGORY   = "Trending & Viral";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RawRow {
  prompt_id:          string;
  category:           string;
  sub_category:       string;
  prompt_type:        string;
  title:              string;
  base_prompt:        string;
  chatgpt_version:    string;
  gemini_version:     string;
  grok_version:       string;
  midjourney_version: string;
  firefly_version:    string;
  flux_version:       string;
  tags:               string;
  source:             string;
  quality_score:      number | string;
  tested:             string;
}

interface CleanPrompt {
  slug:          string;
  title:         string;
  base_prompt:   string;
  category:      string;
  sub_category:  string;
  prompt_type:   string;
  tags:          string[];
  source:        string;
  quality_score: number;
  tested:        boolean;
  image_url:     string;
  platforms:     Record<string, string>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseTags(raw: string): string[] {
  if (!raw) return [];
  return [...new Set(
    raw.split(",").map(t => t.trim().toLowerCase()).filter(Boolean)
  )];
}

/** Map row index (0-based) to image filename: vi01.png, vi02.png, vi03.jpg … */
function imageUrl(index: number): string {
  const n = index + 1;
  const pad = String(n).padStart(2, "0");
  // vi01 and vi02 are .png, rest are .jpg
  const ext = n <= 2 ? "png" : "jpg";
  return `/images/vi${pad}.${ext}`;
}

function transformRow(row: RawRow, index: number): CleanPrompt | null {
  if (!row.title?.trim() || !row.base_prompt?.trim()) return null;
  return {
    slug:          row.prompt_id.trim(),
    title:         row.title.trim(),
    base_prompt:   row.base_prompt.trim(),
    category:      CATEGORY,                        // always "Trending & Viral"
    sub_category:  row.sub_category?.trim() ?? "",
    prompt_type:   row.prompt_type?.trim()  ?? "",
    tags:          parseTags(row.tags),
    source:        row.source?.trim() || "picprompt-viral",
    quality_score: Number(row.quality_score) || 5,
    tested:        row.tested?.trim().toLowerCase() === "yes",
    image_url:     imageUrl(index),
    platforms: {
      chatgpt:    row.chatgpt_version?.trim()    || "",
      gemini:     row.gemini_version?.trim()     || "",
      grok:       row.grok_version?.trim()       || "",
      midjourney: row.midjourney_version?.trim() || "",
      firefly:    row.firefly_version?.trim()    || "",
      flux:       row.flux_version?.trim()       || "",
    },
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL is not set in .env");

  console.log("📂 Reading:", EXCEL_PATH);
  const wb   = XLSX.readFile(EXCEL_PATH);
  const rows = XLSX.utils.sheet_to_json<RawRow>(wb.Sheets[wb.SheetNames[0]], { defval: "" });
  console.log(`   ${rows.length} raw rows`);

  const prompts: CleanPrompt[] = rows
    .map((row, i) => transformRow(row, i))
    .filter((r): r is CleanPrompt => r !== null);

  console.log(`   ${prompts.length} prompts ready (category: "${CATEGORY}")`);
  console.log(`   Preview: "${prompts[0].title}" → ${prompts[0].image_url}`);

  console.log("\n🔌 Connecting to database…");
  const sql = postgres(dbUrl, { max: 5 });

  try {
    let inserted = 0;
    let updated  = 0;

    console.log("⬆️  Inserting prompts…");

    for (const p of prompts) {
      const [row] = await sql`
        INSERT INTO pl_prompts
          (slug, title, base_prompt, category, sub_category, prompt_type,
           tags, source, quality_score, tested, image_url)
        VALUES (
          ${p.slug}, ${p.title}, ${p.base_prompt}, ${p.category},
          ${p.sub_category}, ${p.prompt_type},
          ${sql.array(p.tags)}, ${p.source}, ${p.quality_score},
          ${p.tested}, ${p.image_url}
        )
        ON CONFLICT (slug) DO UPDATE SET
          title         = EXCLUDED.title,
          base_prompt   = EXCLUDED.base_prompt,
          category      = EXCLUDED.category,
          sub_category  = EXCLUDED.sub_category,
          prompt_type   = EXCLUDED.prompt_type,
          tags          = EXCLUDED.tags,
          quality_score = EXCLUDED.quality_score,
          image_url     = EXCLUDED.image_url
        RETURNING id, (xmax = 0) AS is_insert
      `;

      if (!row) continue;
      if (row.is_insert) inserted++; else updated++;

      // Upsert platform versions
      const platformRows = Object.entries(p.platforms)
        .filter(([, text]) => text.length > 0)
        .map(([platform, prompt_text]) => ({ prompt_id: row.id, platform, prompt_text }));

      if (platformRows.length > 0) {
        await sql`
          INSERT INTO pl_prompt_platforms ${sql(platformRows, "prompt_id", "platform", "prompt_text")}
          ON CONFLICT (prompt_id, platform) DO UPDATE SET
            prompt_text = EXCLUDED.prompt_text
        `;
      }

      if ((inserted + updated) % 10 === 0) {
        process.stdout.write(`   ${inserted + updated}/${prompts.length} done…\r`);
      }
    }

    console.log(`\n✅ Done — inserted: ${inserted}, updated: ${updated}`);

    const [{ count }] = await sql`
      SELECT count(*)::int AS count FROM pl_prompts WHERE category = ${CATEGORY}
    `;
    console.log(`📊 Total "${CATEGORY}" prompts in DB: ${count}`);

  } finally {
    await sql.end();
  }
}

main().catch(err => { console.error("❌", err.message); process.exit(1); });
