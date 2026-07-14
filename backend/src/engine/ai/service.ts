import { getOpenRouterConfig } from "./client.js";

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

export class OpenRouterAIService implements AIService {
  async complete(req: AIRequest): Promise<AIResponse> {
    const { apiKey, baseUrl } = getOpenRouterConfig();

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: req.model,
        messages: [
          { role: "system", content: req.system },
          ...req.messages,
        ],
        temperature: 0.7,
        max_tokens: req.maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`OpenRouter API error: ${(error as any).error?.message || response.statusText}`);
    }

    const data = await response.json() as any;
    const text = data.choices[0].message.content ?? "";

    return {
      text,
      inputTokens:  data.usage?.prompt_tokens     ?? 0,
      outputTokens: data.usage?.completion_tokens  ?? 0,
    };
  }

  async stream(req: AIRequest, onChunk: (text: string) => void): Promise<AIResponse> {
    const { apiKey, baseUrl } = getOpenRouterConfig();

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: req.model,
        messages: [
          { role: "system", content: req.system },
          ...req.messages,
        ],
        temperature: 0.7,
        max_tokens: req.maxTokens,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`OpenRouter API error: ${(error as any).error?.message || response.statusText}`);
    }

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
