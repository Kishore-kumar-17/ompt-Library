// Quantifies exactly which slug×platform text values in website-platforms.ts
// are duplicates (byte-identical to another platform's text for the same
// design), so the regeneration script only pays for AI calls where actually
// needed. Read-only — no API calls, no writes.
//
//   cd backend && npx tsx scripts/detect-website-duplicates.ts

const { websitePlatformVersions } = (await import(
  "../../frontend/src/app/lib/website-platforms.js"
)) as { websitePlatformVersions: Record<string, Record<string, string>> };

const ALL_PLATFORMS = ["lovable", "bolt", "v0", "cursor", "chatgpt", "claude", "gemini", "grok"];

let totalSlugs = 0;
let fullyUniqueSlugs = 0;
let fullyDuplicateSlugs = 0;
let totalDuplicateCells = 0;
let totalCells = 0;
const perSlugToRegenerate: Record<string, string[]> = {};

for (const [slug, versions] of Object.entries(websitePlatformVersions)) {
  totalSlugs++;
  const present = ALL_PLATFORMS.filter((p) => versions[p]?.trim());
  totalCells += present.length;

  // Group platforms by identical text.
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

  // Keep ONE platform per duplicate text group (the "canonical" one), mark
  // the rest as needing regeneration.
  const toRegenerate: string[] = [];
  for (const [, platforms] of textToPlatforms) {
    if (platforms.length > 1) toRegenerate.push(...platforms.slice(1));
  }
  totalDuplicateCells += toRegenerate.length;
  perSlugToRegenerate[slug] = toRegenerate;
}

console.log(`Total designs: ${totalSlugs}`);
console.log(`Fully unique (8/8 or however many present, all distinct): ${fullyUniqueSlugs}`);
console.log(`Fully duplicate (all platforms share 1 text): ${fullyDuplicateSlugs}`);
console.log(`Total platform cells present: ${totalCells}`);
console.log(`Total cells needing regeneration: ${totalDuplicateCells}`);
console.log(`Designs needing at least one regeneration: ${Object.keys(perSlugToRegenerate).length}`);
