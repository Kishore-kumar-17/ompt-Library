# 05 — Epics & Stories
## Work Breakdown · dpecom_platform_01
### Neo-Brutalist Digital Creator Marketplace

---

## Epic 1: Creator Onboarding

### Story 1.1 — Username URL Claim
**As a** creator,
**I want** to claim a unique `/username` URL during signup,
**so that** I have a single shareable link that represents my storefront.

**Acceptance criteria:**
- [ ] Username input validates against `^[a-zA-Z0-9_-]{3,30}$`; inline Zod error shown for invalid patterns
- [ ] `POST /api/auth/claim-username` checks uniqueness via case-insensitive `ILIKE` on `profiles.username`
- [ ] Duplicate returns `{ error: 'USERNAME_TAKEN' }`; "This handle is taken" shown without page reload
- [ ] On success: `profiles` row created; redirect to `/[username]/dashboard`
- [ ] `/[username]` is a Next.js dynamic segment; `generateMetadata` sets `<title>` to creator's display name
- [ ] TypeScript: Zod schema `z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/)`

### Story 1.2 — Bio and Avatar Upload
**As a** creator,
**I want** to add a bio and profile picture with a Brutalist layout,
**so that** visitors immediately recognise my brand and style.

**Acceptance criteria:**
- [ ] Avatar upload: JPEG / PNG / WEBP ≤ 2MB; stored at `avatars/{userId}/avatar` in Supabase Storage
- [ ] Avatar rendered at `80px × 80px`; `border: 3px solid #000000`; `border-radius: 0`
- [ ] `grep -r "border-radius" src/components/CreatorProfile` → zero results
- [ ] Bio `<textarea>`: max 280 chars; counter renders `{remaining}/280`; `border: 2px solid #000000; border-radius: 0`
- [ ] Profile `<h1>`: Inter Black 900, `font-size: 40px`, `line-height: 1.0`
- [ ] Save calls `PATCH /api/profile`; success toast: `background: #000000; color: #FFFFFF`; auto-dismisses at 2s

### Story 1.3 — Connect Stripe for Payouts
**As a** creator,
**I want** to connect my Stripe account for payouts,
**so that** I receive sale proceeds automatically.

**Acceptance criteria:**
- [ ] "Connect Stripe" initiates Stripe Connect Express OAuth: `POST /api/connect/init` returns `accountLink.url`
- [ ] Callback at `/connect/callback?code=...`; server calls `stripe.oauth.token({ code })` to exchange for `access_token`
- [ ] On success: `profiles.stripe_account_id` set; dashboard shows "Payouts Active" in `color: #16A34A`
- [ ] TypeScript: `stripe_account_id: string | null` — null renders "Connect Stripe" CTA; non-null renders "Payouts Active"
- [ ] RLS: `SELECT stripe_account_id FROM profiles WHERE id = auth.uid()` — only authenticated owner can read
- [ ] No client-side disconnect option; removal only via admin panel

---

## Epic 2: Product Management

### Story 2.1 — Secure File Upload (up to 500MB)
**As a** creator,
**I want** to upload digital files up to 500MB to secure storage,
**so that** buyers can download them after purchase.

**Acceptance criteria:**
- [ ] Upload uses presigned URL: `POST /api/products/upload-url` returns a Supabase signed upload URL
- [ ] Files > 500MB rejected client-side before upload; error: "File must be under 500MB"
- [ ] `<progress aria-label="Uploading file" aria-valuenow={percent}>` updated each tick
- [ ] On success: `products.file_url` set to storage path; `products.is_published` stays `false` until explicit publish
- [ ] `/api/download?orderId=` validates `orders.status = 'succeeded'` then calls `createSignedUrl(path, 3600)`
- [ ] `file_url` SELECT-restricted by RLS to the owning creator; buyers access only via the signed-URL endpoint

### Story 2.2 — Pay What You Want Pricing
**As a** creator,
**I want** to set "Pay what you want" with a minimum price floor,
**so that** buyers choose their price while I guarantee a minimum earn.

**Acceptance criteria:**
- [ ] `products.min_price` stored in cents; minimum floor is `100` ($1.00); `0` = free product
- [ ] Free products: checkout skips Stripe and creates `orders` row with `status = 'free'` directly
- [ ] Checkout price input: `amount < min_price` shows "Minimum is $X.XX" inline error before submit
- [ ] TypeScript: `validateAmount(amount: number, minPrice: number): boolean` — `false` when `amount < minPrice`
- [ ] `POST /api/checkout` rejects `amount < products.min_price` server-side with 400 `{ error: 'BELOW_MINIMUM' }`
- [ ] Product form: two modes — "Fixed Price" (single input) vs "Pay What You Want" (min + suggested price fields)

### Story 2.3 — Tags and Categories
**As a** creator,
**I want** to add tags and categories to my products,
**so that** buyers can discover them through filters.

**Acceptance criteria:**
- [ ] `products.tags text[]`: max 5 tags; normalised to lowercase on save; duplicates silently deduplicated
- [ ] TypeScript: `type ProductCategory = 'design' | 'code' | 'writing' | 'music' | 'photo' | 'other'`
- [ ] Tag pills: `background: #000000; color: #FFFFFF; border-radius: 0; padding: 2px 8px`
- [ ] Tag input: comma-separated or Enter key to add
- [ ] Filter query uses Supabase `.contains('tags', [selectedTag])` — server-side, not client array filter
- [ ] `grep -r "border-radius" src/components/TagPill` → zero results

---

## Epic 3: The Buying Experience

### Story 3.1 — Checkout Overlay
**As a** buyer,
**I want** to open the Checkout Overlay from any product card,
**so that** I can purchase without leaving the marketplace grid.

**Acceptance criteria:**
- [ ] "Buy" button calls `useCheckoutStore.open(productId)`; no page navigation
- [ ] Overlay slides up: `transform: translateY(100%)` → `translateY(0)`, `transition: transform 300ms ease-out`
- [ ] `role="dialog"`, `aria-modal="true"`, `aria-label="Checkout"` on overlay root
- [ ] Focus trapped on open; Esc closes and returns focus to the triggering button
- [ ] Rendered via React portal into `document.body`; `z-index: 9999`
- [ ] `grep -r "border-radius" src/components/CheckoutOverlay` → zero results

### Story 3.2 — Card / Apple Pay / Google Pay
**As a** buyer,
**I want** to pay via Card, Apple Pay, or Google Pay in a single screen,
**so that** checkout takes under 30 seconds.

**Acceptance criteria:**
- [ ] Stripe Payment Element (not legacy `CardElement`) used; card, Apple Pay, Google Pay auto-detected per browser
- [ ] `POST /api/checkout` creates PaymentIntent with server-validated `amount ≥ products.min_price`
- [ ] Payment Element appearance: `{ theme: 'flat', variables: { borderRadius: '0px', colorPrimary: '#000000' } }`
- [ ] Apple Pay / Google Pay rendered only when `PaymentRequest` API available — no manual navigator detection
- [ ] `stripe.confirmPayment` resolved `status: 'succeeded'` → UI transitions to "Download Ready" screen
- [ ] Stripe error message below Payment Element; affected input border `#DC2626`

### Story 3.3 — Immediate Download Link
**As a** buyer,
**I want** to receive an immediate download link post-purchase,
**so that** I get my file without waiting for an email.

**Acceptance criteria:**
- [ ] Webhook `payment_intent.succeeded` → `/api/webhooks/stripe`: creates `orders` row `status = 'succeeded'`
- [ ] Signature verified: `stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)` — unverified returns 400
- [ ] `/download/[orderId]`: server validates `orders.status = 'succeeded'` and buyer identity before generating signed URL
- [ ] Signed URL valid for 3600 seconds; expired URL renders "Link expired — request a new one" with re-send form
- [ ] Confirmation UI: file name, formatted size ("4.2 MB"), large "Download File" CTA
- [ ] TypeScript: `type OrderStatus = 'pending' | 'succeeded' | 'failed' | 'free'`

---

## Epic 4: Discovery

### Story 4.1 — Trending Marketplace Grid
**As a** visitor,
**I want** to browse trending products on the homepage,
**so that** I can discover creators without knowing what I'm looking for.

**Acceptance criteria:**
- [ ] Homepage is a Next.js Server Component with `revalidate = 60` (ISR)
- [ ] Products query: `.select('*').eq('is_published', true).order('created_at', { ascending: false }).limit(24)`
- [ ] Grid: `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px`
- [ ] Product card: `border: 2px solid #000000; border-radius: 0; box-shadow: 4px 4px 0 #000000`
- [ ] Each card: square thumbnail (`aspect-ratio: 1 / 1`), product name `<h2>`, creator `@username`, price badge
- [ ] Empty state: "No products yet. Be the first to sell something." — no shimmer or placeholder skeletons

### Story 4.2 — Search
**As a** visitor,
**I want** to search by creator username or product name,
**so that** I can find specific items quickly.

**Acceptance criteria:**
- [ ] Search input in top navigation; `placeholder="Search products and creators..."`
- [ ] Client debounces input at 300ms before navigating to `/search?q={query}`
- [ ] Server query: `.textSearch('search_vector', query, { type: 'websearch' })`
- [ ] `search_vector` is a `tsvector` generated column combining `products.name` and `profiles.username`; updated by DB trigger
- [ ] Zero-result state: "No results for '{query}'" — no recommendations or sponsored results
- [ ] TypeScript: `type SearchResult = { id: string; type: 'product' | 'creator'; name: string; url: string }`

### Story 4.3 — Free / Paid Filter
**As a** visitor,
**I want** to filter the marketplace by "Free" or "Paid",
**so that** I can browse only what fits my budget.

**Acceptance criteria:**
- [ ] Tabs: "All" | "Free" | "Paid" as `<button role="tab" aria-selected={isActive}>`
- [ ] "Free" filter: `.eq('min_price', 0)`; "Paid" filter: `.gt('min_price', 0)` — both include `.eq('is_published', true)`
- [ ] Active tab: `background-color: #000000; color: #FFFFFF; border-radius: 0`
- [ ] Filter state in URL param `?filter=free|paid|all`; `useSearchParams()` reads on mount
- [ ] Switching filter does not scroll to top; grid updates in-place
- [ ] Product count beside each tab label: "Free (12)"; derived from same filtered query
