export const MODEL_TIER = {
  FAST:    "openai/gpt-3.5-turbo",
  QUALITY: "openai/gpt-4o-mini",
  PREMIUM: "openai/gpt-4o",
} as const;

export type ModelTier = typeof MODEL_TIER[keyof typeof MODEL_TIER];
