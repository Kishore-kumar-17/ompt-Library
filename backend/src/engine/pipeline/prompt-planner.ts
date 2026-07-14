import type { PipelineContext, PipelineStage, ComponentKey, Family } from "../types.js";

export class PromptPlannerStage implements PipelineStage {
  name = "prompt-planner";

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    const platform = ctx.platform;
    const family = ctx.detectedFamily ?? ctx.request.family;

    if (!platform) {
      ctx.componentPlan = defaultPlan(family as Family);
      return ctx;
    }

    // Start with platform's required components
    const required = new Set<ComponentKey>(platform.requiredComponents);
    const ordered = [...platform.componentOrder];

    // Add any components that are relevant based on requirements
    const reqs = ctx.requirements;
    if (reqs) {
      if (reqs.role && !ordered.includes("role"))             ordered.unshift("role");
      if (reqs.context && !ordered.includes("context"))       addAfter(ordered, "role", "context");
      if (reqs.outputFormat && !ordered.includes("output_format")) ordered.push("output_format");
      if (reqs.negative && !ordered.includes("negative"))     ordered.push("negative");
      if (reqs.technical && !ordered.includes("technical"))   addBefore(ordered, "negative", "technical");
    }

    // Ensure all required components are included
    for (const req of required) {
      if (!ordered.includes(req)) ordered.push(req);
    }

    ctx.componentPlan = ordered;
    return ctx;
  }
}

function defaultPlan(family: Family): ComponentKey[] {
  switch (family) {
    case "image":
      return ["objective", "context", "style", "technical", "platform_params", "negative"];
    case "video":
      return ["objective", "context", "style", "technical"];
    case "text":
    case "content":
      return ["role", "objective", "context", "constraints", "output_format"];
    case "code":
      return ["context", "objective", "constraints", "output_format"];
    default:
      return ["objective", "context", "constraints", "output_format"];
  }
}

function addAfter(arr: ComponentKey[], after: ComponentKey, item: ComponentKey): void {
  const idx = arr.indexOf(after);
  if (idx !== -1) arr.splice(idx + 1, 0, item);
  else arr.unshift(item);
}

function addBefore(arr: ComponentKey[], before: ComponentKey, item: ComponentKey): void {
  const idx = arr.indexOf(before);
  if (idx !== -1) arr.splice(idx, 0, item);
  else arr.push(item);
}
