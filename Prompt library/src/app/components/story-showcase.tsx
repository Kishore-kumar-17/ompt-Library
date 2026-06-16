import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import frame1Video from "../../imports/Frame_1.mp4";
import frame2Video from "../../imports/Frame_2.mp4";
import frame3Video from "../../imports/Frame_3.mp4";

const ACCENT = "#7C3AED";

type Step = {
  num: string;
  key: string;
  name: string;
  headline: string;
  description: string[];
  benefits: string[];
};

const STEPS: Step[] = [
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

// One step's activation curve: 0 → 1 → 0, with the first holding at 1 from the
// top and the last holding at 1 to the bottom so the section never goes blank.
function useStepProgress(
  scrollYProgress: MotionValue<number>,
  index: number,
  count: number,
) {
  const w = 1 / count;
  const start = index * w;
  const end = start + w;
  const ramp = w * 0.22;
  const peakStart = start + ramp;
  const peakEnd = end - ramp;
  const isFirst = index === 0;
  const isLast = index === count - 1;
  if (isFirst) {
    return useTransform(scrollYProgress, [0, peakEnd, end], [1, 1, 0]);
  }
  if (isLast) {
    return useTransform(scrollYProgress, [start, peakStart, 1], [0, 1, 1]);
  }
  return useTransform(
    scrollYProgress,
    [start, peakStart, peakEnd, end],
    [0, 1, 1, 0],
  );
}

function NavItem({ step, progress }: { step: Step; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 1], [0.32, 1]);
  const x = useTransform(progress, [0, 1], [0, 6]);
  const nameSize = useTransform(progress, [0, 1], [18, 26]);
  const nameWeight = useTransform(progress, [0, 1], [400, 600]);
  const color = useTransform(progress, [0, 1], ["#9CA3AF", ACCENT]);
  const barScale = useTransform(progress, [0, 1], [0, 1]);
  const numColor = useTransform(progress, [0, 1], ["#C4C4C4", ACCENT]);

  return (
    <motion.div className="flex items-center gap-4" style={{ opacity, x }}>
      <motion.span
        className="block w-[3px] rounded-full"
        style={{ height: 28, background: ACCENT, scaleY: barScale, originY: 0.5 }}
      />
      <motion.span style={{ fontSize: 13, letterSpacing: 1, color: numColor }}>
        {step.num}
      </motion.span>
      <motion.span style={{ fontSize: nameSize, fontWeight: nameWeight, color, letterSpacing: -0.4 }}>
        {step.name}
      </motion.span>
    </motion.div>
  );
}

function LeftFrame({ step, progress }: { step: Step; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.4, 0.6, 1], [0, 0, 1, 1]);
  const y = useTransform(progress, [0.4, 1], [18, 0]);
  return (
    <motion.div className="absolute inset-x-0 top-0" style={{ opacity, y }}>
      <h3
        className="text-neutral-900"
        style={{ fontSize: "clamp(26px, 2.6vw, 38px)", lineHeight: 1.12, letterSpacing: -1 }}
      >
        {step.headline}
      </h3>
      {step.description.map((d) => (
        <p key={d} className="mt-4 text-neutral-600" style={{ fontSize: 15, lineHeight: 1.6 }}>
          {d}
        </p>
      ))}
      <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3">
        {step.benefits.map((b) => (
          <div key={b} className="flex items-center gap-2.5">
            <span
              className="flex size-5 items-center justify-center rounded-full"
              style={{ background: `${ACCENT}1A`, color: ACCENT }}
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span className="text-neutral-700" style={{ fontSize: 13.5 }}>
              {b}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FrameShell({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [0, 0.45, 0.55, 1], [0, 0, 1, 1]);
  const y = useTransform(progress, [0.45, 1], [28, 0]);
  const scale = useTransform(progress, [0.45, 1], [0.97, 1]);
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, y, scale }}
    >
      {children}
    </motion.div>
  );
}

function DiscoverFrame({ progress }: { progress: MotionValue<number> }) {
  return <FramedVideo src={frame1Video} path="promptvault.app/discover" progress={progress} />;
}

function LearnFrame({ progress }: { progress: MotionValue<number> }) {
  return (
    <FramedVideo
      src={frame2Video}
      path="promptvault.app/learn"
      progress={progress}
      widthClass="max-w-[760px]"
    />
  );
}

// A looping product video inside a browser-window frame. It only plays while
// its step is the active one (progress past the midpoint) and pauses otherwise.
function FramedVideo({
  src,
  path,
  progress,
  widthClass = "max-w-[600px]",
}: {
  src: string;
  path: string;
  progress: MotionValue<number>;
  widthClass?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const apply = (v: number) => {
      const el = videoRef.current;
      if (!el) return;
      if (v > 0.5) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    };
    apply(progress.get());
    return progress.on("change", apply);
  }, [progress]);

  return (
    <div
      className={`w-full ${widthClass} overflow-hidden rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl`}
      style={{ boxShadow: "0 40px 90px -35px rgba(76,29,149,0.30), 0 1px 0 rgba(255,255,255,0.9) inset" }}
    >
      <div className="flex items-center gap-3 border-b border-neutral-200/70 bg-white/70 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto flex w-[55%] max-w-[300px] items-center justify-center gap-2 rounded-full border border-neutral-200/80 bg-neutral-50/80 px-3 py-1 text-neutral-500">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <span style={{ fontSize: 11 }}>{path}</span>
        </div>
        <div className="w-[46px]" />
      </div>
      <div className="relative w-full bg-neutral-100">
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

function CreateFrame({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="flex w-full max-w-[760px] flex-col gap-4">
      <FramedVideo
        src={frame3Video}
        path="promptvault.app/create"
        progress={progress}
        widthClass="max-w-[760px]"
      />
      <div
        className="flex items-center justify-between gap-4 rounded-3xl p-5 text-white"
        style={{
          background: `linear-gradient(150deg, ${ACCENT} 0%, #5B21B6 100%)`,
          boxShadow: `0 30px 60px -28px ${ACCENT}88`,
        }}
      >
        <div>
          <div style={{ fontSize: 17, letterSpacing: -0.3 }}>Start Creating</div>
          <div className="mt-1 text-white/80" style={{ fontSize: 13, lineHeight: 1.4 }}>
            Build faster with PromptVault.
          </div>
        </div>
        <button
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 transition-transform hover:scale-[1.03]"
          style={{ color: ACCENT, fontSize: 13 }}
        >
          Explore Prompt Library
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function StoryShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const p0 = useStepProgress(scrollYProgress, 0, STEPS.length);
  const p1 = useStepProgress(scrollYProgress, 1, STEPS.length);
  const p2 = useStepProgress(scrollYProgress, 2, STEPS.length);
  const progresses = [p0, p1, p2];

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: "320vh",
        background: "linear-gradient(180deg, #F4F0FF 0%, #FBF9FF 45%, #FFFFFF 100%)",
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, #EDE4FF 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 bottom-0 size-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, #FFE9D6 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto flex h-full max-w-[1320px] items-center gap-10 px-8">
          {/* LEFT — sticky nav + copy (35%) */}
          <div className="relative flex flex-col justify-center" style={{ flexBasis: "35%" }}>
            <div className="mb-9 flex flex-col gap-4">
              {STEPS.map((s, i) => (
                <NavItem key={s.key} step={s} progress={progresses[i]} />
              ))}
            </div>
            <div className="relative min-h-[280px]">
              {STEPS.map((s, i) => (
                <LeftFrame key={s.key} step={s} progress={progresses[i]} />
              ))}
            </div>
          </div>

          {/* RIGHT — scroll-activated frames (65%) */}
          <div className="relative h-full flex-1" style={{ flexBasis: "65%" }}>
            <FrameShell progress={p0}>
              <DiscoverFrame progress={p0} />
            </FrameShell>
            <FrameShell progress={p1}>
              <LearnFrame progress={p1} />
            </FrameShell>
            <FrameShell progress={p2}>
              <CreateFrame progress={p2} />
            </FrameShell>
          </div>
        </div>
      </div>
    </section>
  );
}
