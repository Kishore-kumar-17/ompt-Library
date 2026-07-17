# 05 — Epics and User Stories
## Health Food D2C Platform · ecomm_platform_02

---

## EPIC-001 — Foundation

Setup the project, Supabase schema, auth, cart store, and design system. No feature until this is complete.

---

**STORY-001-01: Project Initialisation**
As a developer, I need a running Next.js 14 project with all dependencies installed so I can start building features on a correct foundation.

Acceptance criteria:
- `npm run dev` starts without errors
- TypeScript strict mode enabled (`strict: true` in tsconfig)
- Space Grotesk (display) + DM Sans (body) loaded via `next/font/google`; `--font-display` and `--font-body` CSS variables applied on `<html>`
- All environment variables documented in `.env.example`
- `tsc --noEmit` exits 0

Dependencies: none
Estimate: 0.5 day

---

**STORY-001-02: Database Schema**
As a developer, I need all Supabase tables created with RLS enabled so data is correctly structured and secured.

Acceptance criteria:
- All tables from `02_Architecture.md` created: `profiles`, `products`, `product_flavours`, `pack_sizes`, `product_images`, `inventory`, `nutrition_facts`, `lab_reports`, `orders`, `order_items`, `email_subscribers`
- RLS enabled on all tables; anon user can read published products, cannot insert orders (webhook uses service role)
- `updated_at` triggers on `products` and `orders`
- `handle_new_user` trigger creates `profiles` row on `auth.users` insert
- `order_number_seq` sequence exists; `order_number` auto-populated on `orders`
- TypeScript: `OrderStatus = 'pending' | 'cod_pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'return_requested' | 'returned'`

Dependencies: STORY-001-01
Estimate: 1 day

---

**STORY-001-03: Authentication (Phone OTP + Email)**
As a visitor, I can sign up and log in via phone OTP or email/password so I access my account without remembering complex credentials.

Acceptance criteria:
- Phone OTP: `POST /api/auth/send-otp` → real SMS sent via Supabase + MSG91; `POST /api/auth/verify-otp` verifies and creates session
- Email login: `src/app/auth/login` renders email + password form
- Profile row created on signup via DB trigger
- Session persists across page refresh (`supabase.auth.getSession()`)
- Invalid OTP shows "Incorrect code — try again" inline error
- OTP expires in 5 minutes; "Resend OTP" available after 30 seconds

Dependencies: STORY-001-02
Estimate: 1 day

---

**STORY-001-04: Route Protection**
As a system, unauthenticated users cannot access `/account` or `/admin` routes so protected data stays private.

Acceptance criteria:
- Middleware checks session on all `/account/*` and `/admin/*` routes
- Unauthenticated → redirect to `/auth/login?next={originalPath}`
- Non-admin on `/admin/*` → redirect to `/`
- After login, redirect back to original destination via `next` param
- Admin check uses `profiles.role === 'admin'`

Dependencies: STORY-001-03
Estimate: 0.5 day

---

**STORY-001-05: Cart Store**
As a visitor, my cart persists across page refreshes without logging in so I can continue shopping after a break.

Acceptance criteria:
- Zustand store with `persist` middleware (localStorage key: `"hf-cart"`)
- Cart item key: `{productId}:{flavour}:{packSize}` — different flavour = separate line item; different pack size = separate line item
- `addItem` with matching key increments `quantity`; with new key adds new line item
- `subtotalInPaise` derived correctly: `items.reduce((s, i) => s + i.priceInPaise * i.quantity, 0)`
- Cart survives browser close and reopen
- TypeScript: `CartItem = { productId: string; name: string; flavour: string; packSize: string; priceInPaise: number; quantity: number; image: string; comboEligible?: boolean }`

Dependencies: STORY-001-01
Estimate: 0.5 day

---

**STORY-001-06: Design Tokens**
As a developer, all design values are available as CSS variables so components never hardcode colors or spacing.

Acceptance criteria:
- Background: `var(--bg-default)` — white (`#FFFFFF`)
- Warm sections: `var(--bg-warm)` — `#F4EBEF`
- Lavender sections: `var(--bg-lavender)` — `#E5E4F2`
- CTA buttons: `var(--cta)` — brand purple
- Button border-radius: `100px` (pill) — `rounded-full` in Tailwind
- Section alternation: white → warm → lavender — never two warm or two lavender adjacent
- `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty

Dependencies: STORY-001-01
Estimate: 0.25 day

---

## EPIC-002 — Product Catalog

Visitors can discover, browse, and view products including full ingredient transparency.

---

**STORY-002-01: Announcement Bar + Navbar**
As a visitor, I can see the announcement and navigate from any page so I'm always oriented in the site.

Acceptance criteria:
- Announcement bar: `40px` height, dismissible via close button, dismissed state saved to `localStorage` key `"hf-announce-dismissed"`
- Navbar: sticky, correct height, cart icon badge shows `cartStore.itemCount` from Zustand
- Cart badge updates live without page refresh
- Mobile: hamburger opens full-screen overlay nav
- `grep -r "rounded-lg\|rounded-md" src/components/layout/Navbar --include="*.module.css"` → empty (nav buttons use `rounded-full`)

Dependencies: EPIC-001 complete
Estimate: 1 day

---

**STORY-002-02: Homepage**
As a first-time visitor, I want to see the brand, featured products, and the `#nothingtohide` pledge so I understand what makes this brand different.

Acceptance criteria:
- All sections render with real Supabase data: hero, ingredient transparency strip, best sellers rail, testimonials, subscription upsell, newsletter capture
- `IngredientPanel` or ingredient transparency section NEVER inside an accordion — always visible
- Testimonials section: quote text + first name + last initial only — NO star ratings; `grep -r "StarRating\|star-rating\|⭐" src/components/home --include="*.tsx"` → empty
- Newsletter form: email input → `INSERT INTO email_subscribers` on submit
- Homepage is a Next.js Server Component — no `useEffect` for initial data fetching
- `grep -r "useEffect.*fetch\|useEffect.*supabase" src/app/page.tsx` → empty

Dependencies: EPIC-001 complete with seeded data
Estimate: 2 days

---

**STORY-002-03: Product Listing Page (PLP)**
As a visitor, I can browse and filter products by type so I find what I'm looking for quickly.

Acceptance criteria:
- Route: `/collections/[type]` — `type` slug matches `products.product_type`
- Filter chips: dietary tags (`Vegan`, `No Artificial Sweeteners`, `Low Calorie`)
- Sort dropdown: Newest, Price low–high, Price high–low, Bestsellers
- Filter/sort state in URL params (`?tag=vegan&sort=price_asc`); survives page refresh
- Product grid: 3 columns desktop, 2 mobile
- "Load more" button: 12 items per page, no infinite scroll
- 404 if `type` slug not found
- Dietary tag filter uses Supabase `.contains('dietary_tags', [tag])` — NOT client-side array filter

Dependencies: STORY-002-02
Estimate: 2 days

---

**STORY-002-04: Product Cards**
As a visitor browsing the grid, I want flavour swatches and quick-add on product cards so I can explore options without opening each PDP.

Acceptance criteria:
- Product image: `aspect-ratio: 1/1` (square), `border-radius: 16px`
- Hover over flavour dot → image swaps to that flavour's primary image (instant, no transition on `<img>`)
- Flavour dots: coloured circles with `title={flavour.name}` and `aria-label={flavour.name}`
- "Quick add" pill appears on card hover (desktop only); adds default variant (smallest pack + one-time) to cart
- Price display: selling price + if discounted, MRP strikethrough in muted colour — no "SALE" text badge
- Badge renders if `product.badge` field set

Dependencies: STORY-002-03
Estimate: 1 day

---

**STORY-002-05: Product Detail Page (PDP)**
As a visitor evaluating a product, I want full ingredient transparency and easy variant selection so I can confidently make a purchase decision.

Acceptance criteria:
- Route: `/products/[slug]`; `generateStaticParams` covers all published slugs (SSG)
- **`IngredientPanel` is ALWAYS visible on the page — NEVER inside an accordion or collapsed section under any circumstances**
- `grep -r "Accordion.*IngredientPanel\|IngredientPanel.*Accordion" src/app/products --include="*.tsx"` → empty
- Flavour selector: pill buttons update image gallery instantly (no CSS transition on gallery swap)
- Pack size selector: changes price display to match selected `pack_sizes.price_in_paise`
- `NutritionAccordion`: collapsible — acceptable; contains nutrition facts only
- `#nothingtohide` badge: Lucide link icon + text "Nothing to hide" → links to `/pages/nothingtohide`
- "You may also like": 4 products from same `product_type`, excluding current product
- `generateMetadata` for SEO: title = `{product.name} | {flavour}`, og:image = primary product image

Dependencies: STORY-002-03
Estimate: 2.5 days

---

**STORY-002-06: Add to Cart**
As a visitor on the PDP, I want to add a product to my cart only after selecting a flavour so I never accidentally add the wrong variant.

Acceptance criteria:
- "Add to Cart" button disabled until a flavour is selected
- Clicking without flavour selection: shows inline validation "Choose a flavour" below the flavour selector
- On add: item added to Zustand store with `{productId}:{flavour}:{packSize}` key; cart drawer opens automatically
- If same combination already in cart: `quantity` increments (no duplicate line item)
- Button shows loading state for minimum 300ms on click
- TypeScript: `addItem(item: Omit<CartItem, 'quantity'>): void` in Zustand store

Dependencies: STORY-002-05, STORY-001-05
Estimate: 0.5 day

---

**STORY-002-07: Cart Drawer**
As a visitor, I want to view and manage my cart in a slide-in drawer so I can check out or continue browsing.

Acceptance criteria:
- Slides in from right on desktop, slides up from bottom on mobile (`< 640px`)
- Line items: image, name, flavour name, pack size label, quantity stepper (min 1 — use remove button for 0), remove button
- Free delivery progress bar: fills as `subtotalInPaise` approaches `FREE_DELIVERY_THRESHOLD` (₹499); shows "Free delivery unlocked!" when reached
- "COD available at checkout" note visible in cart footer
- "Proceed to Checkout" button: full-width, `rounded-full`, links to `/checkout`
- Accessible: focus trapped while open, `aria-label="Shopping cart"`, `role="dialog"`, Escape key closes
- Body scroll locked when drawer is open

Dependencies: STORY-002-06
Estimate: 1 day

---

**STORY-002-08: Seed Data**
As a developer, the database has realistic product data so I can develop and test the full user journey.

Acceptance criteria:
- 3 product types seeded (e.g., Protein Bar, Granola, Nutrition Shake)
- 8 products seeded with real ingredient texts (e.g., "Oats (35%), Whey Protein Concentrate (25%), Almonds (12%)...") — NOT Lorem Ipsum
- Each product: 3 flavours × 3 pack sizes = 9 `inventory` rows per product
- Varied stock: at least 6 `inventory` rows with `stock_count = 0`
- Nutrition facts JSON seeded with real macros (calories, protein, carbs, fat per serving)
- At least 1 product marked `badge = 'bestseller'` and 1 marked `badge = 'new'`

Dependencies: STORY-001-02
Estimate: 1 day

---

## EPIC-003 — Cart and Checkout

Visitors can complete a purchase via Razorpay (UPI/card) or Cash on Delivery.

---

**STORY-003-01: Checkout Page**
As a visitor, I can enter my phone number and delivery address so my order can be dispatched.

Acceptance criteria:
- Route: `/checkout`
- Phone input: 10-digit Indian format validation (`/^[6-9]\d{9}$/`); guest checkout — no login required
- Address form: full name, phone (required), line1, line2 (optional), city, state (all Indian states), pincode (6 digits)
- Pincode serviceability check: static JSON list; shows "Sorry, we don't deliver to this pincode yet" for non-serviceable codes
- Order summary: line items from Zustand, GST breakdown (GST inclusive in price — extract it, don't add on top), shipping (₹0 if `subtotal ≥ ₹499`, else ₹59), total
- Logged-in user: phone and saved address pre-filled

Dependencies: STORY-002-07
Estimate: 2 days

---

**STORY-003-02: Razorpay Payment**
As a visitor, I can pay via UPI or card through Razorpay so my order is placed securely.

Acceptance criteria:
- `POST /api/razorpay/create-order`: creates Razorpay order server-side; `amount` recalculated from DB prices — NEVER trust client total
- Client opens Razorpay checkout modal with `key_id` from response
- Payment success closes modal → redirect to `/checkout/success?razorpay_order_id={id}`
- `process.env.RAZORPAY_KEY_SECRET` never logged or exposed to client
- Payment errors shown as readable messages (not raw Razorpay error codes)
- Loading state on button during Razorpay modal initialization

Dependencies: STORY-003-01
Estimate: 2 days

---

**STORY-003-03: COD Order**
As a visitor, I can choose Cash on Delivery so I can buy without a card or UPI.

Acceptance criteria:
- "Cash on Delivery" option visible in checkout — same visual prominence as Razorpay; no deprioritised UX
- Clicking COD CTA creates `orders` row directly with `payment_method: 'cod'`, `status: 'cod_pending'`
- On success: redirect to `/checkout/success`; cart cleared; confirmation email + SMS sent within 2 minutes
- COD confirmation SMS note: "Our team may call to confirm your order"
- TypeScript: `PaymentMethod = 'razorpay' | 'cod'`

Dependencies: STORY-003-01
Estimate: 1 day

---

**STORY-003-04: Webhook + Order Creation**
As the system, a successful Razorpay payment creates an order in the database so fulfilment can proceed reliably.

Acceptance criteria:
- `POST /api/razorpay/webhook` verifies HMAC-SHA256 signature using `RAZORPAY_WEBHOOK_SECRET`; returns 400 on invalid signature
- Idempotent: if `orders` row with `razorpay_order_id` already exists → return 200 without creating duplicate
- On `payment.captured`: creates `orders` + `order_items` rows; decrements `inventory.stock_count` for each ordered variant
- Confirmation email sent via Resend + SMS via MSG91 within 2 minutes
- Webhook returns 200 within 3 seconds (Razorpay times out at 30s)
- `grep -r "RAZORPAY_KEY_SECRET\|RAZORPAY_WEBHOOK_SECRET" src/app/api --include="*.ts"` → only in signature verification (never logged)

Dependencies: STORY-003-02
Estimate: 2 days

---

**STORY-003-05: Order Confirmation**
As a visitor, I receive a clear confirmation after successful payment so I know my order is placed.

Acceptance criteria:
- On Razorpay success → redirect to `/checkout/success?razorpay_order_id={id}`
- Cart cleared from Zustand on page load
- Order summary shown: order number, items (with flavour + pack size), shipping address, expected delivery ("3–5 business days")
- COD-specific note shown when `order.payment_method === 'cod'`: "Our team may call to confirm your order"
- "Continue shopping" button links to homepage
- Confirmation email: subject "Your order #{orderNumber} is confirmed", body contains items table + address + total

Dependencies: STORY-003-04
Estimate: 0.5 day

---

## EPIC-004 — User Accounts

Logged-in users can view orders, manage addresses, and reorder.

---

**STORY-004-01: Account Dashboard**
As a logged-in user, I can navigate my account sections so I can manage my orders and profile.

Acceptance criteria:
- Route: `/account` → redirects to `/account/orders`
- Account layout: sidebar/tab nav with Orders, Addresses links
- Sidebar shows user's name + phone number
- Mobile: sidebar collapses to horizontal tab bar below nav

Dependencies: STORY-001-03, STORY-001-04
Estimate: 0.5 day

---

**STORY-004-02: Order History**
As a logged-in user, I can view all my past orders so I can track deliveries and reorder favourites.

Acceptance criteria:
- Route: `/account/orders`
- Orders sorted newest first; each row: order number, date, status chip, item thumbnails (max 3), total formatted in ₹
- Status chips with correct colours: `cod_pending` = amber, `processing` = blue, `shipped` = indigo, `delivered` = green, `cancelled` = red
- Empty state: "No orders yet — start shopping!" with link to homepage
- Only shows orders where `user_id = auth.uid()` (RLS enforced)

Dependencies: STORY-004-01
Estimate: 0.5 day

---

**STORY-004-03: Order Detail + Reorder**
As a logged-in user, I can view full order details and reorder in one click so restocking is frictionless.

Acceptance criteria:
- Route: `/account/orders/[id]`
- Shows: all items (image, product name, flavour, pack size, quantity, price), shipping address, GST breakdown, grand total
- Tracking link visible when `order.tracking_url` is set and `status = 'shipped'`
- "Reorder" button: adds in-stock combos to cart; shows toast for each skipped out-of-stock combo
- Status timeline: visual steps (Confirmed → Processing → Shipped → Delivered)
- TypeScript: `OrderWithItems = Order & { items: OrderItem[]; trackingUrl: string | null }`

Dependencies: STORY-004-02
Estimate: 1 day

---

**STORY-004-04: Saved Addresses**
As a logged-in user, I can save and manage Indian format addresses so I don't re-enter them at each checkout.

Acceptance criteria:
- Route: `/account/addresses`
- Add/edit/delete addresses; max 5 per user
- Default address marked visually; pre-selected first in checkout
- Deleting default address → no default set
- Address form includes: full name, phone (required), line1, line2 (optional), city, state, pincode, country (default India)

Dependencies: STORY-004-01
Estimate: 1 day

---

**STORY-004-05: Phone OTP Login (Account Access)**
As a returning user, I can log in with just my phone number so I don't need a password.

Acceptance criteria:
- `/auth/login`: phone number input → "Send OTP" → 6-digit OTP field → verify → logged in
- OTP expires in 5 minutes; wrong OTP shows inline error
- "Resend OTP" enabled after 30 seconds countdown
- After login: redirect to `/account/orders` (or `?next=` destination if provided)

Dependencies: STORY-001-03
Estimate: 1 day

---

## EPIC-005 — Admin Panel

Store admins can manage products, flavours, pack sizes, lab reports, orders, and inventory.

---

**STORY-005-01: Admin Layout + Auth**
As an admin, I can navigate the admin panel from a clearly distinct layout so I know I'm in admin context.

Acceptance criteria:
- Route: `/admin` — role-protected; `profiles.role = 'admin'` required
- Admin sidebar: Products, Orders, Inventory, Lab Reports navigation links
- Admin layout visually distinct from storefront (different background, "Admin" label)
- Non-admin user redirected to homepage (middleware + layout double-check)

Dependencies: STORY-001-04
Estimate: 0.5 day

---

**STORY-005-02: Product Management**
As an admin, I can create and edit products so the catalogue stays current.

Acceptance criteria:
- `/admin/products`: table of all products (published and unpublished)
- Product form fields: name, slug (auto-generated + editable), product type, full ingredients textarea, how to use, dietary tags (multi-select), GST rate (5% or 18%), badge, published toggle
- Slug must be unique — validate on save; duplicate slug shows inline error
- Edit form pre-fills all fields
- Delete product: confirmation dialog required

Dependencies: STORY-005-01
Estimate: 1.5 days

---

**STORY-005-03: Flavour Manager**
As an admin, I can manage flavours for each product so customers see accurate options.

Acceptance criteria:
- Inline flavour table on product edit page
- Add flavour: name + colour hex picker (visual swatch); stored as `color_hex`
- Reorder flavours by drag or position number input
- Delete flavour: blocked if inventory rows exist for that flavour; shows "Remove inventory first" warning
- Changes trigger ISR revalidation of product PDP

Dependencies: STORY-005-02
Estimate: 1 day

---

**STORY-005-04: Pack Size Manager**
As an admin, I can manage pack size options per product so pricing reflects current offerings.

Acceptance criteria:
- Add pack size: label (e.g., "250g"), quantity count, price in ₹ (UI) stored as paise internally, SKU
- SKU must be unique across all pack sizes
- Edit inline; delete blocked if `order_items` reference it
- TypeScript: `PackSize = { id: string; label: string; quantityCount: number; priceInPaise: number; sku: string }`

Dependencies: STORY-005-02
Estimate: 0.5 day

---

**STORY-005-05: Image Uploader (per flavour)**
As an admin, I can upload product images grouped by flavour so the correct images show on the PDP.

Acceptance criteria:
- Drag-drop or file picker; accepts JPEG/PNG/WebP, max 5MB per file
- Uploaded to `product-images/` Supabase Storage bucket; URL saved to `product_images` table
- Images grouped by flavour; reorderable via drag; primary image selectable (used in product card)
- Delete image: removes from storage + database

Dependencies: STORY-005-02
Estimate: 1 day

---

**STORY-005-06: Lab Report Uploader**
As an admin, I can upload PDF lab reports per product so the `#nothingtohide` page stays current.

Acceptance criteria:
- PDF upload to `lab-reports/` Supabase Storage bucket; URL + label saved to `lab_reports` table
- Reports linked from `/pages/nothingtohide` — grouped by product
- Label editable after upload (e.g., "Protein Content Certificate — Batch 240101")

Dependencies: STORY-005-02
Estimate: 0.5 day

---

**STORY-005-07: Order Management**
As an admin, I can view and update order status so fulfilment stays on track.

Acceptance criteria:
- `/admin/orders`: table with filter by status + payment method; COD orders clearly labelled with amber chip
- Order detail: line items with flavour + pack size snapshot data, shipping address, status dropdown
- "Mark Shipped": requires tracking number + courier → updates `orders.status = 'shipped'`, `tracking_url` set
- On status change to `shipped`: sends SMS to customer via MSG91 with tracking number
- Status update shown in order detail immediately (optimistic update)

Dependencies: STORY-005-01
Estimate: 1.5 days

---

**STORY-005-08: Inventory Quick Update**
As an admin, I can quickly update stock counts without editing the full product so restocking is fast.

Acceptance criteria:
- `/admin/inventory`: search by SKU or product name
- Results table: SKU, product name, flavour name, pack size label, current `stock_count`
- Click row → inline `stock_count` input, editable; "Save" button commits to DB
- Save triggers ISR revalidation of the product's PDP
- Changes visible on storefront within 30 seconds

Dependencies: STORY-005-01
Estimate: 1 day

---

## EPIC-006 — Launch

---

**STORY-006-01: SEO and Metadata**
As a product owner, all public pages have correct metadata so search engines index the site properly.

Acceptance criteria:
- `generateMetadata` on: homepage, PLP, PDP, about, privacy, terms
- PDP metadata: `{productName} — {flavour} | Brand` title; description from `product.description`
- `og:image` = product primary image for selected flavour
- `app/sitemap.ts` generates sitemap with all published products + product types
- `robots.txt` blocks `/admin`, `/account`, `/api`

Dependencies: EPIC-002 complete
Estimate: 0.5 day

---

**STORY-006-02: Mobile Performance**
As a visitor on a mobile device, pages load quickly so I don't abandon the site.

Acceptance criteria:
- All product images use `next/image` with explicit `sizes` prop
- Hero image has `priority` prop
- LCP < 2.5s; CLS < 0.1 (fonts preloaded via `next/font`)
- Lighthouse Performance ≥ 95 on PDP mobile
- No unused JavaScript bundles (bundle analyzer reviewed)

Dependencies: EPIC-002 complete
Estimate: 1 day

---

**STORY-006-03: Accessibility Audit**
As a visitor with a disability, I can use the storefront with a screen reader or keyboard so the experience is fully inclusive.

Acceptance criteria:
- axe-core: zero critical violations on homepage, PDP, checkout
- Cart drawer: focus trapped, `role="dialog"`, Escape closes
- Flavour selector: `aria-pressed` on selected flavour; `aria-label` = flavour name on each swatch
- Pack size selector: `aria-pressed` on selected size
- All form inputs have `<label>` elements with matching `htmlFor`
- Form errors use `aria-describedby` to link to error messages

Dependencies: EPIC-001–004 complete
Estimate: 1 day

---

**STORY-006-04: Error and Loading States**
As a visitor, I see helpful feedback when pages load or fail so I'm never left on a blank screen.

Acceptance criteria:
- `loading.tsx` exists for all route segments — skeleton UI matching page layout
- `error.tsx` exists with "Something went wrong" message and "Go home" link
- `not-found.tsx` exists with search and navigation options
- Network errors on Add to Cart show toast: "Couldn't add to cart — please try again"
- Checkout API errors show inline message below the relevant form field

Dependencies: EPIC-002–004 complete
Estimate: 1 day
