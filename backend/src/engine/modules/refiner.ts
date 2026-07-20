import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import { hasApiKey } from "../utils.js";
import type { AIMessage } from "../ai/service.js";

export interface RefineTurn {
  role: "user" | "assistant";
  content: string;
}

export interface RefineRequest {
  family: string;
  platform: string;
  category?: string;
  history: RefineTurn[];
}

export interface RefineResult {
  revised: string;
  tokensUsed: number;
}

function buildSystemPrompt(family: string, platform: string): string {
  return [
    `You are refining an existing ${family} generation prompt written for ${platform}.`,
    `The most recent "assistant" message in this conversation is the CURRENT version of the prompt.`,
    `The final "user" message is a follow-up instruction describing what to change.`,
    `Apply ONLY the requested change(s); keep every other part of the current prompt exactly as it is unless it directly conflicts with the new instruction.`,
    `Respond with ONLY the revised prompt text — no explanations, no markdown fences, no quotes, no commentary before or after it.`,
  ].join("\n");
}

export async function refinePrompt(request: RefineRequest): Promise<RefineResult> {
  if (!hasApiKey()) {
    throw new Error("Chat-based refinement requires an AI model to be configured.");
  }
  if (request.history.length === 0) {
    throw new Error("history must contain at least one message");
  }
  const last = request.history[request.history.length - 1];
  if (last.role !== "user" || !last.content.trim()) {
    throw new Error("The last history message must be a non-empty user instruction");
  }

  const ai = getAIService();
  const messages: AIMessage[] = request.history.map((turn) => ({
    role: turn.role,
    content: turn.content,
  }));

  const response = await ai.complete({
    model: MODEL_TIER.QUALITY,
    system: buildSystemPrompt(request.family, request.platform),
    messages,
    maxTokens: 1000,
  });

  const revised = response.text.trim();
  if (!revised) {
    throw new Error("Refinement produced an empty response. Please try again.");
  }

  return {
    revised,
    tokensUsed: response.inputTokens + response.outputTokens,
  };
}
