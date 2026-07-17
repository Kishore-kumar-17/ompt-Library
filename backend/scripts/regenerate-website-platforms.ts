// Regenerates duplicate platform prompt text in the website design library.
// 48/91 designs currently have byte-identical text across all 8 AI-platform
// tabs (most of the rest only have ~5 unique texts spread across 8 keys) —
// this calls the same AI formula the live Builder uses (WEBSITE_FORMULA +
// WEBSITE_PLATFORM_FORMULAS[platform]) to produce a distinct, platform-
// appropriate prompt for every duplicate cell. Only touches cells flagged as
// duplicates by detect-website-duplicates.ts — untouched cells are copied
// through unmodified. Offline w.r.t. the DB (no Postgres needed); needs
// OPENROUTER_API_KEY.
//
//   cd backend && npx tsx scripts/regenerate-website-platforms.ts

import { config } from "dotenv";
config({ path: ".env" });

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { getAIService } from "../src/engine/ai/service.js";
import { WEBSITE_FORMULA } from "../src/engine/website/system-prompts.js";
import { WEBSITE_PLATFORM_FORMULAS } from "../src/engine/website/platform-prompts.js";

const { websitePlatformVersions } = (await import(
  "../../frontend/src/app/lib/website-platforms.js"
)) as { websitePlatformVersions: Record<string, Record<string, string>> };

const { websiteDesigns } = (await import(
  "../../frontend/src/app/lib/website-data.js"
)) as {
  websiteDesigns: Array<{
    id: string; slug: string; title: string; subtitle: string;
    category: string; subCategory: string; style: string;
    description: string; stack: string[]; tags: string[];
  }>;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, "../../frontend/src/app/lib/website-platforms.ts");
const BACKUP_PATH = OUT_PATH + ".bak";

const ALL_PLATFORMS = ["lovable", "bolt", "v0", "cursor", "chatgpt", "claude", "gemini", "grok"];
// Free OpenRouter models share a tight per-minute rate limit across the
// whole key — low concurrency + generous backoff instead of the paid-tier
// settings used for the first (partial) run.
const MODEL = "tencent/hy3:free";
const CONCURRENCY = 2;
const MAX_RETRIES = 4;

const designBySlug = new Map(websiteDesigns.map((d) => [d.slug, d]));

// ─── Step 1: find every (slug, platform) cell that's a duplicate ──────────────
interface Job { slug: string; platform: string }
const jobs: Job[] = [];

for (const [slug, versions] of Object.entries(websitePlatformVersions)) {
  const present = ALL_PLATFORMS.filter((p) => versions[p]?.trim());
  const textToPlatforms = new Map<string, string[]>();
  for (const p of present) {
    const text = versions[p].trim();
    if (!textToPlatforms.has(text)) textToPlatforms.set(text, []);
    textToPlatforms.get(text)!.push(p);
  }
  for (const [, platforms] of textToPlatforms) {
    if (platforms.length > 1) {
      // Keep the first platform's existing text as-is; regenerate the rest.
      for (const p of platforms.slice(1)) jobs.push({ slug, platform: p });
    }
  }
}

console.log(`${jobs.length} cells to regenerate across ${new Set(jobs.map(j => j.slug)).size} designs.`);
if (jobs.length === 0) { console.log("Nothing to do."); process.exit(0); }

// SMOKE_LIMIT=3 npx tsx scripts/regenerate-website-platforms.ts — process only
// the first N jobs, to verify the AI call + output formatting before paying
// for the full batch.
const smokeLimit = process.env.SMOKE_LIMIT ? Number(process.env.SMOKE_LIMIT) : null;
const activeJobs = smokeLimit ? jobs.slice(0, smokeLimit) : jobs;
if (smokeLimit) console.log(`SMOKE_LIMIT set — only processing first ${activeJobs.length} job(s).`);

// ─── Step 2: build a rich idea string per design (once, reused per platform) ──
function buildIdea(slug: string): string {
  const d = designBySlug.get(slug);
  if (!d) return slug;
  return [
    `${d.title} — ${d.subtitle}`,
    `Category: ${d.category} / ${d.subCategory}`,
    `Style: ${d.style}`,
    d.description,
    d.stack?.length ? `Tech stack: ${d.stack.join(", ")}` : "",
    d.tags?.length ? `Tags: ${d.tags.join(", ")}` : "",
  ].filter(Boolean).join("\n");
}

// ─── Step 3: generate, with a small concurrency pool + retries ────────────────
const ai = getAIService();
const results = new Map<string, string>(); // `${slug}::${platform}` -> text
let done = 0;
let failed = 0;

async function runJob(job: Job): Promise<void> {
  const idea = buildIdea(job.slug);
  const system = `${WEBSITE_FORMULA}\n\n${WEBSITE_PLATFORM_FORMULAS[job.platform] ?? ""}`;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await ai.complete({
        model: MODEL,
        system,
        messages: [{ role: "user", content: idea }],
        maxTokens: 4000,
      });
      const text = res.text.trim();
      if (!text) throw new Error("empty response");
      results.set(`${job.slug}::${job.platform}`, text);
      done++;
      if (done % 10 === 0 || done === activeJobs.length) {
        console.log(`  ${done}/${activeJobs.length} done (${failed} failed so far)`);
      }
      return;
    } catch (err: any) {
      const rateLimited = /rate.?limit|429/i.test(err?.message ?? "");
      if (attempt === MAX_RETRIES) {
        failed++;
        console.error(`  FAILED ${job.slug}/${job.platform}: ${err?.message ?? err}`);
        return;
      }
      // Free-tier rate limits reset roughly per-minute — back off harder
      // than a generic transient-error retry would.
      const backoffMs = rateLimited ? 15_000 * (attempt + 1) : 1000 * (attempt + 1);
      await new Promise((r) => setTimeout(r, backoffMs));
    }
  }
}

async function runPool(items: Job[], concurrency: number) {
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const job = items[i++];
      await runJob(job);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
}

console.log(`Starting generation with concurrency ${CONCURRENCY}...`);
await runPool(activeJobs, CONCURRENCY);
console.log(`Generation complete: ${done - failed} succeeded, ${failed} failed.`);

if (smokeLimit) {
  console.log("SMOKE_LIMIT set — skipping the file write. Sample output:");
  for (const [key, text] of results) console.log(`\n=== ${key} ===\n${text.slice(0, 400)}${text.length > 400 ? "…" : ""}`);
  process.exit(0);
}

// ─── Step 4: merge results into the full data set, back up, write out ─────────
const merged: Record<string, Record<string, string>> = {};
for (const [slug, versions] of Object.entries(websitePlatformVersions)) {
  merged[slug] = { ...versions };
  for (const p of ALL_PLATFORMS) {
    const key = `${slug}::${p}`;
    if (results.has(key)) merged[slug][p] = results.get(key)!;
  }
}

fs.copyFileSync(OUT_PATH, BACKUP_PATH);
console.log(`Backed up original to ${BACKUP_PATH}`);

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const lines: string[] = [];
lines.push(`export const websitePlatformVersions: Record<string, Record<string, string>> = {`);
for (const [slug, versions] of Object.entries(merged)) {
  lines.push(`  "${slug}": {`);
  for (const p of ALL_PLATFORMS) {
    if (versions[p] === undefined) continue;
    lines.push(`    ${p}: \`${esc(versions[p])}\`,`);
  }
  lines.push(`  },`);
}
lines.push(`};`);
lines.push("");

fs.writeFileSync(OUT_PATH, lines.join("\n"), "utf-8");
console.log(`Wrote ${OUT_PATH}`);
console.log(`Done. ${failed > 0 ? `${failed} cells kept their original (duplicate) text due to failures — re-run to retry just those.` : "All duplicate cells regenerated."}`);
