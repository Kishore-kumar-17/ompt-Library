import type { PlatformConfig } from "../../types.js";

export const perplexityConfig: PlatformConfig = {
  id: "perplexity",
  name: "Perplexity",
  family: "text",
  wordBudget: { min: 20, max: 150 },
  compressionLevel: "minimal",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["objective", "context", "constraints"],
  requiredComponents: ["objective"],
  structureRules: `Platform: Perplexity AI
Structure:
1. Research question / query — clear and specific
2. Scope constraints (recency, geography, domain if needed)
3. Format preference (if needed: "Give me a list", "Compare X and Y")

Key rules for Perplexity:
- Perplexity is a search/research engine — frame as research questions
- More specific queries = better citations: "What are the latest statistics on X in 2025?"
- Perplexity always cites sources — leverage by asking comparison or synthesis questions
- Recency focus: "as of 2025", "recent developments in"
- Academic/factual queries work best — not creative writing`,
  systemPromptAddition: `You are generating a prompt for Perplexity AI, a research/search AI. Frame the query as a specific research question. Include date/recency constraints if relevant. Perplexity returns cited sources — structure the query to get comparative or synthesized research results.`,
};
