/* global React, ReactDOM, PromptCity */
const { useState: useStateP } = React;

function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav__inner">
        <a className="brand" href="#">
          <span className="brand__mark" />
          PromptVault
        </a>
        <div className="nav__links">
          <a href="#city">Explore</a>
          <a href="#collections">Collections</a>
          <a href="#trending">Trending</a>
          <a href="#showcase">Showcase</a>
        </div>
        <div className="nav__right">
          <a className="nav__signin" href="#">Sign in</a>
          <button className="btn btn--primary">Get started <span className="arr">→</span></button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <span className="hero__eyebrow"><span className="dot" /> Now exploring 44,790 prompts</span>
        <h1>Discover prompts through<br /><span className="grad">a creative city.</span></h1>
        <p className="hero__sub">
          PromptVault turns prompt discovery into a place. Wander five themed districts,
          each a category of AI creativity, and find your next idea by exploring — not scrolling.
        </p>
        <div className="hero__cta">
          <button className="btn btn--primary">Enter the city <span className="arr">→</span></button>
          <button className="btn btn--ghost">Browse all prompts</button>
        </div>
      </div>
    </header>
  );
}

function CitySection() {
  return (
    <section className="city-section" id="city">
      <div className="wrap city-head">
        <span className="eyebrow">The PromptVault Map</span>
        <h2>Five districts. One <span className="accent">creative metropolis.</span></h2>
        <p>Every district is a category. Hover to preview what's trending, click to dive in.</p>
      </div>
      <PromptCity />
    </section>
  );
}

const COLLECTIONS = [
  { id: 'image', name: 'Cinematic Portraits', district: 'Image', count: '1,280 prompts', color: '#8B5CF6', deep: '#6D28D9', rgb: '124,58,237', blurb: 'Studio-grade headshots, dramatic lighting and film-stock looks for any subject.' },
  { id: 'video', name: 'Explainer Sequences', district: 'Video', count: '640 prompts', color: '#F0463E', deep: '#DC2626', rgb: '239,68,68', blurb: 'Storyboards, shot lists and motion briefs that turn a concept into a watchable cut.' },
  { id: 'code', name: 'Production React Kit', district: 'Code', count: '910 prompts', color: '#20B257', deep: '#15803D', rgb: '22,163,74', blurb: 'Components, hooks and refactors that ship — typed, tested and accessible.' },
];

function Collections() {
  return (
    <section className="section collections" id="collections">
      <div className="wrap">
        <div className="section__head">
          <span className="eyebrow">Featured</span>
          <h2>Curated prompt collections</h2>
          <p className="section__sub">Hand-picked bundles from across the districts, refreshed every week.</p>
        </div>
        <div className="coll-grid">
          {COLLECTIONS.map((c) => (
            <article className="coll" key={c.id}>
              <div className="coll__bar" style={{ background: `linear-gradient(90deg, ${c.color}, ${c.deep})` }} />
              <div className="coll__top">
                <span className="coll__chip" style={{ background: `rgba(${c.rgb},.12)`, color: c.deep }}>{c.district} District</span>
                <span className="coll__count">{c.count}</span>
              </div>
              <h3>{c.name}</h3>
              <p>{c.blurb}</p>
              <div className="coll__foot" style={{ color: c.deep }}>View collection <span aria-hidden="true">→</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const TRENDING = [
  { name: 'Ghibli Style', tag: 'Image District', delta: '+38%', color: '#6D28D9' },
  { name: 'SaaS Dashboards', tag: 'Website District', delta: '+27%', color: '#2563EB' },
  { name: 'Cinematic B-Roll', tag: 'Video District', delta: '+24%', color: '#DC2626' },
  { name: 'React Components', tag: 'Code District', delta: '+19%', color: '#15803D' },
  { name: 'Newsletter Copy', tag: 'Creator District', delta: '+16%', color: '#D97706' },
];

function Trending() {
  return (
    <section className="section" id="trending">
      <div className="wrap">
        <div className="section__head">
          <span className="eyebrow">Right now</span>
          <h2>Trending across the city</h2>
          <p className="section__sub">The prompts climbing fastest this week, district by district.</p>
        </div>
        <div className="trend-grid">
          <div className="trend-list">
            {TRENDING.map((t, i) => (
              <div className="trend-row" key={t.name}>
                <span className="trend-rank">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="trend-name">{t.name}</div>
                  <div className="trend-tag" style={{ color: t.color }}>{t.tag}</div>
                </div>
                <div className="trend-meta"><span className="trend-spark">▲</span> {t.delta}</div>
              </div>
            ))}
          </div>
          <aside className="trend-aside">
            <h3>Topic of the week</h3>
            <p>“Product photography” crossed 2,000 new prompts this week as creators push photoreal
              studio setups. Explore the Image District to see the techniques behind the trend.</p>
            <div className="trend-pills">
              {['Soft box lighting', 'Reflective surfaces', 'Macro detail', '35mm grade', 'Negative space'].map((p) => (
                <span className="pill" key={p}>{p}</span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

const SHOWCASE = [
  { q: 'A miniature isometric city of glass towers, soft studio light, tilt-shift, pastel sky —', by: 'Image District', dot: '#8B5CF6' },
  { q: 'Slow dolly across a neon-lit workshop at dawn, volumetric fog, 24fps film grain —', by: 'Video District', dot: '#F0463E' },
  { q: 'Build a responsive pricing page with three tiers, annual toggle, and tasteful motion —', by: 'Website District', dot: '#3B82F6' },
  { q: 'Refactor this function into a typed, tested React hook with optimistic updates —', by: 'Code District', dot: '#20B257' },
];

function Showcase() {
  return (
    <section className="section showcase" id="showcase">
      <div className="wrap">
        <div className="section__head center">
          <span className="eyebrow">From the citizens</span>
          <h2>Prompts worth stealing</h2>
          <p className="showcase__sub">A look at what's being written across PromptVault right now.</p>
        </div>
        <div className="show-grid">
          {SHOWCASE.map((s, i) => (
            <article className="show-card" key={i}>
              <p className="show-card__q">{s.q}</p>
              <div className="show-card__by"><span className="show-dot" style={{ background: s.dot }} /> {s.by}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: 'Districts', links: ['Image', 'Video', 'Website', 'Code', 'Creator'] },
    { h: 'Product', links: ['Collections', 'Trending', 'Showcase', 'Pricing'] },
    { h: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <a className="brand" href="#"><span className="brand__mark" /> PromptVault</a>
            <p className="footer__blurb">Discover prompts through a creative city. A new home for AI builders, writers and makers.</p>
          </div>
          <div className="footer__cols">
            {cols.map((c) => (
              <div className="footer__col" key={c.h}>
                <h5>{c.h}</h5>
                {c.links.map((l) => <a href="#" key={l}>{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 PromptVault. All rights reserved.</span>
          <span>Made for creators.</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <CitySection />
      <Collections />
      <Trending />
      <Showcase />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
