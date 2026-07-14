// ─── Public API Contracts ──────────────────────────────────────────────────────
//
// This file is the authoritative source of truth for the Builder and Improver
// public API surface. Freeze these shapes before touching internal pipeline
// code — stable contracts let the frontend and pipeline evolve independently.
//
// Internal pipeline types live in engine/types.ts.
// ──────────────────────────────────────────────────────────────────────────────

// ─── Platform Registry ────────────────────────────────────────────────────────

export type TextPlatform =
  | "claude"
  | "chatgpt-text"
  | "gemini-text"
  | "grok-text"
  | "perplexity"
  | "deepseek";

export type ImagePlatform =
  | "midjourney"
  | "flux"
  | "stable-diffusion"
  | "firefly"
  | "ideogram"
  | "leonardo"
  | "chatgpt"
  | "gemini"
  | "grok"
  | "runway-image";

export type VideoPlatform =
  | "sora"
  | "runway"
  | "pika"
  | "luma"
  | "kling"
  | "veo";

export type CodePlatform =
  | "claude-code"
  | "chatgpt-code"
  | "gemini-code"
  | "copilot"
  | "cursor";

// Website-builder-context platform identifiers — a distinct namespace from
// CodePlatform even though a few names overlap ("cursor", and TextPlatform's/
// ImagePlatform's "chatgpt"/"gemini"/"grok"/"claude"): these mean "generate a
// prompt aimed at this platform's website-building mode", not its code or
// text mode.
export type WebsitePlatform =
  | "lovable"
  | "bolt"
  | "v0"
  | "cursor"
  | "chatgpt"
  | "claude"
  | "gemini"
  | "grok";

export type Platform = TextPlatform | ImagePlatform | VideoPlatform | CodePlatform | WebsitePlatform;

export type PromptMode = "image" | "video" | "text" | "code" | "website";

// ─── Builder API ──────────────────────────────────────────────────────────────

export interface BuildPromptRequest {
  platform: Platform;
  mode: PromptMode;
  input: string;
  // Optional explicit category (e.g. a UI category selector). When present
  // and valid for the platform's family, this should be honored over
  // keyword auto-detection from `input` — see rule-engine/*-bridge.ts.
  category?: string;
  options?: {
    quality?: "fast" | "balanced" | "premium";
    creativity?: number;          // 0–1, default 0.5
    preserveUserWording?: boolean;
  };
}

export interface BuildPromptResponse {
  prompt: string;
  metadata: {
    platform: Platform;
    score: number;                // 0–100
    version: string;
  };
}

// ─── Improver API ─────────────────────────────────────────────────────────────

export interface ImprovePromptRequest {
  platform: Platform;
  prompt: string;
  options?: {
    preserveIntent?: boolean;
    aggressiveness?: "light" | "medium" | "heavy";
  };
}

export interface ImprovePromptResponse {
  original: string;
  improved: string;
  improvements: string[];         // human-readable descriptions of what changed
  metadata: {
    scoreBefore: number;          // 0–100
    scoreAfter: number;           // 0–100
  };
}
