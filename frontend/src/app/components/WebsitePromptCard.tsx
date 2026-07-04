import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { ThumbsUp, ThumbsDown, Copy, ExternalLink, Maximize2, X, Loader2 } from "lucide-react";
import { type WebsiteDesign } from "../lib/website-data";
import { patchIframeLinks, guardIframeNavigation } from "../lib/patch-iframe-links";

// ─── Simulated website preview (used when no screenshot is provided) ──────────

function WebsitePreviewPlaceholder({ design }: { design: WebsiteDesign }) {
  return (
    <div className="w-full select-none" style={{ background: design.bgColor }}>
      {/* Nav */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ background: design.bgColor, borderColor: "#E5E7EB" }}
      >
        <span style={{ fontSize: "7px", fontWeight: 700, color: "#1A1A1A", letterSpacing: "0.05em" }}>
          CULINARYNARRATIVE
        </span>
        <span
          style={{ fontSize: "6px", fontWeight: 700, color: "#fff", background: "#E31E24", padding: "2px 6px", borderRadius: "2px" }}
        >
          Book a Table
        </span>
      </div>

      {/* Hero */}
      <div className="px-4 py-8 text-center" style={{ background: "#1A1A1A" }}>
        <div style={{ fontSize: "5px", color: design.accentColor, fontWeight: 700, letterSpacing: "3px" }} className="mb-1">
          MODERN INDIAN DINING
        </div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFFDF6", lineHeight: 1.3 }} className="mb-2">
          A Canteen for<br />the Curious
        </div>
        <div style={{ fontSize: "5.5px", color: "#FFFDF6", opacity: 0.55 }} className="mb-3">
          Where stories meet the plate. Reserve your table.
        </div>
        <div className="flex gap-2 justify-center">
          <span style={{ fontSize: "6px", background: "#E31E24", color: "#fff", padding: "3px 8px", borderRadius: "2px", fontWeight: 600 }}>
            Book a Table
          </span>
          <span style={{ fontSize: "6px", color: "#FFFDF6", border: "1px solid rgba(255,255,255,0.4)", padding: "3px 8px", borderRadius: "2px" }}>
            View Menu
          </span>
        </div>
      </div>

      {/* Menu Preview Strip */}
      <div className="px-3 py-4" style={{ background: design.bgColor }}>
        <div style={{ fontSize: "8px", fontWeight: 700, color: "#1A1A1A" }} className="mb-2">
          Our Menu
        </div>
        <div className="flex gap-2">
          {[
            { icon: "🍽", label: "Small Plates" },
            { icon: "🥗", label: "Hearty" },
            { icon: "🍹", label: "Bar" },
            { icon: "🍮", label: "Desserts" },
          ].map(item => (
            <div
              key={item.label}
              style={{ fontSize: "5px", background: design.accentColor, color: "#fff", padding: "2px 5px", borderRadius: "2px", fontWeight: 600 }}
            >
              {item.icon} {item.label}
            </div>
          ))}
        </div>
        {/* Dish rows */}
        <div className="mt-3 space-y-2">
          {[
            { name: "Pork Ribs Vindaloo", desc: "A slow-braise of spare ribs, Goan spice…", veg: false },
            { name: "Mumbai Masala Chips", desc: "Fried potatoes, spiced butter, tamarind…", veg: true },
            { name: "Bombay Sour Cocktail", desc: "House whisky, kokum, curry leaf salt…", veg: true },
          ].map(dish => (
            <div key={dish.name} className="flex items-start justify-between border-b pb-1.5" style={{ borderColor: "#E5E7EB" }}>
              <div>
                <div style={{ fontSize: "6.5px", fontWeight: 700, color: "#1A1A1A" }}>{dish.name}</div>
                <div style={{ fontSize: "5px", color: "#6B7280" }}>{dish.desc}</div>
              </div>
              <div
                style={{
                  width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                  background: dish.veg ? design.accentColor : "#E31E24",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Canteen Stories Grid */}
      <div className="px-3 py-4" style={{ background: "#F9FAFB" }}>
        <div style={{ fontSize: "8px", fontWeight: 700, color: "#1A1A1A" }} className="mb-2">
          Canteen Stories
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { title: "Independence Day Daawat", cat: "event" },
            { title: "The Cocktail Book Launch", cat: "cocktail" },
            { title: "Chef's Table Series", cat: "initiative" },
            { title: "Community Harvest", cat: "community" },
          ].map(story => (
            <div
              key={story.title}
              style={{ background: "#EAB308", padding: "6px 7px", borderRadius: "4px" }}
            >
              <div style={{ fontSize: "4.5px", color: "#92400E", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }} className="mb-0.5">
                {story.cat}
              </div>
              <div style={{ fontSize: "5.5px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.3 }}>
                {story.title}
              </div>
              <div style={{ fontSize: "4.5px", color: "#1A1A1A", marginTop: "3px" }}>Read More →</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="px-3 py-4" style={{ background: design.bgColor }}>
        <div style={{ fontSize: "8px", fontWeight: 700, color: "#1A1A1A" }} className="mb-2">
          The People Behind the Plate
        </div>
        <div className="flex gap-2">
          {["Executive Chef", "Head Bartender", "Sous Chef", "Pastry Chef"].map(role => (
            <div key={role} className="flex-1">
              <div
                style={{ width: "100%", paddingBottom: "90%", background: "#1A1A1A", borderRadius: "2px", position: "relative", overflow: "hidden" }}
              >
                <div
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, padding: "4px 3px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  }}
                >
                  <div style={{ fontSize: "4px", color: "#FFFDF6", fontWeight: 600 }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Merch Teaser */}
      <div className="px-3 py-4" style={{ background: "#1A1A1A" }}>
        <div style={{ fontSize: "8px", fontWeight: 700, color: "#FFFDF6" }} className="mb-2">
          The Canteen Shop
        </div>
        <div className="flex gap-2">
          {[
            { name: "Cocktail Book", price: "₹1,200" },
            { name: "Gift Card", price: "₹2,000" },
            { name: "Canteen Tee", price: "₹800" },
          ].map(item => (
            <div key={item.name} className="flex-1">
              <div style={{ background: "#2A2A2A", borderRadius: "2px", padding: "6px", textAlign: "center" }}>
                <div style={{ fontSize: "5px", color: "#FFFDF6", fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: "4.5px", color: "#EAB308" }}>{item.price}</div>
                <div style={{ fontSize: "4.5px", background: "#E31E24", color: "#fff", padding: "1px 4px", borderRadius: "1px", marginTop: "3px", display: "inline-block" }}>
                  Quick Add
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-5" style={{ background: "#0D0D0D" }}>
        <div style={{ fontSize: "8px", fontWeight: 700, color: "#FFFDF6" }} className="mb-1">
          CulinaryNarrative
        </div>
        <div style={{ fontSize: "5px", color: "rgba(255,255,255,0.4)" }} className="mb-2">
          Mumbai · London · Singapore
        </div>
        <div className="flex gap-3">
          {["Menu", "Stories", "Shop", "Careers", "Reservations"].map(link => (
            <span key={link} style={{ fontSize: "5px", color: design.accentColor }}>{link}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Browser Chrome ───────────────────────────────────────────────────────────

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#f0f0f0] border-b border-[#d8d8d8]">
      {/* Traffic lights */}
      <div className="flex gap-1 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      {/* URL bar */}
      <div className="flex-1 bg-white rounded-md px-2 py-0.5 flex items-center gap-1 border border-[#d8d8d8]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#28c840] shrink-0" />
        <span className="text-[9px] text-[#6b7280] truncate">{url}</span>
      </div>
    </div>
  );
}

// ─── Preview Modal ────────────────────────────────────────────────────────────

export function WebsitePreviewModal({
  slug,
  title,
  onClose,
}: {
  slug: string;
  title: string;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const previewUrl = `/previews/${slug}/index.html`;
  const displayUrl = `${slug.replace(/_/g, "-")}.vercel.app`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full flex flex-col rounded-xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
        style={{ maxWidth: "min(1200px, 92vw)", height: "min(800px, 88vh)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* macOS browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#2a2a2a] border-b border-[#3a3a3a] shrink-0">
          <div className="flex gap-2 shrink-0">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors flex items-center justify-center group"
            >
              <X className="w-1.5 h-1.5 text-[#7a0000] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 bg-[#1a1a1a] rounded-md px-3 py-1.5 flex items-center gap-2 border border-[#444]">
            <div className="w-2 h-2 rounded-full bg-[#28c840] shrink-0" />
            <span className="text-[12px] text-[#aaa] flex-1 truncate text-center">{displayUrl}</span>
          </div>
          <button
            onClick={() => window.open(previewUrl, "_blank")}
            className="text-[#888] hover:text-white p-1 rounded transition-colors shrink-0"
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* iframe */}
        <div className="relative flex-1 bg-white overflow-hidden">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
              <Loader2 className="w-7 h-7 text-[#0a0a0a]/40 animate-spin" />
              <span className="text-[13px] text-[#6b7280]">Loading {title}…</span>
            </div>
          )}
          <iframe
            src={previewUrl}
            className="w-full h-full border-0"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
            onLoad={(e) => {
              const el = e.currentTarget;
              if (guardIframeNavigation(el, slug)) {
                setLoaded(true);
                return;
              }
              setLoaded(true);
              patchIframeLinks(el, slug);
            }}
            title={title}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Card ────────────────────────────────────────────────────────────────

export function WebsitePromptCard({
  design,
  onClick,
  onCopy,
  onPreviewExpand,
}: {
  design: WebsiteDesign;
  onClick?: () => void;
  onCopy?: () => void;
  onPreviewExpand?: () => void;
}) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  // Live preview: lazily mount a scaled iframe of the real built site once the
  // card scrolls into view. A static screenshot (design.screenshot), if present,
  // takes precedence; otherwise we fall back to the simulated placeholder only
  // if the iframe genuinely fails to load.
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scale, setScale] = useState(0.3);
  const BASE_W = 1280;
  const LOGICAL_H = 2200; // tall enough to scroll through on hover
  const hasScreenshot = !!design.screenshot;
  const previewSrc = `/previews/${design.slug}/index.html`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / BASE_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }),
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  const handleHoverStart = async () => {
    setIsHovered(true);
    await controls.start({
      y: [0, -90, -210, -360, -490, -620],
      transition: {
        duration: 7,
        times: [0, 0.15, 0.35, 0.55, 0.75, 1],
        ease: "easeInOut",
      },
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.stop();
    controls.start({ y: 0, transition: { duration: 1.2, ease: "easeOut" } });
  };

  const previewUrl = `${design.slug.replaceAll("_", "-")}.vercel.app`;

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ y: -8, boxShadow: "0 24px 64px rgba(10, 10, 10,0.14)" }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="bg-white rounded-2xl overflow-hidden border border-[#0a0a0a]/10 cursor-pointer group"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(); } }}
    >
      {/* Browser chrome */}
      <BrowserChrome url={previewUrl} />

      {/* Scrollable preview viewport */}
      <div
        ref={containerRef}
        className="relative overflow-hidden group/preview bg-white"
        style={{ height: 240 }}
        onClick={(e) => { e.stopPropagation(); onPreviewExpand?.(); }}
      >
        <motion.div animate={controls} className="origin-top">
          {hasScreenshot ? (
            <img src={design.screenshot} alt={design.title} className="w-full" />
          ) : previewFailed ? (
            <WebsitePreviewPlaceholder design={design} />
          ) : inView ? (
            <div
              style={{
                width: BASE_W,
                height: LOGICAL_H,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            >
              <iframe
                src={previewSrc}
                title={design.title}
                scrolling="no"
                className="border-0"
                style={{ width: BASE_W, height: LOGICAL_H, pointerEvents: "none" }}
                sandbox="allow-scripts allow-same-origin"
                onError={() => setPreviewFailed(true)}
              />
            </div>
          ) : (
            <div style={{ height: 240, background: "#eef2f6" }} />
          )}
        </motion.div>

        {/* Scroll hint gradient - fades out when hovering */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.9), transparent)" }}
        />

        {/* "Scroll preview" badge - hidden when expand overlay shows */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-semibold whitespace-nowrap backdrop-blur-sm pointer-events-none group-hover/preview:opacity-0"
        >
          Hover to preview ↕
        </motion.div>

        {/* Expand overlay - appears on hover */}
        {onPreviewExpand && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 cursor-zoom-in"
            style={{ background: "rgba(10, 10, 10,0.45)" }}
          >
            <div className="bg-white/95 text-[#0a0a0a] text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <Maximize2 className="w-3.5 h-3.5" /> Expand preview
            </div>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="p-4 border-t border-[#0a0a0a]/8">
        {/* Title row */}
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1 min-w-0 pr-2">
            <div className="text-[#0a0a0a] font-bold text-[15px] leading-tight">{design.title}</div>
            <div className="text-[#6b7280] text-[11px] mt-0.5">{design.style}</div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <ThumbsUp className="w-3.5 h-3.5 text-[#6b7280] hover:text-[#4FC3F7] cursor-pointer transition-colors" />
            <ThumbsDown className="w-3.5 h-3.5 text-[#6b7280] hover:text-red-500 cursor-pointer transition-colors" />
            {design.tested && <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] ml-1" />}
          </div>
        </div>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {design.stack.map(s => (
            <span key={s} className="px-1.5 py-0.5 rounded bg-[#0a0a0a]/5 text-[#6b7280] text-[9px] font-mono">
              {s}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {design.tags.slice(0, 3).map(t => (
            <span key={t} className="px-2 py-0.5 rounded-full border border-[#0a0a0a]/15 text-[#6b7280] text-[10px]">
              #{t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            className="flex-1 h-9 rounded-xl bg-[#0a0a0a] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#0a0a0a]/90 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Prompt
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onCopy?.(); }}
            className="h-9 px-3 rounded-xl border-2 border-[#0a0a0a]/20 text-[#0a0a0a] text-[12px] font-semibold flex items-center gap-1.5 hover:border-[#4FC3F7] hover:bg-[#4FC3F7]/10 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            Copy
          </button>
        </div>
      </div>
    </motion.div>
  );
}
