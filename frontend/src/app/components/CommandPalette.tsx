import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, CornerDownLeft, FileText, Library as LibraryIcon, Wand2, Sparkles, BarChart3, User, BookOpen, Upload } from "lucide-react";
import { imageLibraryPrompts } from "../lib/library-data";

type Item = {
  id: string;
  kind: "page" | "prompt";
  label: string;
  hint?: string;
  route: string;
  icon: any;
};

const pages: Item[] = [
  { id: "p-home",      kind: "page", label: "Home",             hint: "Landing",          route: "home",      icon: Sparkles },
  { id: "p-library",   kind: "page", label: "Library",          hint: "Browse prompts",   route: "library",   icon: LibraryIcon },
  { id: "p-guide",     kind: "page", label: "Guide",            hint: "How prompts work", route: "guide",     icon: BookOpen },
  { id: "p-builder",   kind: "page", label: "Builder",          hint: "Compose a prompt", route: "builder",   icon: Wand2 },
  { id: "p-improver",  kind: "page", label: "Improver",         hint: "Rewrite a prompt", route: "improver",  icon: Wand2 },
  { id: "p-compare",   kind: "page", label: "Compare",          hint: "Across 6 bots",    route: "compare",   icon: BarChart3 },
  { id: "p-dashboard", kind: "page", label: "Dashboard",        hint: "Analytics",        route: "dashboard", icon: BarChart3 },
  { id: "p-profile",   kind: "page", label: "Profile",          hint: "Your account",     route: "profile",   icon: User },
  { id: "p-submit",    kind: "page", label: "Submit a prompt",  hint: "6-step wizard",    route: "submit",    icon: Upload },
];

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform ?? navigator.userAgent);

export function CommandPalette({ open, onClose, go }: { open: boolean; onClose: () => void; go: (r: string) => void }) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  const results: Item[] = useMemo(() => {
    const query = q.trim().toLowerCase();
    const promptItems: Item[] = imageLibraryPrompts.map((p) => ({
      id: p.id,
      kind: "prompt",
      label: p.title,
      hint: p.category,
      route: "detail:" + p.id,
      icon: FileText,
    }));
    const all = [...pages, ...promptItems];
    if (!query) return all.slice(0, 10);
    return all
      .filter((i) => i.label.toLowerCase().includes(query) || (i.hint ?? "").toLowerCase().includes(query))
      .slice(0, 20);
  }, [q]);

  useEffect(() => { if (cursor >= results.length) setCursor(0); }, [results, cursor]);

  const choose = (r: string) => { onClose(); go(r); };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(results.length - 1, c + 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)); }
    if (e.key === "Enter" && results[cursor]) { e.preventDefault(); choose(results[cursor].route); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-[#0a0a0a]/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="w-full max-w-xl bg-white border-2 border-[#0a0a0a] rounded-2xl shadow-[8px_8px_0_0_#0a0a0a] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 h-14 border-b-2 border-[#0a0a0a]/10">
              <Search className="w-4 h-4 text-[#6b7280]" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Search prompts, jump to pages..."
                className="flex-1 bg-transparent outline-none text-[#0a0a0a] placeholder:text-[#6b7280]"
                style={{ fontSize: "15px" }}
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-listbox"
                aria-activedescendant={results[cursor]?.id}
                aria-autocomplete="list"
                aria-label="Search prompts, jump to pages"
              />
              <kbd className="px-2 py-0.5 rounded bg-[#4FC3F7] text-[#0a0a0a] text-[11px]" style={{ fontWeight: 700 }}>ESC</kbd>
            </div>
            <div className="max-h-[360px] overflow-y-auto py-2" role="listbox" id="cmdk-listbox" aria-label="Results">
              {results.length === 0 && (
                <div className="px-4 py-8 text-center text-[#6b7280]">
                  No matches. Try another word.
                </div>
              )}
              {results.map((i, idx) => {
                const Icon = i.icon;
                const on = idx === cursor;
                return (
                  <button
                    key={i.id}
                    id={i.id}
                    role="option"
                    aria-selected={on}
                    onMouseMove={() => setCursor(idx)}
                    onClick={() => choose(i.route)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left ${
                      on ? "bg-[#4FC3F7]/30" : "hover:bg-[#0a0a0a]/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#0a0a0a]" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[#0a0a0a] truncate" style={{ fontWeight: 600 }}>{i.label}</div>
                      {i.hint && <div className="text-[#6b7280] text-[12px] truncate">{i.hint}</div>}
                    </div>
                    <span className="text-[11px] text-[#6b7280] uppercase" style={{ fontWeight: 700 }}>
                      {i.kind === "page" ? "Page" : "Prompt"}
                    </span>
                    {on && <CornerDownLeft className="w-4 h-4 text-[#0a0a0a]" />}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-4 px-4 h-10 border-t-2 border-[#0a0a0a]/10 bg-[#0a0a0a]/5 text-[11px] text-[#6b7280]">
              <span className="inline-flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white border border-[#0a0a0a]/20">↑↓</kbd> navigate</span>
              <span className="inline-flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white border border-[#0a0a0a]/20">↵</kbd> open</span>
              <span className="ml-auto inline-flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white border border-[#0a0a0a]/20">{isMac ? "⌘" : "Ctrl"}</kbd> K to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}