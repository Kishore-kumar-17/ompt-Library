# 01 — Product Requirements Document
## Interactive 3D World Portfolio · portfolio_platform_01

---

### 1. Product Vision

A portfolio website that demonstrates creative development ability through its own existence. The visitor navigates a physics-enabled 3D world in a miniature car instead of scrolling through a page. Content is discovered geographically — you drive to the About zone, the Projects zone, the Skills zone, the Contact zone. The portfolio communicates expertise before any text is read.

**Success metric:** A visitor can discover all portfolio content within 3 minutes of the page loading, on both desktop and mobile.

---

### 2. Personas

**Primary: Potential employer / client**
- Visits from a link on LinkedIn, GitHub, or a job application
- Has 2–3 minutes to form an impression
- Expects to see: who this person is, what they've built, how to contact them
- Is impressed by the 3D experience itself — it's a live demo of the creator's skill
- Must be able to find all information even if they struggle with the controls

**Secondary: Fellow developer / conference attendee**
- Explores the world thoroughly, looking for Easter eggs
- Shares the link because the experience is worth sharing
- Will try every interaction (gamepad, honk, speed-running the circuit)

**Tertiary: Mobile user**
- Arrives on phone from a social link
- Must be able to drive using on-screen joystick
- All content panels must be readable on a 390px wide screen

---

### 3. Core Features

**3.1 3D World Navigation**
- Full-viewport Three.js canvas (React Three Fiber)
- Physics-enabled car (Rapier RigidBody)
- WASD + arrow key controls; on-screen joystick for touch
- Third-person camera: 8 units behind car, 4 units above, smooth lerp
- Invisible RigidBody boundary walls — car cannot leave the world

**3.2 Content Zones**
- Four zones: About, Projects, Skills, Contact
- Each zone marked by a glowing amber torus ring (zone marker)
- Proximity trigger: < 8 world units from zone center → ZonePanel opens
- Zone label floats above marker (Amatic SC, amber)

**3.3 Zone Panels (2D overlay)**
- Glassmorphic floating panel (bottom-centered on desktop, full-width on mobile)
- Framer Motion slide-up entry, slide-down exit
- Close: Escape key, click outside, ✕ button
- Content slots: About (bio + photo), Projects (cards with links), Skills (tag cloud), Contact (email + social)

**3.4 Loading Experience**
- Full-screen loading overlay while 3D scene and physics initialise
- Amatic SC title, amber progress bar, brief control hint ("WASD to drive")
- Disappears only when scene is fully ready

**3.5 HUD**
- Top-left: creator name + tagline (Amatic SC)
- Bottom-center: control hints (fade out after 8 seconds)
- Top-right: music toggle icon (defaults OFF)

**3.6 Audio**
- Car engine: looping sound, pitch varies with speed
- Collision: short thud on hitting objects
- Ambient background music: toggleable, OFF by default
- Howler.js for all audio management

**3.7 Mobile**
- On-screen joystick (bottom-left, touch only)
- Tap to interact with zone panel content
- Canvas scales to full viewport; panels are 92vw max on mobile

**3.8 Accessible Fallback**
- Routes `/about`, `/projects`, `/skills`, `/contact` serve static HTML content
- These routes are linked in a hidden skip-nav at page top
- No WebGL required for fallback routes

---

### 4. User Journeys

**Journey 1 — Employer in 3 minutes:**
Loading screen → car appears → drive toward nearest glowing ring → Projects panel opens → reads project descriptions + clicks live link → drives to Contact → copies email → done.

**Journey 2 — Mobile user:**
Loading screen → on-screen joystick visible → drives (touch) → reaches About zone → reads bio on 92vw panel → drives to Contact → taps email link.

**Journey 3 — Developer explorer:**
Drives all 4 zones → discovers hidden ramp Easter egg → tries gamepad → reads whisper board (optional community feature) → shares link.

**Journey 4 — Accessibility path:**
Visits `/projects` directly → sees static project list → navigates with keyboard → contacts via email link — zero 3D required.

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Blog or articles section | Not a portfolio requirement |
| NG2 | CMS-backed content | Static `content.ts` sufficient for V1 |
| NG3 | Multi-language | English-only for V1 |
| NG4 | Server-side rendering of 3D | Client-only Three.js |
| NG5 | Real-time multiplayer | Complex, not needed for solo portfolio |

---

### 6. Constraints

- Music defaults to OFF (browser autoplay policy — no exceptions)
- Loading overlay must not disappear until physics world is fully initialised
- Car must never escape world boundaries (Rapier walls)
- ZonePanel must be closable via 3 methods: Escape, click-outside, ✕ button
- Content must be discoverable without 3D — accessible fallback routes required
- No external CMS or database — all content in `src/data/content.ts`

---

### 7. Acceptance Criteria

- [ ] Car drives with WASD and arrow keys; physics-based movement
- [ ] Driving within 8 units of a zone marker opens the correct panel
- [ ] All 4 zones have content: About, Projects, Skills, Contact
- [ ] ZonePanel closes on Escape, click-outside, ✕
- [ ] Music is OFF by default; toggle works; preference persists to localStorage
- [ ] Loading screen disappears only when scene is ready
- [ ] On-screen joystick visible on touch devices; hidden on desktop
- [ ] `/about`, `/projects`, `/skills`, `/contact` serve readable static content
- [ ] Car cannot exit world boundaries
- [ ] All content readable on 390px wide screen (mobile ZonePanel)
- [ ] Lighthouse accessibility score ≥ 90 on fallback routes

---

### 8. Content Specification

**About zone content:**
- Name, role/tagline
- 2–3 sentence bio
- Photo (optional)
- Years of experience, location

**Projects zone content (3–6 projects):**
Each project: title, 1-sentence description, tech stack tags (3–5), live URL, GitHub URL, optional screenshot

**Skills zone content:**
Tag cloud: 15–25 skills grouped by category (Languages, Frameworks, Tools, 3D/Creative)

**Contact zone content:**
- Email address (obfuscated against scrapers)
- GitHub profile link
- LinkedIn link
- Twitter/X link (optional)
- Availability status (e.g. "Open to opportunities")

---

### 9. Edge Cases

| Scenario | Expected Behaviour |
|----------|-------------------|
| Visitor loads page with no WebGL support | Error boundary catches R3F mount failure → fallback links to `/about`, `/projects`, `/skills`, `/contact` |
| Visitor loads page with localStorage disabled | `musicEnabled` defaults to `false` on every load; no crash |
| Car spawns near a zone on first load | Panel does NOT open until after `isLoaded = true` (no premature panel) |
| Visitor drives between two zones simultaneously | Only nearest zone activates; no double-panel |
| Visitor rapidly opens and closes panel | `AnimatePresence` handles entry/exit queue; no broken animation state |
| Visitor opens panel then navigates away in browser history | Browser back closes the page; no phantom open panel |
| Mobile visitor taps inside panel | Tap events do not propagate to canvas (canvas click-outside close does not trigger) |
| Very slow connection | Loading screen persists with progress bar; never shows broken 3D mid-load |
| `prefers-reduced-motion: reduce` | All panel animations and zone marker animations disabled |
| No audio files present | Howler fails silently; no crash; engine/music just do not play |

---

### 10. Security Considerations

- **Email obfuscation:** `emailUser` and `emailDomain` are separate fields in `content.ts`, joined in JavaScript only. The raw `user@domain.com` string never appears in static HTML or the built JS bundle as a plain string — it is always a template literal evaluated at runtime.
- **External links:** All `target="_blank"` links include `rel="noopener noreferrer"` to prevent tab-napping and referrer leaks.
- **No authentication:** This is a read-only portfolio — there are no forms, no logins, no user data stored beyond the `musicEnabled` preference in localStorage.
- **No tracking:** V1 ships with no analytics. If added in V2, use privacy-respecting tools (Plausible.io) with no cookies.
- **Content Security Policy:** For Vercel deployment, add `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` headers in `vercel.json`.

---

### 11. Success Metrics

| Metric | Target | Measurement |
|--------|--------|------------|
| Time to discover all 4 zones | < 3 minutes | User testing (5 participants) |
| Mobile usability | Joystick functional, panel readable | Manual test on iOS + Android |
| Lighthouse Accessibility | ≥ 90 on fallback routes | Lighthouse CI |
| Loading speed | First 3D frame < 5s on 4G | Chrome DevTools throttled network |
| Zero JS errors | 0 console errors on load | Manual + Playwright E2E |
| Sharing rate | Shared by ≥ 10% of developer visitors | UTM tracking on shared link (V2) |

---

### 12. Out-of-Scope Clarifications

The following scenarios are explicitly NOT handled in V1 and should not be engineered for:

- **Server-side rendering of 3D:** `World3D` is client-only. SSR via Next.js is not needed — the portfolio is a demo, not an SEO-critical page. The fallback routes (`/about`, `/projects`) provide SSR-friendly content if needed in V2.
- **CMS integration:** Content lives in `src/data/content.ts`. An editor will update this file directly in code. No Contentful, Sanity, or Notion integration.
- **User accounts or saved state:** The only persisted data is `musicEnabled` in localStorage. No user logins, no session management.
- **Real-time features:** No WebSockets, no Supabase Realtime, no multiplayer. All state is local to one browser tab.
- **SEO-optimised 3D route:** The `"/"` route is a canvas — search engines will not index it. Fallback routes serve SEO needs if ever required.

**Decision:** If a feature is not in the acceptance criteria (section 7) or the content specification (section 8), do not build it in V1.

---

### 13. Stakeholder Sign-Off Checklist

Before launch, the portfolio owner reviews and approves:

- [ ] **Content:** All names, bio text, project descriptions, and URLs are correct in `content.ts`
- [ ] **Email:** Email address obfuscated correctly — confirm by inspecting page source, confirm link works
- [ ] **Projects:** All `liveUrl` and `githubUrl` values tested — no dead links
- [ ] **Photo:** Optional `owner.photoUrl` set or confirmed absent (no broken image)
- [ ] **Availability status:** `contact.availability` reflects current job-seeking status
- [ ] **Audio files:** `engine.mp3`, `collision.mp3`, `ambient.mp3` all present in `public/audio/`
- [ ] **Font file:** `AmaticSC-Bold.ttf` in `public/fonts/` — zone labels render in 3D
- [ ] **Domain:** Custom domain configured in Vercel/Netlify if not using the default `.vercel.app` URL
