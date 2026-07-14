import type { LockTemplate } from "../types.js";
import { trendingNegativeLocks } from "../negatives/trending.js";

export const trendingLockTemplate: LockTemplate = {
  categoryId: "trending-viral",
  categoryLabel: "Trending & Viral",
  purpose: "Protect the visual hook and attention pattern across model variants.",
  mandatoryLocks: [
    { key: "subject", label: "Main Subject", required: true, description: "The main subject that carries the post." },
    { key: "visualHook", label: "Visual Hook", required: true, description: "The scroll-stopping idea or gimmick that makes it pop.", warning: "Visual hook was not detected; the scroll-stopping impact may be lost." },
    { key: "expression", label: "Expression", required: true, description: "The expression or energy of the subject." },
    { key: "action", label: "Action", required: true, description: "The action or moment captured." },
    { key: "composition", label: "Composition", required: true, description: "The framing that maximizes attention." },
    { key: "lighting", label: "Lighting", required: true, description: "The lighting that gives the image punch." },
    { key: "palette", label: "Color Impact", required: true, description: "The high-impact color treatment.", warning: "Color impact was not clearly extracted; the look may read flat." },
    { key: "styleDna", label: "Viral Style", required: true, description: "The viral or trend aesthetic the image must preserve.", warning: "Viral style was not clearly extracted; output may drift across platforms." },
  ],
  optionalLocks: [
    { key: "background", label: "Background", required: false, description: "Useful when the setting amplifies the hook." },
    { key: "crop", label: "Crop", required: false, description: "Useful when a vertical or square crop is central to the trend." },
  ],
  locksToAvoid: [
    "Coordinate systems as a default viral lock",
    "Over-precise camera metrics that fight a candid look",
  ],
  extractionRules: [
    "Identify the single visual hook that stops the scroll.",
    "Keep main subject and visual hook as separate locks.",
    "Treat saturated or high-contrast color cues as color impact.",
    "Treat trend, viral, or meme aesthetic cues as viral style.",
  ],
  defaultNegativeLocks: trendingNegativeLocks,
  examples: [
    {
      promptTitle: "Giant Floating Donut Street Scene",
      extracted: {
        subject: "Pedestrian",
        visualHook: "Surreal giant floating donut over the street",
        expression: "Amazed",
        action: "Looking up and pointing",
        composition: "Low-angle hero vertical",
        lighting: "Bright midday pop",
        palette: "Hyper-saturated pastels",
        styleDna: "Surreal viral trend",
      },
      notes: "Anchor example for the trending parser.",
    },
  ],
};
