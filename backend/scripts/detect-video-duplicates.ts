// Quantifies exactly which slug×platform text values in video-platforms.ts
// are duplicates (byte-identical to another platform's text for the same
// video prompt), mirroring detect-website-duplicates.ts's approach for the
// smaller (30 prompts × 5 platforms) video library. Read-only — no API
// calls, no writes.
//
//   cd backend && npx tsx scripts/detect-video-duplicates.ts

const { videoPlatformVersions } = (await import(
  "../../frontend/src/app/lib/video-platforms.js"
)) as { videoPlatformVersions: Record<string, Record<string, string>> };

const ALL_PLATFORMS = ["veo", "kling", "seedance", "higgsfield", "pika"];

let totalSlugs = 0;
let fullyUniqueSlugs = 0;
let fullyDuplicateSlugs = 0;
let totalDuplicateCells = 0;
let totalCells = 0;
const perSlugToRegenerate: Record<string, string[]> = {};

for (const [slug, versions] of Object.entries(videoPlatformVersions)) {
  totalSlugs++;
  const present = ALL_PLATFORMS.filter((p) => versions[p]?.trim());
  totalCells += present.length;

  const textToPlatforms = new Map<string, string[]>();
  for (const p of present) {
    const text = versions[p].trim();
    if (!textToPlatforms.has(text)) textToPlatforms.set(text, []);
    textToPlatforms.get(text)!.push(p);
  }

  const uniqueTextCount = textToPlatforms.size;
  if (uniqueTextCount === present.length) {
    fullyUniqueSlugs++;
    continue;
  }
  if (uniqueTextCount === 1) fullyDuplicateSlugs++;

  const toRegenerate: string[] = [];
  for (const [, platforms] of textToPlatforms) {
    if (platforms.length > 1) toRegenerate.push(...platforms.slice(1));
  }
  totalDuplicateCells += toRegenerate.length;
  perSlugToRegenerate[slug] = toRegenerate;
}

console.log(`Total videos: ${totalSlugs}`);
console.log(`Fully unique (5/5 or however many present, all distinct): ${fullyUniqueSlugs}`);
console.log(`Fully duplicate (all platforms share 1 text): ${fullyDuplicateSlugs}`);
console.log(`Total platform cells present: ${totalCells}`);
console.log(`Total cells needing regeneration: ${totalDuplicateCells}`);
console.log(`Videos needing at least one regeneration: ${Object.keys(perSlugToRegenerate).length}`);
if (Object.keys(perSlugToRegenerate).length > 0) {
  console.log("\nDetail:");
  for (const [slug, platforms] of Object.entries(perSlugToRegenerate)) {
    console.log(`  ${slug}: ${platforms.join(", ")}`);
  }
}
