export function getAIProviderConfig() {
  const nvidiaKeys = [
    process.env.NVIDIA_API_KEY,
    process.env.NVIDIA_API_KEY_2,
    process.env.NVIDIA_API_KEY_SECONDARY,
  ].filter((k): k is string => Boolean(k && k.trim() && k.length > 10 && k.startsWith("nvapi-")));

  if (nvidiaKeys.length > 0) {
    return {
      provider: "nvidia" as const,
      apiKeys: nvidiaKeys,
      primaryKey: nvidiaKeys[0],
      baseUrl: "https://integrate.api.nvidia.com/v1",
      defaultModel: process.env.NVIDIA_MODEL || "nvidia/nemotron-3-super-120b-a12b",
    };
  }

  const keys = [
    process.env.OPENROUTER_API_KEY,
    process.env.OPENROUTER_API_KEY_2,
    process.env.OPENROUTER_API_KEY_SECONDARY,
  ].filter((k): k is string => Boolean(k && k.trim() && k.length > 20 && k.startsWith("sk-or-")));

  const defaultOpenRouterKey = process.env.OPENROUTER_API_KEY ?? "";

  return {
    provider: "openrouter" as const,
    apiKeys: keys.length ? keys : [defaultOpenRouterKey],
    primaryKey: keys[0] ?? defaultOpenRouterKey,
    baseUrl: "https://openrouter.ai/api/v1",
    defaultModel: "nvidia/nemotron-3-nano-30b-a3b:free",
  };
}

export function getOpenRouterConfig() {
  return getAIProviderConfig();
}
