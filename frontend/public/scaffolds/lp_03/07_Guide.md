# 07 — Guide
## Engineering Standards · lp_platform_03

### 1. LumaStyle Checklist
- **Aesthetic:** Is the title font strictly EB Garamond (or similar high-end Serif)?
- **Social:** Is the "Who's Going" stack visible on the primary event page?
- **Friction:** Does the registration modal have more than 3 input fields? (If so, simplify).
- **Mobile:** Is there a sticky "Register" button on the mobile footer?

### 2. Coding Conventions
- **Avatar Strategy:** Use a shared `AttendeeAvatar` component with `rounded-full` and `border-2 border-white` to ensure visibility in the stack.
- **Logistics Strategy:** Strictly use `Intl.DateTimeFormat` for time-zone aware date rendering on the client side.
- **Shadow Strategy:** Use a custom `shadow-invitation` token in Tailwind for soft, high-diffusion shadows.
- **Image Strategy:** Use Next.js `<Image>` with `quality={85}` and `placeholder="blur"` for aesthetic cover photos.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Community Discovery
    events/         # Aesthetic event landing pages ([slug])
    host/           # Community profiles and calendars
    register/       # One-tap sign-up modals and callbacks
  components/
    invitation/     # CenteredHeader, CoverPhoto, LogisticsBlock
    social/         # AvatarStack, WhoIsGoingStrip, HostCard
    registration/   # RegistrationModal, CalendarTrigger, FollowButton
    layout/         # MinimalNav, InvitationFooter, StickyCTA
  store/            # useEventStore, useCommunityStore
  lib/              # sanity-client, clerk-utils, calendar-gen
```

### 4. Definition of Done
- Event landing page renders with elegant centered typography and zero layout shift.
- Avatar stack handles 50+ attendees with graceful "+X" truncation.
- Registration flow completes in under 2 steps using social auth.
- Mobile view maintains "Minimalist Elegance" via scannable stacks and persistent CTAs.
