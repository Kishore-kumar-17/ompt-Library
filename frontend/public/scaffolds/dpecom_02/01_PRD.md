# 01 — Product Requirements Document
## Squeezed SaaS Storefront · dpecom_platform_02

### 1. Product Vision
"Squeezed" is the all-in-one platform for software companies to sell payments, taxes, and subscriptions. It eliminates the "Tax Nightmare" for creators by acting as a Merchant of Record (MoR), handling global compliance and VAT automatically. The design signals "Premium SaaS" to build immediate trust with business-tier buyers.

**Success Metric:** A developer can integrate the checkout and start accepting global payments in under 15 minutes.

### 2. Personas
**Jordan — The SaaS Founder (Creator)**
- Has a growing software tool but is terrified of global VAT compliance.
- Needs: Automated tax handling, MRR reporting, and a built-in affiliate program.
- Frustration: Managing multiple tools for billing, licensing, and marketing.

**Casey — The Enterprise Buyer**
- Buying software for their team.
- Needs: A secure, professional checkout that accepts Apple Pay and provides instant tax invoices.
- Frustration: Sketchy-looking checkout pages and manual invoice requests.

### 3. Core Features
- **Merchant of Record (MoR) Engine:** Automatic tax calculation and compliance for 135+ countries.
- **Revenue Dashboard:** Advanced reporting for MRR, Churn, LTV, and net revenue.
- **Subscription Suite:** Flexible billing (recurring, usage-based, tiers) with failed payment recovery (dunning).
- **License Key Manager:** Automated issuance and validation of software keys.
- **Native Checkout Overlay:** A multi-step, conversion-optimized modal with 20+ payment methods.

### 4. User Journeys
1. **Setup:** Creator connects bank -> defines subscription tiers -> embeds checkout.
2. **Growth:** Creator launches an affiliate program -> tracks MRR growth in the dashboard.
3. **Purchase:** Buyer completes checkout -> receives license key + tax invoice immediately.

### 5. Non-Goals
- No physical goods inventory management.
- No social media "Storefront" (Marketplace focus is secondary to the "Tool/MoR" focus).
- No complex website builder (Checkout/Storefront is template-based).

### 6. Constraints
- **Design:** High-end SaaS. Rounded corners (12px), soft shadows, pixel-perfect alignment.
- **Trust:** Must include "Secure Checkout" and "Merchant of Record" trust badges.
- **Compliance:** Full WCAG AA accessibility.
