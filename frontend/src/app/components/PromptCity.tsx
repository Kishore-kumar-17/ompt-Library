import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './PromptCity.css';

const STAGE_W = 1536;
const STAGE_H = 1024;
const CENTER = { x: 768, y: 512 };
const ZOOM = 1.42;

interface District {
  id: string;
  name: string;
  emoji: string;
  color: string;
  deep: string;
  rgb: string;
  count: string;
  blurb: string;
  trending: string[];
  rect: { x: number; y: number; w: number; h: number };
  center: { x: number; y: number };
  glowR: number;
  ringR: number;
  card: { x: number; y: number };
}

const DISTRICTS: District[] = [
  {
    id: 'image', name: 'Image District', emoji: '🎨',
    color: '#8B5CF6', deep: '#6D28D9', rgb: '124,58,237',
    count: '12,450', blurb: 'Visual creativity & image generation',
    trending: ['Ghibli Style', 'Product Photography', 'Poster Design', 'Cinematic Portraits'],
    rect: { x: 430, y: 36, w: 624, h: 332 },
    center: { x: 748, y: 206 },
    glowR: 300, ringR: 232,
    card: { x: 92, y: 60 },
  },
  {
    id: 'video', name: 'Video District', emoji: '🎬',
    color: '#F0463E', deep: '#DC2626', rgb: '239,68,68',
    count: '8,920', blurb: 'Video generation & filmmaking',
    trending: ['Cinematic B-Roll', 'Explainer Videos', 'VFX Compositing', 'Music Visualizers'],
    rect: { x: 978, y: 228, w: 544, h: 360 },
    center: { x: 1252, y: 410 },
    glowR: 300, ringR: 236,
    card: { x: 1158, y: 132 },
  },
  {
    id: 'website', name: 'Website District', emoji: '🌐',
    color: '#3B82F6', deep: '#2563EB', rgb: '37,99,235',
    count: '6,780', blurb: 'Website creation & UI design',
    trending: ['Landing Pages', 'SaaS Dashboards', 'Design Systems', 'Framer Layouts'],
    rect: { x: 820, y: 596, w: 600, h: 384 },
    center: { x: 1118, y: 792 },
    glowR: 300, ringR: 244,
    card: { x: 1160, y: 690 },
  },
  {
    id: 'code', name: 'Code District', emoji: '💻',
    color: '#20B257', deep: '#15803D', rgb: '22,163,74',
    count: '9,410', blurb: 'Programming & software development',
    trending: ['React Components', 'Python Scripts', 'SQL Queries', 'API Design'],
    rect: { x: 78, y: 596, w: 600, h: 376 },
    center: { x: 384, y: 788 },
    glowR: 300, ringR: 242,
    card: { x: 44, y: 690 },
  },
  {
    id: 'creator', name: 'Creator District', emoji: '✨',
    color: '#F59E0B', deep: '#D97706', rgb: '217,119,6',
    count: '7,230', blurb: 'Content creation & writing',
    trending: ['Newsletter Copy', 'Twitter Threads', 'Blog Outlines', 'Brand Voice'],
    rect: { x: 40, y: 218, w: 478, h: 362 },
    center: { x: 276, y: 402 },
    glowR: 290, ringR: 232,
    card: { x: 44, y: 224 },
  },
];

const TWINKLES = [
  { x: 690, y: 150, c: '#fff', d: 0 }, { x: 920, y: 120, c: '#C4B5FD', d: .8 },
  { x: 1300, y: 300, c: '#FCA5A5', d: .4 }, { x: 1080, y: 360, c: '#FECACA', d: 1.2 },
  { x: 980, y: 700, c: '#93C5FD', d: .6 }, { x: 1240, y: 760, c: '#BFDBFE', d: 1.5 },
  { x: 300, y: 720, c: '#86EFAC', d: .3 }, { x: 540, y: 780, c: '#BBF7D0', d: 1.1 },
  { x: 200, y: 360, c: '#FCD34D', d: .9 }, { x: 420, y: 320, c: '#FDE68A', d: 1.7 },
  { x: 768, y: 300, c: '#DDD6FE', d: 2.0 },
];

function makeParticles() {
  const zones = DISTRICTS.map((d) => d.center).concat([{ x: 768, y: 430 }]);
  const out = [];
  for (let i = 0; i < 30; i++) {
    const z = zones[i % zones.length];
    const colors = ['255,255,255', '196,181,253', '147,197,253', '253,224,71', '134,239,172'];
    out.push({
      x: z.x + (Math.random() - 0.5) * 220,
      y: z.y + (Math.random() - 0.5) * 160,
      size: 2 + Math.random() * 4,
      dur: 6 + Math.random() * 7,
      delay: -Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  return out;
}

interface InfoCardProps {
  d: District | null;
  shown: boolean;
  onExplore: (id: string) => void;
}

function InfoCard({ d, shown, onExplore }: InfoCardProps) {
  if (!d) return null;
  return (
    <div
      className={'info-card' + (shown ? ' show' : '')}
      style={{ left: d.card.x, top: d.card.y }}
    >
      <div className="info-card__bar" style={{ background: `linear-gradient(90deg, ${d.color}, ${d.deep})` }} />
      <div className="info-card__body">
        <div className="info-card__top">
          <div className="info-card__emoji" style={{ background: `rgba(${d.rgb},.12)` }}>{d.emoji}</div>
          <div>
            <div className="info-card__name">{d.name}</div>
            <div className="info-card__tagline">{d.blurb}</div>
          </div>
        </div>
        <div className="info-card__count">
          <b style={{ color: d.deep }}>{d.count}</b>
          <span>prompts</span>
        </div>
        <div className="info-card__trend-label">Trending now</div>
        <div className="info-card__pills">
          {d.trending.map((t) => (
            <span key={t} className="info-card__pill" style={{ background: `rgba(${d.rgb},.10)`, color: d.deep }}>
              <span className="spark">▲</span>{t}
            </span>
          ))}
        </div>
        <button
          className="info-card__btn"
          style={{
            background: `linear-gradient(120deg, ${d.color}, ${d.deep})`,
            boxShadow: `0 10px 22px -8px rgba(${d.rgb},.6)`,
          }}
          onClick={() => onExplore(d.id)}
        >
          Explore District <span className="arr">→</span>
        </button>
      </div>
    </div>
  );
}

export function PromptCity({ go }: { go: (route: string) => void }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(0.8);
  const [hoveredRaw, setHoveredRaw] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [parallaxX, setParallaxX] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [scrollScale, setScrollScale] = useState(1);
  const particles = useMemo(makeParticles, []);

  /* fit-to-width scaling */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setFit(el.clientWidth / STAGE_W));
    ro.observe(el);
    setFit(el.clientWidth / STAGE_W);
    return () => ro.disconnect();
  }, []);

  /* esc to close focus */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFocused(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* scroll-driven gentle scale 1.0 → 1.05 */
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.6)));
      setScrollScale(1 + progress * 0.05);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* mouse parallax */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxX(cx * 14);
    setParallaxY(cy * 8);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallaxX(0);
    setParallaxY(0);
  }, []);

  const hovered  = focused ? null : hoveredRaw;
  const activeId = focused || hovered;
  const active   = DISTRICTS.find((d) => d.id === activeId) || null;

  const cameraStyle = useMemo(() => {
    if (!focused) return {
      transform: 'translate(0px,0px) scale(1)',
      transformOrigin: `${CENTER.x}px ${CENTER.y}px`,
    };
    const d = DISTRICTS.find((x) => x.id === focused)!;
    return {
      transform: `translate(${CENTER.x - d.center.x}px, ${CENTER.y - d.center.y}px) scale(${ZOOM})`,
      transformOrigin: `${d.center.x}px ${d.center.y}px`,
    };
  }, [focused]);

  const veilStyle: React.CSSProperties = active
    ? {
        ['--vx' as string]: (active.center.x / STAGE_W * 100) + '%',
        ['--vy' as string]: (active.center.y / STAGE_H * 100) + '%',
      }
    : {};

  const onPinEnter = useCallback((id: string) => setHoveredRaw(id), []);
  const onPinLeave = useCallback(() => setHoveredRaw(null), []);
  const onPinClick = useCallback((id: string) => setFocused((f) => (f === id ? null : id)), []);
  const onExplore  = useCallback((id: string) => go(`library:${id}`), [go]);

  const parallaxStyle: React.CSSProperties = {
    transform: `translate(${parallaxX}px, ${parallaxY}px) scale(${scrollScale})`,
  };

  return (
    <section
      className="city-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* background decoration orbs */}
      <div className="city-bg-orb city-bg-orb--purple" />
      <div className="city-bg-orb city-bg-orb--blue" />
      <div className="city-bg-orb city-bg-orb--amber" />

      {/* heading */}
      <div className="city-head">
        <div className="eyebrow">Explore Districts</div>
        <h2>Your <span className="accent">Prompt City</span></h2>
        <p>Five creative districts. Thousands of prompts.<br />Hover to preview, click to explore.</p>
      </div>

      {/* city hero area */}
      <div className="city-hero-area">
        {/* ambient glow ring behind city */}
        <div className="city-ambient-ring" />
        {/* levitation shadow below city */}
        <div className="city-shadow" />

        {/* parallax layer (mouse + scroll) */}
        <div className="city-parallax" style={parallaxStyle}>
          {/* floating bob animation */}
          <div className="city-float-anim">

            <div
              ref={viewportRef}
              className={'city-viewport' + (focused ? ' is-focused' : '')}
            >
              <div className="city-fit" style={{ ['--fit' as string]: fit }}>
                <div className={'city-stage' + (active ? ' dim' : '') + (focused ? ' focused' : '')}>

                  {/* camera zoom layer */}
                  <div className="city-camera" style={cameraStyle}>
                    <img
                      className="city-base"
                      src="/images/prompt-city.jpeg"
                      alt="PromptVault isometric city"
                      draggable={false}
                    />
                    <div className="city-veil" style={veilStyle} />

                    {/* glows */}
                    {DISTRICTS.map((d) => (
                      <div
                        key={'g' + d.id}
                        className={'district-glow' + (activeId === d.id ? ' show' : '')}
                        style={{
                          left: d.center.x - d.glowR, top: d.center.y - d.glowR,
                          width: d.glowR * 2, height: d.glowR * 2,
                          background: `radial-gradient(circle, rgba(${d.rgb},.42), rgba(${d.rgb},0) 66%)`,
                        }}
                      />
                    ))}

                    {/* lifted district copies */}
                    {DISTRICTS.map((d) => (
                      <div
                        key={'l' + d.id}
                        className={'district-lift' + (activeId === d.id ? ' show' : '')}
                        style={{
                          left: d.rect.x, top: d.rect.y, width: d.rect.w, height: d.rect.h,
                          backgroundPosition: `${-d.rect.x}px ${-d.rect.y}px`,
                        }}
                      />
                    ))}

                    {/* pulsing rings */}
                    {DISTRICTS.map((d) => (
                      <div
                        key={'r' + d.id}
                        className={'district-ring' + (activeId === d.id ? ' show' : '')}
                        style={{
                          left: d.center.x - d.ringR, top: d.center.y - d.ringR,
                          width: d.ringR * 2, height: d.ringR * 1.18,
                          color: d.color,
                        }}
                      />
                    ))}

                    {/* crystal plaza center glow */}
                    <div className="crystal-glow" style={{ left: 776, top: 470 }} />

                    {/* twinkles */}
                    {TWINKLES.map((t, i) => (
                      <div
                        key={'t' + i}
                        className="twinkle"
                        style={{ left: t.x, top: t.y, color: t.c, animationDelay: t.d + 's' }}
                      />
                    ))}

                    {/* ambient particles */}
                    {particles.map((p, i) => (
                      <div
                        key={'p' + i}
                        className="particle"
                        style={{
                          left: p.x, top: p.y, width: p.size, height: p.size,
                          color: `rgb(${p.color})`, background: `rgba(${p.color},.95)`,
                          animationDuration: p.dur + 's', animationDelay: p.delay + 's',
                        }}
                      />
                    ))}

                    {/* pins */}
                    {DISTRICTS.map((d) => (
                      <div
                        key={'pin' + d.id}
                        className={'pin' + (activeId === d.id ? ' active' : '')}
                        style={{ left: d.center.x, top: d.center.y, color: d.color }}
                      >
                        <span className="pin__ping" />
                        <span className="pin__count" style={{ color: d.deep }}>{d.count} prompts</span>
                        <span className="pin__dot">{d.emoji}</span>
                      </div>
                    ))}

                    {/* hotspots */}
                    {DISTRICTS.map((d) => (
                      <div
                        key={'hot' + d.id}
                        className="district-hotspot"
                        style={{ left: d.rect.x, top: d.rect.y, width: d.rect.w, height: d.rect.h }}
                        onMouseEnter={() => onPinEnter(d.id)}
                        onMouseLeave={onPinLeave}
                        onClick={() => onPinClick(d.id)}
                      />
                    ))}
                  </div>

                  {/* crystal plaza label — screen space */}
                  <div className="crystal-label" style={{ left: 776, top: 372 }}>
                    <span className="tag"><span className="gem" />PromptVault Plaza</span>
                  </div>

                  {/* info card — screen space */}
                  <InfoCard d={active} shown={!!active} onExplore={onExplore} />

                  {/* back button */}
                  <button
                    className={'city-back' + (focused ? ' show' : '')}
                    onClick={() => setFocused(null)}
                  >
                    <span style={{ fontSize: 16, lineHeight: 1 }}>←</span> Back to city
                  </button>
                </div>

                {/* hint */}
                <div className="city-hud">
                  <div className="city-hint" style={{ opacity: focused ? 0 : 1 }}>
                    <span className="kbd">Hover</span> a district · <span className="kbd">Click</span> to explore
                  </div>
                </div>
              </div>
            </div>

          </div>{/* city-float-anim */}
        </div>{/* city-parallax */}
      </div>{/* city-hero-area */}

      {/* legend chips */}
      <div className="city-legend">
        {DISTRICTS.map((d) => (
          <button
            key={'leg' + d.id}
            className={'legend-chip' + (activeId === d.id ? ' active' : '')}
            onMouseEnter={() => onPinEnter(d.id)}
            onMouseLeave={onPinLeave}
            onClick={() => onPinClick(d.id)}
            style={activeId === d.id ? { borderColor: d.color } : undefined}
          >
            <span className="swatch" style={{ background: `linear-gradient(135deg, ${d.color}, ${d.deep})` }} />
            {d.name.replace(' District', '')}
            <span className="lc-count">{d.count}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
