# 06 — Tasks
## Health Food D2C Platform · ecomm_platform_02

---

## Phase 0 — Foundation

- [ ] **TASK-001** | STORY-001-01 | Est: 2h
  **Initialise project**
  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js razorpay resend framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-select clsx tailwind-merge
  ```
  Acceptance: `npm run dev` starts, `npm run build` zero errors.
  Files: `package.json`, `tsconfig.json`, `tailwind.config.ts`

---

- [ ] **TASK-002** | STORY-001-06 | Est: 1h
  **Design tokens + fonts**
  Add all CSS variables to `globals.css`. Configure Space Grotesk + DM Sans via `next/font/google`.
  Acceptance: Background `#FFFFFF`. Buttons render pill-shaped (`rounded-full`). `.font-display` class applies Space Grotesk. DM Sans on body.
  Files: `src/app/globals.css`, `src/app/layout.tsx`, `tailwind.config.ts`

---

- [ ] **TASK-003** | STORY-001-02 | Est: 3h
  **Database migration**
  Execute full SQL schema from `02_Architecture.md` in Supabase SQL editor. Apply all RLS policies. Verify triggers.
  Acceptance: All tables visible. RLS enabled. `order_number_seq` exists. Trigger test: insert into `auth.users` creates `profiles` row.
  Files: `supabase/migrations/001_initial_schema.sql`

---

- [ ] **TASK-004** | STORY-001-03 | Est: 3h
  **Supabase clients + Auth setup**
  Create browser, server, and admin clients. Configure Supabase Auth for phone OTP + email.
  Acceptance: `createClient()` importable from all three paths. Phone OTP sends test SMS.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`

---

- [ ] **TASK-005** | STORY-001-04 | Est: 2h
  **Auth pages + middleware**
  Build login page (phone OTP + email). Middleware protects `/account` and `/admin`.
  Acceptance: Phone OTP login works. Middleware redirects correctly. Post-login returns to original destination.
  Files: `src/app/auth/login/page.tsx`, `src/app/auth/callback/route.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | STORY-001-05 | Est: 2h
  **Zustand cart store**
  Cart persisted to localStorage. Key: `productId:flavour:packSize`.
  Acceptance: Add item, refresh page → cart still there. Add same combo twice → qty 2. `subtotalInPaise` correct.
  Files: `src/store/cart.ts`

---

- [ ] **TASK-007** | STORY-001-01 | Est: 1h
  **TypeScript types**
  All shared types defined.
  Acceptance: `Product`, `Flavour`, `PackSize`, `ProductImage`, `NutritionFact`, `CartItem`, `Order`, `OrderItem` all importable from `@/types`. Zero `any`.
  Files: `src/types/index.ts`

---

## Phase 1 — Catalog

- [ ] **TASK-008** | STORY-002-08 | Est: 3h
  **Seed product data**
  8 products, 3 types, 3 flavours each, 3 pack sizes each, varied inventory.
  Acceptance: Real ingredient texts seeded (not Lorem Ipsum). At least 6 `inventory` rows with `stock_count = 0`. Nutrition facts JSON valid.
  Files: `supabase/seeds/products.sql`

---

- [ ] **TASK-009** | STORY-002-01 | Est: 3h
  **AnnouncementBar + Navbar + Footer**
  Acceptance: Announcement bar dismissible (localStorage key). Navbar cart badge updates from Zustand. Mobile hamburger opens overlay. Footer 4 columns. All match design spec.
  Files: `src/components/layout/AnnouncementBar.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`

---

- [ ] **TASK-010** | STORY-002-07 | Est: 4h
  **CartDrawer + CartItem + DeliveryProgress**
  Acceptance: Slide right desktop, bottom mobile. Line items correct. Qty stepper min 1. Remove works. Delivery bar fills at 49900 paise. Focus trapped. Accessible.
  Files: `src/components/cart/CartDrawer.tsx`, `src/components/cart/CartItem.tsx`, `src/components/cart/DeliveryProgress.tsx`

---

- [ ] **TASK-011** | STORY-002-04 | Est: 3h
  **ProductCard**
  Acceptance: Square image (1:1), 16px card radius, hover image swap, flavour swatches (dot circles), price updates. Quick-add pill on hover (desktop). Badge renders.
  Files: `src/components/product/ProductCard.tsx`

---

- [ ] **TASK-012** | STORY-002-02 | Est: 4h
  **Homepage**
  Acceptance: All sections with real data. Transparency section shows ingredient text in white card. Testimonials quotes only, no stars. Newsletter form submits. Server component — no `useEffect` data fetching.
  Files: `src/app/page.tsx`, `src/components/home/*.tsx`

---

- [ ] **TASK-013** | STORY-002-03 | Est: 4h
  **PLP**
  Acceptance: Route + filter + sort + load more. 3-col grid (2 mobile). 404 for bad type slug. Filter state in URL params.
  Files: `src/app/collections/[type]/page.tsx`, `src/components/product/ProductGrid.tsx`

---

- [ ] **TASK-014** | STORY-002-05 | Est: 5h
  **PDP — full page**
  Critical: `IngredientPanel` renders outside any accordion. Flavour selector pill buttons. Pack size selector changes price. Gallery changes on flavour select.
  Acceptance: Manual check — ingredient list visible on page load without any click. Add to Cart disabled without flavour. `generateStaticParams` generates all published slugs.
  Files: `src/app/products/[slug]/page.tsx`, `src/components/product/ImageGallery.tsx`, `src/components/product/FlavourSelector.tsx`, `src/components/product/PackSizeSelector.tsx`, `src/components/product/IngredientPanel.tsx`, `src/components/product/NutritionAccordion.tsx`

---

- [ ] **TASK-015** | STORY-002-06 | Est: 1.5h
  **AddToCartButton**
  Acceptance: Disabled without flavour. Shows "Choose a flavour" validation. Adds to cart with correct flavour + pack size. Opens drawer. Loading state.
  Files: `src/components/product/AddToCartButton.tsx`

---

- [ ] **TASK-016** | STORY-006-04 | Est: 2h
  **Loading + error + not-found pages**
  Files: `src/app/loading.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx`, loading.tsx in collections and products routes.

---

## Phase 2 — Checkout

- [ ] **TASK-017** | STORY-003-01 | Est: 4h
  **Checkout page — address + order summary**
  Acceptance: Phone + Indian address form. Pincode check (static JSON). GST breakdown shown. Shipping ₹0 if total ≥ ₹499, else ₹59. Pre-fills for logged-in users.
  Files: `src/app/checkout/page.tsx`, `src/components/checkout/AddressForm.tsx`, `src/components/checkout/OrderSummary.tsx`

---

- [ ] **TASK-018** | STORY-003-02 | Est: 3h
  **Razorpay create-order API + client integration**
  Acceptance: `POST /api/razorpay/create-order` returns Razorpay order. Client opens Razorpay modal. Amount server-calculated (DB prices, never client total). `RAZORPAY_KEY_SECRET` never logged.
  Files: `src/app/api/razorpay/create-order/route.ts`, `src/lib/razorpay.ts`, `src/components/checkout/RazorpayButton.tsx`

---

- [ ] **TASK-019** | STORY-003-03 | Est: 2h
  **COD checkout flow**
  Acceptance: "Cash on Delivery" option renders. Click creates order in DB with `cod_pending`. Redirect to confirmation. Cart cleared. SMS + email sent.
  Files: `src/components/checkout/CODButton.tsx`, server action for COD order creation

---

- [ ] **TASK-020** | STORY-003-04 | Est: 5h
  **Razorpay webhook handler**
  Acceptance: Signature verified. Idempotent. Creates `orders` + `order_items`. Decrements inventory. Sends Resend email + MSG91 SMS. Returns 200 within 3s.
  Files: `src/app/api/razorpay/webhook/route.ts`

---

- [ ] **TASK-021** | STORY-003-05 | Est: 1.5h
  **Order confirmation page**
  Acceptance: Cart cleared on load. Order number, items, address, delivery estimate shown. COD note if payment_method is cod.
  Files: `src/app/checkout/success/page.tsx`, `src/lib/resend.ts`, `src/emails/OrderConfirmation.tsx`

---

## Phase 3 — Accounts

- [ ] **TASK-022** | STORY-004-01 | Est: 1h
  **Account layout**
  Files: `src/app/account/layout.tsx`, `src/app/account/page.tsx`, `src/components/account/AccountSidebar.tsx`

---

- [ ] **TASK-023** | STORY-004-02 | Est: 1.5h
  **Order history**
  Acceptance: All orders, newest first. Status chips with correct colours. COD pending = amber.
  Files: `src/app/account/orders/page.tsx`, `src/components/account/OrderList.tsx`

---

- [ ] **TASK-024** | STORY-004-03 | Est: 2.5h
  **Order detail + reorder**
  Acceptance: Tracking link if available. Reorder adds in-stock combos, toasts for skipped. Status timeline.
  Files: `src/app/account/orders/[id]/page.tsx`

---

- [ ] **TASK-025** | STORY-004-04 | Est: 2h
  **Saved addresses**
  Acceptance: Indian format. Max 5. Default pre-selects in checkout.
  Files: `src/app/account/addresses/page.tsx`

---

## Phase 4 — Admin

- [ ] **TASK-026** | STORY-005-01 | Est: 1.5h
  **Admin layout**
  Files: `src/app/admin/layout.tsx`, `src/components/admin/AdminSidebar.tsx`

---

- [ ] **TASK-027** | STORY-005-02 | Est: 4h
  **Product form — create + edit**
  Acceptance: All fields including full ingredients textarea, GST rate selector (5/18). Slug auto-generates + editable. Unique validated.
  Files: `src/app/admin/products/page.tsx`, `src/app/admin/products/[id]/edit/page.tsx`, `src/components/admin/ProductForm.tsx`

---

- [ ] **TASK-028** | STORY-005-03 + STORY-005-04 | Est: 3h
  **Flavour + Pack Size managers**
  Acceptance: Add/edit/delete flavours (name + color picker). Add/edit/delete pack sizes (label, qty, ₹ price input converts to paise, SKU). Triggers ISR revalidation.
  Files: `src/components/admin/FlavourManager.tsx`, `src/components/admin/PackSizeManager.tsx`, `src/app/api/revalidate/route.ts`

---

- [ ] **TASK-029** | STORY-005-05 + STORY-005-06 | Est: 3h
  **Image uploader + Lab report uploader**
  Acceptance: Drag-drop to Supabase Storage. Images per-flavour. Lab PDFs linked from nothingtohide page.
  Files: `src/components/admin/ImageUploader.tsx`, `src/app/admin/lab-reports/page.tsx`

---

- [ ] **TASK-030** | STORY-005-07 | Est: 3.5h
  **Order management + status update**
  Acceptance: Filter by status + payment method. COD orders labelled. Mark shipped → SMS customer.
  Files: `src/app/admin/orders/page.tsx`, `src/app/admin/orders/[id]/page.tsx`

---

- [ ] **TASK-031** | STORY-005-08 | Est: 2.5h
  **Inventory quick update**
  Acceptance: Search by SKU. Inline edit. Save → ISR revalidation → PDP updates in 30s.
  Files: `src/app/admin/inventory/page.tsx`, `src/components/admin/InventoryEditor.tsx`

---

## Phase 5 — Launch

- [ ] **TASK-032** | STORY-006-01 | Est: 2h
  **SEO + Sitemap**
  Files: `src/app/sitemap.ts`, `src/app/robots.ts`, `generateMetadata` in all public pages

---

- [ ] **TASK-033** | STORY-006-02 | Est: 3h
  **Mobile performance audit + fixes**
  Acceptance: Lighthouse 95+ on PDP mobile. All `<Image>` with `sizes`. Hero `priority`. No CLS from fonts.

---

- [ ] **TASK-034** | STORY-006-03 | Est: 2.5h
  **Accessibility audit + fixes**
  Acceptance: axe-core zero critical on PDP and checkout. Flavour selector `aria-pressed`. Cart drawer focus trap tested.

---

- [ ] **TASK-035** | All | Est: 4h
  **Launch checklist + live keys**
  Acceptance: All Phase 5 ship gate items checked. Live Razorpay keys in Vercel. Webhook registered. MSG91 SMS template approved (required for India). End-to-end test with live keys. Final manual check: ingredient panel visible without click on PDP.
