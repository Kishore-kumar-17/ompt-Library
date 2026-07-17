# 07 — Guide
## Engineering Standards · pcpp_platform_15

### 1. SubStackHub Checklist
- **Conversion:** Is the email capture field persistent and prominent on first entry?
- **Hierarchy:** Does the title and byline take visual priority over the UI chrome?
- **Readability:** Is the serif body text line-height at least 1.6?
- **Purity:** Are there ZERO ads or non-essential widgets in the reading flow?

### 2. Coding Conventions
- **SEO Strategy:** Every post must have specialized Meta/OpenGraph tags for high-impact social sharing.
- **Membership State:** Use `useSession` (NextAuth) and a custom `useMember` hook to handle real-time gating.
- **Image Strategy:** Use `priority` and `placeholder="blur"` for all featured post imagery.
- **Mobile First:** Ensure the horizontal "Notes" and "Status" scrollers are 1-tap accessible.

### 3. File Structure
```
src/
  app/
    (main)/         # Publication home, Notes, About
    posts/          # Long-form essays and podcasts
    welcome/        # High-conversion gateway
    archive/        # Chronological post index
    account/        # Member billing and settings
  components/
    content/        # PostRenderer, PaywallOverlay, FeedSwitcher
    membership/     # WelcomeCapture, TierCards, SignupFlow
    community/      # NoteFeed, CommentThread, MemberBadge
    layout/         # MinimalNav, PaperFooter, Wordmark
  store/            # useNavStore, useMemberStore
  lib/              # sanity-client, stripe-utils, next-auth-config
```

### 4. Definition of Done
- Welcome page converts visitors at a high rate with zero friction.
- Post-level paywall securely gates content while showing high-value teasers.
- Multi-mode homepage correctly renders Magazine and Newspaper layouts from the CMS.
- Community notes and comments provide a seamless, authenticated member experience.
