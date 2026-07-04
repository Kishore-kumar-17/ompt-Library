/**
 * import-prompts.ts
 * -----------------
 * Reads prompts_master.xlsx, normalises the data, and bulk-inserts
 * all 350 prompts + their platform versions into PostgreSQL.
 *
 * Usage:
 *   cd backend
 *   cp .env.example .env          # fill in DATABASE_URL
 *   npx tsx scripts/import-prompts.ts
 *
 * Safe to re-run — uses ON CONFLICT DO NOTHING on the slug column.
 */

import * as XLSX from "xlsx";
import postgres from "postgres";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config({ path: new URL("../.env", import.meta.url).pathname });

// ─── Config ───────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXCEL_PATH = path.resolve(__dirname, "../../prompts_master.xlsx");
const PLATFORMS  = ["chatgpt", "gemini", "grok", "midjourney", "firefly", "flux"] as const;

// ─── Category normalisation ───────────────────────────────────────────────────
// The Excel has duplicate short-form names. Always use the canonical long form.

const CATEGORY_MAP: Record<string, string> = {
  "Fashion":   "Fashion & Apparel",
  "Marketing": "Marketing & Ads",
  "People":    "People & Portraits",
  "Product":   "Product & E-com",
  "Social":    "Social Media",
};

function normaliseCategory(raw: string): string {
  return CATEGORY_MAP[raw.trim()] ?? raw.trim();
}

// ─── Tag parsing ──────────────────────────────────────────────────────────────
// Input: "madhubani, folk art, peacock, lotus"
// Output: ["madhubani", "folk art", "peacock", "lotus"]

function parseTags(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map(t => t.trim().toLowerCase())
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i); // deduplicate
}

// ─── Row type (raw from Excel) ────────────────────────────────────────────────

interface RawRow {
  prompt_id:         string;
  category:          string;
  sub_category:      string;
  prompt_type:       string;
  title:             string;
  base_prompt:       string;
  chatgpt_version:   string;
  gemini_version:    string;
  grok_version:      string;
  midjourney_version: string;
  firefly_version:   string;
  flux_version:      string;
  tags:              string;
  source:            string;
  quality_score:     number | string;
  tested:            string;
}

// ─── Transformed row (clean) ──────────────────────────────────────────────────

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
  platforms: Record<string, string>;
}

// ─── Transform ────────────────────────────────────────────────────────────────

function transformRow(row: RawRow, rowIndex: number): CleanPrompt | null {
  // Skip rows with no title or base_prompt
  if (!row.title?.trim() || !row.base_prompt?.trim()) return null;

  // Images are named image1.png … image348.png, matching Excel row order (1-based).
  // These 8 have no enhanced PNG and remain .jpeg: 25, 29, 340, 344, 345, 346, 347, 348.
  const imageNum = rowIndex + 1;
  const JPEG_FALLBACKS = new Set([25, 29, 340, 344, 345, 346, 347, 348]);
  const ext = JPEG_FALLBACKS.has(imageNum) ? "jpeg" : "png";
  const image_url = imageNum <= 348 ? `/images/image${imageNum}.${ext}` : "";

  return {
    slug:          row.prompt_id.trim(),
    title:         row.title.trim(),
    base_prompt:   row.base_prompt.trim(),
    category:      normaliseCategory(row.category),
    sub_category:  row.sub_category?.trim() ?? "",
    prompt_type:   row.prompt_type?.trim() ?? "",
    tags:          parseTags(row.tags),
    source:        row.source?.trim() || "curated",
    quality_score: Number(row.quality_score) || 5,
    tested:        row.tested?.trim().toLowerCase() === "yes",
    image_url,
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

  console.log("📂 Reading Excel file:", EXCEL_PATH);
  const wb   = XLSX.readFile(EXCEL_PATH);
  const rows = XLSX.utils.sheet_to_json<RawRow>(
    wb.Sheets[wb.SheetNames[0]],
    { defval: "" }
  );
  console.log(`   Found ${rows.length} raw rows`);

  // Transform + filter (pass row index for image_url assignment)
  const prompts: CleanPrompt[] = rows
    .map((row, i) => transformRow(row, i))
    .filter((r): r is CleanPrompt => r !== null);

  // Detect and report duplicates (same slug)
  const slugCount: Record<string, number> = {};
  prompts.forEach(p => { slugCount[p.slug] = (slugCount[p.slug] ?? 0) + 1; });
  const dupes = Object.entries(slugCount).filter(([, n]) => n > 1);
  if (dupes.length) {
    console.warn(`⚠️  Duplicate slugs detected (will be skipped on re-run):`);
    dupes.forEach(([slug, n]) => console.warn(`     ${slug} × ${n}`));
  }

  console.log(`   ${prompts.length} prompts ready to insert`);

  // ── Example JSON (first prompt, printed for reference) ─────────────────────
  console.log("\n📋 Example transformed row:");
  const ex = { ...prompts[0] };
  (ex as any).platforms = Object.fromEntries(
    Object.entries(ex.platforms).map(([k, v]) => [k, v.slice(0, 80) + "…"])
  );
  console.log(JSON.stringify(ex, null, 2));

  // ── Connect and insert ──────────────────────────────────────────────────────
  console.log("\n🔌 Connecting to database…");
  const sql = postgres(dbUrl, { max: 5 });

  try {
    // Create tables if they don't exist (idempotent)
    console.log("🏗️  Ensuring tables exist…");
    await sql`CREATE EXTENSION IF NOT EXISTS pg_trgm`;
    await sql`CREATE EXTENSION IF NOT EXISTS unaccent`;

    await sql`
      CREATE TABLE IF NOT EXISTS pl_prompts (
        id            SERIAL        PRIMARY KEY,
        slug          VARCHAR(60)   NOT NULL UNIQUE,
        title         VARCHAR(300)  NOT NULL,
        base_prompt   TEXT          NOT NULL,
        category      VARCHAR(100)  NOT NULL,
        sub_category  VARCHAR(100)  DEFAULT '',
        prompt_type   VARCHAR(150)  DEFAULT '',
        tags          TEXT[]        NOT NULL DEFAULT '{}',
        source        VARCHAR(100)  DEFAULT 'curated',
        quality_score SMALLINT      DEFAULT 5,
        tested        BOOLEAN       DEFAULT FALSE,
        image_url     VARCHAR(255)  DEFAULT '',
        created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
        updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
      )
    `;

    // Add image_url column if it was missing from a previous run
    await sql`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name='pl_prompts' AND column_name='image_url'
        ) THEN
          ALTER TABLE pl_prompts ADD COLUMN image_url VARCHAR(255) DEFAULT '';
        END IF;
      END $$
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS pl_prompt_platforms (
        id          SERIAL      PRIMARY KEY,
        prompt_id   INTEGER     NOT NULL REFERENCES pl_prompts(id) ON DELETE CASCADE,
        platform    VARCHAR(50) NOT NULL,
        prompt_text TEXT        NOT NULL,
        UNIQUE (prompt_id, platform)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS pl_saved_prompts (
        user_id   VARCHAR(21) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        prompt_id INTEGER     NOT NULL REFERENCES pl_prompts(id) ON DELETE CASCADE,
        saved_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (user_id, prompt_id)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS pl_copy_events (
        id         SERIAL      PRIMARY KEY,
        prompt_id  INTEGER     NOT NULL REFERENCES pl_prompts(id) ON DELETE CASCADE,
        user_id    VARCHAR(21) REFERENCES users(id) ON DELETE SET NULL,
        platform   VARCHAR(50),
        copied_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_pl_saved_user ON pl_saved_prompts (user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_pl_copy_user ON pl_copy_events (user_id)`;

    // Search vector column — add only if missing (ALTER is safe to re-run)
    await sql`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name='pl_prompts' AND column_name='search_vec'
        ) THEN
          ALTER TABLE pl_prompts ADD COLUMN search_vec TSVECTOR
            GENERATED ALWAYS AS (
              to_tsvector('english',
                unaccent(coalesce(title,''))        || ' ' ||
                unaccent(coalesce(base_prompt,''))  || ' ' ||
                unaccent(coalesce(category,''))     || ' ' ||
                unaccent(coalesce(sub_category,'')) || ' ' ||
                unaccent(coalesce(prompt_type,''))  || ' ' ||
                unaccent(array_to_string(tags,' '))
              )
            ) STORED;
          CREATE INDEX idx_pl_prompts_search ON pl_prompts USING GIN(search_vec);
          CREATE INDEX idx_pl_prompts_tags   ON pl_prompts USING GIN(tags);
          CREATE INDEX idx_pl_title_trgm     ON pl_prompts USING GIN(title gin_trgm_ops);
          CREATE INDEX idx_pl_category       ON pl_prompts (category);
        END IF;
      END $$
    `;

    // ── Batch insert ──────────────────────────────────────────────────────────
    let inserted = 0;
    let skipped  = 0;

    console.log("\n⬆️  Inserting prompts…");

    for (const p of prompts) {
      // Insert prompt row — skip if slug already exists
      const [row] = await sql`
        INSERT INTO pl_prompts
          (slug, title, base_prompt, category, sub_category, prompt_type,
           tags, source, quality_score, tested, image_url)
        VALUES (
          ${p.slug}, ${p.title}, ${p.base_prompt}, ${p.category},
          ${p.sub_category}, ${p.prompt_type},
          ${sql.array(p.tags)}, ${p.source}, ${p.quality_score}, ${p.tested},
          ${p.image_url}
        )
        ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url
        RETURNING id
      `;

      if (!row) { skipped++; continue; }

      // Insert platform versions for this prompt
      const platformRows = Object.entries(p.platforms)
        .filter(([, text]) => text.length > 0)
        .map(([platform, prompt_text]) => ({
          prompt_id: row.id,
          platform,
          prompt_text,
        }));

      if (platformRows.length > 0) {
        await sql`
          INSERT INTO pl_prompt_platforms ${sql(platformRows, "prompt_id", "platform", "prompt_text")}
          ON CONFLICT (prompt_id, platform) DO NOTHING
        `;
      }

      inserted++;
      if (inserted % 50 === 0) process.stdout.write(`   ${inserted} done…\r`);
    }

    console.log(`\n✅ Done — inserted: ${inserted}, skipped (duplicates): ${skipped}`);

    // Verify
    const [{ count }] = await sql`SELECT count(*)::int AS count FROM pl_prompts`;
    console.log(`📊 Total prompts in database: ${count}`);

  } finally {
    await sql.end();
  }
}

main().catch(err => { console.error("❌", err.message); process.exit(1); });
