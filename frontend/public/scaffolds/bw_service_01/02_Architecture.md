# 02 — Architecture
## Indian Email Marketing SaaS Landing Page · bw_service_01

---

## TypeScript Types

```typescript
// src/types/index.ts

export type BillingPeriod = 'monthly' | 'yearly'

export interface PricingTier {
  id: string
  name: string
  monthlyPrice: number      // INR per month when billed monthly (0 = Free)
  yearlyPrice: number       // INR effective per month when billed yearly
  description: string
  contacts: string          // e.g. 'Up to 500 contacts'
  emailsPerMonth: string    // e.g. '1,000 emails/mo' or 'Unlimited emails'
  features: string[]        // ordered list of included features
  highlighted: boolean      // 'Most Popular' — yellow card
  cta: string               // CTA button text
}

export interface FeatureItem {
  id: string
  title: string
  description: string
  icon: string              // lucide icon name
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  quote: string
}

export interface TrustStat {
  id: string
  icon: string
  value: string
  label: string
}
```

---

## Mock Data

```typescript
// src/lib/data.ts
import type { PricingTier, FeatureItem, Testimonial, TrustStat } from '@/types'

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Perfect to get started',
    contacts: 'Up to 500 contacts',
    emailsPerMonth: '1,000 emails/mo',
    features: [
      'Email campaigns',
      '5 basic templates',
      'Campaign reports',
      'MailFlow branding on emails',
    ],
    highlighted: false,
    cta: 'Get Started Free',
  },
  {
    id: 'essentials',
    name: 'Essentials',
    monthlyPrice: 749,
    yearlyPrice: 599,
    description: 'For growing businesses',
    contacts: 'Up to 5,000 contacts',
    emailsPerMonth: '50,000 emails/mo',
    features: [
      'Everything in Free',
      'A/B testing',
      'Custom branding — remove MailFlow logo',
      'All email templates (50+)',
      '24/7 email support',
    ],
    highlighted: false,
    cta: 'Start Free Trial',
  },
  {
    id: 'standard',
    name: 'Standard',
    monthlyPrice: 1499,
    yearlyPrice: 1199,
    description: 'Most popular for scaling teams',
    contacts: 'Up to 25,000 contacts',
    emailsPerMonth: 'Unlimited emails',
    features: [
      'Everything in Essentials',
      'Marketing automation flows',
      'Retargeting ads integration',
      'Advanced analytics dashboard',
      'Priority chat support',
      'Custom domains',
    ],
    highlighted: true,         // yellow card bg
    cta: 'Start Free Trial',
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 4999,
    yearlyPrice: 3999,
    description: 'For enterprise-scale sending',
    contacts: 'Up to 1,00,000 contacts',
    emailsPerMonth: 'Unlimited emails',
    features: [
      'Everything in Standard',
      'Dedicated sending IP',
      'Phone support + dedicated account manager',
      'Custom onboarding session',
      '99.9% uptime SLA',
      'HIPAA / SOC 2 compliance',
    ],
    highlighted: false,
    cta: 'Contact Sales',
  },
]

export const FEATURES: FeatureItem[] = [
  {
    id: 'f1',
    title: 'Smart Campaigns',
    description: 'Design beautiful emails in minutes with our drag-and-drop editor and 50+ templates. Schedule campaigns, personalise by segment, and track opens and clicks in real time.',
    icon: 'Mail',
  },
  {
    id: 'f2',
    title: 'Automation Flows',
    description: 'Set up welcome series, cart abandonment, re-engagement flows, and more. Once built, they run automatically — freeing your team to focus on strategy, not execution.',
    icon: 'Zap',
  },
  {
    id: 'f3',
    title: 'Analytics and Insights',
    description: 'See exactly which campaigns drive revenue. Track revenue per email, compare A/B variants, and export reports for stakeholder presentations — all in one dashboard.',
    icon: 'BarChart2',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Menon',
    company: 'ThreadCraft',
    role: 'Founder',
    quote: 'We switched from a US tool to MailFlow and our email deliverability jumped overnight. INR billing and Indian support hours made the decision easy.',
  },
  {
    id: 't2',
    name: 'Arjun Kapoor',
    company: 'NutriBox',
    role: 'Head of Growth',
    quote: 'The automation flows paid for themselves in the first month. Our welcome series now converts 3× better than our previous setup.',
  },
  {
    id: 't3',
    name: 'Sneha Iyer',
    company: 'LegalDesk India',
    role: 'Marketing Manager',
    quote: 'Managing 40,000 subscribers with MailFlow is genuinely easy. The segmentation tools are as powerful as anything we used internationally — at a fraction of the cost.',
  },
]

export const TRUST_STATS: TrustStat[] = [
  { id: 'ts1', icon: 'Building2', value: '50,000+', label: 'Businesses in India' },
  { id: 'ts2', icon: 'Send',      value: '4 Crore+', label: 'Emails sent daily' },
  { id: 'ts3', icon: 'CheckCircle', value: '99.9%',  label: 'Deliverability rate' },
  { id: 'ts4', icon: 'Star',      value: '4.8/5',    label: 'Customer rating' },
]
```

---

## Utility Functions

```typescript
// src/lib/formatPlanPrice.ts
import type { PricingTier, BillingPeriod } from '@/types'

export function formatPlanPrice(tier: PricingTier, period: BillingPeriod): string {
  const price = period === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice
  if (price === 0) return 'Free'
  return `₹${price.toLocaleString('en-IN')}/mo`
}

// formatPlanPrice(PRICING_TIERS[0], 'monthly') → 'Free'
// formatPlanPrice(PRICING_TIERS[1], 'monthly') → '₹749/mo'
// formatPlanPrice(PRICING_TIERS[2], 'monthly') → '₹1,499/mo'
// formatPlanPrice(PRICING_TIERS[2], 'yearly')  → '₹1,199/mo'


// src/lib/calculateYearlySavings.ts
import type { PricingTier } from '@/types'

export function calculateYearlySavings(tier: PricingTier): number {
  return (tier.monthlyPrice - tier.yearlyPrice) * 12
}

// calculateYearlySavings(PRICING_TIERS[0]) → 0  (Free — no savings)
// calculateYearlySavings(PRICING_TIERS[1]) → 1800
// calculateYearlySavings(PRICING_TIERS[2]) → 3600
// calculateYearlySavings(PRICING_TIERS[3]) → 12000
```

---

## Utility Result Table (acceptance criteria)

| Tier | Period | formatPlanPrice | calculateYearlySavings |
|------|--------|-----------------|------------------------|
| Free | monthly | 'Free' | 0 |
| Free | yearly | 'Free' | 0 |
| Essentials | monthly | '₹749/mo' | 1800 |
| Essentials | yearly | '₹599/mo' | 1800 |
| Standard | monthly | '₹1,499/mo' | 3600 |
| Standard | yearly | '₹1,199/mo' | 3600 |
| Premium | monthly | '₹4,999/mo' | 12000 |
| Premium | yearly | '₹3,999/mo' | 12000 |

---

## Component Map

```
src/
  app/
    layout.tsx                ← Inter, --font-sans variable
    page.tsx                  ← Server component, assembles all sections
    globals.css               ← 8 tokens + .sr-only + prefers-reduced-motion
  components/
    layout/
      SiteNav.tsx             ← 'use client', scroll shadow, dark logo + yellow accent
      Footer.tsx              ← dark bg, 4 columns
    home/
      HeroSection.tsx         ← Static, split layout
      PlanGrid.tsx            ← 'use client', BillingPeriod state, renders BillingToggle + PlanCards
      BillingToggle.tsx       ← Controlled component, aria-pressed buttons
      PlanCard.tsx            ← highlighted = yellow bg, dark text
      FeatureShowcase.tsx     ← 3 alternating rows
      TestimonialCard.tsx     ← single testimonial
      TestimonialGrid.tsx     ← 3 cards layout
      TrustBar.tsx            ← 'use client' for Framer Motion, YELLOW bg, dark text
    ui/
      Button.tsx              ← 'dark' | 'outlineDark' | 'ghost' variants
      FeatureCheckmark.tsx    ← green check icon + feature text
  lib/
    formatPlanPrice.ts
    calculateYearlySavings.ts
    data.ts
  types/
    index.ts
```

---

## Data Flow for BillingPeriod

```
page.tsx (Server Component)
  └── PlanGrid.tsx (Client — owns BillingPeriod state)
        ├── BillingToggle.tsx (period, onChange) — controlled
        ├── PlanCard.tsx (tier, period) × 4
        │     └── formatPlanPrice(tier, period) — called inside
        │     └── calculateYearlySavings(tier)  — called inside (conditionally)
        └── ARIA live region: "Showing {period} pricing"
```

`PlanCard` receives `period` as a prop. It does not read from context or manage state itself. This is the correct prop-drilling pattern for a 2-level tree.
