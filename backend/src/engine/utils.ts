export function hasApiKey(): boolean {
  const key = process.env.OPENROUTER_API_KEY?.trim() ?? "";
  return key.length > 20 && !key.includes("...") && key.startsWith("sk-or-");
}
