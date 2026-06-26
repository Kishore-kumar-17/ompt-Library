/**
 * bake-locks.ts
 * -------------
 * Persists the engine's locked output into the library. For every pl_prompts row
 * it generates the platform-invariant lock layer + negative locks and stores them
 * in a new pl_prompt_locks table, plus the full assembled text per platform in
 * pl_prompt_platforms.locked_prompt_text.
 *
 * Originals (base_prompt / prompt_text) are NEVER modified — this is add-only.
 *
 * Usage:
 *   cd backend
 *   cp .env.example .env          # fill in DATABASE_URL
 *   npx tsx scripts/bake-locks.ts
 *
 * Idempotent: safe to re-run (UPSERT). RE-RUN after any engine parser/template
 * change, since locks are derived from the prompts.
 */

import postgres from "postgres";
import { config } from "dotenv";

config({ path: new URL("../.env", import.meta.url).pathname });

// Dynamic import AFTER dotenv: engine/index.ts pulls in db/client.ts, which
// throws if DATABASE_URL is unset at import time.
const { assembleFromRecord } = await import("../src/engine/index.js");
const { formatLockSection } = await import("../src/engine/lock-builder.js");
import type { PromptRecord } from "../src/engine/types.js";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL is not set (create backend/.env from .env.example).");
  process.exit(1);
}

interface PlRow {
  id: number;
  title: string;
  base_prompt: string | null;
  category: string | null;
  sub_category: string | null;
}

async function main() {
  const sql = postgres(dbUrl!, { max: 5 });

  try {
    console.log("🏗️  Ensuring lock tables/columns exist…");
    await sql`
      CREATE TABLE IF NOT EXISTS pl_prompt_locks (
        prompt_id      INTEGER     PRIMARY KEY REFERENCES pl_prompts(id) ON DELETE CASCADE,
        category_id    VARCHAR(40),
        category_label VARCHAR(60),
        lock_layer_text TEXT,
        lock_section   JSONB,
        negative_locks TEXT[]      NOT NULL DEFAULT '{}',
        valid          BOOLEAN,
        warnings       TEXT[]      NOT NULL DEFAULT '{}',
        generated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`ALTER TABLE pl_prompt_platforms ADD COLUMN IF NOT EXISTS locked_prompt_text TEXT`;

    console.log("📥 Loading prompts + platform variants…");
    const prompts = await sql<PlRow[]>`
      SELECT id, title, base_prompt, category, sub_category FROM pl_prompts ORDER BY id
    `;
    const platformRows = await sql<{ prompt_id: number; platform: string; prompt_text: string }[]>`
      SELECT prompt_id, platform, prompt_text FROM pl_prompt_platforms
    `;

    const platformsByPrompt = new Map<number, Record<string, string>>();
    for (const r of platformRows) {
      const m = platformsByPrompt.get(r.prompt_id) ?? {};
      m[r.platform] = r.prompt_text;
      platformsByPrompt.set(r.prompt_id, m);
    }

    let baked = 0;
    let variantsUpdated = 0;
    let invalid = 0;

    for (const row of prompts) {
      const platforms = platformsByPrompt.get(row.id) ?? {};
      const record: PromptRecord = {
        id: `lib:${row.id}`,
        title: row.title,
        // pl_prompts.category is already stored in canonical long form by the import.
        category: row.category ?? "",
        description: row.base_prompt ?? undefined,
        basePrompt: row.base_prompt ?? undefined,
        subCategory: row.sub_category ?? undefined,
        platforms,
      };

      // Locks are platform-invariant — compute once.
      const base = assembleFromRecord(record);
      if (!base.validation.valid) invalid += 1;

      await sql`
        INSERT INTO pl_prompt_locks
          (prompt_id, category_id, category_label, lock_layer_text, lock_section, negative_locks, valid, warnings)
        VALUES (
          ${row.id}, ${base.categoryId}, ${base.categoryLabel},
          ${formatLockSection(base.lockSection)}, ${JSON.stringify(base.lockSection)}::jsonb,
          ${sql.array(base.negativeLockSection)}, ${base.validation.valid},
          ${sql.array(base.validation.warnings)}
        )
        ON CONFLICT (prompt_id) DO UPDATE SET
          category_id     = EXCLUDED.category_id,
          category_label  = EXCLUDED.category_label,
          lock_layer_text = EXCLUDED.lock_layer_text,
          lock_section    = EXCLUDED.lock_section,
          negative_locks  = EXCLUDED.negative_locks,
          valid           = EXCLUDED.valid,
          warnings        = EXCLUDED.warnings,
          generated_at    = NOW()
      `;
      baked += 1;

      for (const platform of Object.keys(platforms)) {
        const locked = assembleFromRecord(record, platform).finalAssembledText;
        await sql`
          UPDATE pl_prompt_platforms
          SET    locked_prompt_text = ${locked}
          WHERE  prompt_id = ${row.id} AND platform = ${platform}
        `;
        variantsUpdated += 1;
      }

      if (baked % 50 === 0) console.log(`   …${baked}/${prompts.length}`);
    }

    console.log(`\n✅ Baked ${baked} prompts, updated ${variantsUpdated} platform variants.`);
    console.log(`   ${invalid} prompts had incomplete lock data (valid=false) — locks still stored.`);
  } finally {
    await sql.end();
  }
}

main().catch((err) => {
  console.error("bake-locks failed:", err);
  process.exit(1);
});
