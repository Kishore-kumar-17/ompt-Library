import type { PipelineContext, PipelineStage } from "../types.js";

export class PromptPipeline {
  private stages: PipelineStage[];

  constructor(stages: PipelineStage[]) {
    this.stages = stages;
  }

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    for (const stage of this.stages) {
      const t0 = Date.now();
      try {
        ctx = await stage.execute(ctx);
      } catch (err) {
        ctx.errors.push(
          `${stage.name}: ${err instanceof Error ? err.message : String(err)}`
        );
      }
      ctx.stageTimings[stage.name] = Date.now() - t0;
    }
    return ctx;
  }
}
