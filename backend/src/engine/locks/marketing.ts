import type { LockTemplate } from "../types.js";
import { marketingNegativeLocks } from "../negatives/marketing.js";

export const marketingLockTemplate: LockTemplate = {
  categoryId: "marketing-ads",
  categoryLabel: "Marketing & Ads",
  purpose: "Protect campaign message clarity and commercial composition across model variants.",
  mandatoryLocks: [
    { key: "subject", label: "Hero Subject", required: true, description: "The hero person or focal subject carrying the campaign." },
    { key: "product", label: "Product", required: true, description: "The product or offer the campaign sells." },
    { key: "composition", label: "Composition", required: true, description: "The commercial framing that organizes attention." },
    { key: "lighting", label: "Lighting", required: true, description: "The lighting that defines the commercial mood." },
    { key: "styleDna", label: "Campaign Style", required: true, description: "The campaign or brand language the image must preserve.", warning: "Campaign style was not clearly extracted; output may drift across platforms." },
  ],
  optionalLocks: [
    { key: "action", label: "Action", required: false, description: "What is happening — only when the ad depicts an action (often absent in product shots)." },
    { key: "expression", label: "Emotion", required: false, description: "Emotional tone — only when people carry the ad (absent in static product shots)." },
    { key: "ctaSpace", label: "CTA Space", required: false, description: "Reserved negative space for headline/CTA — only when the ad leaves copy room." },
    { key: "brandColors", label: "Brand Colors", required: false, description: "Named brand color identity — only when the prompt states it." },
    { key: "background", label: "Background", required: false, description: "Useful when the scene or backdrop frames the campaign." },
    { key: "palette", label: "Palette", required: false, description: "Useful when a broader color story beyond brand colors matters." },
    { key: "crop", label: "Crop", required: false, description: "Useful when a specific ad placement aspect ratio matters." },
  ],
  locksToAvoid: [
    "Coordinate systems as a default ad lock",
    "Exact CTA pixel boxes",
    "Micro facial percentages on talent",
  ],
  extractionRules: [
    "Keep the hero subject and product as separate mandatory locks.",
    "Treat reserved copy/headline area as CTA space.",
    "Treat named brand colors as brand colors, not general palette.",
    "Treat campaign, ad, or commercial language as campaign style.",
  ],
  defaultNegativeLocks: marketingNegativeLocks,
  examples: [
    {
      promptTitle: "Energy Drink Launch Ad",
      extracted: {
        subject: "Young athlete",
        product: "Energy drink can",
        action: "Mid-jump celebrating",
        expression: "Energetic",
        composition: "Centered hero with negative space right",
        ctaSpace: "Clear right third for headline",
        brandColors: "Electric blue and lime",
        lighting: "High-key studio light",
        styleDna: "Bold campaign editorial",
      },
      notes: "Anchor example for the marketing parser.",
    },
  ],
};
