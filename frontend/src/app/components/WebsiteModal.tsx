import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Copy, Star } from "lucide-react";
import { toast } from "sonner";
import { type WebsiteDesign } from "../lib/website-data";
import { websitePlatformVersions } from "../lib/website-platforms";
import { websitePlatforms } from "./theme";

// â”€â”€â”€ Full-size website preview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function WebsiteFullPreview({ design }: { design: WebsiteDesign }) {
  return (
    <div className="w-full" style={{ background: design.bgColor, fontFamily: "sans-serif" }}>

      {/* â”€â”€ Nav â”€â”€ */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 border-b"
        style={{ background: design.bgColor, borderColor: "#E5E7EB" }}
      >
        <span style={{ fontSize: "15px", fontWeight: 800, color: "#1A1A1A", letterSpacing: "0.12em" }}>
          CULINARYNARRATIVE
        </span>
        <div className="flex items-center gap-6">
          {["Menu", "Stories", "Shop", "Careers"].map(l => (
            <span key={l} style={{ fontSize: "13px", color: "#1A1A1A", cursor: "pointer" }}>{l}</span>
          ))}
          <button
            style={{
              fontSize: "13px", fontWeight: 700, color: "#fff",
              background: "#E31E24", padding: "8px 16px", borderRadius: "2px", cursor: "pointer",
            }}
          >
            Book a Table
          </button>
        </div>
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <div
        className="px-8 py-24 flex flex-col items-center text-center"
        style={{ background: "#1A1A1A" }}
      >
        <div style={{ fontSize: "11px", color: design.accentColor, fontWeight: 700, letterSpacing: "5px" }} className="mb-4">
          MODERN INDIAN DINING
        </div>
        <h1 style={{ fontSize: "48px", fontWeight: 800, color: "#FFFDF6", lineHeight: 1.15 }} className="mb-4 max-w-lg">
          A Canteen for<br />the Curious
        </h1>
        <p style={{ fontSize: "16px", color: "rgba(255,253,246,0.55)", maxWidth: "480px" }} className="mb-8 leading-relaxed">
          Where stories meet the plate. Where the curious find their table. A vibrant conversation at a shared table in a restored Art Deco bungalow.
        </p>
        <div className="flex gap-3">
          <button
            style={{
              fontSize: "14px", fontWeight: 700, color: "#fff",
              background: "#E31E24", padding: "12px 24px", borderRadius: "2px",
            }}
          >
            Book a Table
          </button>
          <button
            style={{
              fontSize: "14px", color: "#FFFDF6",
              border: "1px solid rgba(255,255,255,0.35)", padding: "12px 24px", borderRadius: "2px",
            }}
          >
            View Menu â†’
          </button>
        </div>
      </div>

      {/* â”€â”€ Menu Preview Strip â”€â”€ */}
      <div className="px-8 py-12" style={{ background: design.bgColor }}>
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A" }}>Our Menu</h2>
          <span style={{ fontSize: "13px", color: design.accentColor, fontWeight: 600, cursor: "pointer" }}>
            View Full Menu â†’
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { name: "Pork Ribs Vindaloo",   desc: "Goan slow-braise, pickled shallots, roti",  price: "â‚¹1,450", veg: false },
            { name: "Mumbai Masala Chips",   desc: "Spiced butter, tamarind chutney, peanuts",  price: "â‚¹450",   veg: true },
            { name: "Bombay Sour",           desc: "House whisky, kokum shrub, curry leaf salt", price: "â‚¹750",   veg: true },
            { name: "Dal Chawal Arancini",   desc: "Crispy risotto, tadka dal, green chutney",  price: "â‚¹550",   veg: true },
          ].map(dish => (
            <div
              key={dish.name}
              className="shrink-0 rounded-lg overflow-hidden border"
              style={{ width: "200px", borderColor: "#E5E7EB" }}
            >
              <div
                className="h-28 flex items-end px-3 pb-2"
                style={{ background: dish.veg ? `${design.accentColor}22` : "#E31E2422" }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: dish.veg ? design.accentColor : "#E31E24" }}
                />
              </div>
              <div className="p-3" style={{ background: design.bgColor }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A1A" }}>{dish.name}</div>
                <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "2px" }}>{dish.desc}</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A1A", marginTop: "6px" }}>{dish.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ Canteen Stories â”€â”€ */}
      <div className="px-8 py-12" style={{ background: "#F9FAFB" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A" }} className="mb-6">
          Canteen Stories
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Independence Day Daawat",   cat: "Event",       color: "#EAB308" },
            { title: "The Cocktail Book Launch",  cat: "Cocktail",    color: "#067A46" },
            { title: "Chef's Table Series",       cat: "Initiative",  color: "#E31E24" },
            { title: "Community Harvest Festival",cat: "Community",   color: "#1A1A1A" },
          ].map(story => (
            <div
              key={story.title}
              className="rounded-2xl p-5 cursor-pointer"
              style={{ background: story.color }}
            >
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }} className="mb-2">
                {story.cat}
              </div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "#fff", lineHeight: 1.3 }} className="mb-2">
                {story.title}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>Read More â†’</div>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ Team Section â”€â”€ */}
      <div className="px-8 py-12" style={{ background: design.bgColor }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A1A" }} className="mb-6">
          The People Behind the Plate
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { role: "Executive Chef",  name: "Suvir Saran" },
            { role: "Head Bartender",  name: "Priya Kapoor" },
            { role: "Sous Chef",       name: "Raj Mehta" },
            { role: "Pastry Chef",     name: "Anita Desai" },
          ].map(person => (
            <div key={person.name}>
              <div
                className="w-full rounded-sm mb-3 flex items-end px-3 pb-3"
                style={{ background: "#1A1A1A", paddingTop: "70%" }}
              >
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFFDF6" }}>{person.name}</div>
                  <div style={{ fontSize: "10px", color: design.accentColor }}>{person.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ Merch Shop â”€â”€ */}
      <div className="px-8 py-12" style={{ background: "#1A1A1A" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFDF6" }}>The Canteen Shop</h2>
          <span style={{ fontSize: "13px", color: design.accentColor, fontWeight: 600 }}>View All â†’</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "Cocktail Book", type: "Physical", price: "â‚¹1,200" },
            { name: "Gift Card",     type: "Digital",  price: "â‚¹2,000" },
            { name: "Canteen Tee",   type: "Apparel",  price: "â‚¹800" },
          ].map(item => (
            <div key={item.name} style={{ background: "#2A2A2A", borderRadius: "2px", padding: "16px" }}>
              <div className="h-28 mb-3 flex items-center justify-center" style={{ background: "#333", borderRadius: "2px" }}>
                <span style={{ fontSize: "11px", color: "#FFFDF6", opacity: 0.4 }}>{item.type}</span>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#FFFDF6" }}>{item.name}</div>
              <div style={{ fontSize: "13px", color: "#EAB308", marginTop: "4px" }}>{item.price}</div>
              <button
                style={{
                  width: "100%", marginTop: "10px", padding: "8px",
                  background: "#E31E24", color: "#fff", fontSize: "12px",
                  fontWeight: 700, borderRadius: "2px", cursor: "pointer",
                }}
              >
                Quick Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ Footer â”€â”€ */}
      <div className="px-8 py-10" style={{ background: "#0D0D0D" }}>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#FFFDF6", letterSpacing: "0.1em" }} className="mb-3">
              CULINARYNARRATIVE
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
              A Canteen for the Curious.<br />Mumbai Â· London Â· Singapore
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "2px" }} className="mb-3">
              EXPLORE
            </div>
            {["Menu", "Canteen Stories", "The Shop", "Careers", "Book a Table"].map(l => (
              <div key={l} style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "6px", cursor: "pointer" }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "2px" }} className="mb-3">
              FIND US
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              The Process House<br />Kamala Mills, Lower Parel<br />Mumbai 400 013
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
          Â© 2026 CulinaryNarrative. All rights reserved.
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function WebsiteModal({ design, onClose }: { design: WebsiteDesign; onClose: () => void }) {
  const [platform, setPlatform] = useState("lovable");

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const versions   = websitePlatformVersions[design.slug] ?? {};
  const promptText = versions[platform] ?? Object.values(versions)[0] ?? design.description;
  const activePl   = websitePlatforms.find(p => p.key === platform);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      toast.success("Prompt copied", { description: `${design.title} â€” ${activePl?.name}` });
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="bg-white rounded-2xl overflow-hidden pointer-events-auto shadow-2xl w-full"
          style={{ maxWidth: "1200px", height: "88vh", display: "grid", gridTemplateColumns: "1fr 380px" }}
          onClick={e => e.stopPropagation()}
        >
          {/* â”€â”€ Left: Browser preview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="flex flex-col border-r border-[#0a0a0a]/10 min-h-0">
            {/* Browser chrome */}
            <div className="shrink-0 flex items-center gap-2 px-4 py-3 bg-[#f0f0f0] border-b border-[#d8d8d8]">
              <div className="flex gap-1.5">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:opacity-80 transition-opacity" title="Close" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 bg-white rounded-md px-3 py-1 flex items-center gap-2 border border-[#d8d8d8]">
                <div className="w-2 h-2 rounded-full bg-[#28c840] shrink-0" />
                <span className="text-[12px] text-[#6b7280] truncate">
                  {design.slug.replace("_", "-")}.vercel.app
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-[#6b7280] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/8 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable website */}
            <div className="flex-1 overflow-y-auto">
              <WebsiteFullPreview design={design} />
            </div>
          </div>

          {/* â”€â”€ Right: Prompt panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="flex flex-col min-h-0">
            {/* Header */}
            <div className="shrink-0 px-5 pt-5 pb-4 border-b border-[#0a0a0a]/10">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h2 className="text-[#0a0a0a] text-[18px] font-bold leading-tight">{design.title}</h2>
                  <p className="text-[#6b7280] text-[12px]">{design.style}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-[#4FC3F7] text-[#4FC3F7]" />
                  <span className="text-[13px] font-bold text-[#0a0a0a]">{design.rating}</span>
                  {design.tested && <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />}
                </div>
              </div>
              {/* Stack */}
              <div className="flex flex-wrap gap-1 mt-2">
                {design.stack.map(s => (
                  <span key={s} className="px-1.5 py-0.5 rounded bg-[#0a0a0a]/5 text-[#6b7280] text-[9px] font-mono">{s}</span>
                ))}
              </div>
            </div>

            {/* Platform selector */}
            <div className="shrink-0 px-5 py-4 border-b border-[#0a0a0a]/10">
              <div className="text-[10px] text-[#6b7280] uppercase tracking-widest font-bold mb-2">Choose AI tool</div>
              <div className="flex flex-wrap gap-1.5">
                {websitePlatforms.map(pl => (
                  <button
                    key={pl.key}
                    onClick={() => setPlatform(pl.key)}
                    className="px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all"
                    style={
                      platform === pl.key
                        ? { background: pl.color, borderColor: pl.color, color: "#fff" }
                        : { borderColor: "rgba(10, 10, 10,0.2)", color: "#6b7280" }
                    }
                  >
                    {pl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt text */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="text-[10px] text-[#6b7280] uppercase tracking-widest font-bold mb-2">
                {activePl?.name} prompt
              </div>
              <pre className="whitespace-pre-wrap text-[#0a0a0a] font-mono text-[11px] leading-relaxed bg-[#0a0a0a]/3 rounded-xl p-3">
                {promptText}
              </pre>
            </div>

            {/* Copy button */}
            <div className="shrink-0 px-5 py-4 border-t border-[#0a0a0a]/10">
              <button
                onClick={handleCopy}
                className="w-full h-11 rounded-full bg-[#4FC3F7] text-[#0a0a0a] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#4FC3F7]/90 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy {activePl?.name} Prompt
              </button>
              <p className="text-[10px] text-[#6b7280] text-center mt-2">
                Paste directly into {activePl?.name} to generate this website
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
