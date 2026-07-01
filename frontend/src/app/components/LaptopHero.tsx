import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import laptopImg from "../../imports/ChatGPT_Image_Apr_25,_2026,_02_32_36_PM.png";

/* ─────────────────────────────────────────────────────────────────────────────
  EXACT screen-corner coordinates from promptvault001.html
  (as fractions of the scene's rendered width × height)
  tl = top-left, tr = top-right, bl = bottom-left, br = bottom-right
────────────────────────────────────────────────────────────────────────────── */
const QUAD = {
  tl: [0.1472, 0.1191] as [number, number],
  tr: [0.8150, 0.1572] as [number, number],
  bl: [0.2176, 0.8799] as [number, number],
  br: [0.9068, 0.8154] as [number, number],
};

/* ── Homography math (ported 1-to-1 from the HTML's JS) ──────────────────── */
function gaussSolve(A: number[][], b: number[]): number[] {
  const n = A.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let k = 0; k < n; k++) {
    let mx = Math.abs(M[k][k]), p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > mx) { mx = Math.abs(M[i][k]); p = i; }
    if (p !== k) [M[k], M[p]] = [M[p], M[k]];
    for (let i = k + 1; i < n; i++) {
      const f = M[i][k] / M[k][k];
      for (let j = k; j <= n; j++) M[i][j] -= f * M[k][j];
    }
  }
  const x = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    let s = M[i][n];
    for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j];
    x[i] = s / M[i][i];
  }
  return x;
}

function computeHomography(
  src: [number, number][],
  dst: [number, number][]
): number[] {
  const A: number[][] = [], b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i], [X, Y] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -x * X, -y * X]);
    A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y]);
    b.push(X); b.push(Y);
  }
  const h = gaussSolve(A, b);
  return [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];
}

function toMatrix3d(H: number[]): string {
  const [a, c, e, b, d, f, g, h] = H;
  return [a, b, 0, g, c, d, 0, h, 0, 0, 1, 0, e, f, 0, 1]
    .map(v => v.toFixed(8)).join(",");
}

/* ── Types & data ─────────────────────────────────────────────────────────── */
type Mode = "image" | "video" | "text" | "content" | "code" | "compare";

interface TabCfg {
  id: Mode;
  label: string;
  url: string;
  prompt: string;
  type: "image" | "text" | "code";
  src?: string;
  badge?: string;
  content?: string;
}

const TAB_DATA: Record<Mode, TabCfg> = {
  image: {
    id: "image", label: "Image", url: "image",
    prompt: "A cinematic event poster, dramatic rim lighting, bold typography - ar 2:3",
    type: "image",
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
    badge: "Playing preview",
  },
  video: {
    id: "video", label: "Video", url: "video",
    prompt: "A 5-second cinematic loop of a stadium crowd at golden hour, slow motion, lens flare - 24fps, ar 16:9",
    type: "image",
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    badge: "Playing preview",
  },
  text: {
    id: "text", label: "Text", url: "text",
    prompt: "Write a launch announcement for a sold-out festival - punchy, cinematic, under 80 words",
    type: "text",
    content: `<strong style="color:#fff;font-size:1.4cqw;display:block;margin-bottom:3%">Generated copy</strong>
<p style="margin:0 0 3% 0">Under a sky split open by sound, ten thousand voices became one. The lights weren't a show - they were a verdict.</p>
<p style="margin:0 0 3% 0">Confetti fell like punctuation on a sentence the night had been writing for hours.</p>
<p style="margin:0;opacity:0.7">- 3 variations generated · cinematic tone · 64 words</p>`,
  },
  content: {
    id: "content", label: "Content", url: "content",
    prompt: "Generate a campaign brief for a festival poster - headline, subhead, CTA, tone, format",
    type: "text",
    content: `<strong style="color:#fff;font-size:1.4cqw;display:block;margin-bottom:3%">Content brief</strong>
<p style="margin:0 0 2% 0"><strong style="color:#fff">Headline:</strong> The Night Was Always Going To Be This Loud</p>
<p style="margin:0 0 2% 0"><strong style="color:#fff">Subhead:</strong> One stage. Ten thousand reasons.</p>
<p style="margin:0 0 2% 0"><strong style="color:#fff">CTA:</strong> Get tickets before the lights go up</p>
<p style="margin:0 0 2% 0"><strong style="color:#fff">Tone:</strong> Cinematic, urgent, communal</p>
<p style="margin:0;opacity:0.7"><strong style="color:#fff">Format:</strong> 2:3 poster · social cut-down available</p>`,
  },
  code: {
    id: "code", label: "Code", url: "code",
    prompt: "Generate the API call to create this prompt programmatically - JSON schema + fetch example",
    type: "code",
    content: `// Generated prompt schema
{
  "prompt": "A cinematic event poster, dramatic rim lighting",
  "params": {
    "aspect_ratio": "2:3",
    "style": "cinematic",
    "lighting": "rim",
    "typography": "bold-display"
  },
  "model": "image-v3",
  "seed": 4821
}

// API call
fetch("https://api.promptvault.app/v1/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});`,
  },
  compare: {
    id: "compare", label: "Compare", url: "compare",
    prompt: "Compare two poster variations - one warm orange, one cool blue - ar 2:3, side by side",
    type: "image",
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80",
    badge: "A / B preview",
  },
};

const MODES: Mode[] = ["image", "video", "text", "content", "code", "compare"];

/* ── Tab SVG icons (from the HTML) ───────────────────────────────────────── */
const TAB_ICONS: Record<Mode, React.ReactNode> = {
  image: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.3cqw", height: "1.3cqw", minWidth: 12, minHeight: 12, flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="m21 15-5-5L5 21"/>
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.3cqw", height: "1.3cqw", minWidth: 12, minHeight: 12, flexShrink: 0 }}>
      <path d="m22 8-6 4 6 4V8Z"/>
      <rect x="2" y="6" width="14" height="12" rx="2"/>
    </svg>
  ),
  text: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.3cqw", height: "1.3cqw", minWidth: 12, minHeight: 12, flexShrink: 0 }}>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="15" y2="12"/>
      <line x1="3" y1="18" x2="18" y2="18"/>
    </svg>
  ),
  content: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.3cqw", height: "1.3cqw", minWidth: 12, minHeight: 12, flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <line x1="9" y1="3" x2="9" y2="21"/>
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.3cqw", height: "1.3cqw", minWidth: 12, minHeight: 12, flexShrink: 0 }}>
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  compare: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.3cqw", height: "1.3cqw", minWidth: 12, minHeight: 12, flexShrink: 0 }}>
      <rect x="3" y="3" width="7" height="18" rx="1"/>
      <rect x="14" y="3" width="7" height="18" rx="1"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────────────────────
  MAIN COMPONENT
────────────────────────────────────────────────────────────────────────────── */
export function LaptopHero() {
  const [activeTab, setActiveTab] = useState<Mode>("image");
  const [hoveredTab, setHoveredTab] = useState<Mode>("image");
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [flash, setFlash] = useState(false);
  const [projStyle, setProjStyle] = useState<React.CSSProperties>({ opacity: 0, position: "absolute" });

  const sceneRef = useRef<HTMLDivElement>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayTab = hoveredTab; // what the UI is currently showing
  const cfg = TAB_DATA[displayTab];

  /* ── Compute + apply homographic projection ─────────────────────────────── */
  const updateProjection = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const W = scene.clientWidth, H = scene.clientHeight;
    if (!W || !H) return;

    const tl: [number, number] = [QUAD.tl[0] * W, QUAD.tl[1] * H];
    const tr: [number, number] = [QUAD.tr[0] * W, QUAD.tr[1] * H];
    const bl: [number, number] = [QUAD.bl[0] * W, QUAD.bl[1] * H];
    const br: [number, number] = [QUAD.br[0] * W, QUAD.br[1] * H];

    const corners = [tl, tr, bl, br];
    const xMin = Math.min(...corners.map(c => c[0]));
    const yMin = Math.min(...corners.map(c => c[1]));
    const xMax = Math.max(...corners.map(c => c[0]));
    const yMax = Math.max(...corners.map(c => c[1]));
    const bw = xMax - xMin, bh = yMax - yMin;

    const src: [number, number][] = [[0, 0], [bw, 0], [0, bh], [bw, bh]];
    const dst: [number, number][] = corners.map(c => [c[0] - xMin, c[1] - yMin] as [number, number]);

    const Hm = computeHomography(src, dst);
    const matrix = toMatrix3d(Hm);

    setProjStyle({
      position: "absolute",
      left: xMin,
      top: yMin,
      width: bw,
      height: bh,
      transform: `matrix3d(${matrix})`,
      transformOrigin: "0 0",
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    updateProjection();
    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(updateProjection)
      : null;
    if (ro && sceneRef.current) ro.observe(sceneRef.current);
    window.addEventListener("resize", updateProjection);
    // Extra passes to catch async image decode
    const t1 = setTimeout(updateProjection, 100);
    const t2 = setTimeout(updateProjection, 500);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", updateProjection);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, [updateProjection]);

  /* ── Card flash animation ────────────────────────────────────────────────── */
  const triggerFlash = () => {
    setFlash(false);
    requestAnimationFrame(() => {
      setFlash(true);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlash(false), 320);
    });
  };

  const handleTabHover = (id: Mode) => {
    if (id === hoveredTab) return;
    setHoveredTab(id);
    triggerFlash();
  };

  const handleTabLeave = () => {
    if (hoveredTab !== activeTab) {
      setHoveredTab(activeTab);
      triggerFlash();
    }
  };

  const handleTabClick = (id: Mode) => {
    setActiveTab(id);
    setHoveredTab(id);
  };

  const handleRun = () => {
    if (running) return;
    setRunning(true);
    setTimeout(() => setRunning(false), 1400);
  };

  const handleCopy = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <section style={{
      background: "#FFFFFF",
      padding: "20px 24px 0px",
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      WebkitFontSmoothing: "antialiased",
      overflow: "hidden",
    }}>
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto 12px" }}>
        <h1 style={{
          fontSize: "clamp(20px, 3vw, 38px)",
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          margin: "0 0 8px",
          color: "#0F0F12",
          whiteSpace: "nowrap",
        }}>
          See how{" "}
          <span style={{ color: "#4FC3F7" }}>prompts</span>{" "}
          become{" "}
          <span style={{ color: "#4FC3F7" }}>products.</span>
        </h1>
        <p style={{
          fontSize: "clamp(13px, 1.2vw, 15px)",
          color: "#5C5C66",
          margin: 0,
          fontWeight: 500,
        }}>
          Pick a discipline - we&rsquo;ll run a real prompt through it.
        </p>
      </div>

      {/* ── Stage ─────────────────────────────────────────────────────────── */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/*
          Scene: the laptop image fills this div via backgroundSize 100% 100%.
          Aspect ratio matches the original image dimensions from the HTML (1535×1024).
          width = min(full container, height-constrained width) ensures the scene
          never exceeds the remaining viewport height.
        */}
        <div
          ref={sceneRef}
          style={{
            position: "relative",
            width: `min(100%, calc((100vh - 175px) * ${(1535 / 1024).toFixed(6)}))`,
            maxWidth: 1280,
            aspectRatio: "1535 / 1024",
            backgroundImage: `url(${laptopImg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "multiply",
          }}
        >
          {/* ── Screen projection ── homography-warped flat UI ───────────── */}
          <div style={projStyle}>
            {/*
              screen-canvas: the flat, rectangular UI that gets matrix3d-warped
              container-type: inline-size enables cqw units throughout
            */}
            <div style={{
              width: "100%",
              height: "100%",
              background: "#FFFFFF",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              // @ts-ignore - container-type is a modern CSS prop
              containerType: "inline-size",
            }}>

              {/* ── Browser chrome ──────────────────────────────────────── */}
              <div style={{
                flex: "0 0 auto",
                height: "6.5%",
                minHeight: 32,
                background: "#F4F1F8",
                display: "flex",
                alignItems: "center",
                padding: "0 1.4%",
                borderBottom: "1px solid #ECEAF1",
                gap: "1.4%",
              }}>
                {/* Traffic lights */}
                <div style={{ display: "flex", gap: "0.6cqw" }}>
                  {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((c, i) => (
                    <span key={i} style={{
                      display: "block",
                      width: "1.05cqw", height: "1.05cqw",
                      minWidth: 8, minHeight: 8,
                      borderRadius: "50%",
                      background: c,
                    }} />
                  ))}
                </div>

                {/* URL bar */}
                <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={cfg.url}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #ECEAF1",
                        borderRadius: "999px",
                        padding: "0.45cqw 1.4cqw 0.45cqw 1cqw",
                        fontSize: "1.1cqw",
                        color: "#5C5C66",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5cqw",
                        minWidth: "24%",
                        justifyContent: "center",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}>
                      <span style={{ color: "#4FC3F7", lineHeight: 1 }}>★</span>
                      <span style={{ color: "#0F0F12", fontWeight: 600 }}>promptvault.app</span>
                      <span style={{ color: "#9A9AA3" }}>/</span>
                      <span>{cfg.url}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right dots (Google-style) */}
                <div style={{ display: "flex", gap: "0.5cqw" }}>
                  {(["#4285F4", "#FBBC05", "#EA4335"] as const).map((c, i) => (
                    <span key={i} style={{
                      display: "block",
                      width: "0.95cqw", height: "0.95cqw",
                      minWidth: 7, minHeight: 7,
                      borderRadius: "50%",
                      background: c,
                    }} />
                  ))}
                </div>
              </div>

              {/* ── Body (left + right + tabs) ────────────────────────────── */}
              <div style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "36% 1fr",
                gridTemplateRows: "1fr auto",
                minHeight: 0,
              }}>

                {/* ── LEFT: PROMPT + card + actions ─────────────────────── */}
                <div style={{
                  gridRow: 1, gridColumn: 1,
                  padding: "3% 2.5% 0 2.5%",
                  background: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  {/* PROMPT label */}
                  <div style={{
                    fontSize: "1.05cqw",
                    letterSpacing: "0.18em",
                    fontWeight: 700,
                    color: "#9A9AA3",
                    textTransform: "uppercase",
                    marginBottom: "4%",
                  }}>PROMPT</div>

                  {/* Prompt card */}
                  <div style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(236,234,241,0.8)",
                    borderRadius: "1.8cqw",
                    padding: "3cqw 3.2cqw 3.2cqw",
                    boxShadow: flash
                      ? "0 24px 50px -16px rgba(94,32,224,0.35), 0 0 0 2px rgba(94,32,224,0.18), 0 4px 12px rgba(20,12,50,0.1)"
                      : "0 18px 40px -16px rgba(20,12,50,0.22), 0 4px 10px rgba(20,12,50,0.06)",
                    width: "115%",
                    marginLeft: "-12%",
                    transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
                    transform: flash ? "scale(1.025)" : "scale(1)",
                  }}>
                    {/* Opening quote */}
                    <span style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "4.5cqw",
                      color: "#0F0F12",
                      lineHeight: 0.5,
                      display: "block",
                      marginBottom: "1.2cqw",
                    }}>&ldquo;</span>

                    {/* Prompt text */}
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={displayTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          margin: 0,
                          fontSize: "1.55cqw",
                          lineHeight: 1.45,
                          fontWeight: 600,
                          color: "#0F0F12",
                        }}>
                        {cfg.prompt}
                      </motion.p>
                    </AnimatePresence>

                    {/* Closing quote */}
                    <span style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "4.5cqw",
                      color: "#0F0F12",
                      lineHeight: 0.5,
                      display: "block",
                      textAlign: "right",
                      marginTop: "0.5cqw",
                    }}>&rdquo;</span>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: "0.9cqw", marginTop: "2cqw" }}>
                    {/* Run button - yellow */}
                    <button
                      onClick={handleRun}
                      disabled={running}
                      style={{
                        background: "#4FC3F7",
                        color: "#0F0F12",
                        border: "none",
                        borderRadius: "0.85cqw",
                        padding: "1cqw 2cqw",
                        fontFamily: "inherit",
                        fontSize: "1.3cqw",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.6cqw",
                        cursor: running ? "not-allowed" : "pointer",
                        opacity: running ? 0.7 : 1,
                        boxShadow: "0 1px 2px rgba(20,12,50,0.08)",
                        whiteSpace: "nowrap",
                        transition: "background 0.15s",
                      }}>
                      {running ? (
                        <span style={{
                          display: "inline-block",
                          width: "1.3cqw", height: "1.3cqw",
                          minWidth: 11, minHeight: 11,
                          border: "0.15cqw solid rgba(15,15,18,0.3)",
                          borderTopColor: "#0F0F12",
                          borderRadius: "50%",
                          animation: "lvSpin 0.8s linear infinite",
                        }} />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.3cqw", height: "1.3cqw", minWidth: 11 }}>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                      {running ? "Running…" : "Run"}
                    </button>

                    {/* Copy button - white / outlined */}
                    <button
                      onClick={handleCopy}
                      style={{
                        background: copied ? "#E8F5EC" : "#FFFFFF",
                        color: copied ? "#0F7B3F" : "#0F0F12",
                        border: `1px solid ${copied ? "#BFE3CB" : "#E2E0E8"}`,
                        borderRadius: "0.85cqw",
                        padding: "1cqw 2cqw",
                        fontFamily: "inherit",
                        fontSize: "1.3cqw",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.6cqw",
                        cursor: "pointer",
                        boxShadow: "0 1px 2px rgba(20,12,50,0.08)",
                        whiteSpace: "nowrap",
                        transition: "background 0.15s, color 0.15s, border-color 0.15s",
                      }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                        style={{ width: "1.3cqw", height: "1.3cqw", minWidth: 11 }}>
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* ── RIGHT: Preview panel ───────────────────────────────── */}
                <div style={{
                  gridRow: 1, gridColumn: 2,
                  padding: "3% 3% 0 0",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                }}>
                  <div style={{
                    position: "relative",
                    flex: 1,
                    borderRadius: 14,
                    overflow: "hidden",
                    background: "#0A0A0F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 0,
                  }}>
                    {running ? (
                      /* Spinner */
                      <div style={{
                        width: "4cqw", height: "4cqw",
                        border: "0.3cqw solid rgba(255,255,255,0.15)",
                        borderTopColor: "#FFFFFF",
                        borderRadius: "50%",
                        animation: "lvSpin 0.8s linear infinite",
                      }} />
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={displayTab + (running ? "spin" : "content")}
                          initial={{ opacity: 0, scale: 1.02 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>

                          {cfg.type === "image" && (
                            <>
                              <img
                                src={cfg.src}
                                alt="Preview"
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                              />
                              <div style={{
                                position: "absolute",
                                bottom: "4%", left: "3%",
                                background: "rgba(0,0,0,0.55)",
                                backdropFilter: "blur(8px)",
                                WebkitBackdropFilter: "blur(8px)",
                                color: "#FFF",
                                padding: "0.55cqw 1.1cqw 0.55cqw 0.9cqw",
                                borderRadius: "999px",
                                fontSize: "1cqw",
                                fontWeight: 500,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.4cqw",
                              }}>
                                {/* Play triangle */}
                                <span style={{
                                  display: "inline-block",
                                  width: 0, height: 0,
                                  borderStyle: "solid",
                                  borderWidth: "0.35cqw 0 0.35cqw 0.55cqw",
                                  borderColor: "transparent transparent transparent #FFFFFF",
                                }} />
                                {cfg.badge}
                              </div>
                            </>
                          )}

                          {cfg.type === "text" && (
                            <div
                              dangerouslySetInnerHTML={{ __html: cfg.content! }}
                              style={{
                                color: "#E8E8EE",
                                padding: "4% 4.5%",
                                fontSize: "1.2cqw",
                                lineHeight: 1.7,
                                width: "100%", height: "100%",
                                overflowY: "auto",
                                boxSizing: "border-box",
                              }}
                            />
                          )}

                          {cfg.type === "code" && (
                            <pre style={{
                              color: "#C8E1FF",
                              padding: "3.5% 4%",
                              fontSize: "1.1cqw",
                              lineHeight: 1.65,
                              width: "100%", height: "100%",
                              overflowY: "auto",
                              fontFamily: "'SF Mono', Menlo, Monaco, Consolas, monospace",
                              whiteSpace: "pre-wrap",
                              boxSizing: "border-box",
                              margin: 0,
                            }}>
                              {cfg.content}
                            </pre>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </div>

                {/* ── TAB BAR ───────────────────────────────────────────── */}
                <div
                  onMouseLeave={handleTabLeave}
                  style={{
                    gridRow: 2,
                    gridColumn: "1 / -1",
                    display: "flex",
                    gap: "0.6cqw",
                    justifyContent: "center",
                    padding: "1.5% 3% 1.8%",
                    borderTop: "1px solid #ECEAF1",
                    background: "#FFFFFF",
                  }}>
                  {MODES.map(m => {
                    const isActive = activeTab === m;
                    return (
                      <button
                        key={m}
                        onMouseEnter={() => handleTabHover(m)}
                        onClick={() => handleTabClick(m)}
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: "0.9cqw 1.2cqw 1.1cqw",
                          fontFamily: "inherit",
                          fontSize: "1.2cqw",
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? "#0F0F12" : "#5C5C66",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.55cqw",
                          cursor: "pointer",
                          borderBottom: `2px solid ${isActive ? "#4FC3F7" : "transparent"}`,
                          marginBottom: -1,
                          whiteSpace: "nowrap",
                          transition: "color 0.15s, border-color 0.15s",
                        }}>
                        {TAB_ICONS[m]}
                        {TAB_DATA[m].label}
                      </button>
                    );
                  })}
                </div>

              </div>{/* end body grid */}
            </div>{/* end screen-canvas */}
          </div>{/* end screen-projection */}
        </div>{/* end scene */}
      </div>{/* end stage */}

      {/* Keyframes for spinner */}
      <style>{`@keyframes lvSpin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}