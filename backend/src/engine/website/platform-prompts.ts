// ─── Website Formula — Per-Platform Adaptation ─────────────────────────────────
// Appended to WEBSITE_FORMULA (./system-prompts.ts) to tell the model how to
// reshape the 10-section base prompt for each target platform's actual
// prompting style — matches format-reference/standalone-prompt-format.md's
// 8 platform versions.

export const WEBSITE_PLATFORM_FORMULAS: Record<string, string> = {
  lovable: `Platform: Lovable
Tone: Structured, implementation-ready. Lovable reads natural language but performs best with explicit Tailwind classes and TypeScript types.

FORMAT REQUIREMENTS:
1. Open with a Tailwind config code block — extend colors, fontFamily, borderRadius, and keyframes. Use exact hex tokens from Section 5.
2. Define TypeScript interfaces for all data shapes (NavItem, Feature, Testimonial, PricingTier, FooterLink). Include JSDoc comments on each field.
3. Component build order — list every component in dependency order. For each component, specify:
   - Component name and file path (e.g., "components/Hero.tsx")
   - Key Tailwind classes for layout (grid/flex, gap, padding, responsive prefixes)
   - Interactive behavior (hover states, transitions, click handlers)
   - Props interface reference
4. Anti-pattern enforcement — end with a numbered list:
   - No inline styles — all styling via Tailwind utility classes
   - No \`any\` types — every prop and state value is typed
   - No default exports on utility files — use named exports
   - No px units in Tailwind — use the spacing scale (p-4 not p-[16px])
   - No color literals — reference tailwind.config theme tokens
5. Verification command: \`tsc --noEmit && npm run build\` must pass clean.`,

  chatgpt: `Platform: ChatGPT Canvas
Tone: Code-heavy, explicit. Canvas generates best with complete type systems and runnable setup commands.

FORMAT REQUIREMENTS:
1. Setup block — bash commands to scaffold the project:
   \`\`\`
   npx create-next-app@14 project-name --typescript --tailwind --app --src-dir
   cd project-name && npm install [specific packages]
   \`\`\`
2. Complete type system — define ALL TypeScript interfaces and types in a single types.ts listing. Include union types for variants (ButtonVariant = "primary" | "secondary" | "ghost").
3. Utility functions — provide full implementations for helpers (cn() classname merger, formatCurrency, truncateText). Show the actual code, not descriptions.
4. State management — define a Zustand store (or React context) with typed state shape, actions, and selectors. Show the complete store code.
5. Route list — enumerate every route with its page component, data requirements, and metadata:
   - / → HomePage — static, metadata: title + description + OG image
   - /about → AboutPage — static, metadata: ...
   - /contact → ContactPage — client component with form state
6. For each page component, specify the section composition (which components render in what order) and key Tailwind layout classes.
7. End with: "All code must compile with \`tsc --strict --noEmit\`. No implicit any. No unused variables."`,

  bolt: `Platform: Bolt.new
Tone: File-structure-first. Bolt generates entire projects from a file tree — front-load the architecture.

FORMAT REQUIREMENTS:
1. Complete file tree with descriptions — list every file the project needs:
   \`\`\`
   src/
     app/
       layout.tsx        — root layout with font loading, metadata, body classes
       page.tsx          — home page with Hero, Features, CTA sections
       about/page.tsx    — about page with team grid and mission statement
       contact/page.tsx  — contact form with validation
     components/
       ui/Button.tsx     — variant button (primary/secondary/ghost) with size props
       ui/Card.tsx       — content card with image, title, description, link
       layout/Nav.tsx    — responsive nav with mobile hamburger menu
       layout/Footer.tsx — 4-column footer with newsletter signup
       sections/Hero.tsx — full-width hero with gradient overlay
       ...
     lib/
       utils.ts          — cn() helper, constants
       types.ts          — all TypeScript interfaces
     styles/
       globals.css       — Tailwind directives, CSS custom properties
   tailwind.config.ts    — extended theme with design tokens
   \`\`\`
2. Key component implementations — for the 3-4 most complex components, provide the JSX structure with Tailwind classes. Show the actual markup, not descriptions.
3. Responsive behavior notes — specify what changes at each breakpoint for complex layouts (grid columns, visibility, spacing).
4. QA bash checks — end with verification commands:
   \`\`\`
   npx tsc --noEmit
   npm run build
   npx next lint
   \`\`\``,

  v0: `Platform: v0 by Vercel
Tone: Visual-first, component-focused. v0 excels at individual component generation with Tailwind + shadcn/ui.

FORMAT REQUIREMENTS:
1. Tailwind theme aliases — define all custom colors, fonts, and spacing on a single line each for quick parsing:
   colors: primary=#hex secondary=#hex accent=#hex background=#hex foreground=#hex muted=#hex
   fonts: heading="Font Name" body="Font Name"
   radius: sm=Xpx md=Xpx lg=Xpx
2. Component specifications — for each major component (3-4 minimum), provide the FULL JSX with Tailwind classes:
   \`\`\`tsx
   // Hero.tsx
   <section className="relative min-h-[90vh] flex items-center justify-center bg-[var(--background)]">
     <div className="max-w-4xl mx-auto text-center px-4">
       <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-heading font-bold tracking-tight text-[var(--foreground)]">
         {headline}
       </h1>
       ...
     </div>
   </section>
   \`\`\`
3. shadcn/ui components to use — list specific shadcn components (Button, Card, Dialog, Sheet, NavigationMenu) with their variant props.
4. Anti-pattern enforcement:
   - No custom CSS — Tailwind utilities only
   - No div soup — use semantic HTML (section, nav, main, article, aside)
   - No hardcoded strings — extract to constants or props
   - Mobile-first: write base styles for mobile, add sm:/md:/lg: for larger screens`,

  claude: `Platform: Claude Artifacts
Tone: Constraint-driven. Artifacts work best with explicit rules, concrete examples of right vs wrong, and self-contained code.

FORMAT REQUIREMENTS:
1. Constraint blocks — list N rules, each with a WRONG and RIGHT code example:
   Rule 1: Use semantic color tokens, not raw hex in components
   WRONG: \`className="bg-[#1a1a2e] text-[#e94560]"\`
   RIGHT: \`className="bg-background text-accent"\` (with tokens defined in globals.css)

   Rule 2: Responsive type uses clamp(), not breakpoint overrides
   WRONG: \`className="text-2xl md:text-3xl lg:text-5xl"\`
   RIGHT: \`className="text-[clamp(1.5rem,4vw,3rem)]"\`

2. Folder structure — flat listing with purpose annotations:
   app/layout.tsx — root layout, loads fonts, wraps with providers
   app/page.tsx — home page composition
   components/Hero.tsx — hero section (server component)
   ...

3. globals.css specification — show the complete CSS custom properties block:
   \`\`\`css
   :root {
     --background: #hex;
     --foreground: #hex;
     --primary: #hex;
     --accent: #hex;
     ...
   }
   \`\`\`

4. QA checklist — numbered verification items:
   1. Every color reference uses CSS custom properties, not raw hex
   2. All text sizes use clamp() — grep for "text-[0-9]" should return 0 results
   3. Every interactive element has focus-visible outline
   4. prefers-reduced-motion media query exists for all animations
   5. No orphaned components (every component is imported somewhere)`,

  grok: `Platform: Grok
Tone: List-based, compact. Grok performs best with minimal prose and maximum structure. No full code blocks — file names and descriptions only.

FORMAT REQUIREMENTS:
1. Project summary — 2-3 sentences maximum. Tech stack, purpose, page count.
2. Numbered file list (15-25 files) — each entry is the file path and a 1-line description:
   1. tailwind.config.ts — extend colors (primary:#hex, secondary:#hex, accent:#hex), fonts, border-radius
   2. app/globals.css — Tailwind directives, CSS custom properties, base resets
   3. app/layout.tsx — root layout with Inter+display font, metadata, body wrapper
   4. app/page.tsx — home: Hero, LogoBar, Features(3-col grid), Testimonials, CTA
   5. components/Nav.tsx — sticky nav, logo left, links center, CTA button right, mobile Sheet
   ...
3. Rules block — 5-8 one-line rules:
   - All colors via theme tokens, no raw hex in components
   - clamp() for all text sizing
   - Mobile-first responsive (base → sm → md → lg)
   - prefers-reduced-motion: reduce for all transitions
   - Semantic HTML only (no div-only layouts)
   - WCAG AA contrast on all text
4. No full code implementations. No JSX. No CSS blocks. File names + descriptions + rules only.`,

  gemini: `Platform: Gemini
Tone: Layered, design-system-first. Gemini responds well to structured layers — define the system, then the pages, then the behavior.

FORMAT REQUIREMENTS:
1. Design system rules — N numbered rules defining the visual language:
   Rule 1: Primary palette — list each color with hex, usage, and WCAG contrast ratio against background
   Rule 2: Typography scale — each level (h1-h6, body, caption) with font, weight, and clamp() size
   Rule 3: Spacing — base unit and multiplier scale
   Rule 4: Component radius — values per component type (buttons, cards, inputs, modals)
   Rule 5: Shadow elevation — levels (sm, md, lg) with exact CSS shadow values

2. Color rules with contrast ratios — for each text/background pair, state the contrast ratio:
   - #foreground on #background → ratio:1 (WCAG AA: pass/fail)
   - #primary on #background → ratio:1

3. Architecture layers — describe the app in N layers:
   Layer 1: Layout shell (Nav + Footer + page wrapper + metadata)
   Layer 2: Shared components (Button, Card, Input, Badge — with variant props)
   Layer 3: Section components (Hero, FeatureGrid, Pricing, Testimonials, CTA)
   Layer 4: Page compositions (which sections render on which pages, in what order)

4. Motion specification with useReducedMotion:
   - List each animation (fade-in, slide-up, scale) with duration, easing, and delay
   - Provide the reduced-motion alternative for each (opacity:1 instant, no transform, etc.)

5. Functional requirements — numbered list of interactive behaviors:
   1. Mobile nav: Sheet component, slides from right, backdrop blur, body scroll lock
   2. Contact form: client-side validation, honeypot spam field, success toast
   ...`,

  cursor: `Platform: Cursor AI
Tone: Code-complete, copy-paste ready. Cursor works best with actual file implementations it can place directly.

FORMAT REQUIREMENTS:
1. File implementations — provide complete, working code for every key file. Each as a code block with the file path as a comment on line 1:
   \`\`\`tsx
   // tailwind.config.ts
   import type { Config } from "tailwindcss";
   const config: Config = {
     content: ["./src/**/*.{ts,tsx}"],
     theme: {
       extend: {
         colors: { primary: "#hex", secondary: "#hex", accent: "#hex", background: "#hex", foreground: "#hex" },
         fontFamily: { heading: ["Font", "sans-serif"], body: ["Font", "sans-serif"] },
         borderRadius: { DEFAULT: "Xpx", lg: "Xpx" },
         keyframes: { "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } } },
         animation: { "fade-in": "fade-in 0.5s ease-out" },
       },
     },
     plugins: [],
   };
   export default config;
   \`\`\`

   \`\`\`tsx
   // src/app/layout.tsx
   // ... complete implementation
   \`\`\`

   \`\`\`tsx
   // src/components/Nav.tsx
   // ... complete implementation with mobile menu, responsive behavior
   \`\`\`

2. Provide implementations for: tailwind.config.ts, globals.css, layout.tsx, every page file, and the 4-5 most complex components. Simpler components can be described in 1-2 lines.

3. Absolute rules — end with enforcement:
   - Zero \`any\` types in the entire codebase
   - Zero inline styles — Tailwind utilities exclusively
   - Every component file exports exactly one named component
   - All images use next/image with width, height, and alt props
   - All links use next/link, never raw <a> tags for internal routes

4. Verification — bash grep commands to validate:
   \`\`\`bash
   # Should return 0 results:
   grep -r "style={{" src/
   grep -r ": any" src/
   grep -r "<a href" src/ | grep -v "http"
   \`\`\``,
};
