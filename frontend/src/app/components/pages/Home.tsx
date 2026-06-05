import React, { useEffect, useRef, useState } from "react";
import imageGenVideo from "../../../imports/AI_Generates_Stunning_Visuals_Instantly.mp4";
import videoGenVideo from "../../../imports/From_Static_Image_to_Cinema.mp4";
import textGenVideo  from "../../../imports/From_Raw_Thought_to_Structured_Intelligence.mp4";
import { PlatformLogo } from "../PlatformLogo";
import { Image as ImageIcon, Type, Users, Sparkles, Film, FileText } from "lucide-react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { categories, platforms } from "../theme";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import { LaptopHero } from "../LaptopHero";
import { PromptCity } from "../PromptCity";

// ── Category images (user-supplied) ──────────────────────────────────────────
import imgSocialMedia   from "../../../imports/WhatsApp_Image_2026-04-27_at_1.12.44_PM.jpeg";
import imgEcommerce     from "../../../imports/WhatsApp_Image_2026-04-27_at_1.14.01_PM.jpeg";
import imgProduct       from "../../../imports/WhatsApp_Image_2026-04-27_at_1.15.29_PM.jpeg";
import imgMarketing     from "../../../imports/WhatsApp_Image_2026-04-27_at_1.17.54_PM.jpeg";
import imgPortraits     from "../../../imports/WhatsApp_Image_2026-04-27_at_1.23.30_PM.jpeg";
import imgPeople        from "../../../imports/WhatsApp_Image_2026-04-27_at_1.24.37_PM.jpeg";
import imgAdvertising   from "../../../imports/WhatsApp_Image_2026-04-27_at_1.56.38_PM.jpeg";
import imgApparel       from "../../../imports/WhatsApp_Image_2026-04-27_at_2.04.05_PM.jpeg";
import imgFashion       from "../../../imports/WhatsApp_Image_2026-04-27_at_2.07.53_PM.jpeg";
import imgIllustration  from "../../../imports/WhatsApp_Image_2026-04-27_at_2.29.43_PM-2.jpeg";

// (LaptopHero handles the laptop section — see LaptopHero.tsx)

export function Home({ go }: { go: (p: string) => void }) {
  return (
    <div className="text-[#094067]">
      {/* Hero */}
      <HeroCarousel go={go} />

      {/* Prompt City — interactive district explorer */}
      <PromptCity go={go} />

      {/* Four doors — BounceCard layout */}
      <WhereToGoSection go={go} />

      <BrowseByCategory go={go} />

      <section className="max-w-[1200px] mx-auto px-6 mt-16">
        <h2 className="text-[#094067] mb-6">Featured platforms</h2>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 48, flexWrap: "wrap" }}>
          {platforms.map((p) => (
            <button
              key={p.key}
              onClick={() => go(`library:${p.key}`)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
                opacity: 0.8,
                transition: "opacity 0.18s, transform 0.18s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.opacity = "0.8";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PlatformLogo platformKey={p.key} size={64} />
              </div>
              <div style={{ color: "#094067", fontWeight: 600, fontSize: 14, textAlign: "center", whiteSpace: "nowrap" }}>{p.name}</div>
            </button>
          ))}
        </div>
      </section>

      <TryImageGenerator />
      <CommunityPrizes go={go} />
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

// Base card size — all cards share these intrinsic dimensions; scale transforms resize them per slot
const TYPEWRITER_TEXTS = [
  "Write Instagram captions",
  "Design a landing page",
  "Create a brand identity",
  "Generate email subject lines",
  "Build a marketing campaign",
];

const ARCH_IMG      = "https://images.unsplash.com/photo-1560118355-24c162658e84?w=600&q=80";
const SKY_IMG       = "https://images.unsplash.com/photo-1724247306612-d079a82f2ff7?w=800&q=80";
const BUTTERFLY_IMG = "https://images.unsplash.com/photo-1581270985785-a23081d5d649?w=600&q=80";
const INSECT_IMG    = "https://images.unsplash.com/photo-1753490607361-bbbc7946e981?w=400&q=80";
const DRAGONFLY_IMG = "https://images.unsplash.com/photo-1775829820430-dd3af91a91b2?w=400&q=80";
const DARK_IMG      = "https://images.unsplash.com/photo-1730646105653-3a2162bbd733?w=600&q=80";
const NEON_IMG      = "https://images.unsplash.com/photo-1759265844881-a139bb028df5?w=600&q=80";
const TYPO_IMG      = "https://images.unsplash.com/photo-1656234948440-1e9bdcdc8fa6?w=600&q=80";

// Measures the real viewport width and updates on resize so cards always tile edge-to-edge
function useViewportWidth() {
  const [vw, setVw] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return vw;
}

function useViewportHeight() {
  const [vh, setVh] = useState(() => typeof window !== "undefined" ? window.innerHeight : 900);
  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return vh;
}

function HeroCard({ id }: { id: number }) {
  if (id === 0) return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#f5f500", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 11, top: 22, writingMode: "vertical-lr", fontSize: 9, fontWeight: 700, color: "#111", letterSpacing: "0.18em", textTransform: "uppercase" }}>MENU</div>
      <div style={{ position: "absolute", left: 26, top: "20%", fontSize: 60, fontWeight: 900, lineHeight: 0.86, color: "#111", textTransform: "uppercase", fontStyle: "italic", letterSpacing: "-0.03em" }}>WORKS</div>
      <div style={{ position: "absolute", bottom: 18, left: 18, width: 32, height: 32, background: "#ef4565", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 16 16" fill="none" width={13} height={13}><path d="M2 14L14 2M14 2H6M14 2V10" stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
  if (id === 1) return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#111", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #1e1e1e" }}>
        <span style={{ color: "#bbb", fontSize: 14, fontWeight: 500 }}>collectiv</span>
      </div>
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <img src={ARCH_IMG} alt="arch" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) brightness(0.65)" }} />
        <div style={{ position: "absolute", bottom: 8, left: 14 }}><p style={{ color: "#666", fontSize: 9.5, fontWeight: 500 }}>• Ancient Ancient</p></div>
      </div>
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ background: "#1c1c1c", borderRadius: 8, padding: "7px 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#2e2e2e" }} />
          <span style={{ color: "#444", fontSize: 11 }}>Search</span>
        </div>
      </div>
    </div>
  );
  if (id === 2) return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <div style={{ height: "58%", overflow: "hidden", position: "relative" }}>
        <img src={SKY_IMG} alt="sky" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 54, fontWeight: 900, color: "rgba(10,10,10,0.85)", lineHeight: 0.88, textAlign: "center", letterSpacing: "-0.025em", textShadow: "0 1px 12px rgba(255,255,255,0.5)" }}>
            Geo<br/>Garden
          </div>
        </div>
      </div>
      <div style={{ height: "42%", overflow: "hidden" }}>
        <img src={BUTTERFLY_IMG} alt="butterfly" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", bottom: 14, right: 14, width: 30, height: 30, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", fontSize: 20, color: "#333", fontWeight: 300 }}>+</div>
    </div>
  );
  if (id === 3) return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#2d0a1a", display: "flex", flexDirection: "column", padding: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        <span style={{ color: "#d9a0be", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em" }}>A / REPS</span>
        <div style={{ display: "flex", gap: 4 }}>
          {["Artists", "Categories", "Contact"].map(t => (
            <span key={t} style={{ padding: "2px 7px", borderRadius: 3, border: "1px solid #4a2840", color: "#907080", fontSize: 8.5, fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden", borderRadius: 8, position: "relative" }}>
        <img src={DARK_IMG} alt="gallery" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4, borderRadius: 8 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(45,10,26,0.5) 0%,transparent 60%)", borderRadius: 8 }} />
      </div>
    </div>
  );
  // ── Card 4 — photo grid ────────────────────────────────────────────────────
  if (id === 4) return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#e8e0f8", padding: "16px", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ color: "#aaa", fontSize: 9, marginBottom: 5 }}>©Alex Carter</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: "#1a1a1a", lineHeight: 1, letterSpacing: "-0.025em" }}>Person</div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        <div style={{ borderRadius: 8, overflow: "hidden" }}><img src={INSECT_IMG} alt="n1" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
        <div style={{ borderRadius: 8, overflow: "hidden" }}><img src={DRAGONFLY_IMG} alt="n2" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
        <div style={{ borderRadius: 8, background: "#d4c8f2" }} />
        <div style={{ borderRadius: 8, background: "#c8beed" }} />
      </div>
    </div>
  );
  // ── Card 5 — neon abstract ─────────────────────────────────────────────────
  if (id === 5) return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <img src={NEON_IMG} alt="neon" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(10,5,30,0.55) 0%,transparent 60%)" }} />
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 4 }}>Studio</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>Prism</div>
      </div>
      <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Visual Arts</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 16 16" fill="none" width={11} height={11}><path d="M3 13L13 3M13 3H7M13 3V9" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
  // ── Card 6 — bold typography poster ───────────────────────────────────────
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <img src={TYPO_IMG} alt="typo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0.18) 0%,rgba(0,0,0,0.62) 100%)" }} />
      <div style={{ position: "absolute", bottom: 18, left: 14, right: 14 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 6 }}>Type / Works</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.02em" }}>Bold Ideas<br/>Louder Voices</div>
      </div>
    </div>
  );
}

const CARD_IDS = [0, 1, 2, 3, 4, 5, 6];

// ── (legacy heroCategories stub kept for type safety) ──────────────────────────
const heroCategories = [
  {
    id: "marketing", name: "Marketing",
    description: "Drive growth and reach your audience.",
    cardGradient: "linear-gradient(to bottom, rgba(109,40,217,0.28) 0%, rgba(0,0,0,0.78) 100%)",
    accentColor: "#8b5cf6",
    icon: "📣",
    img: "https://images.unsplash.com/photo-1658062117791-18cae7ff46c1?w=500&q=80",
    prompt: {
      badge: "Marketing", badgeBg: "#f3e8ff", badgeText: "#7c3aed", emoji: "📣",
      title: "Brand Campaign Brief",
      subtitle: "Create compelling marketing campaigns that reach and convert your target audience.",
      tags: ["Marketing", "Ads", "Campaign", "Brand"],
      text: "Write a comprehensive marketing campaign for [brand] targeting [audience]. Include messaging for [channel 1], [channel 2], and [channel 3]. Focus on [key message] and drive [goal].",
      vars: ["[brand]","[audience]","[channel 1]","[channel 2]","[channel 3]","[key message]","[goal]"],
    },
  },
  {
    id: "social", name: "Social Media",
    description: "Engage your followers and build your brand.",
    cardGradient: "linear-gradient(to bottom, rgba(29,78,216,0.28) 0%, rgba(0,0,0,0.78) 100%)",
    accentColor: "#3b82f6",
    icon: "📱",
    img: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=500&q=80",
    prompt: {
      badge: "Social Media", badgeBg: "#dbeafe", badgeText: "#1d4ed8", emoji: "📱",
      title: "Instagram Caption Pack",
      subtitle: "Create engaging captions that boost social media presence and drive real engagement.",
      tags: ["Instagram", "Caption", "Hashtags", "Engagement"],
      text: "Write 5 Instagram captions for [product] in a [tone] voice. Include relevant hashtags for [niche] and a call-to-action that drives [goal]. Target audience: [audience].",
      vars: ["[product]","[tone]","[niche]","[goal]","[audience]"],
    },
  },
  {
    id: "ecommerce", name: "E-commerce",
    description: "Boost sales with product descriptions that convert.",
    cardGradient: "linear-gradient(to bottom, rgba(180,83,9,0.28) 0%, rgba(0,0,0,0.78) 100%)",
    accentColor: "#f59e0b",
    icon: "🛍️",
    img: "https://images.unsplash.com/photo-1649013439319-aa7e2dc91267?w=500&q=80",
    prompt: {
      badge: "E-commerce", badgeBg: "#fef3c7", badgeText: "#b45309", emoji: "🛍️",
      title: "Product Description",
      subtitle: "Generate persuasive product descriptions that convert visitors into customers.",
      tags: ["Sales", "E-commerce", "Product", "Description"],
      text: "Write a compelling product description for [product] that helps [target audience] solve [problem]. Highlight the key benefits: [benefit 1], [benefit 2], and [benefit 3]. Use a persuasive tone and include a strong call-to-action.",
      vars: ["[product]","[target audience]","[problem]","[benefit 1]","[benefit 2]","[benefit 3]"],
    },
  },
  {
    id: "portraits", name: "Portraits",
    description: "Capture personality and bring portraits to life.",
    cardGradient: "linear-gradient(to bottom, rgba(55,65,81,0.28) 0%, rgba(0,0,0,0.78) 100%)",
    accentColor: "#a78bfa",
    icon: "🧑‍🎨",
    img: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?w=500&q=80",
    prompt: {
      badge: "Portraits", badgeBg: "#ede9fe", badgeText: "#6d28d9", emoji: "🧑‍🎨",
      title: "Realistic Portrait",
      subtitle: "Create detailed portrait prompts for stunning AI-generated headshots.",
      tags: ["Portrait", "Photography", "Realism", "AI Art"],
      text: "A hyper-realistic portrait of [subject] with [expression], lit by [lighting style]. Shot on [camera], wearing [outfit]. Background: [setting]. Style: [photography style].",
      vars: ["[subject]","[expression]","[lighting style]","[camera]","[outfit]","[setting]","[photography style]"],
    },
  },
  {
    id: "art", name: "Art & Illustration",
    description: "Create stunning visuals and unique artwork.",
    cardGradient: "linear-gradient(to bottom, rgba(124,45,18,0.28) 0%, rgba(0,0,0,0.78) 100%)",
    accentColor: "#f97316",
    icon: "🎨",
    img: "https://images.unsplash.com/photo-1591693898234-f2bba7c8beaa?w=500&q=80",
    prompt: {
      badge: "Art", badgeBg: "#fff7ed", badgeText: "#c2410c", emoji: "🎨",
      title: "Digital Illustration",
      subtitle: "Generate breathtaking illustrations with detailed and evocative style descriptions.",
      tags: ["Art", "Illustration", "Digital", "Creative"],
      text: "A [art style] illustration of [subject] with [mood] atmosphere. Color palette: [palette]. Lighting: [lighting]. Details: [details]. Style references: [style ref]. Resolution: ultra-high detail.",
      vars: ["[art style]","[subject]","[mood]","[palette]","[lighting]","[details]","[style ref]"],
    },
  },
];

function HeroCarousel({ go }: { go: (p: string) => void }) {
  // ── 9:16 card ratio — height drives width ─────────────────────────────────
  // CARD_H is capped to keep the section within the viewport.
  // BASE_W = CARD_H × (9/16) → every card is exactly 9:16 portrait.
  useViewportWidth();  // kept to trigger re-render on resize (min-width guard)
  const vh = useViewportHeight();
  // Nav is h-16 = 64px; fill remaining viewport so LaptopHero never peeks through
  const NAV_H     = 64;
  const SECTION_H = Math.max(420, vh - NAV_H);
  const CARD_H    = Math.min(Math.max(300, SECTION_H - 48), 680);
  const BASE_W    = Math.max(160, Math.round(CARD_H * 10 / 16));
  const SX_NEAR = 0.75;
  const SX_FAR  = 0.57;
  const SX_XFAR = 0.42;  // outermost tier
  const SY_NEAR = 0.72;
  const SY_FAR  = 0.56;
  const SY_XFAR = 0.40;
  const c_hw    = BASE_W / 2;
  const n_hw    = (BASE_W * SX_NEAR) / 2;
  const f_hw    = (BASE_W * SX_FAR)  / 2;
  const xf_hw   = (BASE_W * SX_XFAR) / 2;
  const OL_NEAR = BASE_W * 0.12;
  const OL_FAR  = BASE_W * 0.08;
  const OL_XFAR = BASE_W * 0.06;
  const dx_near = c_hw + n_hw - OL_NEAR;
  const dx_far  = dx_near + n_hw + f_hw - OL_FAR;
  const dx_xfar = dx_far  + f_hw + xf_hw - OL_XFAR;
  const SLOTS = [
    { dx: -dx_xfar, sx: SX_XFAR, sy: SY_XFAR, z: 0, op: 0.38 },
    { dx: -dx_far,  sx: SX_FAR,  sy: SY_FAR,  z: 1, op: 0.58 },
    { dx: -dx_near, sx: SX_NEAR, sy: SY_NEAR, z: 3, op: 0.80 },
    { dx:  0,       sx: 1.00,    sy: 1.00,    z: 5, op: 1.00 },
    { dx:  dx_near, sx: SX_NEAR, sy: SY_NEAR, z: 3, op: 0.80 },
    { dx:  dx_far,  sx: SX_FAR,  sy: SY_FAR,  z: 1, op: 0.58 },
    { dx:  dx_xfar, sx: SX_XFAR, sy: SY_XFAR, z: 0, op: 0.38 },
  ];
  // ──────────────────────────────────────────────────────────────────────────

  const [active, setActive]       = useState(3);
  const [paused, setPaused]       = useState(false);
  const [twIdx, setTwIdx]         = useState(0);
  const [twText, setTwText]       = useState("");
  const [twDeleting, setTwDeleting] = useState(false);
  const total = CARD_IDS.length;
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prev = () => setActive(n => (n - 1 + total) % total);
  const next = () => setActive(n => (n + 1) % total);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => setActive(n => (n + 1) % total), 3200);
    return () => clearInterval(iv);
  }, [paused, total]);

  const manualNav = (fn: () => void) => {
    fn();
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 6000);
  };

  const displayOrder = [
    (active - 3 + total) % total,
    (active - 2 + total) % total,
    (active - 1 + total) % total,
    active,
    (active + 1) % total,
    (active + 2) % total,
    (active + 3) % total,
  ];

  // Typewriter effect
  useEffect(() => {
    const full = TYPEWRITER_TEXTS[twIdx];
    if (!twDeleting) {
      if (twText.length < full.length) {
        const t = setTimeout(() => setTwText(full.slice(0, twText.length + 1)), 48);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTwDeleting(true), 2200);
      return () => clearTimeout(t);
    } else {
      if (twText.length > 0) {
        const t = setTimeout(() => setTwText(twText.slice(0, -1)), 24);
        return () => clearTimeout(t);
      }
      setTwDeleting(false);
      setTwIdx(i => (i + 1) % TYPEWRITER_TEXTS.length);
    }
  }, [twText, twDeleting, twIdx]);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg,#ffffff 0%,#f9f9fc 100%)",
        height: SECTION_H,
        minHeight: 380,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Floating Cards ── */}
      {CARD_IDS.map((id) => {
        const slotIdx = displayOrder.indexOf(id);
        const slot = SLOTS[slotIdx];
        return (
          <motion.div
            key={id}
            animate={{ x: slot.dx, scaleX: slot.sx, scaleY: slot.sy, opacity: slot.op }}
            transition={{ duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => slotIdx !== 3 && manualNav(() => setActive(id))}
            style={{
              position: "absolute",
              left: `calc(50% - ${BASE_W / 2}px)`,
              top: `calc(50% - ${CARD_H / 2}px)`,
              width: BASE_W,
              height: CARD_H,
              zIndex: slot.z,
              borderRadius: 26,
              overflow: "hidden",
              cursor: slotIdx !== 3 ? "pointer" : "default",
              boxShadow: slotIdx === 3
                ? "0 24px 72px rgba(0,0,0,0.14),0 6px 22px rgba(0,0,0,0.08)"
                : slotIdx === 2 || slotIdx === 4
                  ? "0 12px 42px rgba(0,0,0,0.09),0 3px 12px rgba(0,0,0,0.05)"
                  : slotIdx === 1 || slotIdx === 5
                    ? "0 8px 24px rgba(0,0,0,0.07)"
                    : "0 4px 14px rgba(0,0,0,0.05)",
            }}
          >
            <HeroCard id={id} />
          </motion.div>
        );
      })}

      {/* ── Floating Prompt Box — true center, larger diagonally ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 10,
          width: "min(580px, 88%)",
          background: "white",
          borderRadius: 36,
          padding: "32px 30px 26px 34px",
          boxShadow: "0 32px 100px rgba(0,0,0,0.13),0 8px 28px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div style={{
          fontSize: 34, fontWeight: 500, color: "#0f0f0f",
          letterSpacing: "-0.025em", lineHeight: 1.22, marginBottom: 24,
          minHeight: "1.4em",
          fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
        }}>
          {twText}
          <span style={{
            display: "inline-block", width: 1.5, height: "0.9em",
            background: "#0f0f0f", marginLeft: 2, verticalAlign: "middle",
            animation: "promptBlink 1s step-end infinite",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <motion.button
            onClick={() => go("library")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "linear-gradient(135deg,#6B5DD3 0%,#4f46e5 100%)",
              color: "white", border: "none", borderRadius: 999,
              padding: "12px 28px", fontSize: 15, fontWeight: 600,
              cursor: "pointer", letterSpacing: "0.005em",
              boxShadow: "0 4px 20px rgba(79,70,229,0.36)",
            }}
          >
            Get started
          </motion.button>
        </div>
      </div>

      {/* ── Nav Controls — bottom-right ── */}
      <div style={{ position: "absolute", bottom: 26, right: 30, display: "flex", alignItems: "center", gap: 10, zIndex: 20 }}>
        <button
          onClick={() => manualNav(prev)}
          style={{ width: 40, height: 40, borderRadius: "50%", background: "white", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", transition: "box-shadow 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.14)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)")}
        >
          <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M10 12L6 8l4-4" stroke="#1a1a1a" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={() => setPaused(pp => !pp)}
          style={{ width: 40, height: 40, borderRadius: "50%", background: "white", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", transition: "box-shadow 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.14)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)")}
        >
          {paused ? (
            <svg viewBox="0 0 16 16" fill="none" width={12} height={12}><path d="M4 3l9 5-9 5V3z" fill="#1a1a1a"/></svg>
          ) : (
            <svg viewBox="0 0 16 16" fill="none" width={12} height={12}>
              <rect x="3" y="3" width="3.5" height="10" rx="1" fill="#1a1a1a"/>
              <rect x="9.5" y="3" width="3.5" height="10" rx="1" fill="#1a1a1a"/>
            </svg>
          )}
        </button>
        <button
          onClick={() => manualNav(next)}
          style={{ width: 40, height: 40, borderRadius: "50%", background: "white", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", transition: "box-shadow 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.14)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)")}
        >
          <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M6 4l4 4-4 4" stroke="#1a1a1a" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <style>{`@keyframes promptBlink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}

// ─── Counters ─────────────────────────────────────────────────────────────────

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 30, stiffness: 80 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());
  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

// ─── Typewriter (cycling items) ────────────────────────────────────────────────

function Typewriter({ items }: { items: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = items[idx];
    if (!deleting) {
      if (text.length < full.length) {
        const t = setTimeout(() => setText(full.slice(0, text.length + 1)), 40);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setDeleting(true), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 22);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setIdx((i) => (i + 1) % items.length);
      }
    }
  }, [text, deleting, idx, items]);

  return <>{text}<span className="inline-block w-[1px] h-3 bg-[#094067] ml-px align-middle animate-pulse" /></>;
}

// ─── TryImageGenerator ────────────────────────────────────────────────────────

const promptSuggestions: { text: string; img: string }[] = [
  { text: "Moon rising over the mountains",      img: "https://images.unsplash.com/photo-1532978879514-6cb1f0e5045d?w=900&q=75" },
  { text: "A giraffe walking in a city with cars", img: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=900&q=75" },
  { text: "A robot with a glowing visor",        img: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=900&q=75" },
  { text: "Cyberpunk street at neon midnight",   img: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=900&q=75" },
  { text: "Watercolor portrait of a fox",        img: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900&q=75" },
];

const styleChips = [
  { name: "Dreamy",    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=160&q=70" },
  { name: "Anime",     img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=160&q=70" },
  { name: "Watercol.", img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=160&q=70" },
  { name: "Filmic",    img: "https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?w=160&q=70" },
];

function TryImageGenerator() {
  const [prompt, setPrompt] = useState(promptSuggestions[1].text);
  const [previewImg, setPreviewImg] = useState(promptSuggestions[1].img);
  const [style, setStyle] = useState("Dreamy");
  const [loading, setLoading] = useState(false);
  const [imgKey, setImgKey] = useState(0);
  const [openSugg, setOpenSugg] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpenSugg(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const generate = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOpenSugg(false);
    setTimeout(() => { setLoading(false); setImgKey((k) => k + 1); }, 900);
  };

  const pickSuggestion = (s: { text: string; img: string }) => {
    setPrompt(s.text);
    setPreviewImg(s.img);
    setOpenSugg(false);
    setImgKey((k) => k + 1);
  };

  const filtered = promptSuggestions.filter((s) => s.text.toLowerCase() !== prompt.toLowerCase());

  return (
    <section className="max-w-[1200px] mx-auto px-6 mt-40">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="grid lg:grid-cols-[1fr_540px] gap-14 items-center bg-white border-2 border-[#094067] rounded-3xl p-12 md:p-16"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd803] text-[#094067] mb-4" style={{ fontSize: "12px", fontWeight: 700 }}>
            <Sparkles className="w-3.5 h-3.5" /> Image Generator
          </div>
          <h2 className="text-[#094067] mb-3" style={{ fontSize: "36px", fontWeight: 800, lineHeight: 1.1 }}>
            Try Image Generator
          </h2>
          <p className="text-[#5f6c7b] mb-6 max-w-md" style={{ fontSize: "15px", lineHeight: 1.6 }}>
            Turn pure text to art with Magic Media™ and our range of AI art generation tools. Simply
            enter a prompt, pick a style, and watch your words transform into beautiful art.
          </p>

          <div ref={wrapRef} className="relative max-w-lg">
            <div className="flex items-stretch gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 h-11 rounded-full bg-[#f5f7fa] border-2 border-[#094067]/20 focus-within:border-[#ffd803]">
                <Sparkles className="w-4 h-4 text-[#ef4565]" />
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={() => setOpenSugg(true)}
                  onKeyDown={(e) => e.key === "Enter" && generate()}
                  placeholder="Describe an image..."
                  className="flex-1 bg-transparent outline-none text-[#094067] placeholder:text-[#5f6c7b]"
                  style={{ fontSize: "14px" }}
                />
                {prompt && (
                  <button onClick={() => setPrompt("")} className="text-[#5f6c7b] hover:text-[#ef4565]" aria-label="Clear">×</button>
                )}
              </div>
              <button
                onClick={generate}
                disabled={loading}
                className="h-11 px-6 rounded-full bg-[#ef4565] text-[#bce4d8] inline-flex items-center gap-2"
                style={{ fontWeight: 700 }}
              >
                {loading ? "Generating…" : "Generate"}
              </button>
            </div>

            <AnimatePresence>
              {openSugg && filtered.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-[#094067] rounded-2xl shadow-[6px_6px_0_0_#094067] overflow-hidden z-30"
                >
                  <div className="px-4 pt-3 pb-1 text-[#90b4ce]" style={{ fontSize: "12px", fontWeight: 700 }}>
                    Try these...
                  </div>
                  {filtered.map((s) => (
                    <button
                      key={s.text}
                      onMouseDown={(e) => { e.preventDefault(); pickSuggestion(s); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#ffd803]/30"
                    >
                      <div className="w-8 h-8 rounded-md overflow-hidden border border-[#094067]/20 shrink-0">
                        <ImageWithFallback src={s.img} alt={s.text} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[#094067]" style={{ fontSize: "14px" }}>{s.text}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {styleChips.map((chip) => (
              <button
                key={chip.name}
                onClick={() => setStyle(chip.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition ${
                  style === chip.name ? "border-[#094067] bg-[#094067]/10" : "border-[#094067]/20 hover:border-[#094067]/40"
                }`}
              >
                <div className="w-5 h-5 rounded overflow-hidden">
                  <ImageWithFallback src={chip.img} alt={chip.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[#094067] text-[13px]" style={{ fontWeight: style === chip.name ? 700 : 500 }}>{chip.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#094067]">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgKey + style}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <ImageWithFallback src={previewImg} alt={prompt} className="w-full h-full object-cover" />
              </motion.div>
            </AnimatePresence>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#094067]/30 backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-full border-4 border-[#bce4d8] border-t-[#ffd803]"
                />
              </div>
            )}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-[#bce4d8]/90 backdrop-blur border border-[#094067]/20 rounded-xl p-2">
              <span className="text-[#094067] text-[12px] flex-1 truncate" style={{ fontWeight: 600 }}>{prompt}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffd803] text-[#094067] text-[11px]" style={{ fontWeight: 700 }}>{style}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Cursor Arrow Icon ────────────────────────────────────────────────────────
function CursorArrow() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L2 14.5L6 10.5L9.5 18L11.5 17L8 9.5L13.5 9.5L2 2Z" />
    </svg>
  );
}

// ─── AutoplayVideo — reliably plays in iframes / sandboxes ───────────────────
function AutoplayVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          setTimeout(() => video.play().catch(() => {}), 300);
        });
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(video);

    const onPause = () => { if (visible.current) tryPlay(); };
    video.addEventListener("pause", onPause);
    tryPlay();

    return () => {
      io.disconnect();
      video.removeEventListener("pause", onPause);
    };
  }, [src]);

  return (
    <video ref={ref} src={src} muted playsInline loop preload="auto" className={className} />
  );
}

// ─── BounceCard primitives ─────────────────────────────────────────────────────
function BounceCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      whileTap={{ scale: 0.97 }}
      className={`group relative min-h-[340px] cursor-pointer overflow-hidden rounded-2xl border-2 border-[#094067] bg-white p-6 ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

function CardBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#094067]/25 bg-[#094067]/6 text-[#094067] mb-3"
      style={{ fontSize: "11px", fontWeight: 700 }}
    >
      {children}
    </span>
  );
}

function CardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#094067] mb-2" style={{ fontSize: "22px", fontWeight: 700 }}>
      {children}
    </h3>
  );
}

function CardDesc({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#5f6c7b] leading-relaxed" style={{ fontSize: "13px" }}>
      {children}
    </p>
  );
}

// ─── Where do you want to go? — Bento grid ───────────────────────────────────
function WhereToGoSection({ go }: { go: (p: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  // Film strip speed: always scrolling, faster on hover
  const filmDuration = hovered === "video" ? 1.8 : 5;

  const FILM_COLORS = ["#5b21b6","#4c1d95","#6d28d9","#7c3aed","#8b5cf6","#5b21b6","#4c1d95","#6d28d9","#7c3aed","#8b5cf6"];

  return (
    <section className="max-w-[1200px] mx-auto px-6 mt-40">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <h2 className="text-[#094067]">Where do you want to go?</h2>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => go("library")}
          className="whitespace-nowrap rounded-xl bg-[#094067] px-5 py-2 text-white"
          style={{ fontWeight: 600, fontSize: "14px" }}
        >
          Browse all →
        </motion.button>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-12 grid-rows-[minmax(300px,auto)_minmax(300px,auto)] gap-4">

        {/* ── Card 1: Image Generation — tall, spans 2 rows ── */}
        <motion.button
          onClick={() => go("library:image")}
          onHoverStart={() => setHovered("image")}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.02, boxShadow: "8px 8px 0 0 #094067" }}
          whileTap={{ scale: 0.98 }}
          className="col-span-12 md:col-span-4 row-span-2 rounded-3xl bg-[#ffd803] p-6 text-left flex flex-col justify-between overflow-hidden relative"
          style={{ border: "2.5px solid #094067", boxShadow: "5px 5px 0 0 #094067" }}
        >
          <div>
            <motion.div
              className="inline-block px-3 py-1 rounded-full bg-[#094067] text-[#ffd803] text-[11px] font-bold mb-4"
              animate={hovered === "image" ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.8 }}
            >
              420+ prompts
            </motion.div>
            <div className="text-[#094067] text-3xl font-black leading-tight mb-2">Image<br/>Generation</div>
            <div className="text-[#094067]/70 text-sm">Midjourney · Firefly · FLUX · ChatGPT</div>
          </div>

          {/* Staggered image grid — each image tilts on hover */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {["/images/image1.jpeg","/images/image41.jpeg","/images/image111.jpeg","/images/image196.jpeg"].map((src, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-xl overflow-hidden border-2 border-[#094067]/20"
                animate={hovered === "image"
                  ? { scale: 1.07, rotate: i % 2 === 0 ? 3 : -3, y: -4 }
                  : { scale: 1, rotate: 0, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-4 inline-flex items-center gap-1 text-[#094067] text-sm font-bold"
            animate={hovered === "image" ? { x: 6 } : { x: 0 }}
            transition={{ duration: 0.2 }}
          >
            Explore →
          </motion.div>
        </motion.button>

        {/* ── Card 2: Video Generation — scrolling film strip ── */}
        <motion.button
          onClick={() => go("library:video")}
          onHoverStart={() => setHovered("video")}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.02, boxShadow: "8px 8px 0 0 #094067" }}
          whileTap={{ scale: 0.98 }}
          className="col-span-12 md:col-span-5 rounded-3xl bg-[#7c3aed] p-6 text-left flex flex-col justify-between overflow-hidden relative"
          style={{ border: "2.5px solid #094067", boxShadow: "5px 5px 0 0 #094067" }}
        >
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold mb-4">30 prompts</div>
            <div className="text-white text-3xl font-black leading-tight mb-2">Video<br/>Generation</div>
            <div className="text-white/70 text-sm">Veo · Kling · Seedance · Pika</div>
          </div>

          {/* Continuously scrolling film strip */}
          <div className="overflow-hidden mt-4 rounded-xl" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <motion.div
              className="flex gap-2"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: filmDuration, repeat: Infinity, ease: "linear" }}
            >
              {FILM_COLORS.map((c, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[72px] h-[44px] rounded-lg flex items-center justify-center"
                  style={{ background: c, border: "2px solid rgba(255,255,255,0.15)" }}
                >
                  {i % 5 === 2 && (
                    <motion.div
                      className="w-5 h-5 rounded-full bg-white/40 flex items-center justify-center"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.button>

        {/* ── Card 3: Website Generation — browser types on hover ── */}
        <motion.button
          onClick={() => go("library:website")}
          onHoverStart={() => setHovered("website")}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.02, boxShadow: "8px 8px 0 0 #094067" }}
          whileTap={{ scale: 0.98 }}
          className="col-span-12 md:col-span-3 rounded-3xl bg-[#3b82f6] p-6 text-left flex flex-col justify-between overflow-hidden relative"
          style={{ border: "2.5px solid #094067", boxShadow: "5px 5px 0 0 #094067" }}
        >
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold mb-4">33 types</div>
            <div className="text-white text-3xl font-black leading-tight mb-2">Website<br/>Gen</div>
            <div className="text-white/70 text-sm">Bolt · Lovable · Replit · Codex</div>
          </div>

          {/* Browser mockup — lines retype on hover */}
          <div className="mt-4 rounded-xl bg-white/15 p-3 backdrop-blur">
            <div className="flex gap-1.5 mb-2.5">
              {[["bg-red-400","bg-red-300"],["bg-yellow-400","bg-yellow-300"],["bg-green-400","bg-green-300"]].map(([base, hover], i) => (
                <motion.div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${hovered === "website" ? hover : base}`}
                  animate={hovered === "website" ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.35 }}
                />
              ))}
            </div>
            {/* Re-typing bars — key forces remount on hover */}
            <div key={hovered === "website" ? "typing" : "idle"} className="space-y-1.5">
              {[1, 0.75, 0.9].map((w, i) => (
                <motion.div
                  key={i}
                  className="h-2 bg-white/40 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${w * 100}%` }}
                  transition={{ delay: i * 0.18 + 0.1, duration: 0.55, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>
        </motion.button>

        {/* ── Card 4: Text Generation — typewriter code ── */}
        <motion.button
          onClick={() => go("library:text")}
          onHoverStart={() => setHovered("text")}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.02, boxShadow: "8px 8px 0 0 #ffd803" }}
          whileTap={{ scale: 0.98 }}
          className="col-span-12 md:col-span-5 rounded-3xl bg-[#094067] p-6 text-left flex flex-col justify-between overflow-hidden relative h-full min-h-[300px]"
          style={{ border: "2.5px solid #094067", boxShadow: "5px 5px 0 0 #ffd803" }}
        >
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#ffd803] text-[#094067] text-[11px] font-bold mb-4">Coming soon</div>
            <div className="text-white text-3xl font-black leading-tight mb-2">Text<br/>Generation</div>
            <div className="text-white/60 text-sm">ChatGPT · Gemini · Grok · Claude</div>
          </div>

          {/* Code block — lines slide in on hover */}
          <div className="mt-4 rounded-xl bg-white/10 p-3 font-mono text-[11px] space-y-1.5 overflow-hidden">
            {/* key trick: remount on hover to replay stagger */}
            <React.Fragment key={hovered === "text" ? "hover" : "idle"}>
              {[
                <><span className="text-[#ffd803]">const</span> <span className="text-[#90b4ce]">prompt</span> <span className="text-white/50">=</span> <span className="text-[#ef4565]">"Act as a senior dev…"</span></>,
                <><span className="text-[#ffd803]">function</span> <span className="text-[#bce4d8]">generate</span><span className="text-white/50">(input) {"{"}</span></>,
                <span className="pl-4 block"><span className="text-[#90b4ce]">return</span> <span className="text-white/50">ai.complete(prompt)</span></span>,
                <><span className="text-white/50">{"}"}</span></>,
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3, ease: "easeOut" }}
                >
                  {line}
                </motion.div>
              ))}
            </React.Fragment>
            {/* Always-on blinking cursor */}
            <motion.span
              className="inline-block w-[7px] h-[13px] bg-[#ffd803] align-middle ml-1 rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
            />
          </div>
        </motion.button>

        {/* ── Card 5: Content Generation — pills float on hover ── */}
        <motion.button
          onClick={() => go("library:content")}
          onHoverStart={() => setHovered("content")}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.02, boxShadow: "8px 8px 0 0 #094067" }}
          whileTap={{ scale: 0.98 }}
          className="col-span-12 md:col-span-3 rounded-3xl bg-[#ef4565] p-6 text-left flex flex-col justify-between overflow-hidden relative h-full min-h-[300px]"
          style={{ border: "2.5px solid #094067", boxShadow: "5px 5px 0 0 #094067" }}
        >
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-white/25 text-white text-[11px] font-bold mb-4">Coming soon</div>
            <div className="text-white text-3xl font-black leading-tight mb-2">Content<br/>Gen</div>
            <div className="text-white/70 text-sm">Claude · ChatGPT · Gemini</div>
          </div>

          {/* Floating pills */}
          <div className="mt-4 space-y-2">
            {["✉️  Email copy", "📱  Social posts", "📝  Blog articles"].map((label, i) => (
              <motion.div
                key={label}
                className="px-3 py-1.5 rounded-full bg-white/20 text-white text-[12px] font-semibold w-fit backdrop-blur-sm"
                animate={hovered === "content"
                  ? { y: -6, scale: 1.06, backgroundColor: "rgba(255,255,255,0.30)" }
                  : { y: 0, scale: 1, backgroundColor: "rgba(255,255,255,0.20)" }}
                transition={{ delay: i * 0.08, duration: 0.25, ease: "easeOut" }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </motion.button>

      </div>
    </section>
  );
}

// ─── BrowseByCategory ────────────────────────────────────────────────────────

const browseCategories = [
  { name: "Illustration",  img: imgIllustration },
  { name: "Fashion",       img: imgFashion      },
  { name: "Apparel",       img: imgApparel      },
  { name: "Advertising",   img: imgAdvertising  },
  { name: "People",        img: imgPeople       },
  { name: "Portraits",     img: imgPortraits    },
  { name: "Marketing",     img: imgMarketing    },
  { name: "Product",       img: imgProduct      },
  { name: "E-commerce",    img: imgEcommerce    },
  { name: "Social Media",  img: imgSocialMedia  },
  { name: "Art",           img: "https://images.unsplash.com/photo-1762865417591-e9d09a06de32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" },
];



function BrowseByCategory({ go }: { go: (p: string) => void }) {
  // Duplicate for seamless infinite loop — CSS animation moves -50% = one full set
  const doubled = [...browseCategories, ...browseCategories];

  return (
    <section className="mt-16">
      {/* Header — contained */}
      <div className="max-w-[1200px] mx-auto px-6 mb-6 flex items-center justify-between">
        <h2 className="text-[#094067]">Browse by category</h2>
        <button
          onClick={() => go("library")}
          className="text-[#094067] hover:text-[#ef4565] transition-colors"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          View all →
        </button>
      </div>

      {/* Fade edges + overflow clip */}
      <div
        className="relative overflow-hidden category-marquee-outer"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        {/* Marquee track */}
        <div className="flex gap-5 py-2 category-marquee" style={{ width: "max-content" }}>
          {doubled.map((cat, i) => (
            <button
              key={`${cat.name}-${i}`}
              onClick={() => go("library")}
              className="flex-shrink-0 flex flex-col gap-2 text-left group"
            >
              {/* Landscape image card — 210×148, no shadow */}
              <div
                className="overflow-hidden rounded-xl"
                style={{ width: "210px", height: "148px", background: "#f3f4f6" }}
              >
                <ImageWithFallback
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              {/* Name below */}
              <span
                className="text-[#094067] px-0.5"
                style={{ fontSize: "13px", fontWeight: 600 }}
              >
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CommunityPrizes ────────────────────────────────────────────────────────

const prizes = [
  { rank: "🥇", label: "Prompt of the Month", reward: "$100 Gift Card",         accent: "#ffd803" },
  { rank: "⭐", label: "Approved prompts",    reward: "10k+ readers see your name", accent: "#3a86ff" },
  { rank: "🏅", label: "5+ approved",         reward: "Top Creator Badge",       accent: "#22c55e" },
];

function CommunityPrizes({ go }: { go: (p: string) => void }) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 mt-12 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="flex flex-col sm:flex-row sm:items-center gap-6 rounded-3xl border-2 border-[#094067] px-10 py-8 bg-white"
      >
        <div className="shrink-0">
          <div className="inline-flex items-center gap-1.5 text-[#094067] mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.07em" }}>
            <Users className="w-4 h-4" /> COMMUNITY SPOTLIGHT
          </div>
          <div className="text-[#094067]" style={{ fontSize: "24px", fontWeight: 800, lineHeight: 1.2 }}>
            Submit a prompt.<br />
            <span style={{ color: "#ef4565" }}>Win prizes.</span>
          </div>
        </div>
        <div className="hidden sm:block w-px self-stretch bg-[#094067]/15 mx-3" />
        <div className="flex flex-wrap gap-3 flex-1">
          {prizes.map((p) => (
            <div key={p.label} className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#094067]/10" style={{ background: `${p.accent}20` }}>
              <span className="text-2xl leading-none">{p.rank}</span>
              <div>
                <div style={{ color: p.accent === "#ffd803" ? "#a07700" : p.accent, fontSize: "12px", fontWeight: 700 }}>{p.label}</div>
                <div className="text-[#094067]" style={{ fontSize: "14px", fontWeight: 600 }}>{p.reward}</div>
              </div>
            </div>
          ))}
        </div>
        <motion.button
          onClick={() => go("submit")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0 h-12 px-8 rounded-full border-2 border-[#ffd803] text-[#094067] inline-flex items-center gap-2"
          style={{ background: "#ffd803", fontWeight: 700, fontSize: "16px" }}
        >
          ✍️ Submit
        </motion.button>
      </motion.div>
    </section>
  );
}