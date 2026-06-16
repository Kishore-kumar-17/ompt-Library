import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import cityGray from "../../imports/city_1.png";
import cityColor from "../../imports/WhatsApp_Image_2026-06-05_at_10.07.41_AM_1.png";

type District = {
  key: string;
  name: string;
  short: string;
  tagline: string;
  emoji: string;
  color: string;
  soft: string;
  prompts: string;
  description: string;
  categories: string[];
  cx: number;
  cy: number;
  radius: number;
  // clip-path polygon (percent coords) tracing the district's real footprint
  // on the city image, radiating out from the central hub at ~47% 48%.
  polygon: string;
};

const DISTRICTS: District[] = [
  {
    key: "image",
    name: "Image District",
    short: "Image",
    tagline: "VISUALIZE IDEAS",
    emoji: "🎨",
    color: "#7C3AED",
    soft: "rgba(124, 58, 237, 0.12)",
    prompts: "12,450+",
    description:
      "Create stunning visuals, advertisements, social media graphics, product photography, posters and creative artwork.",
    categories: ["Marketing", "Advertising", "Social Media", "Posters", "Product Photography"],
    cx: 44,
    cy: 18,
    radius: 22,
    polygon: "47% 48%, 30% 13%, 40% 6%, 56% 6%, 70% 13%",
  },
  {
    key: "video",
    name: "Video District",
    short: "Video",
    tagline: "MAKE IT MOTION",
    emoji: "🎬",
    color: "#EF4444",
    soft: "rgba(239, 68, 68, 0.12)",
    prompts: "8,920+",
    description:
      "Generate commercials, trailers, anime scenes, cinematic videos and social media reels.",
    categories: ["Commercials", "Trailers", "Anime", "Reels", "Music Videos"],
    cx: 78,
    cy: 26,
    radius: 22,
    polygon: "47% 48%, 70% 13%, 84% 20%, 96% 31%, 94% 46%",
  },
  {
    key: "website",
    name: "Website District",
    short: "Website",
    tagline: "DESIGN EXPERIENCE",
    emoji: "🌐",
    color: "#2563EB",
    soft: "rgba(37, 99, 235, 0.12)",
    prompts: "6,780+",
    description:
      "Build SaaS products, landing pages, portfolios, dashboards and e-commerce websites.",
    categories: ["SaaS", "Portfolio", "Landing Pages", "E-Commerce", "Agency"],
    cx: 64,
    cy: 74,
    radius: 24,
    polygon: "47% 48%, 94% 46%, 86% 60%, 80% 72%, 66% 80%, 54% 84%, 47% 86%",
  },
  {
    key: "code",
    name: "Code District",
    short: "Code",
    tagline: "BUILD THE FUTURE",
    emoji: "💻",
    color: "#10B981",
    soft: "rgba(16, 185, 129, 0.12)",
    prompts: "9,410+",
    description:
      "Accelerate development using prompts for React, Next.js, Python, APIs and AI applications.",
    categories: ["React", "Next.js", "Python", "AI Apps", "APIs"],
    cx: 22,
    cy: 70,
    radius: 22,
    polygon: "47% 48%, 47% 86%, 40% 84%, 32% 80%, 20% 72%, 10% 60%, 5% 46%",
  },
  {
    key: "creator",
    name: "Creator District",
    short: "Creator",
    tagline: "SHARE KNOWLEDGE",
    emoji: "✨",
    color: "#F59E0B",
    soft: "rgba(245, 158, 11, 0.12)",
    prompts: "7,230+",
    description:
      "Craft compelling content, newsletters, social posts, ad copy, SEO articles and brand storytelling.",
    categories: ["Blogs", "SEO", "Copywriting", "LinkedIn", "Email Marketing"],
    cx: 16,
    cy: 22,
    radius: 22,
    polygon: "47% 48%, 5% 46%, 6% 31%, 16% 20%, 30% 13%",
  },
];

// Triangular activation: only one district is "active" at a time.
function useActiveProgress(
  scrollYProgress: MotionValue<number>,
  index: number,
  isLast: boolean,
) {
  const intro = 0.06;
  const windowWidth = (1 - intro) / DISTRICTS.length; // ~0.188
  const start = intro + index * windowWidth;
  const rampUp = 0.04;
  const peakStart = start + rampUp;
  const peakEnd = start + windowWidth - rampUp;
  const end = start + windowWidth;
  // Last district holds at 1 until end of scroll so final state remains.
  if (isLast) {
    return useTransform(scrollYProgress, [start, peakStart, 1], [0, 1, 1]);
  }
  return useTransform(
    scrollYProgress,
    [start, peakStart, peakEnd, end],
    [0, 1, 1, 0],
  );
}

function DistrictReveal({
  district,
  progress,
}: {
  district: District;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.18, 1], [0, 1, 1]);
  const glowOpacity = useTransform(progress, [0, 0.4, 1], [0, 0.7, 0.55]);
  const glowScale = useTransform(progress, [0, 1], [0.6, 1]);

  return (
    <>
      {/* The full colored city, clipped to this district's real footprint so the
          entire district fades from grayscale to color — not a circular patch. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${cityColor})`,
          backgroundSize: "contain",
          opacity,
          clipPath: `polygon(${district.polygon})`,
          WebkitClipPath: `polygon(${district.polygon})`,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: `${district.cx}%`,
          top: `${district.cy}%`,
          width: "42%",
          height: "42%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${district.color}66 0%, ${district.color}00 60%)`,
          opacity: glowOpacity,
          scale: glowScale,
          filter: "blur(24px)",
        }}
      />
    </>
  );
}

function DistrictCard({
  district,
  progress,
}: {
  district: District;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.2, 0.85, 1], [0, 1, 1, 1]);
  const y = useTransform(progress, [0, 0.3], [20, 0]);
  return (
    <motion.div
      className="absolute bottom-8 left-8 w-[320px] rounded-2xl border border-white/70 bg-white/80 p-6 backdrop-blur-xl"
      style={{
        opacity,
        y,
        boxShadow: `0 30px 60px -20px ${district.color}55, 0 1px 0 rgba(255,255,255,0.8) inset`,
      }}
    >
      <div
        className="mb-3 inline-flex items-center gap-2 rounded-full px-2.5 py-1"
        style={{ background: district.soft, color: district.color }}
      >
        <span style={{ fontSize: 14 }}>{district.emoji}</span>
        <span style={{ fontSize: 10, letterSpacing: 1.4 }}>{district.tagline}</span>
      </div>
      <h3
        className="mb-2 text-neutral-900"
        style={{ fontSize: 24, lineHeight: 1.15, letterSpacing: -0.4 }}
      >
        {district.name}
      </h3>
      <p className="mb-4 text-neutral-600" style={{ fontSize: 13, lineHeight: 1.55 }}>
        {district.description}
      </p>
      <div className="mb-4 flex items-baseline gap-1.5">
        <span style={{ fontSize: 22, color: district.color, letterSpacing: -0.3 }}>
          {district.prompts}
        </span>
        <span className="text-neutral-500" style={{ fontSize: 12 }}>
          prompts
        </span>
      </div>
      <div className="mb-5">
        <div className="mb-2 text-neutral-500" style={{ fontSize: 10, letterSpacing: 1 }}>
          POPULAR
        </div>
        <div className="flex flex-wrap gap-1.5">
          {district.categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-neutral-200/80 bg-white/80 px-2 py-0.5 text-neutral-700"
              style={{ fontSize: 11 }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <button
        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-white transition-transform hover:scale-[1.03]"
        style={{ background: district.color, fontSize: 12 }}
      >
        Explore {district.short} Prompts
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

function DistrictPreview({
  district,
  progress,
}: {
  district: District;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.25, 0.85, 1], [0, 1, 1, 1]);
  const scale = useTransform(progress, [0, 0.3, 1], [0.85, 1, 1]);
  const rotate = useTransform(progress, [0, 1], [-4, 0]);
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity }}
    >
      <motion.div
        className="relative aspect-square w-[80%] max-w-[360px] overflow-hidden rounded-3xl border border-white/70 bg-white/70 backdrop-blur-xl"
        style={{
          scale,
          rotate,
          boxShadow: `0 40px 80px -25px ${district.color}66, 0 1px 0 rgba(255,255,255,0.8) inset`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${district.color}22 0%, #ffffff 70%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${cityColor})`,
            backgroundSize: "320%",
            backgroundPosition: `${district.cx}% ${district.cy}%`,
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{ background: district.soft, color: district.color }}
        >
          <span style={{ fontSize: 12 }}>{district.emoji}</span>
          <span style={{ fontSize: 10, letterSpacing: 1.2 }}>
            {district.short.toUpperCase()}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PromptCity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const p0 = useActiveProgress(scrollYProgress, 0, false);
  const p1 = useActiveProgress(scrollYProgress, 1, false);
  const p2 = useActiveProgress(scrollYProgress, 2, false);
  const p3 = useActiveProgress(scrollYProgress, 3, false);
  const p4 = useActiveProgress(scrollYProgress, 4, true);
  const progresses = [p0, p1, p2, p3, p4];

  const headerOpacity = useTransform(scrollYProgress, [0, 0.04, 0.08], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: "500vh",
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FAF8FF 50%, #F4F0FF 100%)",
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 size-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, #EDE4FF 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-0 size-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, #FFE9D6 0%, transparent 70%)" }}
        />

        <motion.div
          className="absolute left-0 right-0 top-6 z-10 text-center"
          style={{ opacity: headerOpacity }}
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-3 py-1 text-violet-700 backdrop-blur">
            <Sparkles size={12} />
            <span style={{ fontSize: 12, letterSpacing: 1.4 }}>PROMPT CITY</span>
          </div>
          <div className="text-neutral-500" style={{ fontSize: 13 }}>
            Five creative districts. Thousands of prompts. Scroll to explore.
          </div>
        </motion.div>

        <div className="relative mx-auto flex h-full max-w-[1440px] items-stretch gap-6 px-8 py-10">
          {/* LEFT — City (70%) */}
          <div className="relative flex-1" style={{ flexBasis: "70%" }}>
            <div className="relative flex h-full w-full items-center justify-center">
              <div
                className="relative"
                style={{
                  width: "min(100%, 1100px)",
                  aspectRatio: "3 / 2",
                  perspective: "1600px",
                }}
              >
                <motion.div
                  className="relative size-full"
                  style={{
                    transformStyle: "preserve-3d",
                    rotateX: useTransform(scrollYProgress, [0, 1], [8, 0]),
                    rotateZ: useTransform(scrollYProgress, [0, 1], [-2, 0]),
                  }}
                >
                  <img
                    src={cityGray}
                    alt="Prompt City"
                    className="absolute inset-0 size-full select-none object-contain"
                    style={{
                      filter: "drop-shadow(0 40px 60px rgba(76, 29, 149, 0.18))",
                    }}
                    draggable={false}
                  />
                  {DISTRICTS.map((d, i) => (
                    <DistrictReveal key={d.key} district={d} progress={progresses[i]} />
                  ))}

                  {DISTRICTS.map((d, i) => {
                    const labelOpacity = useTransform(progresses[i], [0, 0.5, 1], [0, 0, 1]);
                    const labelY = useTransform(progresses[i], [0, 1], [8, 0]);
                    return (
                      <motion.div
                        key={`label-${d.key}`}
                        className="absolute"
                        style={{
                          left: `${d.cx}%`,
                          top: `${Math.max(d.cy - 16, 2)}%`,
                          transform: "translate(-50%, -50%)",
                          opacity: labelOpacity,
                          y: labelY,
                        }}
                      >
                        <div
                          className="rounded-md px-2 py-0.5 text-white shadow"
                          style={{ background: d.color, fontSize: 10, letterSpacing: 0.8 }}
                        >
                          {d.short.toUpperCase()} DISTRICT
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* floating bottom-left card — one at a time */}
            {DISTRICTS.map((d, i) => (
              <DistrictCard key={d.key} district={d} progress={progresses[i]} />
            ))}
          </div>

          {/* RIGHT — Active district preview (30%) */}
          <div className="relative flex items-center justify-center" style={{ flexBasis: "30%", minWidth: 320 }}>
            <div className="relative h-full w-full">
              {DISTRICTS.map((d, i) => (
                <DistrictPreview key={d.key} district={d} progress={progresses[i]} />
              ))}
            </div>

            {/* progress dots */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center gap-3">
                {DISTRICTS.map((d, i) => {
                  const dotScale = useTransform(progresses[i], [0, 1], [1, 1.6]);
                  const dotBg = useTransform(progresses[i], [0, 1], ["#E5E7EB", d.color]);
                  return (
                    <motion.div
                      key={d.key}
                      className="size-2 rounded-full"
                      style={{ background: dotBg, scale: dotScale }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
