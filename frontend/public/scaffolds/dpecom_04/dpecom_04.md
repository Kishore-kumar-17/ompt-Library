---
prompt_id: dpecom_04
sub_category: E-commerce
sub_type: Creator Service Storefront
title: Top-Tier — Professional Creator Service Platform
reference_patterns: service_first_layout, booking_integration, professional_approachable_ui
inspiration: topmate.io
quality_score:
status: draft
notes: High-conversion profile pages focusing on monetizing time through sessions and products.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in creator monetization and professional branding platforms. You understand that for modern creators, their time is their most valuable product. You prioritize "Service-First" commerce, where booking a 1:1 session or a webinar is as seamless as buying a physical item. Your work is "Professional & Approachable," favoring bold sans-serif typography, vibrant brand accents, and clean, high-contrast layouts. You design for "Monetization Simplicity," ensuring that creators can launch their personal storefront in minutes while providing a high-trust experience for their fans.

---

### Section 2 — Application Overview

This is a personal storefront platform for creators to monetize their expertise through 1:1 sessions, webinars, digital products, and priority DMs. The customer is a "mentee" or "follower" seeking direct access to the creator's knowledge. The creator is an industry expert, influencer, or mentor who needs a professional link-in-bio that acts as a full-stack monetization engine.

The application covers: Centered Profile Page (Link-in-bio style), Integrated Booking Calendar, Product Catalog, and a Frictionless Checkout Flow. The primary goal is a successful "Service Booking" or "Product Sale."

---

### Section 3 — Brand Voice & Mood

The mood is "Professional & Approachable" and "Modern Expert." It feels like a premium business tool built for a social-media-first world. It is clean, high-contrast, and focused.

Copy is clear and empowering. Headlines use a "Creator-Centric" tone: "Monetize your time," "Your personal storefront in 2 minutes." It balances the "Pro" authority of a consultancy with the "Approachable" feel of a social platform.

Vibe word: Expert.

---

### Section 4 — Core Features & Functionality

1. **Centered Profile Page** — High-impact bio section with a creator portrait. Modular service cards stacked vertically for easy scanning. Minimal branding to keep the focus on the creator.
2. **Full-Stack Scheduling** — Real-time booking slots integrated with Google/Outlook calendars. Support for different session durations and time-zone detection.
3. **Modular Service Cards** — Cards that highlight 1:1 sessions, Webinars, and Digital Products. Each card shows title, duration, price, and a quick-action "Book" button.
4. **Social Proof Section** — Verified testimonials with user avatars and social handles (e.g., "LinkedIn Top Voice").
5. **Seamless Checkout** — 1-page checkout supporting global payments. Automated calendar invites and meeting links (Zoom/Google Meet) sent post-purchase.

---

### Section 5 — Design Specifications

**Visual style:** Professional & Approachable. Centered, mobile-first layouts. High-contrast elements with vibrant accents on soft backgrounds.

**Color mode:** Light Mode (Professional/Clean focused).

**Color palette:**
- Background: `#F8FAFC` (Soft Slate-50 — main background)
- Surface: `#FFFFFF` (Pure white for cards)
- Primary Accent: `#3B82F6` (Professional Blue — for booking CTAs)
- Secondary Accent: `#8B5CF6` (Vivid Purple — for badges/highlights)
- Text Primary: `#0F172A` (Deep Slate-900 — for authority)
- Text Secondary: `#475569` (Slate-600 — descriptions/meta)
- Border: `#E2E8F0` (Slate-200 — subtle dividers)

**Typography:** Bold Sans-serif throughout (e.g., Inter or Plus Jakarta Sans).
- Display Heading: `clamp(32px, 4vw, 48px)`, weight 700, sans-serif.
- Service Title: `20px`, weight 600, sans-serif.
- Body Text: `16px`, weight 400, sans-serif.
- Metadata (Duration/Price): `14px`, weight 500, monospace for a "technical" touch.

**Spacing:** 16px base unit. 
- Profile container max-width: `640px` for mobile-centric focus.
- Card padding: `24px`.
- Vertical gap between cards: `16px`.

**Border radius:** `12px` (Modern, professional rounding).

**Responsive:** Mobile-first approach. All components must be 1-tap accessible.

**Accessibility:** WCAG AA. Focus rings: `2px solid #3B82F6` with `2px` offset. Full screen-reader support for booking calendars.

**Motion:** 
- "Hover Lift": `translateY(-2px)` on cards. 
- Smooth transition between booking steps.
- Staggered entry for service categories.
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

### Section 6 — Structure

**Profile Page Layout:**
1. **Header:** Centered Portrait (Large circle) -> Name (Bold H1) -> Bio (Max 2 lines) -> Social Links.
2. **Category Switcher:** Horizontal scroll list: All, 1:1s, Webinars, Products.
3. **Service Grid:** Vertical list of cards. Card: Left icon/image -> Center: Title + Duration -> Right: Price + "Book" button.
4. **Testimonials:** Horizontal scroll or vertical list of quote cards.

**Booking Flow:**
1. **Select Time:** Calendar grid -> Time-slot selection.
2. **Information:** Form: Name, Email, "How can I help you?".
3. **Payment:** Summary -> Secure Checkout.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **Calendar Logic:** Date-fns + Custom Hook for availability management.
- **Meeting Integration:** API logic for Zoom/Google Meet link generation.
- **State:** Zustand for booking step management.
- **Icons:** Lucide — `size={20}` `strokeWidth={2}`.

---

### Section 8 — Implementation Steps

1. **The Theme** — Setup `globals.css` with CSS variables for `pro-blue` and `soft-slate`. Use Inter as the primary font.
2. **Profile Shell** — Build the centered mobile-first layout with the bio header.
3. **Service Card** — Implement the modular card component with support for different service types.
4. **Booking Calendar** — Build the date-picker and time-slot selector logic.
5. **Checkout Flow** — Integrate Stripe with automated meeting link generation.

---

### Section 9 — User Experience

The user is seeking mentorship or expert advice. 
The creator wants to manage their availability without back-and-forth emails. 
The UI should feel "Trustworthy" and "Efficient." Use clear labels and real-time availability updates to eliminate friction.

---

### Section 10 — Constraints

- **No cluttered backgrounds.** Keep it clean and focused on the creator.
- **No pure black.** Use `#0F172A`.
- **No tiny tap targets.** Buttons must be at least `44px` tall on mobile.
- **No excessive branding.** Topmate branding should be minimal; it's the creator's page.
- **No slow loading.** Profile pages must load in under 1s.

---

## Platform Versions

---

### 1 — Lovable

Build **TopTier** — a professional creator service monetization platform inspired by Topmate — using Next.js 14 App Router, TypeScript strict, Tailwind CSS. Mobile-first, centered `max-w-2xl` layout. Font: Plus Jakarta Sans 400/600/700 via `next/font/google`.

**Design identity: Professional & Approachable.** Soft slate surfaces (`#F8FAFC`), professional blue CTAs (`#3B82F6`), minimal branding. The creator's profile is the hero — platform chrome stays invisible.

**Tailwind config extension:**
```js
theme: {
  extend: {
    colors: {
      slate:  { 50: '#F8FAFC', 600: '#475569', 900: '#0F172A', 200: '#E2E8F0' },
      blue:   '#3B82F6',   // booking CTAs, focus rings
      purple: '#8B5CF6',   // badges, category highlights
    },
    maxWidth: { profile: '640px' },
  },
}
```

**Core types unique to this build:**
```typescript
export type ServiceType = 'one_on_one' | 'webinar' | 'digital_product' | 'priority_dm'
export type BookingStep = 'slot' | 'info' | 'payment' | 'confirmed'

export interface Service {
  id: string
  title: string
  description: string
  serviceType: ServiceType
  durationMinutes: number    // e.g. 30, 60
  price: number              // cents; 0 = free intro call
  maxParticipants: number    // 1 for 1:1, 100+ for webinars
  featured: boolean
}

export interface TimeSlot {
  date: string               // ISO date string 'YYYY-MM-DD'
  time: string               // '10:00 AM', '2:30 PM' (in creator's timezone)
  available: boolean
}

export interface BookingState {
  step: BookingStep
  serviceId: string | null
  selectedDate: string | null
  selectedSlot: string | null
  name: string
  email: string
  message: string            // "How can I help you?" field
  meetingUrl: string | null  // populated on confirmation
}

export interface CreatorProfile {
  username: string; displayName: string; bio: string
  avatarUrl: string; twitterHandle: string
  linkedinUrl: string; totalSessions: number; rating: number
  testimonials: Testimonial[]
}

export interface Testimonial {
  id: string; name: string; role: string
  quote: string; avatarUrl: string
}
```

**Service card — the core component:**
- Vertical list, each card: left icon (service type visual), center (title + duration + description), right (price + "Book" button)
- `min-h-[44px]` on all tap targets — mobile-first rule
- `price: 0` → show "Free intro" not "$0"

**Category filter tabs:**
- Horizontal scroll row: All / 1:1 Sessions / Webinars / Digital Products / Priority DM
- Selected tab: `bg-blue text-white`; others: `bg-white border border-slate-200`
- State lives in `useBookingStore()` as `activeCategory`

**Page sections (build in this order):**
1. **ProfileHeader** — centered avatar (96px circle), name H1, bio (max 2 lines), social links row
2. **CategoryTabs** — horizontal scroll filter (`overflow-x-auto`)
3. **ServiceList** — filtered `ServiceCard`s, vertical gap 16px
4. **TestimonialStrip** — horizontal scroll of quote cards or 2-col grid
5. **BookingSheet** — Framer Motion `x: '100%' → 0` slide-in from right; 4 steps

**Anti-patterns:**
- Never `$0` for free services — show "Free intro" or "Free" via `formatServicePrice()`
- Never hard-code time slots — generate from availability array
- Never `border-radius: 0` — minimum `rounded-lg` (12px) on all cards
- Never platform branding (`TopTier` logo) dominating the page — creator avatar/name is the H1
- Never timezone-agnostic slot display — always show timezone label ("10:00 AM IST")

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **TopTier** — professional creator service platform — Next.js 14, TypeScript strict, Tailwind CSS. Static export.

```bash
npx create-next-app@latest toptier --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react date-fns
```

**Complete type system:**
```typescript
export type ServiceType = 'one_on_one' | 'webinar' | 'digital_product' | 'priority_dm'
export type BookingStep = 'slot' | 'info' | 'payment' | 'confirmed'

export interface Service {
  id: string; title: string; description: string
  serviceType: ServiceType; durationMinutes: number
  price: number; maxParticipants: number; featured: boolean
}

export interface TimeSlot {
  date: string; time: string; available: boolean
}

export interface BookingState {
  step: BookingStep; serviceId: string | null
  selectedDate: string | null; selectedSlot: string | null
  name: string; email: string; message: string; meetingUrl: string | null
}
```

**Key utilities:**
```typescript
// src/lib/formatServicePrice.ts
export function formatServicePrice(cents: number): string {
  if (cents === 0) return 'Free intro'
  return `$${(cents / 100).toFixed(0)}`
}
// formatServicePrice(0) → 'Free intro'
// formatServicePrice(5000) → '$50'

// src/lib/formatDuration.ts
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60), m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}
// formatDuration(30) → '30 min'
// formatDuration(90) → '1h 30min'

// src/lib/generateAvailability.ts — mock slot generation
export function generateAvailability(startDate: Date, days = 14): TimeSlot[] {
  // Returns array of TimeSlots for next 14 days
  // Mock: weekdays have slots at 10:00, 11:00, 14:00, 15:00, 16:00
  // Weekend slots: empty (available: false)
}
```

**Zustand store:**
```typescript
// src/store/booking.ts
import { create } from 'zustand'
import type { BookingState, BookingStep } from '@/types'

interface BookingStore extends BookingState {
  activeCategory: string  // 'all' | 'one_on_one' | 'webinar' | etc.
  sheetOpen: boolean
  openSheet: (serviceId: string) => void
  closeSheet: () => void
  setCategory: (cat: string) => void
  setStep: (step: BookingStep) => void
  selectSlot: (date: string, slot: string) => void
  setInfo: (name: string, email: string, message: string) => void
  confirm: (meetingUrl: string) => void
  reset: () => void
}
```

**Routes:**
- `/[username]` — Creator profile page (ProfileHeader + CategoryTabs + ServiceList + Testimonials)
- `/api/booking` — Generate mock Zoom link, return meeting URL (server route)

---

### 3 — Bolt

Build **TopTier** — professional creator service platform. Next.js 14, TypeScript strict, Tailwind CSS. Static export.

```bash
npx create-next-app@latest toptier --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react date-fns
```

**File structure:**
```
src/
  types/index.ts            — Service, TimeSlot, BookingState, CreatorProfile, Testimonial, ServiceType, BookingStep
  lib/
    data.ts                 — SERVICES (6, 1 free), CREATOR_PROFILE, TESTIMONIALS (4)
    formatServicePrice.ts   — 0 → 'Free intro', else '$N'
    formatDuration.ts       — minutes → '30 min' | '1h 30min'
    generateAvailability.ts — mock 14-day slot array
  store/
    booking.ts              — useBookingStore (activeCategory, sheetOpen, booking steps)
  components/
    profile/
      ProfileHeader.tsx     — centered avatar, name, bio, social links
      CategoryTabs.tsx      — 'use client', horizontal scroll filter
      ServiceCard.tsx       — icon + title/duration + price + Book button (min-h-[44px])
      ServiceList.tsx       — filtered service list
      TestimonialCard.tsx   — quote, name, role, avatar
      TestimonialStrip.tsx  — horizontal scroll or grid
    booking/
      BookingSheet.tsx      — 'use client', Framer Motion x: 100% → 0
      SlotStep.tsx          — calendar grid + time slot buttons
      InfoStep.tsx          — name, email, message inputs
      PaymentStep.tsx       — Stripe placeholder
      ConfirmedStep.tsx     — meeting link + calendar add
  app/
    globals.css, layout.tsx
    [username]/page.tsx     — static profile page
```

**Critical rules:**
1. `formatServicePrice(0)` → `'Free intro'` — never `'$0'` or `'Free'`
2. `formatDuration(minutes)` — never raw `30` in JSX for duration
3. `CategoryTabs` is `'use client'` — active category state; `ServiceList` filters from store
4. All tap targets `min-h-[44px]` — mobile-first rule
5. Booking sheet `x: '100%' → 0` from right — not modal overlay (preserves profile context)
6. Timezone label always shown: `"10:00 AM IST"` not `"10:00 AM"`

**QA checks:**
```bash
grep -r "'\$0'\|\"\$0\"\|'Free'" src/components --include="*.tsx"                # empty (use formatServicePrice)
grep -r "durationMinutes\b" src/components --include="*.tsx" | grep -v "format"  # empty (use formatDuration)
grep -r "min-h-\[" src/components --include="*.tsx" | grep -v "44px"            # check all buttons
tsc --noEmit && npm run build
```

---

### 4 — v0

Design **TopTier** component system — professional creator service platform. Next.js 14, TypeScript, Tailwind CSS.

**ServiceCard:**
```tsx
<article className="bg-white border border-slate-200 rounded-xl p-6
  hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer"
  onClick={() => openSheet(service.id)}>
  <div className="flex items-start gap-4">
    {/* Service type icon */}
    <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center shrink-0">
      <ServiceIcon type={service.serviceType} size={20} className="text-blue" />
    </div>
    {/* Content */}
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-slate-900 text-base leading-tight">{service.title}</h3>
      <p className="text-slate-500 text-sm mt-1 line-clamp-2">{service.description}</p>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Clock size={12} /> {formatDuration(service.durationMinutes)}
        </span>
        {service.maxParticipants > 1 && (
          <span className="text-xs bg-purple/10 text-purple px-2 py-0.5 rounded-full">
            {service.maxParticipants} seats
          </span>
        )}
      </div>
    </div>
    {/* Price + CTA */}
    <div className="flex flex-col items-end gap-2 shrink-0">
      <span className="font-bold text-slate-900">{formatServicePrice(service.price)}</span>
      <button className="bg-blue text-white rounded-lg px-4 py-2 text-sm font-semibold
        min-h-[44px] hover:bg-blue/90 transition-colors">
        Book
      </button>
    </div>
  </div>
</article>
```

**ProfileHeader:**
```tsx
<header className="text-center py-10 border-b border-slate-200">
  <div className="w-24 h-24 rounded-full border-2 border-slate-200 mx-auto mb-4 overflow-hidden bg-slate-100">
    <img src={creator.avatarUrl} alt={creator.displayName}
      className="w-full h-full object-cover" />
  </div>
  <h1 className="text-2xl font-bold text-slate-900">{creator.displayName}</h1>
  <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">{creator.bio}</p>
  {/* Social links */}
  <div className="flex items-center justify-center gap-3 mt-4">
    {creator.twitterHandle && (
      <a href={`https://twitter.com/${creator.twitterHandle}`}
        className="text-slate-400 hover:text-blue transition-colors">
        <Twitter size={18} />
      </a>
    )}
    {/* LinkedIn, etc. */}
  </div>
  {/* Stats row */}
  <div className="flex items-center justify-center gap-6 mt-5 text-sm">
    <span className="text-slate-500">{creator.totalSessions}+ sessions</span>
    <span className="text-slate-500">⭐ {creator.rating}/5</span>
  </div>
</header>
```

**SlotStep (booking calendar):**
```tsx
<div>
  {/* Date grid — 7-day view */}
  <div className="grid grid-cols-7 gap-1 mb-4">
    {dates.map((date) => (
      <button key={date.iso} onClick={() => selectDate(date.iso)}
        className={cn(
          "flex flex-col items-center py-2 rounded-lg text-sm transition-colors min-h-[44px]",
          selectedDate === date.iso
            ? "bg-blue text-white"
            : "bg-white border border-slate-200 text-slate-700 hover:border-blue"
        )}>
        <span className="text-xs text-inherit opacity-75">{date.day}</span>
        <span className="font-semibold">{date.num}</span>
      </button>
    ))}
  </div>
  {/* Time slots */}
  <div className="grid grid-cols-3 gap-2">
    {slots.filter(s => s.available).map((slot) => (
      <button key={slot.time} onClick={() => selectSlot(selectedDate!, slot.time)}
        className={cn(
          "border rounded-lg py-2 text-sm font-medium min-h-[44px] transition-colors",
          selectedSlot === slot.time
            ? "bg-blue text-white border-blue"
            : "bg-white border-slate-200 text-slate-700 hover:border-blue"
        )}>
        {slot.time} IST
      </button>
    ))}
  </div>
</div>
```

---

### 5 — Claude Artifacts

Build **TopTier** — production-quality professional creator service platform — Next.js 14 App Router, TypeScript strict, Tailwind CSS. Plus Jakarta Sans 400/600/700.

**Four defining constraints:**

**Constraint 1 — Free services show 'Free intro', never '$0':**
```typescript
// WRONG
<span>{service.price === 0 ? 'Free' : `$${service.price}`}</span>  // ✗ raw cents + wrong label

// RIGHT
<span>{formatServicePrice(service.price)}</span>  // → 'Free intro' or '$50' ✓
```

**Constraint 2 — Booking state in Zustand, not component state:**
```typescript
// WRONG: booking step tracked in BookingSheet via useState
const [step, setStep] = useState<BookingStep>('slot')  // ✗

// RIGHT: all booking state in useBookingStore
const { step, setStep, selectedDate, selectSlot } = useBookingStore()  // ✓
// Zustand allows BookingSheet to be closed and reopened without losing state
```

**Constraint 3 — All tap targets minimum 44px:**
```tsx
// WRONG: small button on mobile
<button className="px-3 py-1 text-sm">Book</button>  // ✗ may be <44px tall

// RIGHT: explicit min-height
<button className="px-4 py-2 text-sm min-h-[44px]">Book</button>  // ✓
// This includes: time slot buttons, category tabs, Book buttons, all interactive elements
```

**Constraint 4 — Timezone label on every time display:**
```tsx
// WRONG: no timezone context
<span>{slot.time}</span>  // → '10:00 AM' — ambiguous ✗

// RIGHT: always show timezone
<span>{slot.time} IST</span>  // → '10:00 AM IST' ✓
// Creator's timezone — determined from CREATOR_PROFILE.timezone
```

**Complete folder structure:**
```
src/
  types/index.ts
  lib/
    data.ts                 — SERVICES[], CREATOR_PROFILE, TESTIMONIALS[]
    formatServicePrice.ts   — 0 → 'Free intro'
    formatDuration.ts       — minutes → '30 min' | '1h 30min'
    generateAvailability.ts — 14-day mock slot array
  store/
    booking.ts              — useBookingStore (sheetOpen, activeCategory, step, slot selection, info)
  components/
    profile/ProfileHeader.tsx + CategoryTabs.tsx + ServiceCard.tsx + ServiceList.tsx
    profile/TestimonialCard.tsx + TestimonialStrip.tsx
    booking/
      BookingSheet.tsx      — 'use client', Framer Motion x: 100% → 0
      SlotStep.tsx          — 7-day date grid + time slot buttons (min-h-[44px])
      InfoStep.tsx          — name/email/message + timezone display
      PaymentStep.tsx
      ConfirmedStep.tsx     — meeting link + add to calendar
  app/
    globals.css, layout.tsx
    [username]/page.tsx
```

**QA checks:**
```bash
tsc --noEmit
grep -r "'\$0'\|\"\$0\"" src --include="*.tsx"                                   # empty
grep -r "durationMinutes\b" src/components --include="*.tsx" | grep -v "format"  # empty
grep -r "slot\.time\b" src/components --include="*.tsx" | grep -v "IST\|timezone" # empty
npm run build
```

---

### 6 — Grok

Generate all source files for **TopTier** — professional creator service platform. Next.js 14, TypeScript strict, Tailwind CSS.

Generate in order:
1. `tailwind.config.ts` — colors (slate shades, blue, purple), maxWidth (profile: 640px)
2. `src/types/index.ts` — ServiceType, BookingStep, Service, TimeSlot, BookingState, CreatorProfile, Testimonial
3. `src/lib/formatServicePrice.ts` — `0 → 'Free intro'`, else `'$N'`
4. `src/lib/formatDuration.ts` — `minutes → '30 min' | '1h 30min'`
5. `src/lib/generateAvailability.ts` — mock 14-day availability (weekdays with 5 slots each)
6. `src/lib/data.ts` — SERVICES (6, 1 free), CREATOR_PROFILE, TESTIMONIALS (4)
7. `src/store/booking.ts` — useBookingStore (sheetOpen, activeCategory, step, selection, info)
8. `src/app/globals.css` — Plus Jakarta Sans import, base reset, bg-slate-50
9. `src/app/layout.tsx` — Plus Jakarta Sans font setup
10. `src/components/profile/ProfileHeader.tsx` — centered avatar, name, bio, social links, stats row
11. `src/components/profile/CategoryTabs.tsx` — 'use client', horizontal scroll, active = bg-blue
12. `src/components/profile/ServiceCard.tsx` — service type icon, title, formatDuration, formatServicePrice, Book button min-h-[44px]
13. `src/components/profile/ServiceList.tsx` — filters SERVICES by activeCategory from store
14. `src/components/profile/TestimonialCard.tsx` — quote, name, role, avatar
15. `src/components/profile/TestimonialStrip.tsx` — horizontal scroll or 2-col grid
16. `src/components/booking/SlotStep.tsx` — 7-day grid + time slots with timezone label
17. `src/components/booking/InfoStep.tsx` — name/email/message fields, all min-h-[44px]
18. `src/components/booking/PaymentStep.tsx` — order summary + Stripe placeholder
19. `src/components/booking/ConfirmedStep.tsx` — meeting URL + calendar add link
20. `src/components/booking/BookingSheet.tsx` — 'use client', Framer Motion slide-in, step routing
21. `src/app/[username]/page.tsx` — ProfileHeader + CategoryTabs + ServiceList + TestimonialStrip + BookingSheet

**Rules for every file:**
- `formatServicePrice(service.price)` — never raw cents in JSX
- `formatDuration(service.durationMinutes)` — never raw minutes in JSX
- All interactive elements `min-h-[44px]` — no exceptions
- Time slots always show `{slot.time} IST` — never bare time
- Booking state in `useBookingStore()` — no local useState for step/slot/date

---

### 7 — Gemini

**Project:** TopTier — professional creator service platform. Next.js 14 App Router, TypeScript strict, Tailwind CSS. Plus Jakarta Sans 400/600/700.

**Design system — 4 rules:**
1. Centered `max-w-profile` (640px) — mobile-first, profile page owns the width
2. `rounded-xl` (12px) on all cards — professional rounding
3. Professional blue `#3B82F6` for CTAs; purple `#8B5CF6` for category badges
4. All tap targets `min-h-[44px]` — WCAG mobile accessibility rule

**Architecture — 3 layers:**

Layer 1 — Foundation: types, formatServicePrice (0 → 'Free intro'), formatDuration, generateAvailability, data, Zustand booking store.

Layer 2 — Profile Page:
- `ProfileHeader` — centered avatar (96px rounded-full), H1 name, 2-line bio, social link row, sessions/rating stats
- `CategoryTabs` — `'use client'`, horizontal scroll, active tab `bg-blue text-white`
- `ServiceCard` — left icon (bg-blue/10 rounded-lg), center (title + formatDuration), right (formatServicePrice + Book button min-h-[44px])
- `ServiceList` — filters from `activeCategory` in store
- `TestimonialStrip` — quote cards, horizontal scroll on mobile

Layer 3 — Booking Sheet:
- `BookingSheet` — `'use client'`, `motion.div` `x: '100%' → 0` from right; full-height `fixed inset-y-0 right-0`
- `SlotStep` — 7-day date grid, time slot pills with timezone; `generateAvailability(new Date(), 14)`
- `InfoStep` — name/email/message; all inputs `min-h-[44px]`
- `PaymentStep` — summary card + Stripe placeholder
- `ConfirmedStep` — meeting link + "Add to Google Calendar" deep link

**Motion:**
- `BookingSheet`: `x: '100%' → 0`, `duration: 0.25`, tween — not spring bounce
- `ProfileHeader` on load: `opacity: 0, y: 16 → visible`
- `ServiceCard` hover: CSS `hover:-translate-y-0.5 hover:shadow-md` — not Framer Motion
- Category tab switch: CSS `transition-colors duration-150`
- All Framer Motion `viewport={{ once: true }}` + `useReducedMotion()` guard

---

### 8 — Cursor

Build **TopTier** creator service platform. Next.js 14, TypeScript strict, Tailwind CSS. Static export.

**`src/types/index.ts`:**
```typescript
export type ServiceType = 'one_on_one' | 'webinar' | 'digital_product' | 'priority_dm'
export type BookingStep = 'slot' | 'info' | 'payment' | 'confirmed'

export interface Service {
  id: string; title: string; description: string
  serviceType: ServiceType; durationMinutes: number
  price: number; maxParticipants: number; featured: boolean
}

export interface TimeSlot {
  date: string; time: string; available: boolean
}

export interface BookingState {
  step: BookingStep; serviceId: string | null
  selectedDate: string | null; selectedSlot: string | null
  name: string; email: string; message: string; meetingUrl: string | null
}
```

**`src/lib/formatServicePrice.ts`:**
```typescript
export function formatServicePrice(cents: number): string {
  if (cents === 0) return 'Free intro'
  return `$${(cents / 100).toFixed(0)}`
}
// formatServicePrice(0) → 'Free intro'  (never '$0' or 'Free')
// formatServicePrice(5000) → '$50'
```

**`src/lib/formatDuration.ts`:**
```typescript
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60), m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}
// formatDuration(30) → '30 min'
// formatDuration(60) → '1h'
// formatDuration(90) → '1h 30min'
```

**`src/store/booking.ts`:**
```typescript
import { create } from 'zustand'
import type { BookingState, BookingStep } from '@/types'

interface BookingStore extends BookingState {
  activeCategory: string
  sheetOpen: boolean
  openSheet: (serviceId: string) => void
  closeSheet: () => void
  setCategory: (cat: string) => void
  setStep: (step: BookingStep) => void
  selectSlot: (date: string, time: string) => void
  setInfo: (name: string, email: string, message: string) => void
  confirm: (meetingUrl: string) => void
  reset: () => void
}

export const useBookingStore = create<BookingStore>((set) => ({
  step: 'slot', serviceId: null, selectedDate: null, selectedSlot: null,
  name: '', email: '', message: '', meetingUrl: null,
  activeCategory: 'all', sheetOpen: false,
  openSheet: (serviceId) => set({ sheetOpen: true, serviceId, step: 'slot' }),
  closeSheet: () => set({ sheetOpen: false }),
  setCategory: (cat) => set({ activeCategory: cat }),
  setStep: (step) => set({ step }),
  selectSlot: (date, time) => set({ selectedDate: date, selectedSlot: time }),
  setInfo: (name, email, message) => set({ name, email, message }),
  confirm: (meetingUrl) => set({ step: 'confirmed', meetingUrl }),
  reset: () => set({ step: 'slot', serviceId: null, selectedDate: null, selectedSlot: null,
    name: '', email: '', message: '', meetingUrl: null }),
}))
```

**`src/components/profile/ServiceCard.tsx`:**
```tsx
import type { Service } from '@/types'
import { formatServicePrice } from '@/lib/formatServicePrice'
import { formatDuration } from '@/lib/formatDuration'
import { useBookingStore } from '@/store/booking'
import { Clock, Users } from 'lucide-react'

interface Props { service: Service }

export default function ServiceCard({ service }: Props) {
  const { openSheet } = useBookingStore()
  return (
    <article
      className="bg-white border border-slate-200 rounded-xl p-6 cursor-pointer
        hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
      onClick={() => openSheet(service.id)}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center shrink-0">
          {/* ServiceIcon by serviceType */}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900">{service.title}</h3>
          <p className="text-slate-500 text-sm mt-1 line-clamp-2">{service.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={12} /> {formatDuration(service.durationMinutes)}
            </span>
            {service.maxParticipants > 1 && (
              <span className="text-xs bg-purple/10 text-purple px-2 py-0.5 rounded-full">
                {service.maxParticipants} seats
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="font-bold text-slate-900">{formatServicePrice(service.price)}</span>
          <button
            className="bg-blue text-white rounded-lg px-4 py-2 text-sm font-semibold
              min-h-[44px] hover:bg-blue/90 transition-colors"
            onClick={(e) => { e.stopPropagation(); openSheet(service.id) }}>
            Book
          </button>
        </div>
      </div>
    </article>
  )
}
// formatServicePrice(service.price) — NEVER raw cents
// formatDuration(service.durationMinutes) — NEVER raw number
// min-h-[44px] on Book button — WCAG mobile tap target
```

**`src/components/booking/BookingSheet.tsx`:**
```tsx
'use client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useBookingStore } from '@/store/booking'
import SlotStep from './SlotStep'
import InfoStep from './InfoStep'
import PaymentStep from './PaymentStep'
import ConfirmedStep from './ConfirmedStep'

export default function BookingSheet() {
  const { sheetOpen, closeSheet, step } = useBookingStore()
  const shouldReduce = useReducedMotion()
  return (
    <AnimatePresence>
      {sheetOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40" onClick={closeSheet} />
          {/* Sheet */}
          <motion.div
            initial={{ x: shouldReduce ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: shouldReduce ? 0 : '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md
              bg-white border-l border-slate-200 overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">Book a session</h2>
              <button onClick={closeSheet}
                className="text-slate-400 hover:text-slate-600 min-h-[44px] min-w-[44px]
                  flex items-center justify-center rounded-lg hover:bg-slate-100">
                ✕
              </button>
            </div>
            <div className="p-5">
              {step === 'slot'      && <SlotStep />}
              {step === 'info'      && <InfoStep />}
              {step === 'payment'   && <PaymentStep />}
              {step === 'confirmed' && <ConfirmedStep />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

**Absolute rules:**
```bash
grep -r "'\$0'\|\"\$0\"\|'Free'" src/components --include="*.tsx"                # empty (use formatServicePrice)
grep -r "durationMinutes\b" src/components --include="*.tsx" | grep -v "format"   # empty (use formatDuration)
grep -r "slot\.time\b\|selectedSlot\b" src/components --include="*.tsx" | \
  grep -v "IST\|timezone\|formatTime"                                              # should show timezone
grep -r "useState.*step\|useState.*BookingStep" src/components --include="*.tsx"  # empty (use store)
tsc --noEmit && npm run build
```
