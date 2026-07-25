import type { PlatformConfig, Family } from "../types.js";

// ─── Image ────────────────────────────────────────────────────────────────────
import { midjourneyConfig }       from "./image/midjourney.js";
import { chatgptImageConfig }     from "./image/chatgpt.js";
import { geminiImageConfig }      from "./image/gemini.js";
import { fluxConfig }             from "./image/flux.js";
import { fireflyConfig }          from "./image/firefly.js";
import { grokImageConfig }        from "./image/grok.js";
import { ideogramConfig }         from "./image/ideogram.js";
import { leonardoConfig }         from "./image/leonardo.js";
import { stableDiffusionConfig }  from "./image/stable-diffusion.js";
import { runwayImageConfig }      from "./image/runway-image.js";

// ─── Video ────────────────────────────────────────────────────────────────────
import { runwayVideoConfig }      from "./video/runway.js";
import { soraConfig }             from "./video/sora.js";
import { pikaConfig }             from "./video/pika.js";
import { klingConfig }            from "./video/kling.js";
import { lumaConfig }             from "./video/luma.js";
import { veoConfig }              from "./video/veo.js";

// ─── Text ─────────────────────────────────────────────────────────────────────
import { claudeTextConfig }       from "./text/claude.js";
import { chatgptTextConfig }      from "./text/chatgpt-text.js";
import { geminiTextConfig }       from "./text/gemini-text.js";
import { grokTextConfig }         from "./text/grok-text.js";
import { perplexityConfig }       from "./text/perplexity.js";
import { deepseekConfig }         from "./text/deepseek.js";

// ─── Code ─────────────────────────────────────────────────────────────────────
import { claudeCodeConfig }       from "./code/claude-code.js";
import { cursorConfig }           from "./code/cursor.js";
import { copilotConfig }          from "./code/copilot.js";
import { chatgptCodeConfig }      from "./code/chatgpt-code.js";
import { geminiCodeConfig }       from "./code/gemini-code.js";

// ─── Registry ─────────────────────────────────────────────────────────────────

const ALL_PLATFORMS: PlatformConfig[] = [
  // Image
  midjourneyConfig,
  chatgptImageConfig,
  geminiImageConfig,
  fluxConfig,
  fireflyConfig,
  grokImageConfig,
  ideogramConfig,
  leonardoConfig,
  stableDiffusionConfig,
  runwayImageConfig,
  // Video
  runwayVideoConfig,
  soraConfig,
  pikaConfig,
  klingConfig,
  lumaConfig,
  veoConfig,
  // Text
  claudeTextConfig,
  chatgptTextConfig,
  geminiTextConfig,
  grokTextConfig,
  perplexityConfig,
  deepseekConfig,
  // Code
  claudeCodeConfig,
  cursorConfig,
  copilotConfig,
  chatgptCodeConfig,
  geminiCodeConfig,
];

const _registry = new Map<string, PlatformConfig>(
  ALL_PLATFORMS.map((p) => [p.id, p])
);

export const platformRegistry = {
  get(id: string): PlatformConfig | undefined {
    return _registry.get(id);
  },

  getOrDefault(id: string, family: Family): PlatformConfig {
    const found = _registry.get(id);
    if (found) return found;
    // Fall back to first platform matching the family
    const fallback = ALL_PLATFORMS.find((p) => p.family === family);
    if (fallback) return fallback;
    return midjourneyConfig;
  },

  getByFamily(family: Family): PlatformConfig[] {
    return ALL_PLATFORMS.filter((p) => p.family === family);
  },

  getAll(): PlatformConfig[] {
    return ALL_PLATFORMS;
  },

  has(id: string): boolean {
    return _registry.has(id);
  },

  // Returns a summary list for API responses (no large string fields)
  getSummaries() {
    return ALL_PLATFORMS.map((p) => ({
      id: p.id,
      name: p.name,
      family: p.family,
      wordBudget: p.wordBudget,
      compressionLevel: p.compressionLevel,
    }));
  },
};

// ─── Shared formula for image prompts ─────────────────────────────────────────

export const IMAGE_SHARED_FORMULA = `You are a master image prompt generator.
Generate a high-quality prompt for image generation tools (e.g., Midjourney, Flux).

RULES:
- Focus on subject, composition, lighting, camera angle, style, and color palette.
- Use vivid visual descriptors and atmospheric details.
- Avoid vague buzzwords like "8K", "ultra-sharp", "aesthetic".
- OUTPUT DIRECTIVE: Output ONLY the final prompt. Do NOT output reasoning, thinking, preamble, or commentary under any circumstances.`;

export const VIDEO_SHARED_FORMULA = `You are an expert video prompt engineer.

CORE RULES:
- Do NOT use the lock block system. Video prompts use cinematic language.
- Camera movement vocabulary: dolly, crane, steadicam, tracking, arc, tilt, pan, zoom, rack focus
- Always include: camera movement, subject action, lighting setup, color grade reference, atmosphere
- Pacing: describe the temporal arc — beginning state, action, end state
- Duration: match description length to platform's typical clip length (4s, 10s, etc.)
- Sound: include ambient sound or music direction if helpful`;

export const TEXT_SHARED_FORMULA = `You are an expert prompt engineer for text AI models.

CORE RULES:
- Every prompt must have: clear role/persona, specific task, output format
- Role framing increases output quality significantly: "Act as a senior X" or "You are an expert Y"
- Specify constraints explicitly: tone, length, audience, format
- Output format must be specified: bullet list, numbered steps, markdown headers, JSON, code block
- Chain-of-thought: add "Think step by step" for complex reasoning tasks
- Examples: include a "For example:" section for ambiguous tasks`;

export const CODE_SHARED_FORMULA = `You are an expert prompt engineer for coding AI assistants.

CORE RULES:
- Include tech stack and versions: "React 18, TypeScript 5, Node.js 20"
- Specify what to change AND what NOT to touch
- Include the relevant code, error message, or acceptance criteria
- Output format: specify if you want code-only, code with comments, or explanation
- Pattern compliance: "Follow the existing patterns in the codebase"
- Scope: be explicit about which files to create, modify, or leave alone`;
