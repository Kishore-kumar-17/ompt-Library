import { useEffect, useState } from "react";
import { authStore, libraryApi, AUTH_CHANGED_EVENT } from "./api";

// Every save/heart toggle across the app previously started from a hardcoded
// `useState(false)` with nothing to hydrate it — a prompt the user already
// saved always rendered as unsaved on (re)mount, and re-clicking the toggle
// silently un-saved it. This is a tiny shared cache so every PromptCard on a
// page shares one fetch instead of one each.
let cache: Promise<Set<number>> | null = null;

function fetchSavedIds(): Promise<Set<number>> {
  if (!authStore.getUser()) return Promise.resolve(new Set());
  return libraryApi.savedIds().then((r) => new Set(r.ids)).catch(() => new Set<number>());
}

export function invalidateSavedIds(): void {
  cache = null;
}

export function useSavedIds(): Set<number> {
  const [ids, setIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    let active = true;
    const load = () => {
      if (!cache) cache = fetchSavedIds();
      cache.then((s) => { if (active) setIds(s); });
    };
    load();

    const onAuthChange = () => { invalidateSavedIds(); load(); };
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChange);
    return () => { active = false; window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChange); };
  }, []);

  return ids;
}
