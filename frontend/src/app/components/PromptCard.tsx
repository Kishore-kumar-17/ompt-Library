import { Heart, Copy, Star, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { PromptItem } from "./theme";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function PromptCard({ p, onClick }: { p: PromptItem; onClick?: () => void }) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(); } }}
      whileHover={{ y: -6, boxShadow: "6px 10px 0 0 #094067" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group text-left bg-white border border-[#094067]/15 rounded-2xl overflow-hidden hover:border-[#ffd803]/60 cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden relative bg-[#094067]/5 flex items-center justify-center">
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
          <span className="px-2 py-0.5 rounded-full bg-[#094067]/50 text-[#bce4d8] backdrop-blur text-[11px]">
            {p.category}
          </span>
          {p.tested && (
            <span className="px-2 py-0.5 rounded-full bg-[#ffd803]/90 text-[#094067] text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> tested
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-[#094067]/50 hover:bg-[#ef4565] text-[#bce4d8] backdrop-blur"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <div className="text-[#094067] mb-1 line-clamp-1" style={{ fontWeight: 600 }}>{p.title}</div>
        <p className="text-[#5f6c7b] line-clamp-2 mb-3" style={{ fontSize: "13px" }}>{p.description}</p>
        <div className="flex items-center justify-between text-[#5f6c7b]">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#ffd803] text-[#ef4565]" />
            <span className="text-[#094067]" style={{ fontWeight: 600 }}>{p.rating}</span>
            <span style={{ fontSize: "12px" }}>({p.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-[#ef4565]" style={{ fontSize: "13px" }}>
            <Copy className="w-4 h-4" /> Copy
          </div>
        </div>
      </div>
    </motion.div>
  );
}