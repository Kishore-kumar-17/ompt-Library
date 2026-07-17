# 07 — Guide
## Engineering Standards · lp_platform_08

### 1. StudioQuiet Checklist
- **Void:** Is there a vertical scrollbar? (If yes, fix the 100vh container).
- **Typography:** Is the monospaced font used for data? Is the sans font used for narrative?
- **Radius:** Are all rounded corners strictly `rounded-sm` (2px)?
- **Speed:** Is the LCP under 250ms?

### 2. Coding Conventions
- **Centered Strategy:** Use a `10%` negative translateY on the main group to account for optical centering (the physical center often looks "low" to the eye).
- **Interaction Strategy:** All feedback (errors/success) must happen in-line within the centered content group. Do not use toast notifications.
- **Lead Strategy:** Use `revalidatePath('/')` on submission to update the public join-count if displayed.
- **Accessibility:** The single input must have an `autoFocus` attribute and a clear `aria-label="Email address"`.

### 3. File Structure
```
src/
  app/
    (landing)/      # Homepage (Zero-scroll Void)
    api/            # Supabase webhooks and lead processing
  components/
    waitlist/       # OpticalInput, JoinButton, SubmissionFade
    branding/       # StudioMark, MonoLabel, DiscreteFooter
    layout/         # CenteredVoid, StudioReset
  store/            # useWaitlistStore (input state)
  lib/              # supabase-client, zod-schemas, motion-variants
```

### 4. Definition of Done
- Page provides zero distractions and anchors the eye to the single email field.
- Submission flow is near-instant with a high-fidelity success animation.
- Join count updates in real-time (or on refresh) to build quiet hype.
- Mobile view is perfectly centered and optimized for instant thumb-input.
