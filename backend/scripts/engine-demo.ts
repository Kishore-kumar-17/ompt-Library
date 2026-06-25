/**
 * engine-demo.ts — prints varied engine assemblies for human review (no DB).
 *   cd backend && npx tsx scripts/engine-demo.ts
 */

import type { PromptRecord } from "../src/engine/types.js";

process.env.DATABASE_URL ??= "postgresql://smoke:smoke@localhost:5432/smoke";
const { assembleFromRecord } = await import("../src/engine/index.js");

const samples: Array<{ note: string; record: PromptRecord; platform?: string }> = [
  {
    note: "Portrait — chef in kitchen (rich description)",
    platform: "flux",
    record: {
      id: "lib:demo-chef",
      title: "Chef in Kitchen Portrait",
      category: "People & Portraits",
      description:
        "Subject: Head chef. Warm, confident soft smile, looking at camera. Standing portrait, " +
        "one hand holding a copper pan, wearing a white chef coat, in a stainless steel kitchen. " +
        "Waist-up composition under soft window light. Culinary editorial portrait.",
      platforms: { flux: "Subject: a head chef in a stainless steel kitchen, copper pan in hand ..." },
    },
  },
  {
    note: "Portrait — punk musician (editorial, dramatic)",
    platform: "midjourney",
    record: {
      id: "lib:demo-punk",
      title: "Punk Musician Editorial Portrait",
      category: "People",
      description:
        "Subject: Punk musician. Intense expression, gaze angled slightly camera-left. " +
        "Close-up portrait, wearing a studded leather jacket, against a brick wall. " +
        "Moody hard key light. Punk beauty editorial.",
      platforms: { midjourney: "punk musician :: studded leather jacket :: brick wall :: --ar 4:5" },
    },
  },
  {
    note: "Product — glass perfume bottle (luxury)",
    platform: "chatgpt",
    record: {
      id: "lib:demo-perfume",
      title: "Glass Perfume Bottle Editorial",
      category: "Product & E-com",
      description:
        "Product: Glass perfume bottle. Front-facing with the label facing camera, macro hero scale, " +
        "positioned in the lower third, label and cap unobstructed. Close-up hero shot on a gradient " +
        "studio backdrop with low-key strobe and rim light. Frosted glass material, luxury commercial style.",
      platforms: { chatgpt: "Editorial hero shot of a frosted glass perfume bottle ..." },
    },
  },
  {
    note: "Product — sneaker flat lay (playful)",
    platform: "gemini",
    record: {
      id: "lib:demo-sneaker",
      title: "Running Sneaker Flat Lay",
      category: "Product",
      description:
        "Product: Running sneaker. Three-quarter view, fills the frame, centered, full product visible. " +
        "Top-down flat lay on a concrete surface with softbox lighting. Brushed metal eyelets, playful commercial look.",
      platforms: { gemini: "Top-down flat lay of a running sneaker on concrete ..." },
    },
  },
  {
    note: "Fashion — oversized denim streetwear (Fashion & Apparel)",
    platform: "midjourney",
    record: {
      id: "lib:demo-denim",
      title: "Oversized Denim Streetwear Look",
      category: "Fashion & Apparel",
      description:
        "Model: Street-cast model. Wearing an oversized washed indigo denim jacket, waist-up outfit " +
        "visible, oversized fit. Leaning against a wall with hands in pockets, waist-up composition " +
        "under hard editorial light. Denim fabric. Streetwear lookbook.",
      platforms: { midjourney: "oversized denim jacket streetwear :: washed indigo :: --ar 4:5" },
    },
  },
  {
    note: "Marketing — energy drink launch ad (Marketing & Ads)",
    platform: "chatgpt",
    record: {
      id: "lib:demo-mkt",
      title: "Energy Drink Launch Ad",
      category: "Marketing & Ads",
      description:
        "Hero: Young athlete. Product: Energy drink can. Mid-jump celebrating, energetic. " +
        "Centered hero with negative space for copy on the right. Brand colors: electric blue and lime. " +
        "High-key studio light. Bold campaign editorial.",
      platforms: { chatgpt: "Bold launch ad for an energy drink with a mid-jump athlete ..." },
    },
  },
  {
    note: "Art — watercolor fox spirit (Art & Illustration)",
    platform: "flux",
    record: {
      id: "lib:demo-art",
      title: "Watercolor Fox Spirit",
      category: "Art & Illustration",
      description:
        "Style: Storybook watercolor. Character: Fox spirit. Curled and alert, serene. " +
        "Palette: warm autumn ochres and teal. Soft diffused glow. Loose watercolor wash with ink " +
        "linework. Setting: misty forest. Centered character vignette.",
      platforms: { flux: "Storybook watercolor illustration of a curled fox spirit ..." },
    },
  },
  {
    note: "Trending — giant floating donut (Trending & Viral)",
    platform: "midjourney",
    record: {
      id: "lib:demo-trend",
      title: "Giant Floating Donut",
      category: "Trending & Viral",
      description:
        "Subject: Pedestrian. Surreal giant floating donut over the street as the visual hook. " +
        "Amazed, looking up and pointing. Low-angle hero vertical. Bright midday pop. " +
        "Hyper-saturated pastels. Surreal viral trend.",
      platforms: { midjourney: "surreal giant floating donut over a street :: --ar 9:16" },
    },
  },
  {
    note: "Social — cafe creator reel cover (Social Media)",
    platform: "gemini",
    record: {
      id: "lib:demo-social",
      title: "Cafe Creator Reel Cover",
      category: "Social Media",
      description:
        "Subject: Lifestyle creator. Holding a latte and smiling, warm and upbeat. " +
        "Centered vertical with headroom for text. 9:16 vertical. Soft window light. " +
        "Brand colors: cream and sage. Cozy lifestyle creator.",
      platforms: { gemini: "Cozy lifestyle creator reel cover holding a latte ..." },
    },
  },
  {
    note: "EDGE CASE — sparse portrait (missing fields → fallbacks + warnings)",
    platform: "chatgpt",
    record: {
      id: "lib:demo-sparse",
      title: "Doctor Portrait",
      category: "People & Portraits",
      description: "A doctor.",
      platforms: { chatgpt: "A professional portrait of a doctor." },
    },
  },
];

for (const { note, record, platform } of samples) {
  const r = assembleFromRecord(record, platform);
  console.log("\n" + "═".repeat(78));
  console.log(`▶ ${note}`);
  console.log(`  category: ${r.categoryId ?? "(unresolved)"}  |  platform: ${r.selectedPlatform}  |  valid: ${r.validation.valid}`);
  console.log("─".repeat(78));
  console.log(r.finalAssembledText);
  if (r.validation.warnings.length > 0) {
    console.log("\n  warnings:");
    for (const w of r.validation.warnings) console.log(`   • ${w}`);
  }
  if (r.validation.missingRequiredFields.length > 0) {
    console.log(`  missingRequiredFields: ${r.validation.missingRequiredFields.join(", ")}`);
  }
}
console.log("\n" + "═".repeat(78));
