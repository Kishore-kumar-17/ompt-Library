export function hasApiKey(): boolean {
  const openRouterKeys = [
    process.env.OPENROUTER_API_KEY,
    process.env.OPENROUTER_API_KEY_2,
    process.env.OPENROUTER_API_KEY_SECONDARY,
  ];
  const nvidiaKey = process.env.NVIDIA_API_KEY;

  const hasOR = openRouterKeys.some(k => Boolean(k && k.trim().length > 20 && k.startsWith("sk-or-")));
  const hasNV = Boolean(nvidiaKey && nvidiaKey.trim().length > 10);

  return hasOR || hasNV;
}
