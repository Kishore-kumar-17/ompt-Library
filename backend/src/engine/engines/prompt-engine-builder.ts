// ─── Prompt Engine Builder ─────────────────────────────────────────────────────
// TypeScript port of D:\prompt engine\src\index.js
// Pipeline: raw idea → SceneJSON → platform-specific prompt
// Zero API calls — fully deterministic rule-based generation.

import { ENGINES } from "./index.js"
import { analyzeIdeaToScene, generatePrompt } from "../rule-engine/prompt-generator.js"
import type { PlatformKey, SceneJSON } from "../rule-engine/types.js"

export interface EnginePromptResult {
  model: string
  platform: PlatformKey
  sceneJson: SceneJSON
  prompt: string
  engineName: string
  philosophy: string
  wordCount: number
}

export class PromptEngineBuilder {
  private readonly platforms: PlatformKey[] = ["chatgpt", "gemini", "midjourney", "flux", "firefly", "grok"]

  generatePromptForModel(idea: string, modelName: string): EnginePromptResult {
    const platform = this.normalizePlatform(modelName)
    const engine = ENGINES[platform]

    if (!engine) {
      throw new Error(`Model "${modelName}" not found. Available: ${this.platforms.join(", ")}`)
    }

    // Step 1: Convert raw idea to structured scene JSON
    const sceneJson = analyzeIdeaToScene(idea, platform)

    // Step 2: Generate platform-optimised prompt from scene + engine config
    const generated = generatePrompt(idea, platform)

    return {
      model: modelName,
      platform,
      sceneJson,
      prompt: generated.prompt,
      engineName: engine.name,
      philosophy: engine.philosophy,
      wordCount: generated.wordCount,
    }
  }

  listAvailableModels() {
    return this.platforms.map((platform) => {
      const engine = ENGINES[platform]
      return {
        id: platform,
        name: engine?.name ?? platform,
        philosophy: engine?.philosophy ?? "natural language",
        style: engine?.style ?? "prose",
      }
    })
  }

  getEngineInfo(modelName: string) {
    const platform = this.normalizePlatform(modelName)
    const engine = ENGINES[platform]
    if (!engine) throw new Error(`Model "${modelName}" not found`)
    return {
      id: platform,
      name: engine.name,
      philosophy: engine.philosophy,
      style: engine.style,
      systemPromptPreview: engine.systemPrompt.substring(0, 500) + "...",
    }
  }

  private normalizePlatform(name: string): PlatformKey {
    const lower = name.toLowerCase().trim()
    const aliases: Record<string, PlatformKey> = {
      chatgpt:     "chatgpt",
      gpt:         "chatgpt",
      "gpt-4":     "chatgpt",
      gemini:      "gemini",
      google:      "gemini",
      midjourney:  "midjourney",
      mj:          "midjourney",
      flux:        "flux",
      "flux.1":    "flux",
      firefly:     "firefly",
      adobe:       "firefly",
      grok:        "grok",
      xai:         "grok",
    }
    return aliases[lower] ?? (this.platforms.includes(lower as PlatformKey) ? (lower as PlatformKey) : "chatgpt")
  }
}

// Singleton instance — shared across the app, zero-overhead repeated calls
export const promptEngineBuilder = new PromptEngineBuilder()
