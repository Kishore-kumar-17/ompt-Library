import { useEffect, useState } from "react";
import { Heart, Copy } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { PromptItem } from "./theme";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { authStore, libraryApi } from "../lib/api";
import { useSavedIds, invalidateSavedIds } from "../lib/savedIds";

export function PromptCard({ p, onClick, hideActions }: { p: PromptItem; onClick?: () => void; hideActions?: boolean }) {
  const savedIds = useSavedIds();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setSaved(savedIds.has(Number(p.id))); }, [savedIds, p.id]);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!authStore.getUser()) { toast.error("Sign in to save prompts"); return; }
    if (saving) return;
    setSaving(true);
    try {
      const res = await libraryApi.save(p.id);
      setSaved(res.saved);
      invalidateSavedIds();
      toast(res.saved ? "Saved to library" : "Removed from library", { description: p.title });
    } catch { toast.error("Could not save"); } finally { setSaving(false); }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(p.description ?? "");
      setCopied(true);
      toast.success("Prompt copied", { description: p.title });
      setTimeout(() => setCopied(false), 2000);
      if (authStore.getUser()) libraryApi.copy(p.id).catch(() => {});
    } catch { toast.error("Failed to copy"); }
  };
  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(); } }}
      whileHover={{ y: -6, boxShadow: "6px 10px 0 0 #0a0a0a" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group text-left bg-white border border-[#0a0a0a]/15 rounded-2xl overflow-hidden hover:border-[#4FC3F7]/60 cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden relative bg-[#0a0a0a]/5 flex items-center justify-center">
        {p.image ? (
          <ImageWithFallback
            src={p.image}
            alt={p.title}
            className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition duration-500"
            style={{ background: p.family === "video" ? "linear-gradient(135deg,#1a1a2e 0%,#4c1d95 100%)" : "transparent" }}
          >
            {p.family === "video" && (
              <>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                </div>
                <span className="text-white/60 text-[11px] font-semibold uppercase tracking-widest">{p.subCategory}</span>
              </>
            )}
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-[#0a0a0a]/50 text-white backdrop-blur text-[11px]">
            {p.category}
          </span>
          {p.tested && (
            <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/90 text-[#0a0a0a] text-[11px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" /> tested
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-[#0a0a0a]/50 hover:bg-[#4FC3F7] text-white backdrop-blur disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="text-[#0a0a0a] mb-1 line-clamp-1" style={{ fontWeight: 600 }}>{p.title}</div>
        <p className="text-[#6b7280] line-clamp-2 mb-3" style={{ fontSize: "13px" }}>{p.description}</p>
        <div className="flex items-center justify-between text-[#6b7280]">
          <span className="text-[12px]">{p.category}</span>
          {!hideActions && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 text-[#0a0a0a] hover:text-[#0a0a0a]/80 transition-colors"
              style={{ fontSize: "13px" }}
            >
              <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}