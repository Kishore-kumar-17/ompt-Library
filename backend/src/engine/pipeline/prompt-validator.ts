import type { PipelineContext, PipelineStage, ValidationResult } from "../types.js";

export class PromptValidatorStage implements PipelineStage {
  name = "prompt-validator";

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    if (!ctx.assembledPrompt) {
      ctx.validationResult = {
        isValid: false,
        errors: ["No prompt was assembled"],
        warnings: [],
        wordCount: 0,
        inBudget: false,
      };
      return ctx;
    }

    const prompt = ctx.assembledPrompt;
    const words = prompt.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const errors: string[] = [];
    const warnings: string[] = [];

    // Word budget check
    const platform = ctx.platform;
    let inBudget = true;
    if (platform) {
      if (wordCount < platform.wordBudget.min) {
        warnings.push(`Prompt is ${platform.wordBudget.min - wordCount} words short of minimum budget`);
        inBudget = false;
      }
      if (wordCount > platform.wordBudget.max) {
        warnings.push(`Prompt exceeds word budget by ${wordCount - platform.wordBudget.max} words`);
        inBudget = false;
      }
    }

    // Minimum length check
    if (wordCount < 10) {
      errors.push("Prompt is too short (less than 10 words)");
    }

    // Image-specific checks
    if (ctx.detectedFamily === "image" && platform) {
      if (!/exclude|--no/i.test(prompt)) {
        warnings.push("No exclude list found");
      }
      if (!/palette|#[0-9a-fA-F]{3,6}/.test(prompt)) {
        warnings.push("No color palette with hex codes found");
      }
    }

    // Prohibited content check (basic)
    const prohibited = /(nude|naked|explicit|violence|gore|weapon|harm|kill|injure)/i;
    if (prohibited.test(prompt)) {
      errors.push("Prompt may contain prohibited content");
    }

    ctx.validationResult = {
      isValid: errors.length === 0,
      errors,
      warnings,
      wordCount,
      inBudget,
    };

    return ctx;
  }
}
