import React, { useEffect, useRef, useState } from "react";
import { Users, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform, useScroll, type MotionValue } from "motion/react";
import frame1Video from "../../../imports/Frame_1.mp4";
import frame2Video from "../../../imports/Frame_2.mp4";
import frame3Video from "../../../imports/Frame_3.mp4";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import RotatingText from "../RotatingText";

// â”€â”€ Category images (user-supplied) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

export function Home({ go }: { go: (p: string) => void }) {
  return (
    <div className="text-[#0a0a0a]">
      {/* Hero */}
      <HeroCarousel go={go} />

      {/* Breathing space 1 */}
      <div className="py-28 md:py-40 border-t border-[#0a0a0a]/8">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[#0a0a0a] mb-6" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em" }}>
            <span className="text-[#94a3b8] font-mono" style={{ fontSize: "12px" }}>1.0</span>
            <span>Philosophy</span>
          </div>
          <h2
            className="text-[#0a0a0a] mb-6 whitespace-nowrap"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.035em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            <span style={{ fontWeight: 800 }}>Prompting</span> is the <span style={{ fontWeight: 800 }}>New Coding.</span>
          </h2>
          <p className="text-[#6b7280] max-w-[620px] mx-auto" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.6 }}>
            The best AI outputs don't come from better models â€” they come from better prompts. Master the craft of prompting and unlock the full potential of every AI tool.
          </p>
        </div>
      </div>

      {/* Story Showcase â€” Discover / Learn / Create */}
      <StoryShowcase go={go} />

      {/* Breathing space 2 */}
      <div className="py-28 md:py-40 border-t border-[#0a0a0a]/8">
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[#0a0a0a] mb-6" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em" }}>
            <span className="text-[#94a3b8] font-mono" style={{ fontSize: "12px" }}>2.0</span>
            <span>Possibilities</span>
          </div>
          <h2
            className="text-[#0a0a0a] flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.035em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            <span>A new way to</span>
            <RotatingText
              texts={['CREATE', 'BUILD', 'THINK', 'LEARN']}
              mainClassName="px-3 md:px-5 bg-[#0a0a0a] text-white overflow-hidden py-1 md:py-2 justify-center rounded-xl"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
              splitBy="characters"
              auto
              loop
            />
          </h2>
          <p className="text-[#6b7280]" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.6 }}>
            From stunning images to production code, from viral videos to full websites â€” one prompt is all it takes. Browse what works, copy it, make it yours.
          </p>
        </div>
      </div>

      {/* Four doors â€” BounceCard layout */}

      <BrowseByCategory go={go} />

      {/* Breathing space â€” Mastery */}
      <div className="py-28 md:py-40 border-t border-[#0a0a0a]/8">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[#0a0a0a] mb-6" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em" }}>
            <span className="text-[#94a3b8] font-mono" style={{ fontSize: "12px" }}>4.0</span>
            <span>Mastery</span>
          </div>
          <h2
            className="text-[#0a0a0a] mb-6 whitespace-nowrap"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.035em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            Don't just use <span style={{ fontWeight: 800 }}>AI</span> â€” <em style={{ fontWeight: 400, fontStyle: "italic" }}>Master it.</em>
          </h2>
          <p className="text-[#6b7280] max-w-[620px] mx-auto" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.6 }}>
            The gap between average and exceptional AI output is the prompt. Our curated library gives you the exact words that produce professional-grade results, every time.
          </p>
        </div>
      </div>

      <CommunityPrizes go={go} />
    </div>
  );
}

// â”€â”€â”€ Hero Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// Base card size â€” all cards share these intrinsic dimensions; scale transforms resize them per slot
const TYPEWRITER_TEXTS = [
  "Write Instagram captions",
  "Design a landing page",
  "Create a brand identity",
  "Generate email subject lines",
  "Build a marketing campaign",
];

const HERO_IMAGES = [
  { src: "/images/districts/hero1.png",  label: "Anime Portrait" },
  { src: "/images/districts/hero2.png",  label: "Ink & Bamboo" },
  { src: "/images/districts/hero3.png",  label: "Golden Hour" },
  { src: "/images/districts/hero4.png",  label: "Wildflower" },
  { src: "/images/districts/hero5.png",  label: "Rose Essence" },
  { src: "/images/districts/hero6.jpeg", label: "Urban Collage" },
  { src: "/images/districts/hero7.jpeg", label: "Soft Light" },
];

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
  const img = HERO_IMAGES[id];
  if (!img) return null;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#0a0a0a" }}>
      <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)" }} />
      <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{img.label}</div>
      </div>
    </div>
  );
}

const CARD_IDS = [0, 1, 2, 3, 4, 5, 6];

// â”€â”€ (legacy heroCategories stub kept for type safety) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const heroCategories = [
  {
    id: "marketing", name: "Marketing",
    description: "Drive growth and reach your audience.",
    cardGradient: "linear-gradient(to bottom, rgba(109,40,217,0.28) 0%, rgba(0,0,0,0.78) 100%)",
    accentColor: "#8b5cf6",
    icon: "",
    img: "https://images.unsplash.com/photo-1658062117791-18cae7ff46c1?w=500&q=80",
    prompt: {
      badge: "Marketing", badgeBg: "#f3e8ff", badgeText: "#7c3aed", emoji: "",
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
    icon: "",
    img: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=500&q=80",
    prompt: {
      badge: "Social Media", badgeBg: "#dbeafe", badgeText: "#1d4ed8", emoji: "",
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
    icon: "",
    img: "https://images.unsplash.com/photo-1649013439319-aa7e2dc91267?w=500&q=80",
    prompt: {
      badge: "E-commerce", badgeBg: "#fef3c7", badgeText: "#b45309", emoji: "",
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
    icon: "",
    img: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?w=500&q=80",
    prompt: {
      badge: "Portraits", badgeBg: "#ede9fe", badgeText: "#6d28d9", emoji: "",
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
    icon: "",
    img: "https://images.unsplash.com/photo-1591693898234-f2bba7c8beaa?w=500&q=80",
    prompt: {
      badge: "Art", badgeBg: "#fff7ed", badgeText: "#c2410c", emoji: "",
      title: "Digital Illustration",
      subtitle: "Generate breathtaking illustrations with detailed and evocative style descriptions.",
      tags: ["Art", "Illustration", "Digital", "Creative"],
      text: "A [art style] illustration of [subject] with [mood] atmosphere. Color palette: [palette]. Lighting: [lighting]. Details: [details]. Style references: [style ref]. Resolution: ultra-high detail.",
      vars: ["[art style]","[subject]","[mood]","[palette]","[lighting]","[details]","[style ref]"],
    },
  },
];

function HeroCarousel({ go }: { go: (p: string) => void }) {
  // â”€â”€ 9:16 card ratio â€” height drives width â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // CARD_H is capped to keep the section within the viewport.
  // BASE_W = CARD_H Ã— (9/16) â†’ every card is exactly 9:16 portrait.
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
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
      {/* â”€â”€ Floating Cards â”€â”€ */}
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

      {/* â”€â”€ Floating Prompt Box â€” true center, larger diagonally â”€â”€ */}
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
              background: "#4FC3F7",
              color: "white", border: "none", borderRadius: 999,
              padding: "12px 28px", fontSize: 15, fontWeight: 600,
              cursor: "pointer", letterSpacing: "0.005em",
              boxShadow: "0 4px 20px rgba(79,195,247,0.36)",
            }}
          >
            Get started
          </motion.button>
        </div>
      </div>

      {/* â”€â”€ Nav Controls â€” bottom-right â”€â”€ */}
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

// â”€â”€â”€ How It Works â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// â”€â”€â”€ Story Showcase â€” scroll-driven Discover / Learn / Create â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STORY_STEPS = [
  {
    num: "01",
    key: "discover",
    name: "Discover",
    headline: "Discover Better Prompts",
    description: [
      "Find proven prompts in seconds instead of spending hours experimenting.",
      "Explore thousands of curated prompts across image generation, video creation, website development, coding, and content creation.",
    ],
    benefits: ["Curated Library", "Real-World Results", "Multiple Categories", "Ready To Use"],
  },
  {
    num: "02",
    key: "learn",
    name: "Learn",
    headline: "Learn Prompt Engineering",
    description: [
      "Master AI workflows using beginner-friendly guides and proven frameworks.",
      "Learn how to generate better images, videos, websites, code, and content.",
    ],
    benefits: ["Beginner Friendly", "Step-by-Step Guides", "Proven Frameworks", "Practical Examples"],
  },
  {
    num: "03",
    key: "create",
    name: "Create",
    headline: "Create Without Limits",
    description: [
      "Turn ideas into outputs using prompts that actually work.",
      "Build images, videos, websites, applications, and content faster than ever.",
    ],
    benefits: ["Faster Creation", "Better Results", "Save Time", "Save Money"],
  },
];

const STORY_VIDEOS = [frame1Video, frame2Video, frame3Video];
const ACCENT = "#0a0a0a";

function useStoryStepProgress(scrollYProgress: MotionValue<number>, index: number, count: number) {
  const w = 1 / count;
  const start = index * w;
  const end = start + w;
  const ramp = w * 0.22;
  const peakStart = start + ramp;
  const peakEnd = end - ramp;
  const isFirst = index === 0;
  const isLast = index === count - 1;
  if (isFirst) return useTransform(scrollYProgress, [0, peakEnd, end], [1, 1, 0]);
  if (isLast) return useTransform(scrollYProgress, [start, peakStart, 1], [0, 1, 1]);
  return useTransform(scrollYProgress, [start, peakStart, peakEnd, end], [0, 1, 1, 0]);
}

function StoryNavItem({ step, progress }: { step: typeof STORY_STEPS[0]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 1], [0.32, 1]);
  const x = useTransform(progress, [0, 1], [0, 6]);
  const nameSize = useTransform(progress, [0, 1], [18, 26]);
  const nameWeight = useTransform(progress, [0, 1], [400, 600]);
  const color = useTransform(progress, [0, 1], ["#94a3b8", ACCENT]);
  const barScale = useTransform(progress, [0, 1], [0, 1]);
  const numColor = useTransform(progress, [0, 1], ["#cbd5e1", ACCENT]);

  return (
    <motion.div className="flex items-center gap-4" style={{ opacity, x }}>
      <motion.span className="block w-[3px] rounded-full" style={{ height: 28, background: ACCENT, scaleY: barScale, originY: 0.5 }} />
      <motion.span style={{ fontSize: 13, letterSpacing: 1, color: numColor }}>{step.num}</motion.span>
      <motion.span style={{ fontSize: nameSize, fontWeight: nameWeight, fontStyle: "italic", color, letterSpacing: -0.4, fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{step.name}</motion.span>
    </motion.div>
  );
}

function StoryLeftFrame({ step, progress }: { step: typeof STORY_STEPS[0]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.4, 0.6, 1], [0, 0, 1, 1]);
  const y = useTransform(progress, [0.4, 1], [18, 0]);
  return (
    <motion.div className="absolute inset-x-0 top-0" style={{ opacity, y }}>
      <h3 className="text-[#0a0a0a]" style={{ fontSize: "clamp(26px, 2.6vw, 38px)", lineHeight: 1.12, letterSpacing: -1, fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 800 }}>
        <span style={{ fontStyle: "italic", fontWeight: 400 }}>{step.headline.split(" ")[0]}</span>{" "}
        {step.headline.split(" ").slice(1).join(" ")}
      </h3>
      {step.description.map((d) => (
        <p key={d} className="mt-4 text-[#6b7280]" style={{ fontSize: 15, lineHeight: 1.6 }}>{d}</p>
      ))}
      <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3">
        {step.benefits.map((b) => (
          <div key={b} className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] shrink-0" />
            <span className="text-[#0a0a0a]" style={{ fontSize: 13.5 }}>{b}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function StoryFrameShell({ progress, children }: { progress: MotionValue<number>; children: React.ReactNode }) {
  const opacity = useTransform(progress, [0, 0.45, 0.55, 1], [0, 0, 1, 1]);
  const y = useTransform(progress, [0.45, 1], [28, 0]);
  const scale = useTransform(progress, [0.45, 1], [0.97, 1]);
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity, y, scale }}>
      {children}
    </motion.div>
  );
}

function StoryFramedVideo({ src, path, progress, widthClass = "max-w-full" }: { src: string; path: string; progress: MotionValue<number>; widthClass?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const apply = (v: number) => {
      const el = videoRef.current;
      if (!el) return;
      if (v > 0.5) el.play().catch(() => {});
      else el.pause();
    };
    apply(progress.get());
    return progress.on("change", apply);
  }, [progress]);

  return (
    <div
      className={`w-full ${widthClass} overflow-hidden rounded-3xl border-2 border-[#0a0a0a]/15 bg-white`}
      style={{ boxShadow: "0 40px 90px -35px rgba(10, 10, 10,0.25), 0 1px 0 rgba(255,255,255,0.9) inset" }}
    >
      <div className="flex items-center gap-3 border-b border-[#0a0a0a]/10 bg-[#0a0a0a]/3 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4FC3F7]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#4FC3F7]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
        </div>
        <div className="mx-auto flex w-[55%] max-w-[300px] items-center justify-center gap-2 rounded-full border border-[#0a0a0a]/10 bg-[#0a0a0a]/5 px-3 py-1 text-[#6b7280]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
          <span style={{ fontSize: 11 }}>{path}</span>
        </div>
        <div className="w-[46px]" />
      </div>
      <div className="relative w-full bg-[#f8fafc] aspect-video">
        <video ref={videoRef} src={src} muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  );
}

function StoryShowcase({ go }: { go: (p: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const p0 = useStoryStepProgress(scrollYProgress, 0, STORY_STEPS.length);
  const p1 = useStoryStepProgress(scrollYProgress, 1, STORY_STEPS.length);
  const p2 = useStoryStepProgress(scrollYProgress, 2, STORY_STEPS.length);
  const progresses = [p0, p1, p2];

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "320vh", background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 45%, #ffffff 100%)" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient blobs */}
        <div aria-hidden className="pointer-events-none absolute -right-40 top-10 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle, rgba(10, 10, 10,0.06) 0%, transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 w-[480px] h-[480px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,216,3,0.12) 0%, transparent 70%)" }} />

        <div className="relative mx-auto flex h-full max-w-[1500px] items-center gap-12 px-8">
          {/* LEFT â€” nav + copy (38%) */}
          <div className="relative hidden lg:flex flex-col justify-center" style={{ flexBasis: "38%", minWidth: 340 }}>
            <div className="mb-9 flex flex-col gap-4">
              {STORY_STEPS.map((s, i) => (
                <StoryNavItem key={s.key} step={s} progress={progresses[i]} />
              ))}
            </div>
            <div className="relative min-h-[280px]">
              {STORY_STEPS.map((s, i) => (
                <StoryLeftFrame key={s.key} step={s} progress={progresses[i]} />
              ))}
            </div>
          </div>

          {/* RIGHT â€” scroll-activated video frames (62%) */}
          <div className="relative h-full flex-1" style={{ flexBasis: "62%" }}>
            <StoryFrameShell progress={p0}>
              <StoryFramedVideo src={frame1Video} path="promptvault.app/discover" progress={p0} />
            </StoryFrameShell>
            <StoryFrameShell progress={p1}>
              <StoryFramedVideo src={frame2Video} path="promptvault.app/learn" progress={p1} />
            </StoryFrameShell>
            <StoryFrameShell progress={p2}>
              <StoryFramedVideo src={frame3Video} path="promptvault.app/create" progress={p2} />
            </StoryFrameShell>
          </div>
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ Counters â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 30, stiffness: 80 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());
  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

// â”€â”€â”€ Typewriter (cycling items) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

  return <>{text}<span className="inline-block w-[1px] h-3 bg-[#0a0a0a] ml-px align-middle animate-pulse" /></>;
}



// â”€â”€â”€ Cursor Arrow Icon â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CursorArrow() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L2 14.5L6 10.5L9.5 18L11.5 17L8 9.5L13.5 9.5L2 2Z" />
    </svg>
  );
}

// â”€â”€â”€ AutoplayVideo â€” reliably plays in iframes / sandboxes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ BounceCard primitives â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      className={`group relative min-h-[340px] cursor-pointer overflow-hidden rounded-2xl border-2 border-[#0a0a0a] bg-white p-6 ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

function CardBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#0a0a0a]/25 bg-[#0a0a0a]/6 text-[#0a0a0a] mb-3"
      style={{ fontSize: "11px", fontWeight: 700 }}
    >
      {children}
    </span>
  );
}

function CardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#0a0a0a] mb-2" style={{ fontSize: "22px", fontWeight: 700 }}>
      {children}
    </h3>
  );
}

function CardDesc({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#6b7280] leading-relaxed" style={{ fontSize: "13px" }}>
      {children}
    </p>
  );
}

// â”€â”€â”€ Where do you want to go? â€” Bento grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function WhereToGoSection({ go }: { go: (p: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  // Film strip speed: always scrolling, faster on hover
  const filmDuration = hovered === "video" ? 1.8 : 5;

  const FILM_COLORS = ["#5b21b6","#4c1d95","#6d28d9","#7c3aed","#8b5cf6","#5b21b6","#4c1d95","#6d28d9","#7c3aed","#8b5cf6"];

  return (
    <section className="max-w-[1200px] mx-auto px-6 mt-40">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <h2 className="text-[#0a0a0a]">Where do you want to go?</h2>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => go("library")}
          className="whitespace-nowrap rounded-xl bg-[#0a0a0a] px-5 py-2 text-white"
          style={{ fontWeight: 600, fontSize: "14px" }}
        >
          Browse all â†’
        </motion.button>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-12 grid-rows-[minmax(300px,auto)_minmax(300px,auto)] gap-4">

        {/* â”€â”€ Card 1: Image Generation â€” tall, spans 2 rows â”€â”€ */}
        <motion.button
          onClick={() => go("library:image")}
          onHoverStart={() => setHovered("image")}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.02, boxShadow: "8px 8px 0 0 #0a0a0a" }}
          whileTap={{ scale: 0.98 }}
          className="col-span-12 md:col-span-4 row-span-2 rounded-3xl bg-[#4FC3F7] p-6 text-left flex flex-col justify-between overflow-hidden relative"
          style={{ border: "2.5px solid #0a0a0a", boxShadow: "5px 5px 0 0 #0a0a0a" }}
        >
          <div>
            <motion.div
              className="inline-block px-3 py-1 rounded-full bg-[#0a0a0a] text-[#4FC3F7] text-[11px] font-bold mb-4"
              animate={hovered === "image" ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.8 }}
            >
              420+ prompts
            </motion.div>
            <div className="text-[#0a0a0a] text-3xl font-black leading-tight mb-2">Image<br/>Generation</div>
            <div className="text-[#0a0a0a]/70 text-sm">Midjourney Â· Firefly Â· FLUX Â· ChatGPT</div>
          </div>

          {/* Staggered image grid â€” each image tilts on hover */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {["/images/image1.png","/images/image41.png","/images/image111.png","/images/image196.png"].map((src, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-xl overflow-hidden border-2 border-[#0a0a0a]/20"
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
            className="mt-4 inline-flex items-center gap-1 text-[#0a0a0a] text-sm font-bold"
            animate={hovered === "image" ? { x: 6 } : { x: 0 }}
            transition={{ duration: 0.2 }}
          >
            Explore â†’
          </motion.div>
        </motion.button>

        {/* â”€â”€ Card 2: Video Generation â€” scrolling film strip â”€â”€ */}
        <motion.button
          onClick={() => go("library:video")}
          onHoverStart={() => setHovered("video")}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.02, boxShadow: "8px 8px 0 0 #0a0a0a" }}
          whileTap={{ scale: 0.98 }}
          className="col-span-12 md:col-span-5 rounded-3xl bg-[#7c3aed] p-6 text-left flex flex-col justify-between overflow-hidden relative"
          style={{ border: "2.5px solid #0a0a0a", boxShadow: "5px 5px 0 0 #0a0a0a" }}
        >
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold mb-4">30 prompts</div>
            <div className="text-white text-3xl font-black leading-tight mb-2">Video<br/>Generation</div>
            <div className="text-white/70 text-sm">Veo Â· Kling Â· Seedance Â· Pika</div>
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

        {/* â”€â”€ Card 3: Website Generation â€” browser types on hover â”€â”€ */}
        <motion.button
          onClick={() => go("library:website")}
          onHoverStart={() => setHovered("website")}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.02, boxShadow: "8px 8px 0 0 #0a0a0a" }}
          whileTap={{ scale: 0.98 }}
          className="col-span-12 md:col-span-3 rounded-3xl bg-[#3b82f6] p-6 text-left flex flex-col justify-between overflow-hidden relative"
          style={{ border: "2.5px solid #0a0a0a", boxShadow: "5px 5px 0 0 #0a0a0a" }}
        >
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold mb-4">90+ designs</div>
            <div className="text-white text-3xl font-black leading-tight mb-2">Website<br/>Gen</div>
            <div className="text-white/70 text-sm">Bolt Â· Lovable Â· Replit Â· Codex</div>
          </div>

          {/* Browser mockup â€” lines retype on hover */}
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
            {/* Re-typing bars â€” key forces remount on hover */}
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

        {/* â”€â”€ Card 4: Text Generation â€” typewriter code â”€â”€ */}
        <motion.button
          onClick={() => go("library:text")}
          onHoverStart={() => setHovered("text")}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.02, boxShadow: "8px 8px 0 0 #4FC3F7" }}
          whileTap={{ scale: 0.98 }}
          className="col-span-12 md:col-span-5 rounded-3xl bg-[#0a0a0a] p-6 text-left flex flex-col justify-between overflow-hidden relative h-full min-h-[300px]"
          style={{ border: "2.5px solid #0a0a0a", boxShadow: "5px 5px 0 0 #4FC3F7" }}
        >
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#4FC3F7] text-[#0a0a0a] text-[11px] font-bold mb-4">Coming soon</div>
            <div className="text-white text-3xl font-black leading-tight mb-2">Text<br/>Generation</div>
            <div className="text-white/60 text-sm">ChatGPT Â· Gemini Â· Grok Â· Claude</div>
          </div>

          {/* Code block â€” lines slide in on hover */}
          <div className="mt-4 rounded-xl bg-white/10 p-3 font-mono text-[11px] space-y-1.5 overflow-hidden">
            {/* key trick: remount on hover to replay stagger */}
            <React.Fragment key={hovered === "text" ? "hover" : "idle"}>
              {[
                <><span className="text-[#4FC3F7]">const</span> <span className="text-[#90b4ce]">prompt</span> <span className="text-white/50">=</span> <span className="text-[#0a0a0a]">"Act as a senior devâ€¦"</span></>,
                <><span className="text-[#4FC3F7]">function</span> <span className="text-[#bce4d8]">generate</span><span className="text-white/50">(input) {"{"}</span></>,
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
              className="inline-block w-[7px] h-[13px] bg-[#4FC3F7] align-middle ml-1 rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
            />
          </div>
        </motion.button>

        {/* â”€â”€ Card 5: Content Generation â€” pills float on hover â”€â”€ */}
        <motion.button
          onClick={() => go("library:content")}
          onHoverStart={() => setHovered("content")}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ scale: 1.02, boxShadow: "8px 8px 0 0 #0a0a0a" }}
          whileTap={{ scale: 0.98 }}
          className="col-span-12 md:col-span-3 rounded-3xl bg-[#4FC3F7] p-6 text-left flex flex-col justify-between overflow-hidden relative h-full min-h-[300px]"
          style={{ border: "2.5px solid #0a0a0a", boxShadow: "5px 5px 0 0 #0a0a0a" }}
        >
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-white/25 text-white text-[11px] font-bold mb-4">Coming soon</div>
            <div className="text-white text-3xl font-black leading-tight mb-2">Content<br/>Gen</div>
            <div className="text-white/70 text-sm">Claude Â· ChatGPT Â· Gemini</div>
          </div>

          {/* Floating pills */}
          <div className="mt-4 space-y-2">
            {["Email copy", "Social posts", "Blog articles"].map((label, i) => (
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

// â”€â”€â”€ BrowseByCategory â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const browseCategories = [
  { name: "Illustration",  img: imgIllustration, desc: "Hand-drawn styles, vector art, and digital illustrations for any project." },
  { name: "Fashion",       img: imgFashion,      desc: "High-fashion editorials, runway looks, and trendsetting style imagery." },
  { name: "Apparel",       img: imgApparel,      desc: "Clothing mockups, fabric textures, and product shots for apparel brands." },
  { name: "Advertising",   img: imgAdvertising,  desc: "Campaign-ready visuals, ad creatives, and attention-grabbing brand imagery." },
  { name: "People",        img: imgPeople,       desc: "Lifestyle scenes, candid moments, and diverse human subjects for any context." },
  { name: "Portraits",     img: imgPortraits,    desc: "Studio-quality headshots, creative portraits, and expressive character shots." },
  { name: "Marketing",     img: imgMarketing,    desc: "Social ads, banners, and promotional visuals that convert." },
  { name: "Product",       img: imgProduct,      desc: "Clean product photography, lifestyle placements, and commercial compositions." },
  { name: "E-commerce",    img: imgEcommerce,    desc: "Storefront imagery, catalog shots, and conversion-optimized product visuals." },
  { name: "Social Media",  img: imgSocialMedia,  desc: "Scroll-stopping content for Instagram, TikTok, Pinterest, and beyond." },
  { name: "Art",           img: "https://images.unsplash.com/photo-1762865417591-e9d09a06de32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", desc: "Fine art, abstract, and experimental AI-generated artwork." },
];

function BrowseByCategory({ go }: { go: (p: string) => void }) {
  const doubled = [...browseCategories, ...browseCategories];
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="mt-16 py-16 relative overflow-hidden"
      style={{
        borderRadius: "32px",
        margin: "64px 0 0 0",
        background: "radial-gradient(ellipse at 20% 50%, rgba(230,230,240,0.5) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(220,225,235,0.4) 0%, transparent 50%), #f8f8fa",
      }}
    >
      {/* Floating blobs for liquid glass background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(200,200,210,0.35) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-10 right-[15%] w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(190,195,210,0.3) 0%, transparent 70%)", filter: "blur(30px)" }} />
        <div className="absolute -bottom-16 left-[40%] w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(210,210,220,0.3) 0%, transparent 70%)", filter: "blur(35px)" }} />
        <div className="absolute top-[60%] -right-10 w-56 h-56 rounded-full" style={{ background: "radial-gradient(circle, rgba(195,200,215,0.25) 0%, transparent 70%)", filter: "blur(30px)" }} />
      </div>

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(circle, #999 0.6px, transparent 0.6px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 mb-8 flex items-end justify-between relative z-10">
        <div>
          <h2
            className="text-[#0a0a0a] mb-2"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.03em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            Browse by category
          </h2>
          <p className="text-[#6b7280]" style={{ fontSize: "15px" }}>
            Explore curated prompts across every creative discipline.
          </p>
        </div>
        <button
          onClick={() => go("library")}
          className="text-[#0a0a0a] hover:text-[#555] transition-colors"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          View all â†’
        </button>
      </div>

      {/* Auto-scrolling carousel */}
      <div
        className="relative overflow-hidden z-10"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-6 py-4 browse-cat-marquee"
          style={{
            width: "max-content",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {doubled.map((cat, i) => (
            <motion.button
              key={`${cat.name}-${i}`}
              onClick={() => go("library:image")}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex-shrink-0 rounded-[24px] p-4 pb-5 text-center flex flex-col items-center gap-1 group"
              style={{
                width: "280px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)",
                backdropFilter: "blur(24px) saturate(1.4)",
                WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                border: "1.5px solid rgba(255,255,255,0.7)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 1.5px 0 rgba(255,255,255,0.9) inset, 0 -1px 3px rgba(0,0,0,0.03) inset",
              }}
            >
              <div
                className="w-full aspect-[4/3] rounded-[16px] overflow-hidden mb-4"
                style={{
                  border: "1px solid rgba(255,255,255,0.6)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <ImageWithFallback
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <h3
                className="text-[#0a0a0a]"
                style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                {cat.name}
              </h3>
              <p className="text-[#6b7280] leading-relaxed mt-1 px-2" style={{ fontSize: "13px" }}>
                {cat.desc}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Marquee CSS */}
      <style>{`
        .browse-cat-marquee {
          animation: browse-cat-scroll 40s linear infinite;
        }
        @keyframes browse-cat-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

// â”€â”€â”€ CommunityPrizes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const prizes = [
  {
    rank: "01",
    label: "Prompt of the Month",
    reward: "$100 Gift Card",
    desc: "The best community prompt each month wins a $100 gift card. Quality over quantity.",
    accent: "#0a0a0a",
    bg: "#0a0a0a",
  },
  {
    rank: "02",
    label: "Get Featured",
    reward: "10k+ readers see your work",
    desc: "Every approved prompt gets showcased in our library. Your name, your craft, seen by thousands.",
    accent: "#0a0a0a",
    bg: "#0a0a0a",
  },
  {
    rank: "03",
    label: "Top Creator Badge",
    reward: "Exclusive creator status",
    desc: "Get 5+ prompts approved and earn the Top Creator badge on your profile. Stand out from the crowd.",
    accent: "#0a0a0a",
    bg: "#0a0a0a",
  },
];

function CommunityPrizes({ go }: { go: (p: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="max-w-[1100px] mx-auto px-6 mt-32 mb-24">
      {/* Prize cards first */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        {prizes.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 * (i + 1) }}
            className="relative group rounded-2xl p-6 border border-[#e7e9f1] bg-white transition-all duration-300 hover:-translate-y-1"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 12px 32px -8px ${p.accent}25, 0 4px 12px rgba(0,0,0,0.06)`;
              e.currentTarget.style.borderColor = `${p.accent}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#e7e9f1";
            }}
          >
            {/* Rank badge */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white"
              style={{ background: p.bg, fontSize: "14px", fontWeight: 800 }}
            >
              {p.rank}
            </div>

            {/* Label */}
            <div
              style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: p.accent, marginBottom: 6 }}
            >
              {p.label}
            </div>

            {/* Reward */}
            <h3
              className="text-[#0a0a0a] mb-2"
              style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
            >
              {p.reward}
            </h3>

            {/* Description */}
            <p className="text-[#6b7280] leading-relaxed" style={{ fontSize: "13.5px" }}>
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Header + CTA below the cards */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a]/5 text-[#0a0a0a] mb-5"
          style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          <Users className="w-3.5 h-3.5" /> Community
        </div>
        <h2
          className="text-[#0a0a0a] mb-3"
          style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          <span style={{ fontWeight: 400 }}>Submit a prompt.</span> <span style={{ fontWeight: 800, color: "#0a0a0a" }}>Win prizes.</span>
        </h2>
        <p className="text-[#6b7280] max-w-lg mx-auto mb-8" style={{ fontSize: "16px", lineHeight: 1.6 }}>
          Share your best prompts with the community and get rewarded.
        </p>
        <motion.button
          onClick={() => go("submit")}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white"
          style={{
            background: "#4FC3F7",
            fontWeight: 700,
            fontSize: "15px",
            boxShadow: "0 4px 20px rgba(79,195,247,0.35)",
            fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          Submit Your Prompt
          <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}

