import type { PipelineContext, PipelineStage } from "../types.js";
import { platformRegistry } from "../platforms/index.js";

export class PlatformResolverStage implements PipelineStage {
  name = "platform-resolver";

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    const platformId = ctx.request.platform?.toLowerCase() ?? "midjourney";
    const family = ctx.detectedFamily ?? ctx.request.family;

    ctx.platform = platformRegistry.getOrDefault(platformId, family);
    return ctx;
  }
}
