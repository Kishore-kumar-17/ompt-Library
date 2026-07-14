import type { PipelineContext, PipelineStage } from "../types.js";

export class PlatformOptimizerStage implements PipelineStage {
  name = "platform-optimizer";

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    if (!ctx.assembledPrompt || !ctx.platform) return ctx;

    let prompt = ctx.assembledPrompt;

    // Word budget enforcement: trim if over max
    const words = prompt.split(/\s+/).filter(Boolean);
    const { max } = ctx.platform.wordBudget;
    if (words.length > max) {
      prompt = trimToWordBudget(prompt, max);
    }

    // Platform-specific post-processing
    switch (ctx.platform.id) {
      case "midjourney":
        prompt = enforceMidjourneyFormat(prompt, ctx.request.aspect);
        break;
      case "stable-diffusion":
        prompt = enforceSDFormat(prompt);
        break;
    }

    ctx.assembledPrompt = prompt;
    return ctx;
  }
}

function trimToWordBudget(text: string, max: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= max) return text;
  // Find a natural break point (sentence end) near the limit
  const truncated = words.slice(0, max).join(" ");
  const lastPeriod = truncated.lastIndexOf(".");
  if (lastPeriod > truncated.length * 0.8) {
    return truncated.slice(0, lastPeriod + 1);
  }
  return truncated;
}

function enforceMidjourneyFormat(prompt: string, aspect?: string): string {
  // Ensure parameter flags appear at the end
  if (!prompt.includes("--ar") && aspect) {
    prompt = `${prompt.trimEnd()} --ar ${aspect}`;
  }
  if (!prompt.includes("--v 6")) {
    prompt = `${prompt.trimEnd()} --v 6.1`;
  }
  if (!prompt.includes("--no") && prompt.includes("Exclude")) {
    // Move exclude list to --no flag if not already done
    const excludeMatch = prompt.match(/Exclude[:\s]+([^\n]+)/i);
    if (excludeMatch) {
      const excludeItems = excludeMatch[1].replace(/,\s*/g, " ").trim();
      prompt = prompt.replace(excludeMatch[0], "").trim();
      prompt += ` --no ${excludeItems}`;
    }
  }
  return prompt.trim();
}

function enforceSDFormat(prompt: string): string {
  // Ensure negative prompt section is on its own line
  const negMatch = prompt.match(/\n?negative[:\s]+([^\n]+)/i);
  if (negMatch && !prompt.includes("--")) {
    const pos = prompt.indexOf(negMatch[0]);
    const positive = prompt.slice(0, pos).trim();
    const negative = negMatch[1].trim();
    return `${positive}\n\nNegative: ${negative}`;
  }
  return prompt;
}
