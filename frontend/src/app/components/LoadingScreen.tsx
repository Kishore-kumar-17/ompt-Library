import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const SESSION_KEY = "pv_loading_shown";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const alreadyShown = typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1";
  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const skip = alreadyShown || reducedMotion;

  const [progress, setProgress] = useState(skip ? 100 : 0);
  const [visible, setVisible] = useState(!skip);
  const raf = useRef<number>(0);
  const start = useRef(Date.now());

  useEffect(() => {
    if (skip) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onComplete();
      return;
    }
    const MIN_MS = 2200;
    const tick = () => {
      const elapsed = Date.now() - start.current;
      const t = Math.min(1, elapsed / MIN_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      const pct = Math.round(eased * 100);
      setProgress(pct);
      if (pct < 100) {
        raf.current = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(SESSION_KEY, "1");
        setTimeout(() => setVisible(false), 300);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 40%, rgba(79,195,247,0.08) 0%, transparent 60%)",
            }}
          />

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-10 flex flex-col items-center"
          >
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.02em" }}>Prompt Bot</span>
            <div
              className="text-[#6b7280] text-center mt-2"
              style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Prompts that work
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative w-64 h-[3px] rounded-full bg-[#0a0a0a]/8 overflow-hidden"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-100"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #4FC3F7, #0a0a0a)",
              }}
            />
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-[#0a0a0a] font-mono"
            style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em" }}
          >
            {progress}%
          </motion.div>

          {/* Animated dots */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7]"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
