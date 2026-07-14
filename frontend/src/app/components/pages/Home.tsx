import React, { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import frame1Video from "../../../imports/Frame_1.mp4";
import frame2Video from "../../../imports/Frame_2.mp4";
import frame3Video from "../../../imports/Frame_3.mp4";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import RotatingText from "../RotatingText";
import ScrollReveal from "../ScrollReveal";
import SectionReveal from "../SectionReveal";
import ScrollStack, { ScrollStackItem } from "../ScrollStack";

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

export function Home({ go }: { go: (p: string) => void }) {
  return (
    <div className="text-[#0a0a0a]">
      {/* Hero */}
      <HeroCarousel go={go} />

      {/* Breathing space 1 */}
      <SectionReveal>
      <div className="py-28 md:py-40 border-t border-[#0a0a0a]/10">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[#0a0a0a] mb-6" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em" }}>
            <span className="text-[#6b7280] font-mono" style={{ fontSize: "12px" }}>1.0</span>
            <span>Philosophy</span>
          </div>
          <ScrollReveal>
            <h2
              className="text-[#0a0a0a] mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.035em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
            >
              <span style={{ fontWeight: 800 }}>Prompting</span> is the <span style={{ fontWeight: 800, color: "#4FC3F7" }}>New Coding.</span>
            </h2>
            <p className="text-[#6b7280] max-w-[620px] mx-auto" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.6 }}>
              The best AI outputs don't come from better models - they come from better prompts. Master the craft of prompting and unlock the full potential of every AI tool.
            </p>
          </ScrollReveal>
        </div>
      </div>
      </SectionReveal>

      {/* Story Showcase - Discover / Learn / Create */}
      <StoryShowcase go={go} />

      {/* Breathing space 2 */}
      <SectionReveal>
      <div className="py-28 md:py-40 border-t border-[#0a0a0a]/10">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[#0a0a0a] mb-6" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em" }}>
            <span className="text-[#6b7280] font-mono" style={{ fontSize: "12px" }}>2.0</span>
            <span>Possibilities</span>
          </div>
          <ScrollReveal>
          <h2
            className="text-[#0a0a0a] flex items-center justify-center gap-3 md:gap-4 mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.035em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            <span className="shrink-0">A new way to</span>
            <RotatingText
              texts={['CREATE', 'BUILD', 'THINK', 'LEARN']}
              mainClassName="px-3 md:px-5 bg-[#0a0a0a] text-white overflow-hidden py-1 md:py-2 justify-center rounded-xl min-w-[140px] md:min-w-[200px]"
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
          <p className="text-[#6b7280] max-w-[620px] mx-auto" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.6 }}>
            From stunning images to production code, from viral videos to full websites - one prompt is all it takes. Browse what works, copy it, make it yours.
          </p>
          </ScrollReveal>
        </div>
      </div>
      </SectionReveal>

      {/* Browse by category - auto-scrolling marquee */}
      <SectionReveal>
      <BrowseByCategory go={go} />
      </SectionReveal>

      {/* Breathing space - Mastery */}
      <SectionReveal>
      <div className="py-28 md:py-40 border-t border-[#0a0a0a]/10">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[#0a0a0a] mb-6" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em" }}>
            <span className="text-[#6b7280] font-mono" style={{ fontSize: "12px" }}>3.0</span>
            <span>Mastery</span>
          </div>
          <ScrollReveal>
          <h2
            className="text-[#0a0a0a] mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.035em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            Don't just use <span style={{ fontWeight: 800, color: "#4FC3F7" }}>AI</span> - <em style={{ fontWeight: 400, fontStyle: "italic" }}>Master it.</em>
          </h2>
          <p className="text-[#6b7280] max-w-[620px] mx-auto" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.6 }}>
            The gap between average and exceptional AI output is the prompt. Our curated library gives you the exact words that produce professional-grade results, every time.
          </p>
          </ScrollReveal>
        </div>
      </div>
      </SectionReveal>

      <SectionReveal>
      <CommunityPrizes go={go} />
      </SectionReveal>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

// Base card size - all cards share these intrinsic dimensions; scale transforms resize them per slot
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

function HeroCarousel({ go }: { go: (p: string) => void }) {
  // ── 10:16 card ratio - height drives width ────────────────────────────────
  // CARD_H is capped to keep the section within the viewport.
  // BASE_W = CARD_H × (10/16) → every card is exactly 10:16 portrait.
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

      {/* ── Floating Prompt Box - true center, larger diagonally ── */}
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
          fontSize: 34, fontWeight: 500, color: "#0a0a0a",
          letterSpacing: "-0.025em", lineHeight: 1.22, marginBottom: 24,
          minHeight: "1.4em",
          fontFamily: "'DM Sans','Helvetica Neue',Helvetica,Arial,sans-serif",
        }}>
          {twText}
          <span style={{
            display: "inline-block", width: 1.5, height: "0.9em",
            background: "#0a0a0a", marginLeft: 2, verticalAlign: "middle",
            animation: "promptBlink 1s step-end infinite",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <motion.button
            onClick={() => go("library")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a0a0a]"
            style={{
              background: "#4FC3F7",
              color: "white", border: "none", borderRadius: 999,
              padding: "12px 28px", fontSize: 15, fontWeight: 600,
              cursor: "pointer", letterSpacing: "0.005em",
              boxShadow: "0 4px 20px rgba(79,195,247,0.36)",
            }}
          >
            Get started for free
          </motion.button>
        </div>
      </div>

      {/* ── Nav Controls - bottom-right ── */}
      <div style={{ position: "absolute", bottom: 26, right: 30, display: "flex", alignItems: "center", gap: 10, zIndex: 20 }}>
        <button
          aria-label="Previous slide"
          onClick={() => manualNav(prev)}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2"
          style={{ width: 40, height: 40, borderRadius: "50%", background: "white", border: "1px solid rgba(10,10,10,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", transition: "box-shadow 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.14)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)")}
        >
          <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M10 12L6 8l4-4" stroke="#0a0a0a" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          onClick={() => setPaused(pp => !pp)}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2"
          style={{ width: 40, height: 40, borderRadius: "50%", background: "white", border: "1px solid rgba(10,10,10,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", transition: "box-shadow 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.14)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)")}
        >
          {paused ? (
            <svg viewBox="0 0 16 16" fill="none" width={12} height={12}><path d="M4 3l9 5-9 5V3z" fill="#0a0a0a"/></svg>
          ) : (
            <svg viewBox="0 0 16 16" fill="none" width={12} height={12}>
              <rect x="3" y="3" width="3.5" height="10" rx="1" fill="#0a0a0a"/>
              <rect x="9.5" y="3" width="3.5" height="10" rx="1" fill="#0a0a0a"/>
            </svg>
          )}
        </button>
        <button
          aria-label="Next slide"
          onClick={() => manualNav(next)}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2"
          style={{ width: 40, height: 40, borderRadius: "50%", background: "white", border: "1px solid rgba(10,10,10,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", transition: "box-shadow 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.14)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)")}
        >
          <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M6 4l4 4-4 4" stroke="#0a0a0a" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <style>{`@keyframes promptBlink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}

// ─── Story Showcase - ScrollStack cards ──────────────────────────────────────

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
    video: frame1Video,
    path: "promptbot.app/discover",
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
    video: frame2Video,
    path: "promptbot.app/learn",
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
    video: frame3Video,
    path: "promptbot.app/create",
  },
];

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

function StoryShowcase({ go }: { go: (p: string) => void }) {
  return (
    <section
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 45%, #ffffff 100%)" }}
    >
      <ScrollStack
        stackOffset={40}
        scaleStep={0.04}
        baseScale={0.92}
      >
        {STORY_STEPS.map((s) => (
          <ScrollStackItem
            key={s.key}
            itemClassName="rounded-3xl bg-white border border-[#0a0a0a]/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row lg:[min-height:calc(100vh-120px)]">
              {/* Left - Text content */}
              <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[13px] text-[#6b7280]">{s.num}</span>
                  <span
                    className="text-2xl font-semibold italic text-[#0a0a0a]"
                    style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                  >
                    {s.name}
                  </span>
                </div>
                <h3
                  className="text-[#0a0a0a] mb-5"
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 42px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontWeight: 800,
                  }}
                >
                  <span style={{ fontStyle: "italic", fontWeight: 400 }}>{s.headline.split(" ")[0]}</span>{" "}
                  {s.headline.split(" ").slice(1).join(" ")}
                </h3>
                {s.description.map((d) => (
                  <p key={d} className="mt-2.5 text-[#6b7280]" style={{ fontSize: 16, lineHeight: 1.65 }}>{d}</p>
                ))}
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
                  {s.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] shrink-0" />
                      <span className="text-[#0a0a0a]" style={{ fontSize: 14.5, fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Video */}
              <div className="flex-1 lg:max-w-[58%]">
                <div className="border-l border-[#0a0a0a]/10 h-full flex flex-col">
                  <div className="flex items-center gap-3 border-b border-[#0a0a0a]/10 bg-[#0a0a0a]/3 px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4FC3F7]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4FC3F7]/50" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a]/15" />
                    </div>
                    <div className="mx-auto flex w-[55%] max-w-[300px] items-center justify-center gap-2 rounded-full border border-[#0a0a0a]/10 bg-[#0a0a0a]/5 px-3 py-1 text-[#6b7280]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7]" />
                      <span style={{ fontSize: 11 }}>{s.path}</span>
                    </div>
                    <div className="w-[46px]" />
                  </div>
                  <div className="relative w-full bg-[#f8fafc] flex-1 min-h-[280px]">
                    <AutoplayVideo src={s.video} className="absolute inset-0 w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}

// ─── BrowseByCategory ────────────────────────────────────────────────────────

const browseCategories = [
  { name: "Illustration",  img: imgIllustration, desc: "Hand-drawn styles, vector art, and digital illustrations for any project.", libraryCategory: "Art & Illustration" },
  { name: "Fashion",       img: imgFashion,      desc: "High-fashion editorials, runway looks, and trendsetting style imagery.", libraryCategory: "Fashion & Apparel" },
  { name: "Apparel",       img: imgApparel,      desc: "Clothing mockups, fabric textures, and product shots for apparel brands.", libraryCategory: "Fashion & Apparel" },
  { name: "Advertising",   img: imgAdvertising,  desc: "Campaign-ready visuals, ad creatives, and attention-grabbing brand imagery.", libraryCategory: "Marketing & Ads" },
  { name: "People",        img: imgPeople,       desc: "Lifestyle scenes, candid moments, and diverse human subjects for any context.", libraryCategory: "People & Portraits" },
  { name: "Portraits",     img: imgPortraits,    desc: "Studio-quality headshots, creative portraits, and expressive character shots.", libraryCategory: "People & Portraits" },
  { name: "Marketing",     img: imgMarketing,    desc: "Social ads, banners, and promotional visuals that convert.", libraryCategory: "Marketing & Ads" },
  { name: "Product",       img: imgProduct,      desc: "Clean product photography, lifestyle placements, and commercial compositions.", libraryCategory: "Product & E-com" },
  { name: "E-commerce",    img: imgEcommerce,    desc: "Storefront imagery, catalog shots, and conversion-optimized product visuals.", libraryCategory: "Product & E-com" },
  { name: "Social Media",  img: imgSocialMedia,  desc: "Scroll-stopping content for Instagram, TikTok, Pinterest, and beyond.", libraryCategory: "Social Media" },
  { name: "Art",           img: "https://images.unsplash.com/photo-1762865417591-e9d09a06de32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", desc: "Fine art, abstract, and experimental AI-generated artwork.", libraryCategory: "Art & Illustration" },
];

function BrowseByCategory({ go }: { go: (p: string) => void }) {
  const doubled = [...browseCategories, ...browseCategories];
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pause = () => { pausedRef.current = true; if (resumeTimer.current) clearTimeout(resumeTimer.current); };
  const resumeSoon = (delay = 0) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, delay);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    const tick = () => {
      if (!pausedRef.current) {
        el.scrollLeft += 0.6;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); if (resumeTimer.current) clearTimeout(resumeTimer.current); };
  }, []);

  return (
    <section
      className="py-16 relative overflow-hidden"
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
      <div className="max-w-[1200px] mx-auto px-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 relative z-10">
        <ScrollReveal baseRotation={0} blurStrength={3}>
          <h2
            className="text-[#0a0a0a] mb-2"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.03em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            Browse by category
          </h2>
          <p className="text-[#6b7280]" style={{ fontSize: "15px" }}>
            Explore curated prompts across every creative discipline.
          </p>
        </ScrollReveal>
        <button
          onClick={() => go("library")}
          className="text-[#0a0a0a] hover:text-[#6b7280] transition-colors"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          View all →
        </button>
      </div>

      {/* Auto-scrolling carousel — native scroll so touch users can swipe through it */}
      <div
        ref={scrollRef}
        className="relative overflow-x-auto overflow-y-hidden z-10 no-scrollbar"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          WebkitOverflowScrolling: "touch",
        }}
        onMouseEnter={pause}
        onMouseLeave={() => resumeSoon(0)}
        onTouchStart={pause}
        onTouchEnd={() => resumeSoon(2500)}
        onPointerDown={pause}
        onPointerUp={() => resumeSoon(1000)}
        onPointerCancel={() => resumeSoon(1000)}
      >
        <div className="flex gap-6 py-4" style={{ width: "max-content" }}>
          {doubled.map((cat, i) => (
            <motion.button
              key={`${cat.name}-${i}`}
              onClick={() => go("library:image:" + encodeURIComponent(cat.libraryCategory))}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              aria-hidden={i >= browseCategories.length}
              tabIndex={i >= browseCategories.length ? -1 : 0}
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

      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

// ─── CommunityPrizes ────────────────────────────────────────────────────────

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
    reward: "Featured library placement",
    desc: "Every approved prompt gets showcased in our library. Your name, your craft, seen by thousands.",
    accent: "#4FC3F7",
    bg: "#4FC3F7",
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
  const inView = useInView(ref, { margin: "-80px", once: true });
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const toggleCard = (i: number) => {
    setRevealed((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <section ref={ref} className="max-w-[1100px] mx-auto px-6 mt-32 mb-24">
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.5 }}
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
          <span style={{ fontWeight: 400 }}>Submit a prompt.</span> <span style={{ fontWeight: 800, color: "#4FC3F7" }}>Win prizes.</span>
        </h2>
        <p className="text-[#6b7280] max-w-lg mx-auto mb-3" style={{ fontSize: "16px", lineHeight: 1.6 }}>
          Share your best prompts with the community and get rewarded.
        </p>
        <p className="text-[#6b7280]" style={{ fontSize: "13px" }}>Click each card to reveal the prize</p>
      </motion.div>

      {/* Prize cards — click to flip */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        {prizes.map((p, i) => {
          const isRevealed = !!revealed[i];
          return (
            <div
              key={p.label}
              role="button"
              tabIndex={0}
              aria-pressed={isRevealed}
              aria-label={isRevealed ? `${p.label}: ${p.reward}` : `Reveal prize ${i + 1}`}
              style={{ perspective: "1200px" }}
              onClick={() => toggleCard(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCard(i); } }}
              className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2 rounded-2xl"
            >
              <motion.div
                animate={{ rotateY: isRevealed ? 0 : 180 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Back face — dark with ? */}
                <div
                  className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3"
                  style={{
                    background: "#0a0a0a",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <span style={{ fontSize: 48, fontWeight: 800, color: "#4FC3F7" }}>?</span>
                  <span className="text-white/60" style={{ fontSize: 13, fontWeight: 600 }}>Tap to reveal</span>
                </div>

                {/* Front face — card content */}
                <div
                  className="rounded-2xl p-6 border border-[#0a0a0a]/15 bg-white transition-all duration-300 hover:-translate-y-1"
                  style={{ backfaceVisibility: "hidden" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 12px 32px -8px ${p.accent}25, 0 4px 12px rgba(0,0,0,0.06)`;
                    e.currentTarget.style.borderColor = `${p.accent}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(10,10,10,0.15)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white"
                    style={{ background: p.bg, fontSize: "14px", fontWeight: 800 }}
                  >
                    {p.rank}
                  </div>
                  <div
                    style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: p.accent, marginBottom: 6 }}
                  >
                    {p.label}
                  </div>
                  <h3
                    className="text-[#0a0a0a] mb-2"
                    style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                  >
                    {p.reward}
                  </h3>
                  <p className="text-[#6b7280] leading-relaxed" style={{ fontSize: "13.5px" }}>
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* CTA button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={inView ? { duration: 0.5, delay: 0.3 } : { duration: 0 }}
      >
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

