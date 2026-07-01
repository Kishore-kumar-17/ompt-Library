import { useState, useEffect, useRef } from 'react';
import './PromptCity.css';

const STEP_COUNT = 5;
const V = '?v=2';

interface District {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  categories: string[];
  color: string;
  deep: string;
  rgb: string;
  count: string;
  cityLayer: string;
  standalone: string;
}

const DISTRICTS: District[] = [
  {
    id: 'image', name: 'Image District', emoji: '🎨',
    tagline: 'Visualize Ideas',
    description: 'Create stunning visuals, product photography, posters, portraits, social media campaigns and cinematic artwork.',
    categories: ['Marketing', 'Advertising', 'Posters', 'Portraits', 'Product Photography', 'Ghibli', 'Concept Art'],
    color: '#8B5CF6', deep: '#6D28D9', rgb: '124,58,237',
    count: '12,450+',
    cityLayer: `/images/districts/city-step-image.png${V}`,
    standalone: `/images/districts/district-image.png${V}`,
  },
  {
    id: 'video', name: 'Video District', emoji: '🎬',
    tagline: 'Make It Motion',
    description: 'Generate cinematic videos, commercials, trailers, anime scenes, reels and storytelling content.',
    categories: ['Cinematic', 'Commercials', 'Trailers', 'Anime', 'Reels', 'Explainers', 'Music Videos'],
    color: '#F0463E', deep: '#DC2626', rgb: '239,68,68',
    count: '8,920+',
    cityLayer: `/images/districts/city-step-video.png${V}`,
    standalone: `/images/districts/district-video.png${V}`,
  },
  {
    id: 'website', name: 'Website District', emoji: '🌐',
    tagline: 'Design Experience',
    description: 'Design and build websites, landing pages, dashboards, portfolios and complete web experiences.',
    categories: ['SaaS', 'Portfolio', 'Agency', 'Restaurant', 'Healthcare', 'Landing Pages', 'E-commerce'],
    color: '#3B82F6', deep: '#2563EB', rgb: '37,99,235',
    count: '6,780+',
    cityLayer: `/images/districts/city-step-website.png${V}`,
    standalone: `/images/districts/district-website.png${V}`,
  },
  {
    id: 'code', name: 'Code District', emoji: '💻',
    tagline: 'Build the Future',
    description: 'Write production code, build components, create APIs, automate workflows and ship software faster.',
    categories: ['React', 'Next.js', 'Tailwind', 'Node.js', 'Python', 'AI Apps', 'APIs'],
    color: '#20B257', deep: '#15803D', rgb: '22,163,74',
    count: '9,410+',
    cityLayer: `/images/districts/city-step-code.png${V}`,
    standalone: `/images/districts/district-code.png${V}`,
  },
  {
    id: 'creator', name: 'Creator District', emoji: '✨',
    tagline: 'Share Knowledge',
    description: 'Craft compelling content, newsletters, social posts, ad copy, SEO articles and brand storytelling.',
    categories: ['Blogs', 'SEO', 'Copywriting', 'LinkedIn', 'Email Marketing', 'Scripts', 'Brand Voice'],
    color: '#F59E0B', deep: '#D97706', rgb: '217,119,6',
    count: '7,230+',
    cityLayer: `/images/districts/city-step-creator.png${V}`,
    standalone: `/images/districts/district-creator.png${V}`,
  },
];

/* ── Info overlay on the city side ──────────────────── */
function DistrictOverlay({ d, active, go }: { d: District; active: boolean; go: (r: string) => void }) {
  return (
    <div className={'do' + (active ? ' do--active' : '')}>
      <div className="do__bar" style={{ background: `linear-gradient(90deg, ${d.color}, ${d.deep})` }} />
      <div className="do__body">
        <div className="do__icon" style={{ background: `rgba(${d.rgb},.12)` }}>{d.emoji}</div>
        <div className="do__tag" style={{ color: d.deep }}>{d.tagline}</div>
        <h3 className="do__title">{d.name}</h3>
        <p className="do__desc">{d.description}</p>
        <div className="do__count">
          <span className="do__count-num" style={{ color: d.deep }}>{d.count}</span>
          <span className="do__count-label">prompts</span>
        </div>
        <div className="do__cats-label">Popular</div>
        <div className="do__cats">
          {d.categories.map((c) => (
            <span key={c} className="do__cat" style={{ background: `rgba(${d.rgb},.10)`, color: d.deep }}>{c}</span>
          ))}
        </div>
        <button
          className="do__cta"
          style={{
            background: `linear-gradient(120deg, ${d.color}, ${d.deep})`,
            boxShadow: `0 10px 24px -8px rgba(${d.rgb},.55)`,
          }}
          onClick={() => go(`library:${d.id}`)}
        >
          Explore {d.name.replace(' District', '')} Prompts
          <span className="do__arr">→</span>
        </button>
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────── */
export function PromptCity({ go }: { go: (route: string) => void }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const isIntro = progress < 0.08;
  const step = isIntro ? -1 : Math.min(STEP_COUNT - 1, Math.floor((progress - 0.08) / (0.92 / STEP_COUNT)));

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollRange = el.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / scrollRange));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="city-scroll-outer" ref={outerRef}>
      <div className="city-sticky">
        {/* heading */}
        <div className="city-head">
          <div className="city-eyebrow">Explore Districts</div>
          <h2 className="city-title">Your <span className="city-accent">Prompt City</span></h2>
          <p className="city-subtitle">Five creative districts. Thousands of prompts. Scroll to explore.</p>
        </div>

        {/* 70 / 30 split */}
        <div className="city-content">
          {/* LEFT 70% - City + info overlay */}
          <div className="city-left">
            <div className="city-layers">
              <img src={`/images/districts/city-bw.png${V}`} alt="Prompt Bot city" className="city-layer city-layer--base" draggable={false} />
              {DISTRICTS.map((d, i) => (
                <img
                  key={d.id}
                  src={d.cityLayer}
                  alt={`${d.name} highlighted`}
                  className={'city-layer city-layer--color' + (step >= i ? ' city-layer--visible' : '')}
                  draggable={false}
                />
              ))}
            </div>

            {/* Info overlays - positioned on the city */}
            <div className="city-overlays">
              {DISTRICTS.map((d, i) => (
                <DistrictOverlay key={d.id} d={d} active={step === i} go={go} />
              ))}
            </div>
          </div>

          {/* RIGHT 30% - Standalone district image only */}
          <div className="city-right">
            {DISTRICTS.map((d, i) => (
              <div key={d.id} className={'dr' + (step === i ? ' dr--active' : '')}>
                <img src={d.standalone} alt={d.name} className="dr__img" draggable={false} />
              </div>
            ))}

            {/* Intro state */}
            <div className={'city-right-intro' + (isIntro ? ' city-right-intro--visible' : '')}>
              <div className="city-right-intro__icon">🏙️</div>
              <p className="city-right-intro__text">Scroll to discover<br />each district</p>
            </div>
          </div>
        </div>

        {/* scroll progress dots */}
        <div className="scroll-nav">
          {DISTRICTS.map((d, i) => (
            <div key={'dot' + d.id} className="scroll-nav__item">
              <div
                className={'scroll-dot' + (step === i ? ' scroll-dot--active' : '') + (step > i ? ' scroll-dot--passed' : '')}
                style={step >= i && step !== -1 ? { background: d.color, borderColor: d.color, boxShadow: step === i ? `0 0 10px ${d.color}` : 'none' } : undefined}
              />
              <span className={'scroll-dot__label' + (step === i ? ' scroll-dot__label--active' : '')} style={step === i ? { color: d.deep } : undefined}>
                {d.name.replace(' District', '')}
              </span>
            </div>
          ))}
        </div>

        {/* scroll hint */}
        <div className="city-scroll-hint" style={{ opacity: isIntro ? 1 : 0 }}>
          <div className="scroll-hint__mouse"><div className="scroll-hint__wheel" /></div>
          <span>Scroll to explore districts</span>
        </div>
      </div>
    </div>
  );
}
