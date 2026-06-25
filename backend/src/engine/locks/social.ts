import type { LockTemplate } from "../types.js";
import { socialNegativeLocks } from "../negatives/social.js";

export const socialLockTemplate: LockTemplate = {
  categoryId: "social-media",
  categoryLabel: "Social Media",
  purpose: "Protect engagement and platform-ready composition across model variants.",
  mandatoryLocks: [
    { key: "subject", label: "Hero Subject", required: true, description: "The hero subject of the post." },
    { key: "composition", label: "Composition", required: true, description: "The thumb-stopping framing of the post." },
    { key: "lighting", label: "Lighting", required: true, description: "The lighting that keeps the post clean and bright." },
    { key: "styleDna", label: "Social Style", required: true, description: "The social or creator aesthetic the image must preserve.", warning: "Social style was not clearly extracted; output may drift across platforms." },
  ],
  optionalLocks: [
    { key: "action", label: "Action", required: false, description: "What the subject is doing — often absent in static covers and flat-lays." },
    { key: "expression", label: "Expression", required: false, description: "Subject expression — only when a face is present." },
    { key: "crop", label: "Platform Crop", required: false, description: "Platform aspect ratio / safe zones — only when the prompt states it." },
    { key: "brandColors", label: "Brand Colors", required: false, description: "Named brand colors — only when the prompt states them." },
    { key: "background", label: "Background", required: false, description: "Useful when the setting supports the post's vibe." },
    { key: "palette", label: "Palette", required: false, description: "Useful when a broader color story matters." },
  ],
  locksToAvoid: [
    "Coordinate systems as a default social lock",
    "Over-precise camera metrics that fight a casual look",
  ],
  extractionRules: [
    "Treat aspect-ratio and safe-zone cues as platform crop.",
    "Treat named brand colors as brand colors, not general palette.",
    "Treat creator, reel, or feed aesthetic cues as social style.",
  ],
  defaultNegativeLocks: socialNegativeLocks,
  examples: [
    {
      promptTitle: "Cafe Creator Reel Cover",
      extracted: {
        subject: "Lifestyle creator",
        action: "Holding a latte and smiling",
        expression: "Warm and upbeat",
        composition: "Centered vertical with headroom for text",
        crop: "9:16 vertical",
        lighting: "Soft window light",
        brandColors: "Cream and sage",
        styleDna: "Cozy lifestyle creator",
      },
      notes: "Anchor example for the social parser.",
    },
  ],
};
