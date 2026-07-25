import { getAIProviderConfig, getOpenRouterConfig } from "./client.js";

// ─── Interface ────────────────────────────────────────────────────────────────

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIRequest {
  model: string;
  system: string;
  messages: AIMessage[];
  maxTokens: number;
}

export interface AIResponse {
  text: string;
  inputTokens: number;
  outputTokens: number;
}

export interface AIService {
  complete(request: AIRequest): Promise<AIResponse>;
  stream(request: AIRequest, onChunk: (text: string) => void): Promise<AIResponse>;
}

// ─── OpenRouter Implementation ────────────────────────────────────────────────

export function sanitizeLLMOutput(text: string): string {
  if (!text) return "";
  let clean = text
    .replace(/<unk>/gi, "")
    .replace(/<\|[a-z0-9_]+\|>/gi, "")
    .replace(/<s>|<\/s>/gi, "")
    .trim();

  // If the model output includes internal reasoning preamble like "We need to follow...",
  // or "Okay, the user wants...", extract the actual prompt line.
  if (clean.includes("Pro Formula v4.2") || clean.startsWith("We need to") || clean.startsWith("Okay,")) {
    const lines = clean.split("\n");
    const promptLine = lines.find(l => {
      const trimmed = l.trim();
      return (
        trimmed.length > 15 &&
        !trimmed.startsWith("We need") &&
        !trimmed.startsWith("Okay,") &&
        !trimmed.startsWith("CORE RULES") &&
        !trimmed.startsWith("Let")
      );
    });
    if (promptLine) {
      clean = promptLine.trim();
    }
  }

  return clean;
}

export class OpenRouterAIService implements AIService {
  private async executeFetch(baseUrl: string, apiKey: string, model: string, req: AIRequest, stream = false) {
    return fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Prompt Library",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: req.system },
          ...req.messages,
        ],
        temperature: 0.7,
        max_tokens: req.maxTokens,
        ...(stream ? { stream: true } : {}),
      }),
    });
  }

  async complete(req: AIRequest): Promise<AIResponse> {
    const config = getAIProviderConfig();
    const { apiKeys, baseUrl, provider, defaultModel } = config;
    let lastError = "All keys failed";
    const primaryModel = provider === "nvidia" ? defaultModel : req.model;

    for (const apiKey of apiKeys) {
      let response = await this.executeFetch(baseUrl, apiKey, primaryModel, req);

      if (!response.ok && provider === "nvidia") {
        console.warn(`NVIDIA primary model "${primaryModel}" failed (${response.status}). Retrying with "nvidia/nemotron-3-nano-30b-a3b"...`);
        response = await this.executeFetch(baseUrl, apiKey, "nvidia/nemotron-3-nano-30b-a3b", req);
      } else if (!response.ok && provider === "openrouter") {
        console.warn(`OpenRouter primary model "${primaryModel}" failed (${response.status}). Retrying with "nvidia/nemotron-3-nano-30b-a3b:free"...`);
        response = await this.executeFetch(baseUrl, apiKey, "nvidia/nemotron-3-nano-30b-a3b:free", req);
        if (!response.ok) {
          response = await this.executeFetch(baseUrl, apiKey, "openrouter/free", req);
        }
      }

      if (response.ok) {
        const data = await response.json() as any;
        const rawText = data.choices?.[0]?.message?.content ?? "";
        const text = sanitizeLLMOutput(rawText);
        return {
          text,
          inputTokens:  data.usage?.prompt_tokens     ?? 0,
          outputTokens: data.usage?.completion_tokens  ?? 0,
        };
      } else {
        const errJson = await response.json().catch(() => ({}));
        lastError = (errJson as any).error?.message || (errJson as any).detail || response.statusText;
      }
    }

    throw new Error(`AI Provider (${provider}) API error across all keys: ${lastError}`);
  }

  async stream(req: AIRequest, onChunk: (text: string) => void): Promise<AIResponse> {
    const config = getAIProviderConfig();
    const { apiKeys, baseUrl, provider, defaultModel } = config;
    let lastError = "All keys failed";
    const primaryModel = provider === "nvidia" ? defaultModel : req.model;

    for (const apiKey of apiKeys) {
      let response = await this.executeFetch(baseUrl, apiKey, primaryModel, req, true);

      if (!response.ok && provider === "nvidia") {
        response = await this.executeFetch(baseUrl, apiKey, "nvidia/nemotron-3-nano-30b-a3b", req, true);
      } else if (!response.ok && provider === "openrouter") {
        response = await this.executeFetch(baseUrl, apiKey, "nvidia/nemotron-3-nano-30b-a3b:free", req, true);
        if (!response.ok) {
          response = await this.executeFetch(baseUrl, apiKey, "openrouter/free", req, true);
        }
      }

      if (response.ok) {
        let fullText = "";
        let inputTokens = 0;
        let outputTokens = 0;
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (raw === "[DONE]") continue;

            try {
              const parsed = JSON.parse(raw) as any;
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) { onChunk(content); fullText += content; }
              if (parsed.usage) {
                inputTokens  = parsed.usage.prompt_tokens     ?? 0;
                outputTokens = parsed.usage.completion_tokens ?? 0;
              }
            } catch { /* ignore malformed SSE lines */ }
          }
        }

        return { text: fullText, inputTokens, outputTokens };
      } else {
        const errJson = await response.json().catch(() => ({}));
        lastError = (errJson as any).error?.message || (errJson as any).detail || response.statusText;
      }
    }

    throw new Error(`AI Provider (${provider}) API error across all keys: ${lastError}`);
  }
}

// ─── Mock Implementation (for tests) ─────────────────────────────────────────

export class MockAIService implements AIService {
  private responses: Map<string, string>;

  constructor(responses?: Map<string, string>) {
    this.responses = responses ?? new Map();
  }

  async complete(req: AIRequest): Promise<AIResponse> {
    const key = req.messages[0]?.content?.slice(0, 60) ?? "default";
    const text = this.responses.get(key) ?? `Mock response for: ${key.slice(0, 40)}`;
    return { text, inputTokens: 10, outputTokens: 20 };
  }

  async stream(req: AIRequest, onChunk: (text: string) => void): Promise<AIResponse> {
    const result = await this.complete(req);
    onChunk(result.text);
    return result;
  }
}

// ─── Singleton ────────────────────────────────────────────────────────────────

let _aiService: AIService | null = null;

export function getAIService(): AIService {
  if (!_aiService) _aiService = new OpenRouterAIService();
  return _aiService;
}
