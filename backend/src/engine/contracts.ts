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

export type Platform = TextPlatform | ImagePlatform | VideoPlatform | CodePlatform;

export type PromptMode = "image" | "video" | "text" | "code";

// ─── Builder API ──────────────────────────────────────────────────────────────

export interface BuildPromptRequest {
  platform: Platform;
  mode: PromptMode;
  input: string;
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
