export function getOpenRouterConfig() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not configured");
  return {
    apiKey,
    baseUrl: "https://openrouter.ai/api/v1",
  };
}
