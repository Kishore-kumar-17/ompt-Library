import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import builderShot from "../../imports/image-1.png";
import improverShot from "../../imports/image-2.png";

// Screenshots shown inside the browser frame. Add more entries here and the
// hero will auto-rotate between them with a crossfade.
type Shot = {
  src: string;
  alt: string;
  path: string; // shown in the fake URL pill
};

const SHOTS: Shot[] = [
  {
    src: builderShot,
    alt: "PromptVault Prompt Builder — describe an idea and generate a ready-to-use prompt",
    path: "promptvault.app/builder",
  },
  {
    src: improverShot,
    alt: "PromptVault Prompt Improver — paste a weak prompt and get a structured one",
    path: "promptvault.app/improver",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const active = SHOTS[index];

  // Auto-rotate only when there is more than one screenshot.
  useEffect(() => {
    if (SHOTS.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SHOTS.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FBF9FF 55%, #F4F0FF 100%)",
      }}
    >
      {/* ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 size-[560px] rounded-full"
        style={{ background: "radial-gradient(circle, #EDE4FF 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-20 size-[560px] rounded-full"
        style={{ background: "radial-gradient(circle, #FFE9D6 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 pt-24 pb-20 text-center md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-3.5 py-1.5 text-violet-700 backdrop-blur"
        >
          <Sparkles size={13} />
          <span style={{ fontSize: 12, letterSpacing: 1.4 }}>PROMPTVAULT</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          className="mx-auto max-w-[820px] text-neutral-900"
          style={{ fontSize: "clamp(34px, 6vw, 60px)", lineHeight: 1.08, letterSpacing: -1.2 }}
        >
          The vault of prompts that turn ideas into output.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="mx-auto mt-5 max-w-[560px] text-neutral-600"
          style={{ fontSize: 17, lineHeight: 1.6 }}
        >
          Describe your idea, pick your platform, and generate ready-to-use
          prompts for images, video, code and content — in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-6 py-3 text-white transition-transform hover:scale-[1.03]"
            style={{ fontSize: 14 }}
          >
            Get started free
            <ArrowRight size={16} />
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-6 py-3 text-neutral-800 backdrop-blur transition-transform hover:scale-[1.03]"
            style={{ fontSize: 14 }}
          >
            Browse library
          </button>
        </motion.div>

        {/* Browser-frame mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
          className="mt-16"
          style={{ perspective: "1800px" }}
        >
          <motion.div
            initial={{ rotateX: 10 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 1, delay: 0.32, ease: "easeOut" }}
            className="mx-auto w-full max-w-[1040px] overflow-hidden rounded-2xl border border-white/70 bg-white/80 backdrop-blur-xl"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "0 50px 100px -30px rgba(76, 29, 149, 0.30), 0 1px 0 rgba(255,255,255,0.8) inset",
            }}
          >
            {/* top chrome */}
            <div className="flex items-center gap-3 border-b border-neutral-200/70 bg-white/70 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-[#FF5F57]" />
                <span className="size-3 rounded-full bg-[#FEBC2E]" />
                <span className="size-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="mx-auto flex w-[60%] max-w-[360px] items-center justify-center gap-2 rounded-full border border-neutral-200/80 bg-neutral-50/80 px-3 py-1.5 text-neutral-500">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span style={{ fontSize: 12 }}>{active.path}</span>
              </div>
              <div className="w-[58px]" />
            </div>

            {/* screenshot viewport */}
            <div className="relative aspect-[1900/980] w-full bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.path}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={active.src}
                    alt={active.alt}
                    className="size-full object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* dots — only meaningful with multiple shots */}
          {SHOTS.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {SHOTS.map((s, i) => (
                <button
                  key={s.path}
                  aria-label={`Show ${s.path}`}
                  onClick={() => setIndex(i)}
                  className="size-2 rounded-full transition-all"
                  style={{
                    background: i === index ? "#7C3AED" : "#D8D2EA",
                    width: i === index ? 20 : 8,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
