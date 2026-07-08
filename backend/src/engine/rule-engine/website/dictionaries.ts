// ─── Website Formula v1.0 — Dictionaries ───────────────────────────────────────
// Term → rich, real content. No API calls — pure lookup, same ethos as the
// video/text/code dictionaries: every value here is genuine domain content,
// not a placeholder to be filled in later by an LLM.

import type { WebsiteCategory } from "./types.js"

// ─── Category → subcategory membership ────────────────────────────────────────
// Mirrors Builder.tsx's WEBSITE_CATEGORIES exactly — used by the parser to
// scope subcategory keyword-matching to the already-detected category, and by
// the builder to pick a sane default subcategory when none is supplied.

export const CATEGORY_SUBCATEGORIES: Record<WebsiteCategory, string[]> = {
  business:   ["Restaurant / Cafe", "Clinic / Healthcare", "Educational Institute", "Boutique / Retail", "Real Estate", "Legal / Law Firm", "Service Business"],
  ecommerce:  ["Single Product", "Multi-Product", "Fashion Store", "Subscription Box", "Digital Products"],
  portfolio:  ["Photographer", "Designer", "Writer / Blogger", "Developer", "Artist"],
  saas:       ["Dashboard", "Landing + App", "Developer Tool"],
  landing:    ["SaaS Product", "Personal Brand", "Course / Info Product", "Event / Conference"],
}

export const WEBSITE_PAGE_NAMES = [
  "Home", "About", "Pricing", "Blog", "Contact", "Shop", "Portfolio",
  "Dashboard", "FAQ", "Testimonials", "Team", "Services",
]

// ─── Role framing (per category, {sub} substituted with the subcategory) ─────
// An ecommerce site designer and a SaaS dashboard designer are not the same
// specialist — each framing names a distinct discipline, years of practical
// experience, and the specific behavioral pattern that discipline is tuned to.

export const ROLE_FRAMING: Record<WebsiteCategory, string> = {
  business:  "a senior brand and conversion designer with 12+ years of experience building trust-led websites for {sub} businesses. You understand high-consideration local-purchase behavior: credibility signals, clear service scope, frictionless booking/contact paths, and the specific proof points that turn a browsing visitor into a lead or a booking",
  ecommerce: "a senior ecommerce UX and conversion designer with 10+ years of experience building storefronts for {sub} brands. You understand purchase-path psychology: product clarity, trust-at-checkout, cart-abandonment triggers, and the merchandising patterns that lift add-to-cart and average order value",
  portfolio: "a senior portfolio and personal-brand designer with 9+ years of experience building sites for {sub} professionals. You understand how hiring decisions actually get made from a portfolio: work-sample clarity, process narrative over polish alone, and a frictionless path from 'impressed' to 'inquiry sent'",
  saas:      "a senior product designer with 11+ years of experience building {sub} interfaces for SaaS products. You understand activation and retention mechanics: reducing time-to-first-value, designing legible empty/loading/error states, and making complex functionality feel simple on first use",
  landing:   "a senior conversion copywriter and landing-page designer with 10+ years of experience building single-purpose {sub} pages. You understand that a landing page has exactly one job — you ruthlessly cut anything that doesn't move the visitor toward the single primary action",
}

// ─── Category defaults ────────────────────────────────────────────────────────

export const CATEGORY_DEFAULTS: Record<WebsiteCategory, {
  defaultPalette: string
  defaultAudience: string
  primaryGoal: string
  secondaryGoal: string
}> = {
  business: {
    defaultPalette: "Light",
    defaultAudience: "B2C",
    primaryGoal: "lead capture and appointment/reservation conversion",
    secondaryGoal: "trust reinforcement through credentials, reviews, and clearly scoped services",
  },
  ecommerce: {
    defaultPalette: "Vibrant",
    defaultAudience: "B2C",
    primaryGoal: "add-to-cart and checkout conversion",
    secondaryGoal: "average-order-value growth and repeat purchase through cross-sell and account retention",
  },
  portfolio: {
    defaultPalette: "Monochrome",
    defaultAudience: "B2B",
    primaryGoal: "inbound project inquiries from qualified prospective clients",
    secondaryGoal: "credibility building through a demonstrated, well-narrated body of work",
  },
  saas: {
    defaultPalette: "Dark",
    defaultAudience: "B2B",
    primaryGoal: "trial signup or demo-request conversion",
    secondaryGoal: "activation — getting a signed-up user to their first meaningful in-product action",
  },
  landing: {
    defaultPalette: "Vibrant",
    defaultAudience: "B2C",
    primaryGoal: "a single conversion action (signup, purchase, or registration) with zero navigation distraction",
    secondaryGoal: "qualified-lead capture for visitors not yet ready to convert immediately",
  },
}

// ─── Palettes ──────────────────────────────────────────────────────────────────
// Real hex tokens, following the same token structure confirmed in the
// reference website-prompt examples: background / surface / section tint /
// primary+secondary text / border / primary action + hover / accent success,
// warning, data.

export interface PaletteTokens {
  background: string
  surface: string
  sectionTint: string
  primaryText: string
  secondaryText: string
  border: string
  primaryAction: string
  actionHover: string
  accentSuccess: string
  accentWarning: string
  accentData: string
}

export const PALETTES: Record<string, PaletteTokens> = {
  "Dark": {
    background: "#0B0D12", surface: "#12151C", sectionTint: "#171B24",
    primaryText: "#F4F6FA", secondaryText: "#9AA3B2", border: "rgba(244,246,250,0.12)",
    primaryAction: "#4F8CFF", actionHover: "#3E72D9",
    accentSuccess: "#35C58D", accentWarning: "#E3A63E", accentData: "#A47EF0",
  },
  "Light": {
    background: "#F8FAFD", surface: "#FFFFFF", sectionTint: "#EEF3FA",
    primaryText: "#16202E", secondaryText: "#55647A", border: "rgba(22,32,46,0.12)",
    primaryAction: "#1857C9", actionHover: "#123F9B",
    accentSuccess: "#1E8E5A", accentWarning: "#B5750F", accentData: "#6741C9",
  },
  "Vibrant": {
    background: "#12071F", surface: "#1C0E30", sectionTint: "#26123F",
    primaryText: "#FBF6FF", secondaryText: "#C6B4E6", border: "rgba(251,246,255,0.14)",
    primaryAction: "#FF3D7F", actionHover: "#E22868",
    accentSuccess: "#29D398", accentWarning: "#FFB020", accentData: "#6C4CFF",
  },
  "Monochrome": {
    background: "#FAFAFA", surface: "#FFFFFF", sectionTint: "#F0F0F0",
    primaryText: "#111111", secondaryText: "#5C5C5C", border: "rgba(17,17,17,0.14)",
    primaryAction: "#111111", actionHover: "#000000",
    accentSuccess: "#3A3A3A", accentWarning: "#6E6E6E", accentData: "#2B2B2B",
  },
  "Earth Tones": {
    background: "#F5EFE6", surface: "#FFFDF9", sectionTint: "#EDE2D0",
    primaryText: "#3B2F26", secondaryText: "#6E5C4C", border: "rgba(59,47,38,0.16)",
    primaryAction: "#8A5A34", actionHover: "#6E4527",
    accentSuccess: "#5C7A4E", accentWarning: "#B4762C", accentData: "#7A5240",
  },
  "Pastel": {
    background: "#FDF9FC", surface: "#FFFFFF", sectionTint: "#F6EEF7",
    primaryText: "#443A4A", secondaryText: "#8D7F97", border: "rgba(68,58,74,0.12)",
    primaryAction: "#C58FCB", actionHover: "#B073B8",
    accentSuccess: "#8FC8A9", accentWarning: "#E8B888", accentData: "#93A9E0",
  },
  "Neon": {
    background: "#06080F", surface: "#0C1020", sectionTint: "#10142A",
    primaryText: "#EAFBFF", secondaryText: "#7EE0E8", border: "rgba(234,251,255,0.16)",
    primaryAction: "#00F0FF", actionHover: "#00C4D1",
    accentSuccess: "#39FF88", accentWarning: "#FFD23F", accentData: "#FF2FD0",
  },
}

// ─── Per-palette visual style + radius scale ─────────────────────────────────
// Radius is deliberately tied to palette mood, not category — a Pastel site
// reads soft/rounded regardless of whether it's a SaaS dashboard or a bakery,
// while Monochrome and Neon both want sharp, disciplined corners.

export interface RadiusScale { cards: string; inputs: string; buttons: string; pills: string }

export const PALETTE_MOOD: Record<string, string> = {
  "Dark":         "moody, high-contrast, confident — content pops against a deep neutral background",
  "Light":        "clean, airy, trust-first — generous whitespace with a single restrained accent color",
  "Vibrant":      "bold, saturated, energetic — color carries as much of the hierarchy as type does",
  "Monochrome":   "disciplined grayscale system — hierarchy comes from contrast and scale alone, zero chroma anywhere",
  "Earth Tones":  "warm, tactile, grounded — organic tones lower visual aggression while keeping full legibility",
  "Pastel":       "soft, approachable, low-pressure — rounded forms and muted saturation reduce perceived stakes",
  "Neon":         "high-energy, near-black base with glowing saturated accents — cyberpunk-adjacent contrast",
}

export const PALETTE_RADIUS: Record<string, RadiusScale> = {
  "Dark":        { cards: "12px", inputs: "8px",  buttons: "8px",  pills: "999px" },
  "Light":       { cards: "10px", inputs: "8px",  buttons: "8px",  pills: "999px" },
  "Vibrant":     { cards: "16px", inputs: "10px", buttons: "10px", pills: "999px" },
  "Monochrome":  { cards: "4px",  inputs: "4px",  buttons: "4px",  pills: "4px"   },
  "Earth Tones": { cards: "14px", inputs: "10px", buttons: "10px", pills: "999px" },
  "Pastel":      { cards: "18px", inputs: "12px", buttons: "12px", pills: "999px" },
  "Neon":        { cards: "6px",  inputs: "4px",  buttons: "4px",  pills: "999px" },
}

// ─── Typography scales (per category) ─────────────────────────────────────────
// A portfolio site wants an expressive editorial display face; a SaaS
// dashboard wants a tight, dense scale that survives dozens of on-screen
// widgets; a landing page wants an oversized, loud hero. These genuinely
// differ by category, not just by palette.

export interface TypographyScale {
  fontFamily: string
  display: string
  h2: string
  h3: string
  body: string
  small: string
}

export const TYPOGRAPHY_SCALES: Record<WebsiteCategory, TypographyScale> = {
  business: {
    fontFamily: "Inter, system-ui, sans-serif",
    display: "clamp(34px, 4.6vw, 58px), weight 700",
    h2: "clamp(22px, 3.2vw, 36px), weight 600",
    h3: "20px, weight 600",
    body: "16px, line-height 1.6",
    small: "14px, line-height 1.5",
  },
  ecommerce: {
    fontFamily: "'General Sans', Inter, sans-serif",
    display: "clamp(32px, 4.4vw, 54px), weight 700",
    h2: "clamp(22px, 3vw, 34px), weight 600",
    h3: "19px, weight 600",
    body: "15px, line-height 1.6",
    small: "13px, line-height 1.5",
  },
  portfolio: {
    fontFamily: "'Fraunces', Georgia, serif for display / Inter for body and UI",
    display: "clamp(40px, 6vw, 74px), weight 600",
    h2: "clamp(24px, 3.6vw, 40px), weight 500",
    h3: "20px, weight 500",
    body: "17px, line-height 1.7",
    small: "14px, line-height 1.5",
  },
  saas: {
    fontFamily: "'Geist', Inter, system-ui, sans-serif",
    display: "clamp(30px, 4vw, 50px), weight 600",
    h2: "clamp(20px, 2.6vw, 30px), weight 600",
    h3: "17px, weight 600",
    body: "14px, line-height 1.55",
    small: "12.5px, line-height 1.45",
  },
  landing: {
    fontFamily: "'Clash Display', Inter, sans-serif",
    display: "clamp(40px, 7vw, 88px), weight 700",
    h2: "clamp(26px, 4vw, 44px), weight 700",
    h3: "22px, weight 600",
    body: "17px, line-height 1.65",
    small: "14px, line-height 1.5",
  },
}

// ─── Spacing + breakpoints ─────────────────────────────────────────────────────
// SaaS dashboards run denser (more widgets per viewport) than marketing-style
// pages, so section spacing tightens for that one category.

export const SPACING_BY_CATEGORY: Record<WebsiteCategory, string> = {
  business:  "8pt base grid; section spacing 96px desktop / 56px mobile; card padding 24px desktop / 16px mobile; grid gap 20px",
  ecommerce: "8pt base grid; section spacing 88px desktop / 48px mobile; card padding 20px desktop / 14px mobile; grid gap 16px",
  portfolio: "8pt base grid; section spacing 104px desktop / 64px mobile; card padding 24px desktop / 16px mobile; grid gap 24px",
  saas:      "8pt base grid; section spacing 64px desktop / 40px mobile; card padding 16px desktop / 12px mobile; grid gap 12px",
  landing:   "8pt base grid; section spacing 112px desktop / 64px mobile; card padding 24px desktop / 16px mobile; grid gap 20px",
}

export const BREAKPOINTS = "640px / 768px / 1024px / 1280px (mobile / tablet / laptop / desktop)"

// ─── Audience tone ─────────────────────────────────────────────────────────────

export interface AudienceTone { voice: string; vibeWord: string; avoid: string }

export const AUDIENCE_TONE: Record<string, AudienceTone> = {
  "B2B": {
    voice: "confident, ROI-driven, precise — speaks in outcomes, integrations, and proof points a buying committee can forward internally",
    vibeWord: "authoritative",
    avoid: "avoid consumer-style hype and emoji-heavy copy; every claim should be substantiable",
  },
  "B2C": {
    voice: "warm, direct, benefit-first — short sentences that sell the outcome, not the mechanism",
    vibeWord: "approachable",
    avoid: "avoid jargon and internal feature names the customer has no context for",
  },
  "Youth / Gen-Z": {
    voice: "energetic, informal, culturally fluent — short punchy lines, native platform slang used sparingly and never forced",
    vibeWord: "electric",
    avoid: "avoid corporate-speak, avoid try-hard slang, avoid stock-photo blandness",
  },
  "Premium / Luxury": {
    voice: "restrained, confident, unhurried — let whitespace and craft communicate value instead of superlatives",
    vibeWord: "refined",
    avoid: "avoid discount language, avoid exclamation points, avoid crowding the layout",
  },
  "Students": {
    voice: "clear, encouraging, jargon-light — assumes no prior context and rewards fast comprehension",
    vibeWord: "accessible",
    avoid: "avoid dense paragraphs and unexplained acronyms",
  },
  "Parents": {
    voice: "reassuring, plain-spoken, safety- and trust-forward — anticipates the question before it's asked",
    vibeWord: "trustworthy",
    avoid: "avoid alarming language and unverified safety claims",
  },
  "Developers": {
    voice: "precise, technical, respects the reader's time — leads with what it does and how it's implemented, not why it's exciting",
    vibeWord: "credible",
    avoid: "avoid marketing fluff, avoid hiding the technical detail behind vague adjectives",
  },
}

// ─── Per-subcategory feature/page building blocks ─────────────────────────────
// The core content difference between, say, a Restaurant site and a Clinic
// site — genuinely distinct pages and what each page must contain, not a
// generic "Home / About / Contact" list reused everywhere.

export const SUBCATEGORY_FEATURES: Record<string, string[]> = {
  // ── business ──
  "Restaurant / Cafe": [
    "Homepage - hero with signature-dish photography, reservation CTA, hours/location strip, seasonal menu highlight",
    "Menu - categorized dishes with pricing, dietary tags (vegan/gluten-free/spicy), high-res photography per item",
    "Reservations - live table-booking widget with party size/date/time, confirmation email trigger, waitlist fallback",
    "Gallery - ambience and food photography grid, private-event space showcase",
    "About - chef/owner story, sourcing philosophy, press mentions",
    "Contact & Location - embedded map, parking notes, tap-to-call, catering inquiry form",
  ],
  "Clinic / Healthcare": [
    "Homepage - trust-first hero, credentials strip, primary service categories, appointment CTA",
    "Services - condition/treatment pages with plain-language explanations and what-to-expect timelines",
    "Doctors/Providers - credential cards (specialty, education, years practicing), individual bio pages",
    "Appointment Booking - date/time selector, insurance/provider dropdown, HIPAA-safe intake form",
    "Patient Resources - FAQ, pre-visit instructions, accepted-insurance list",
    "Contact & Locations - multi-location map, hours, emergency-contact distinction",
  ],
  "Educational Institute": [
    "Homepage - outcomes-led hero, program pathways, admissions CTA, accreditation badges",
    "Programs/Courses - curriculum breakdown, duration, mode (online/offline/hybrid), faculty highlights",
    "Admissions - eligibility checklist, application form, fee structure, scholarship information",
    "Faculty - credential-forward bio grid, department groupings",
    "Results/Outcomes - placement stats, alumni highlights, exam results with year/program context",
    "Campus/Facilities - photo tour, virtual-tour embed, location and transport info",
  ],
  "Boutique / Retail": [
    "Homepage - lookbook-style hero, featured collection, in-store event CTA, newsletter signup",
    "Collections - curated product groupings with editorial styling copy",
    "Store Locator - map with hours, phone, directions per location",
    "About/Brand Story - founder story, sourcing/craft philosophy",
    "Lookbook/Editorial - seasonal styling content, shoppable tags linking to products",
    "Contact - stylist appointment booking, general inquiry form",
  ],
  "Real Estate": [
    "Homepage - featured-listings hero, search bar (location/price/type), agent CTA",
    "Listings - filterable grid (price, beds, sqft, neighborhood), map-linked results",
    "Property Detail - photo gallery, floor plan, price history, mortgage-estimate widget, schedule-a-tour CTA",
    "Agents - profile cards with specialty and active listings, per-agent contact form",
    "Neighborhood Guides - local amenities, school ratings, commute-time context",
    "Contact/Lead Capture - tour-request form, CRM-ready payload (name, phone, listing ID, preferred time)",
  ],
  "Legal / Law Firm": [
    "Homepage - authority-led hero, practice-area overview, consultation CTA, case-result highlights",
    "Practice Areas - individual pages per specialty with plain-language process/outcome explanation",
    "Attorneys - credential-forward bio grid (bar admissions, notable cases, education)",
    "Case Results - outcome highlights with disclaimer (results vary, no guarantee language)",
    "Resources/FAQ - process explainers, what-to-expect timelines",
    "Contact & Consultation - confidential intake form with an attorney-client-privilege disclaimer before submission",
  ],
  "Service Business": [
    "Homepage - service-led hero, trust badges (licensed/insured/reviews), quote-request CTA",
    "Services - itemized service list with pricing tiers or a 'request quote' pattern",
    "Service Area - coverage-zone map, zip-code lookup",
    "Reviews/Testimonials - aggregated rating display, individual review cards with service context",
    "Booking/Quote Request - form with service type, address, preferred date, photo upload for estimates",
    "Contact - tap-to-call, emergency-service distinction if applicable",
  ],
  // ── ecommerce ──
  "Single Product": [
    "Homepage/Product Page - hero product shot, benefit bullets, price + variant selector, add-to-cart, trust badges",
    "Product Detail - image gallery with zoom, spec sheet, size/variant guide, reviews module",
    "Checkout - single-page checkout, shipping estimate, payment-method icons, order-summary sidebar",
    "FAQ/Shipping Info - shipping timelines, return policy, warranty details",
    "Reviews - star-rating breakdown, verified-purchase tags, photo reviews",
  ],
  "Multi-Product": [
    "Homepage - featured-collections hero, category navigation, promotional banner slot",
    "Category/Listing - filterable grid (price, size, color, rating), sort controls, pagination or infinite scroll",
    "Product Detail - gallery, variant selector, stock status, related-products module, reviews",
    "Cart & Checkout - persistent cart drawer, promo-code field, multi-step checkout with guest option",
    "Account - order history, saved addresses, wishlist",
  ],
  "Fashion Store": [
    "Homepage - editorial lookbook hero, seasonal collection callouts, size-inclusivity messaging",
    "Collection/Category - visual-first grid with quick-view hover, color-swatch filter",
    "Product Detail - multi-angle imagery, size guide with fit notes, model-measurements disclosure",
    "Style Guide/Editorial - outfit-pairing content, shoppable editorial tags",
    "Cart & Checkout - size/color recap in cart, express-checkout options (wallet pay)",
  ],
  "Subscription Box": [
    "Homepage - value-prop hero (what's inside, cadence, price), 'how it works' 3-step explainer",
    "Plans/Pricing - tier comparison table (monthly/quarterly/annual), pause/cancel-anytime messaging",
    "Past Boxes - archive of previous box contents to build purchase confidence",
    "Account/Manage Subscription - pause, skip, swap items, update payment, cancellation flow",
    "Checkout - subscription-specific checkout (recurring-billing consent, first-box date estimate)",
  ],
  "Digital Products": [
    "Homepage - outcome-led hero, product preview (screenshots/sample pages), instant-access messaging",
    "Product Detail - what's-included list, format/file-type specs, preview/sample content",
    "Checkout - instant-delivery checkout, license-terms summary, no shipping-address fields",
    "Delivery/Access - post-purchase download page, license-key display, re-download policy",
    "FAQ/Licensing - usage rights, refund policy, support contact for access issues",
  ],
  // ── portfolio ──
  "Photographer": [
    "Homepage - full-bleed hero image or slideshow, minimal nav, signature-work teaser",
    "Portfolio/Galleries - category-organized galleries (weddings/portraits/commercial), lightbox viewer",
    "About - bio, equipment/style note, press features",
    "Booking/Inquiry - shoot-type selector, date-availability calendar, budget-range field",
    "Pricing/Packages - package tiers with deliverables (hours, edited photos, prints) spelled out",
  ],
  "Designer": [
    "Homepage - case-study-led hero, selected-work grid, discipline tags (brand/UI/motion)",
    "Case Studies - problem/process/outcome narrative per project, before/after or process imagery",
    "About - discipline focus, tools, notable clients or collaborations",
    "Services/Process - engagement model (retainer/project), typical timeline, deliverables list",
    "Contact - project-inquiry form (budget range, timeline, project type)",
  ],
  "Writer / Blogger": [
    "Homepage - featured-post hero, recent-posts feed, newsletter signup",
    "Blog/Articles - category/tag filtering, reading-time estimate, related-posts module",
    "Portfolio/Clips - published-work archive grouped by publication or topic",
    "About - bio, beat/expertise areas, press/speaking mentions",
    "Newsletter/Contact - subscribe form, pitch/collaboration inquiry form",
  ],
  "Developer": [
    "Homepage - concise intro, tech-stack badges, featured-projects grid",
    "Projects - repo-linked case studies (problem, stack, role, outcome), live-demo links",
    "Blog/Writing - technical-post archive with tag filtering",
    "About/Resume - skills matrix, work history, downloadable resume",
    "Contact - GitHub/LinkedIn links, availability-for-work status, contact form",
  ],
  "Artist": [
    "Homepage - full-bleed hero artwork, minimal chrome, exhibition/news ribbon",
    "Gallery/Collections - series-organized artwork grid, medium/size/year metadata per piece",
    "Shop/Prints - print-size and framing options, edition/limited-run indicator",
    "About/Statement - artist statement, biography, exhibition history",
    "Contact/Commissions - commission-inquiry form (medium, size, budget, timeline)",
  ],
  // ── saas ──
  "Dashboard": [
    "Auth - sign up/sign in, SSO options, password reset, email-verification state",
    "Onboarding - guided setup checklist, empty-state illustrations with first-action prompts",
    "Dashboard/Home - key-metric summary cards, recent-activity feed, primary-action shortcuts",
    "Settings - account, team/roles, notification preferences, API keys",
    "Billing - plan/usage summary, invoice history, upgrade/downgrade flow, payment-method management",
  ],
  "Landing + App": [
    "Marketing Homepage - value-prop hero, feature highlights, social proof, pricing CTA",
    "Pricing - tier comparison table, feature checklist per tier, billing FAQ",
    "Auth - sign up/sign in gate between the marketing site and the app shell",
    "App Shell - persistent nav/sidebar, primary workspace view, in-app onboarding tooltip sequence",
    "Settings & Billing - account settings, plan management, usage-limit display",
  ],
  "Developer Tool": [
    "Homepage - technical value prop, code-sample hero, install-command copy-block",
    "Docs - getting-started guide, API reference, code-sample tabs per language",
    "Dashboard - API-key management, usage/rate-limit graphs, project/environment switcher",
    "Pricing - usage-based tier table, overage explanation, self-serve upgrade",
    "Changelog/Status - version history, uptime/status indicator",
  ],
  // ── landing ──
  "SaaS Product": [
    "Hero - one-sentence value prop, primary CTA (start free trial/demo), product screenshot or short video",
    "Social Proof - logo bar, quantified results strip, testimonial carousel",
    "Feature Highlights - 3-5 feature blocks each with a supporting screenshot/illustration",
    "Pricing Preview - condensed tier comparison linking to the full pricing page",
    "Final CTA - restated value prop, low-friction signup form (email only)",
  ],
  "Personal Brand": [
    "Hero - name/title, one-line positioning statement, primary CTA (book a call/join list)",
    "Credibility Strip - logos of press, podcasts, or companies worked with",
    "Offer/Services - what you help people do and in what format (course/coaching/speaking)",
    "Testimonials - short quote cards with name, title, and result",
    "Final CTA - newsletter or booking form, one clear next step",
  ],
  "Course / Info Product": [
    "Hero - outcome-led headline, instructor credibility line, enroll CTA",
    "Curriculum - module-by-module breakdown of what's covered",
    "Instructor Bio - credentials and results that justify teaching authority",
    "Testimonials/Results - student outcome quotes, honest before/after framing",
    "Pricing & Enroll - price, payment-plan option, guarantee/refund policy, enroll CTA",
  ],
  "Event / Conference": [
    "Hero - event name/date/location, primary CTA (register), countdown timer",
    "Speakers/Agenda - speaker grid with bios, session schedule by track/time",
    "Venue & Travel - location map, hotel/travel recommendations, accessibility info",
    "Tickets/Pricing - ticket-tier comparison (early-bird/standard/VIP), group-rate note",
    "Sponsors/Partners - sponsor logo tiers, partnership-inquiry CTA",
  ],
}

// Generic fallback feature list used only if a subcategory somehow isn't
// recognized (should not normally happen given the closed CATEGORY_SUBCATEGORIES set).
export const GENERIC_FEATURES: string[] = [
  "Homepage - hero section stating the core value proposition, primary CTA, and key trust signals",
  "About - who this is for and why it exists",
  "Contact - a working inquiry form with clear success/error states",
]

// ─── Sections 6-10 content, category-specific ─────────────────────────────────

export const CATEGORY_CONTENT_NOTES: Record<WebsiteCategory, string[]> = {
  business: [
    "Headline formula: [outcome] for [specific audience] — lead with the customer's result, not the business's history.",
    "CTA language names the action and the object ('Book a Table', 'Schedule a Consultation') — never a bare 'Submit' or 'Learn More'.",
    "Every credential/trust claim (years in business, certifications, review counts) is a specific number, never 'many' or 'trusted by thousands'.",
    "Tone stays consistent across every service/page — write the About page as if the same person wrote the Services page.",
  ],
  ecommerce: [
    "Product titles lead with the searchable noun first, descriptors after: '[Product Name] - [Material/Key Feature]', not marketing adjectives first.",
    "CTA language is transactional and specific ('Add to Cart', 'Buy Now') — never a vague verb like 'Explore' on a purchase-intent page.",
    "Price, shipping estimate, and return window appear together near every add-to-cart control — separating them increases abandonment.",
    "Product descriptions answer 'what problem does this solve' before listing specs — specs alone don't sell.",
  ],
  portfolio: [
    "Case-study copy follows problem to process to outcome — never a bare image gallery with no narrative context.",
    "CTA language is low-pressure and specific to the inquiry type ('Start a Project', 'Check Availability') — avoid a generic 'Contact Me'.",
    "Bio copy leads with the specific discipline and a notable outcome, not a generic 'passionate creative' opener.",
    "Every project entry states the client/context (even anonymized) and the creator's specific role.",
  ],
  saas: [
    "Headline formula: [verb] + [specific outcome] + [without the usual friction point] - e.g. 'Ship features without waiting on ops'.",
    "CTA language distinguishes commitment level precisely: 'Start Free Trial' (low friction) vs 'Book a Demo' (high touch) — never blur the two.",
    "Feature copy leads with the job-to-be-done, technical mechanism second: 'Automatically retries failed jobs' before 'built on a distributed queue'.",
    "Empty states and error messages are written in the same product voice as the marketing copy — never a bare stack trace or generic 404.",
  ],
  landing: [
    "Hero headline states the single outcome in under 12 words — no compound claims, no semicolons.",
    "Every CTA on the page uses identical wording for the identical action — inconsistent CTA labels read as separate offers.",
    "Testimonial copy includes a specific, quantified result where honestly available, ranked above vague praise.",
    "No more than one primary CTA color/action per viewport — secondary actions are visually and verbally subordinate.",
  ],
}

export const CATEGORY_TECHNICAL_NOTES: Record<WebsiteCategory, string[]> = {
  business: [
    "Booking/reservation and contact forms validate required fields client-side before submit and show inline field-level errors.",
    "All location/map embeds lazy-load below the fold to protect initial page-load performance.",
    "Business hours and contact info live in a single shared data source referenced by every page, never hardcoded per page.",
    "Forms degrade gracefully with a mailto/tel fallback if a booking integration is unavailable.",
  ],
  ecommerce: [
    "Cart state persists across page reloads (localStorage or server session) — a refreshed page must never silently empty the cart.",
    "Product/variant data (price, stock, images) comes from a single structured data source consumed by listing, detail, and cart alike.",
    "Checkout is a controlled multi-step or single-page flow with explicit loading/error states on the payment step.",
    "Product images use responsive srcset / next-gen formats (WebP/AVIF) given how many images a catalog page loads at once.",
  ],
  portfolio: [
    "Gallery/lightbox components lazy-load images outside the viewport — a 40-image gallery must not block initial render.",
    "Case-study and gallery routing supports deep-linking to a single project or photo, not just in-page state.",
    "Contact/booking forms validate and show a clear success state — treat the inquiry form as the site's critical path.",
    "Video/motion content respects `prefers-reduced-motion` and never autoplays audio.",
  ],
  saas: [
    "Auth state (signed-in/out, verifying, error) is handled as an explicit state machine — no flash-of-wrong-content between states.",
    "Dashboard data fetching shows skeleton/loading states per widget, not a single full-page spinner blocking the whole shell.",
    "Billing/plan-limit logic reads from one source of truth shared by the pricing page, in-app upgrade prompts, and settings.",
    "API keys/secrets are never rendered in full after initial creation — show a masked value with a one-time reveal or regenerate flow.",
  ],
  landing: [
    "Page ships as a single fast-loading route — no client-side routing overhead for what is functionally one scroll-through page.",
    "The primary CTA form posts to a real or mocked endpoint with a visible success/error state — never a CTA that does nothing on click.",
    "All above-the-fold assets are optimized and preloaded; below-the-fold sections lazy-load.",
    "Countdown timers or urgency elements are driven by real data or clearly marked illustrative, never fake urgency hardcoded as static.",
  ],
}

export const CATEGORY_SEO_NOTES: Record<WebsiteCategory, string[]> = {
  business: [
    "Every location/service page has a unique title tag and meta description naming the specific service plus city/neighborhood.",
    "LocalBusiness structured data (schema.org) with address, hours, and phone is present on the homepage and contact page.",
    "Hero and gallery images are compressed and served responsively — target Largest Contentful Paint under 2.5s on mobile.",
    "Reviews/testimonials use Review/AggregateRating structured data only where the content is genuine and sourced.",
  ],
  ecommerce: [
    "Product pages use Product structured data (price, availability, rating) so listings can render rich results in search.",
    "Category/listing pages paginate with proper rel=next/prev or a crawlable fallback — never a JS-only infinite list with no indexable URLs.",
    "Product images are compressed and lazy-loaded except the first above-the-fold image; target near-zero Cumulative Layout Shift on grids.",
    "Canonical tags prevent duplicate-content issues between filtered/sorted variants of the same category page.",
  ],
  portfolio: [
    "Each case study/gallery has a unique, descriptive title tag — never a repeated generic 'Portfolio' title across every project page.",
    "Images are the primary content here — use descriptive alt text per piece (medium, subject), not decorative filler text.",
    "Serve appropriately sized images, not full-resolution originals, to keep Largest Contentful Paint fast despite image-heavy pages.",
    "Open Graph image/meta tags are set per project so shared links preview the actual work, not a generic homepage card.",
  ],
  saas: [
    "Marketing pages (homepage, pricing, docs) are server-rendered or statically generated for fast indexing; the authenticated app shell is not.",
    "Docs pages use descriptive, keyword-relevant titles per page — a generic 'Docs' title on every page hurts discoverability.",
    "Core Web Vitals target on the marketing site: LCP under 2.5s, CLS under 0.1, INP under 200ms.",
    "The pricing page includes FAQ structured data if it contains an FAQ block, improving rich-result eligibility for billing questions.",
  ],
  landing: [
    "A single title tag and meta description tightly matched to the ad/campaign intent driving traffic to this page.",
    "Target Largest Contentful Paint under 2s — landing pages are frequently paid-traffic destinations where speed directly affects conversion and ad quality score.",
    "Open Graph and Twitter Card tags are set explicitly since landing pages are heavily shared and linked from ads and social.",
    "No render-blocking third-party scripts above the fold — defer analytics/pixel scripts until after first paint.",
  ],
}

export const CATEGORY_INTERACTION_NOTES: Record<WebsiteCategory, string[]> = {
  business: [
    "Primary CTA buttons get a subtle hover lift/scale (1.02x) and shift to the palette's action-hover token, under 200ms.",
    "Booking/contact forms show inline success/error states with a gentle fade-in, never an abrupt layout jump.",
    "Scroll-reveal on service/feature blocks is subtle (8-12px translate + fade) and respects `prefers-reduced-motion`.",
    "Gallery/menu images use a soft zoom-on-hover (1.03x, 300ms ease) to signal interactivity without feeling gimmicky.",
  ],
  ecommerce: [
    "Add-to-cart triggers a brief confirming micro-animation (cart-icon bump or toast) so the action is never ambiguous.",
    "Product-card hover reveals a quick-view or secondary image swap within 150-200ms — fast enough to browse a grid quickly.",
    "Variant/size selection updates price and stock state instantly with no visible reflow or stale-data flash.",
    "Checkout-step transitions use a simple slide/fade under 250ms — never a hard page reload between steps.",
  ],
  portfolio: [
    "Gallery transitions (lightbox open/close, next/prev) are smooth and under 300ms — this is the core browsing interaction.",
    "Hover states on work-grid thumbnails reveal the project title/category as an overlay fade, not an abrupt tooltip.",
    "Page-to-page transitions between case studies can use a subtle shared-element or fade transition to reinforce a curated feel.",
    "All motion respects `prefers-reduced-motion` — a portfolio is often the worst place to force motion on a sensitive visitor.",
  ],
  saas: [
    "State transitions (loading to success to error) use short, purposeful animations under 200ms — motion must never feel like it's in the user's way.",
    "Sidebar/nav expand-collapse and modal open/close use consistent easing and duration across the whole app.",
    "Data updates (new row, changed metric) get a brief highlight/flash rather than an instant silent change.",
    "Skeleton loaders match the exact shape of the content they replace — generic gray boxes across different widgets feel unfinished.",
  ],
  landing: [
    "Hero entrance animation (fade/slide, under 600ms) runs once on load and never re-triggers on scroll-back-up.",
    "Scroll-triggered reveals on feature/testimonial sections are consistent in direction and timing throughout the page.",
    "CTA buttons get the most confident hover state (scale/color shift) on the page — it's the single most important interactive element.",
    "All animation respects `prefers-reduced-motion`, and none of it delays the CTA becoming clickable.",
  ],
}

export const CATEGORY_CONSTRAINT_NOTES: Record<WebsiteCategory, string[]> = {
  business: [
    "Do not build a full CMS/admin panel — content is static/config-driven unless a CMS integration is explicitly requested.",
    "Do not implement payment processing beyond a deposit/booking fee, if any — this is a service site, not a storefront.",
    "Do not fabricate reviews, review counts, or credentials — leave clearly marked placeholder content where real data isn't provided.",
  ],
  ecommerce: [
    "Do not build a custom payment gateway — integrate with a standard provider's client SDK/checkout flow using placeholder keys.",
    "Do not implement inventory/warehouse management — product stock is a simple flag/count, not a fulfillment system.",
    "Do not fabricate review content or star ratings — use clearly marked placeholder/sample data structures instead.",
  ],
  portfolio: [
    "Do not over-engineer the stack — a portfolio needs fast static/SSG rendering, not a complex client-state architecture.",
    "Do not autoplay audio or video under any circumstance.",
    "Do not fabricate client names/logos without an explicit placeholder/anonymization pattern if real client data isn't provided.",
  ],
  saas: [
    "Do not build real payment/subscription billing logic — wire the billing UI to mocked plan/usage data unless told otherwise.",
    "Do not implement a full permissions/roles backend — model roles in the UI and data layer; backend enforcement is out of scope here.",
    "Do not skip empty/loading/error states for any data-driven view — a dashboard with only the happy path built is incomplete.",
  ],
  landing: [
    "Do not add site-wide navigation beyond jumping between this page's own sections — a landing page is intentionally single-purpose.",
    "Do not bury the primary CTA below multiple competing offers — one page, one primary action.",
    "Do not fabricate quantified results or testimonials — mark placeholder metrics clearly if real numbers aren't supplied.",
  ],
}

export const DELIVERABLE_FORMAT_NOTE =
  "DELIVERABLE FORMAT: production-ready markup/components for the target platform's environment — fully working pages and states, not a static image, wireframe description, or design mockup."
