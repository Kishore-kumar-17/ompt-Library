# 07 — Guide
## Engineering Standards · dpecom_platform_03

### 1. Clean Creative Checklist
- **Typography:** Is the heading using the Serif font? Is the body using Inter?
- **Colors:** Is the background Warm Cream? (No harsh white).
- **Layout:** Is the content centered and narrow (max-width 720px)?
- **Language:** Is the copy written in the first person? ("I'm excited to share...")

### 2. Coding Conventions
- **Automation:** Use the Resend Node.js SDK for all transactional and newsletter logic.
- **Safety:** All digital assets must be served via signed URLs from Supabase Storage.
- **State:** Use Zustand to track "Subscriber" status across the session to avoid redundant opt-in forms.
- **CSS:** Use Tailwind's `prose` class for long-form product descriptions to ensure consistent serif/sans spacing.

### 3. File Structure
```
src/
  app/          # Routes (Next.js App Router)
  components/
    audience/   # Subscribe forms, Lead magnets
    commerce/   # Tip Jar, Product Cards, Checkout
    layout/     # Minimalist Nav, Centered Footer
  lib/          # Resend, Supabase, Stripe
  store/        # useAudienceStore
  emails/       # React Email templates for fulfillment
```

### 4. Definition of Done
- Purchase successfully adds email to the Resend audience list.
- Digital asset is delivered via email within 30 seconds of purchase.
- Mobile view maintains perfect readability and 1-tap conversion.
- All forms are WCAG AA compliant with clear error states.
