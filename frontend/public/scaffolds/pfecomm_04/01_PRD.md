# 01 — Product Requirements Document
## Indian D2C Youth Fashion Brand · pfecomm_platform_04

---

## Product Vision

A youth-first, India-native D2C fashion brand store. Personality: bold, playful, accessible. The store sells graphic tees, printed hoodies, sweatshirts, and crop tops — all at affordable mass-market price points (₹399–₹899 per item). The combo deal (3 tees for ₹1,199) is the most important conversion mechanic on the site.

---

## Personas

### Persona 1 — Aarav, 19, Engineering Student
- Discovers via Instagram Reels; lands directly on a product page
- Buys 3–4 tees at a time to hit the combo deal
- Cares about print design and reference (Star Wars, Marvel, streetwear slogans)
- Pain point: wants to know if the print looks the same IRL as in the photo
- Acceptance criterion: UGC "Community Looks" strip visible on every PDP

### Persona 2 — Sneha, 22, Working Professional
- Regular buyer; checks "New Arrivals" and has a wishlist of pending purchases
- Interested in Bewakoof Coins — saves them for future discounts
- Pain point: forgets how many coins she has
- Acceptance criterion: `coinsEarned` shown on PDP below price block; no redemption UX in this build

### Persona 3 — Rohit, 17, High School Student
- First-time buyer, driven by a licensed graphic (Friends TV show tee)
- Buys only one item initially; might add more for combo
- Pain point: doesn't know what "combo" means
- Acceptance criterion: ComboProgress component explains the deal in plain language on PDP

### Persona 4 — QA Reviewer
- Verifies brand consistency, accessibility, and that no countdown timers appear
- Acceptance criterion: Lighthouse ≥90/90; no hex in CSS Module files; black text on yellow buttons everywhere

---

## Functional Requirements

### FR-001: Color system — yellow brand + black CTA text
- `globals.css` has exactly 7 `--color-*` tokens
- `--color-brand` is yellow `hsl(47deg 100% 60%)`
- All CTA buttons use `background: var(--color-brand); color: var(--color-text)` (black text)
- No white text on yellow anywhere in the codebase

### FR-002: Card design — shadows + rounded images
- Every product card: `border-radius: 16px` on image wrapper
- Rest state: `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`
- Hover state: `box-shadow: 0 4px 16px rgba(0,0,0,0.14); transform: translateY(-2px)`
- All CTA buttons: `border-radius: 8px`

### FR-003: PrintStyle taxonomy
- `PrintStyle` type: `'hyperprint' | 'minimal' | 'acid-wash' | 'typography' | 'solid' | 'graphic' | 'licensed'`
- `PRINT_LABELS: Record<PrintStyle, string>` in `src/types/index.ts` maps to display strings
- Product card shows badge ONLY when `product.printStyle !== 'solid'`
- Licensed prints (printStyle === 'licensed') show the `collection` field value instead of generic label

### FR-004: Combo deal system
- `COMBO_QTY = 3` and `COMBO_PRICE = 1199` exported from `src/lib/utils.ts`
- `getComboSavings(items: CartItem[]): number` — computes total combo discount in cart
- `getComboProgress(items: CartItem[]): { count: number; neededForNext: number }` — returns progress toward next combo
- Both functions live in `src/lib/utils.ts` — not in the store
- `comboEligible: boolean` on `Product` — true for tshirts and crop-tops only
- `ComboProgress` component: shown on PDP when `product.comboEligible`, and in CartDrawer footer

### FR-005: Per-color images
- `ColorOption` has `images: string[]` — different photography per tee color (white tee vs black tee)
- Selecting a color on card or PDP updates the displayed image
- Same behavior as pfecomm_01/02 — instant swap, no transition

### FR-006: Coins display
- `coinsEarned: number` on `Product` — typical range 30–60 coins per item
- Shown below price block on PDP: "Earn {N} Bewakoof Coins on this order"
- Shown on product card: small coin icon + number
- NO redemption UI — no "Apply coins" input, no coins balance fetching
- Display only

### FR-007: UGC "Community Looks"
- On every PDP: a static strip of 4 community photos below product accordions
- Labeled "Community Looks — Real people, real style"
- Images are placeholder/mock in this build (use solid color blocks or placeholder URLs)
- No user upload functionality

### FR-008: INR pricing + discount display
- `formatINR(amount: number): string` in `src/lib/utils.ts`
- All prices: `₹X,XXX` format, no decimals
- Discount badge on card: `getDiscountPercent(mrp, price)` — show ONLY when `price < mrp`
- Red badge (`var(--color-discount)`), white text, `border-radius: 4px`
- MRP shown strikethrough on card and PDP only when discounted

### FR-009: Cart with combo awareness
- Zustand cart store persisted to `'bewakoof-cart'`
- Cart drawer footer shows `ComboProgress` when any combo-eligible items in cart
- Checkout button: yellow background, black text, `border-radius: 8px`, `48px` height
- Free shipping at ₹499

### FR-010: 4-column product grid
- Desktop (1280px+): 4 columns (not 5 — that is AJIO)
- Tablet (768px+): 2 columns
- Mobile: 2 columns (smaller gap)
- `gap: 16px` desktop

### FR-011: Montserrat single font
- Montserrat loaded via `next/font/google`, weights 400/500/600/700/800
- Applied as `--font-sans` on `<html>`
- No serif face, no display font pairing
- Lighthouse CLS: 0

### FR-012: Print description on PDP
- `printDescription?: string` on `Product` — optional text describing the graphic
- If present, shown below product name on PDP in muted text
- e.g. "The Dark Side Force Quote Print"

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥90 |
| WCAG AA contrast | All text elements must pass (black text on yellow = 14:1 ✓) |
| TypeScript strict mode | Zero `tsc --noEmit` errors |
| No hex in CSS Module files | Zero results on grep |
| Build output | `npm run build` succeeds |

---

## Out of Scope

- Actual coins redemption or balance management
- User accounts / login
- Real payment processing
- Countdown timers of any kind
- Wishlist persistence (basic wishlist button is acceptable; separate store is not required)
- Size guide modal (sizes shown in selector only)
