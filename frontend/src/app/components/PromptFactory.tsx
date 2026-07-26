import { useEffect, useRef, useState } from "react";
import { Search, BookOpen, PenLine, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#4FC3F7";
const NAV_HEIGHT = 64;

const MODULES = [
  { number: "01", title: "Discover", subtitle: "Find the right prompt.", icon: Search, hints: ["Search", "Tags", "Prompt Cards"], align: "left" as const },
  { number: "02", title: "Learn", subtitle: "Understand the framework.", icon: BookOpen, hints: ["Framework", "Checklist"], align: "left" as const },
  { number: "03", title: "Build", subtitle: "Customize your prompt.", icon: PenLine, hints: ["Variables", "Style", "Tone"], align: "right" as const },
];

const LAST_INDEX = MODULES.length;
const STEP_COUNT = 4;
const PATH_LENGTH = 1000;

const TRI_VB_W = 1120;
const TRI_VB_H = 580;
const TRI_POINTS = [
  { x: 390, y: 70 },
  { x: 390, y: 510 },
  { x: 790, y: 290 },
];
const TRI_CENTROID = {
  x: TRI_POINTS.reduce((s, p) => s + p.x, 0) / 3,
  y: TRI_POINTS.reduce((s, p) => s + p.y, 0) / 3,
};

const TRIANGLE_PATH = `M ${TRI_POINTS[0].x} ${TRI_POINTS[0].y} L ${TRI_POINTS[1].x} ${TRI_POINTS[1].y} L ${TRI_POINTS[2].x} ${TRI_POINTS[2].y} Z`;
const EDGE_DISCOVER_LEARN = `M ${TRI_POINTS[0].x} ${TRI_POINTS[0].y} L ${TRI_POINTS[1].x} ${TRI_POINTS[1].y}`;
const EDGE_LEARN_BUILD = `M ${TRI_POINTS[1].x} ${TRI_POINTS[1].y} L ${TRI_POINTS[2].x} ${TRI_POINTS[2].y}`;
const EDGE_BUILD_DISCOVER = `M ${TRI_POINTS[2].x} ${TRI_POINTS[2].y} L ${TRI_POINTS[0].x} ${TRI_POINTS[0].y}`;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function PromptFactory({ go }: { go: (p: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const edgeRefs = useRef<SVGPathElement[]>([]);
  const fillRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const activeRef = useRef(0);
  const completeRef = useRef(false);

  const [active, setActive] = useState(0);
  const [complete, setComplete] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateInteractive = () => {
      setInteractive(!motionQuery.matches && !mediaQuery.matches);
    };

    updateInteractive();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateInteractive);
      motionQuery.addEventListener("change", updateInteractive);
    } else {
      mediaQuery.addListener(updateInteractive);
      motionQuery.addListener(updateInteractive);
    }

    window.addEventListener("resize", updateInteractive);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateInteractive);
        motionQuery.removeEventListener("change", updateInteractive);
      } else {
        mediaQuery.removeListener(updateInteractive);
        motionQuery.removeListener(updateInteractive);
      }
      window.removeEventListener("resize", updateInteractive);
    };
  }, []);

  const jumpTo = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const targetProgress = (index + 0.2) / STEP_COUNT;
    const targetScroll = trigger.start + (trigger.end - trigger.start) * targetProgress;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  useEffect(() => {
    if (!interactive) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const setVisualProgress = (progress: number) => {
      const stageProgress = progress * STEP_COUNT;
      const cardReveal = (index: number) => {
        if (index === 0) return 1;
        return clamp01((stageProgress - index) * 2);
      };
      const edgeProgress = [
        clamp01(stageProgress),
        clamp01(stageProgress - 1),
        clamp01(stageProgress - 2),
      ];
      const ctaProgress = clamp01(stageProgress - 3);

      edgeRefs.current.forEach((edge, index) => {
        if (!edge) return;
        edge.style.strokeDashoffset = String(PATH_LENGTH * (1 - edgeProgress[index]));
      });

      if (fillRef.current) {
        fillRef.current.style.fillOpacity = String(ctaProgress);
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const reveal = cardReveal(index);
        card.style.opacity = String(reveal);
        card.style.transform = `scale(${0.85 + reveal * 0.15})`;
        card.style.pointerEvents = reveal > 0.02 ? "auto" : "none";
      });

      if (ctaRef.current) {
        ctaRef.current.style.opacity = String(ctaProgress);
        ctaRef.current.style.transform = `scale(${0.9 + ctaProgress * 0.1})`;
        ctaRef.current.style.pointerEvents = ctaProgress > 0.95 ? "auto" : "none";
      }

      const nextActive = Math.min(LAST_INDEX - 1, Math.floor(progress * (STEP_COUNT - 1)));
      if (activeRef.current !== nextActive) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }
      const nextComplete = ctaProgress >= 0.95;
      if (completeRef.current !== nextComplete) {
        completeRef.current = nextComplete;
        setComplete(nextComplete);
      }
    };

    gsap.set(edgeRefs.current, {
      strokeDasharray: PATH_LENGTH,
      strokeDashoffset: PATH_LENGTH,
    });
    gsap.set(cardRefs.current, { opacity: 0, scale: 0.85, transformOrigin: "center center" });
    gsap.set(ctaRef.current, { opacity: 0, scale: 0.9, transformOrigin: "center center" });
    setVisualProgress(0);

    const ctx = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: `top top+=${NAV_HEIGHT}`,
        end: () => `+=${window.innerHeight * STEP_COUNT}`,
        pin: stage,
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        fastScrollEnd: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => setVisualProgress(self.progress),
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      triggerRef.current = null;
      ctx.revert();
    };
  }, [interactive]);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[#0a0a0a]/10 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)" }}
    >
      {interactive ? (
        <div ref={stageRef} className="flex flex-col items-center justify-center w-full max-w-full overflow-hidden" style={{ minHeight: `calc(100vh - ${NAV_HEIGHT}px)` }}>
          <h2
            className="text-center mb-2 shrink-0 px-4"
            style={{ fontSize: "clamp(22px, 3.4vw, 40px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.035em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            From Idea to <span style={{ fontWeight: 800, color: ACCENT }}>Creation.</span>
          </h2>
          <p className="text-[#6b7280] text-center max-w-[560px] mx-auto mb-4 md:mb-6 shrink-0 px-4" style={{ fontSize: "clamp(12px, 1.3vw, 15px)", lineHeight: 1.5 }}>
            A complete workflow for turning ideas into exceptional AI results.
          </p>

          <div className="relative flex-1 min-h-0 w-full flex items-center justify-center" style={{ padding: "64px 0" }}>
            <div className="relative w-full" style={{ aspectRatio: `${TRI_VB_W} / ${TRI_VB_H}`, maxWidth: 1040, maxHeight: "100%" }}>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${TRI_VB_W} ${TRI_VB_H}`}>
                <path ref={fillRef} d={TRIANGLE_PATH} fill="#0a0a0a" stroke="none" style={{ fillOpacity: 0 }} />
                {[EDGE_DISCOVER_LEARN, EDGE_LEARN_BUILD, EDGE_BUILD_DISCOVER].map((edge, index) => (
                  <path
                    key={edge}
                    ref={(node) => {
                      if (node) edgeRefs.current[index] = node;
                    }}
                    d={edge}
                    fill="none"
                    stroke="#0a0a0a"
                    strokeWidth={9}
                    strokeLinecap="round"
                    pathLength={PATH_LENGTH}
                    style={{
                      strokeDasharray: PATH_LENGTH,
                      strokeDashoffset: PATH_LENGTH,
                      willChange: "stroke-dashoffset",
                    }}
                  />
                ))}
              </svg>

              {MODULES.map((m, i) => {
                const p = TRI_POINTS[i];
                const isActive = active === i;
                const isRevealed = i <= active;
                const isRight = m.align === "right";
                const leftPct = (p.x / TRI_VB_W) * 100;
                const topPct = (p.y / TRI_VB_H) * 100;
                return (
                  <div
                    key={m.number}
                    className="absolute flex items-center gap-5"
                    style={
                      isRight
                        ? { left: `calc(${leftPct}% - 28px)`, top: `${topPct}%`, transform: "translateY(-50%)" }
                        : { right: `calc(${100 - leftPct}% - 28px)`, top: `${topPct}%`, transform: "translateY(-50%)" }
                    }
                  >
                    <div
                      ref={(node) => {
                        if (node) cardRefs.current[i] = node;
                      }}
                      className={`flex items-center gap-5 ${isRevealed ? "cursor-pointer" : ""}`}
                      style={{ opacity: 0, transform: "scale(0.85)", transformOrigin: "center center", willChange: "opacity, transform" }}
                      onClick={() => jumpTo(i)}
                      role="button"
                      tabIndex={isRevealed ? 0 : -1}
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`Jump to ${m.title}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          jumpTo(i);
                        }
                      }}
                    >
                      {!isRight && <ModuleCard m={m} isActive={isActive} complete={complete} />}
                      <IconNode Icon={m.icon} isActive={isActive} />
                      {isRight && <ModuleCard m={m} isActive={isActive} complete={complete} />}
                    </div>
                  </div>
                );
              })}

              <div
                className="absolute"
                style={{
                  left: `${(TRI_CENTROID.x / TRI_VB_W) * 100}%`,
                  top: `${(TRI_CENTROID.y / TRI_VB_H) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <button
                  ref={ctaRef}
                  onClick={() => go("builder")}
                  className="inline-flex items-center gap-2 text-white rounded-full px-6 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  style={{
                    background: ACCENT,
                    fontSize: 15,
                    fontWeight: 600,
                    boxShadow: `0 12px 32px ${ACCENT}66`,
                    opacity: 0,
                    pointerEvents: "none",
                    transform: "scale(0.9)",
                    transformOrigin: "center center",
                    willChange: "opacity, transform",
                  }}
                >
                  Start Creating <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 md:py-28 max-w-full overflow-hidden">
          <h2
            className="text-center mb-3 px-2"
            style={{ fontSize: "clamp(24px, 4.5vw, 48px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.035em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            From Idea to <span style={{ fontWeight: 800, color: ACCENT }}>Creation.</span>
          </h2>
          <p className="text-[#6b7280] text-center max-w-[560px] mx-auto mb-10 md:mb-20 px-2" style={{ fontSize: "clamp(13px, 1.6vw, 18px)", lineHeight: 1.6 }}>
            A complete workflow for turning ideas into exceptional AI results.
          </p>
          <div className="relative w-full max-w-[560px] mx-auto flex flex-col gap-8 sm:gap-16">
            <div className="absolute left-6 sm:left-7 top-6 sm:top-7 bottom-6 sm:bottom-7 w-1 rounded-full bg-[#0a0a0a]/8" />
            {MODULES.map((m) => (
              <div key={m.number} className="relative flex items-center gap-3 sm:gap-5 w-full">
                <IconNode Icon={m.icon} isActive />
                <ModuleCard m={m} isActive />
              </div>
            ))}
            <div className="flex justify-center mt-2 sm:mt-4">
              <button
                onClick={() => go("builder")}
                className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white rounded-full px-6 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2"
                style={{ fontSize: 15, fontWeight: 600 }}
              >
                Start Creating <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function IconNode({ Icon, isActive }: { Icon: any; isActive: boolean }) {
  return (
    <div className="relative z-10 shrink-0 flex items-center justify-center">
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 bg-white transition-colors"
        style={{ borderColor: isActive ? ACCENT : "rgba(10,10,10,0.15)" }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: isActive ? ACCENT : "#6b7280" }} />
      </div>
    </div>
  );
}

function ModuleCard({ m, isActive, complete }: { m: (typeof MODULES)[number]; isActive: boolean; complete?: boolean }) {
  return (
    <div
      className="bg-white rounded-2xl border p-4 sm:p-6 text-left transition-[border-color,box-shadow] duration-300 flex-1 min-w-0 max-w-[280px] sm:max-w-none sm:w-[260px]"
      style={{
        borderColor: complete || isActive ? ACCENT : "rgba(10,10,10,0.1)",
        boxShadow: complete
          ? `0 0 0 1.5px ${ACCENT}, 0 0 28px 4px ${ACCENT}70, 0 16px 40px rgba(79,195,247,0.3)`
          : isActive
            ? `0 0 0 1px ${ACCENT}, 0 16px 40px rgba(79,195,247,0.26)`
            : "0 1px 2px rgba(10,10,10,0.04)",
        transitionDelay: complete ? "120ms" : "0ms",
      }}
    >
      <div className="flex items-baseline gap-2 mb-1.5 sm:mb-2">
        <span className="text-[12px] sm:text-[13px] text-[#6b7280] font-mono">{m.number}</span>
        <span className="text-[17px] sm:text-[20px]" style={{ fontWeight: 700 }}>{m.title}</span>
      </div>
      <div className="text-[13px] sm:text-[14px] text-[#6b7280] mb-2.5 sm:mb-3">{m.subtitle}</div>
      <div className="flex flex-wrap gap-1 sm:gap-1.5">
        {m.hints.map((h) => (
          <span
            key={h}
            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-[12px] border"
            style={{ borderColor: isActive ? `${ACCENT}55` : "rgba(10,10,10,0.12)", color: isActive ? "#0a0a0a" : "#6b7280" }}
          >
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}
