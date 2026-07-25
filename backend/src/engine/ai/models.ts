export const MODEL_TIER = {
  FAST:    process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-nano-30b-a3b:free",
  QUALITY: process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-super-120b-a12b:free",
  PREMIUM: process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-super-120b-a12b:free",
} as const;

export type ModelTier = string;
