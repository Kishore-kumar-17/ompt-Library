import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  TableLayoutType, PageBreak, TabStopType, TabStopPosition,
} from "docx";
import fs from "fs";

// ── Colors ──────────────────────────────────────────────────────────────────
const BRAND      = "1A1A2E";
const ACCENT     = "4361EE";
const GRAY       = "6B7280";
const LIGHT_BG   = "F3F4F6";
const WHITE      = "FFFFFF";
const TABLE_HEAD = "1E293B";
const TABLE_ALT  = "F8FAFC";
const GREEN      = "059669";
const RED        = "DC2626";
const AMBER      = "D97706";

// ── Helpers ─────────────────────────────────────────────────────────────────
const heading1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 400, after: 200 },
  children: [new TextRun({ text, bold: true, size: 36, font: "Calibri", color: BRAND })],
});

const heading2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 360, after: 160 },
  children: [new TextRun({ text, bold: true, size: 28, font: "Calibri", color: ACCENT })],
});

const heading3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 280, after: 120 },
  children: [new TextRun({ text, bold: true, size: 24, font: "Calibri", color: BRAND })],
});

const para = (text, opts = {}) => new Paragraph({
  spacing: { after: 140 },
  children: [new TextRun({ text, size: 21, font: "Calibri", color: opts.color || "374151", ...opts })],
});

const bullet = (text, opts = {}) => new Paragraph({
  bullet: { level: 0 },
  spacing: { after: 80 },
  children: [new TextRun({ text, size: 21, font: "Calibri", color: "374151", ...opts })],
});

const boldPara = (label, text) => new Paragraph({
  spacing: { after: 140 },
  children: [
    new TextRun({ text: label, bold: true, size: 21, font: "Calibri", color: BRAND }),
    new TextRun({ text, size: 21, font: "Calibri", color: "374151" }),
  ],
});

const spacer = () => new Paragraph({ spacing: { after: 100 }, children: [] });

const codeBlock = (text) => new Paragraph({
  spacing: { before: 120, after: 120 },
  shading: { type: ShadingType.SOLID, color: "F1F5F9", fill: "F1F5F9" },
  indent: { left: 300, right: 300 },
  children: [new TextRun({ text, size: 19, font: "Consolas", color: "1E293B" })],
});

const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" };

function makeTable(headers, rows) {
  const cellBorders = {
    top: thinBorder, bottom: thinBorder,
    left: thinBorder, right: thinBorder,
  };

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(h => new TableCell({
      shading: { type: ShadingType.SOLID, color: TABLE_HEAD, fill: TABLE_HEAD },
      borders: cellBorders,
      verticalAlign: "center",
      children: [new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 60, after: 60 },
        children: [new TextRun({ text: h, bold: true, size: 20, font: "Calibri", color: WHITE })],
      })],
    })),
  });

  const dataRows = rows.map((row, ri) => new TableRow({
    children: row.map(cell => new TableCell({
      shading: ri % 2 === 1
        ? { type: ShadingType.SOLID, color: TABLE_ALT, fill: TABLE_ALT }
        : undefined,
      borders: cellBorders,
      verticalAlign: "center",
      children: [new Paragraph({
        spacing: { before: 50, after: 50 },
        children: [new TextRun({ text: String(cell), size: 20, font: "Calibri", color: "374151" })],
      })],
    })),
  }));

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.AUTOFIT,
    rows: [headerRow, ...dataRows],
  });
}

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

// ── Document ────────────────────────────────────────────────────────────────

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 21, color: "374151" },
        paragraph: { spacing: { line: 300 } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1200, bottom: 1000, left: 1200, right: 1200 },
      },
    },
    children: [

      // ════════════════════════════════════════════════════════════════════
      // TITLE PAGE
      // ════════════════════════════════════════════════════════════════════
      spacer(), spacer(), spacer(), spacer(), spacer(), spacer(),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [new TextRun({ text: "PROMPT BOT", size: 52, bold: true, font: "Calibri", color: ACCENT, letterSpacing: 200 })],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: "Backend Production Architecture", size: 40, bold: true, font: "Calibri", color: BRAND })],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [new TextRun({ text: "A comprehensive guide to database, caching, security, monitoring, and infrastructure", size: 22, font: "Calibri", color: GRAY })],
      }),

      spacer(), spacer(),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Version 1.0  |  June 2026  |  Confidential", size: 20, font: "Calibri", color: GRAY, italics: true })],
      }),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // TABLE OF CONTENTS
      // ════════════════════════════════════════════════════════════════════
      heading1("Table of Contents"),
      spacer(),
      ...[
        "1.  Current Architecture",
        "2.  Database Layer — PostgreSQL (Neon)",
        "3.  Caching Layer — Redis (Upstash)",
        "4.  Rate Limiting — Upstash Ratelimit",
        "5.  Input Validation — Zod",
        "6.  Error Tracking — Sentry",
        "7.  Security Headers & CORS",
        "8.  Service Architecture Map",
        "9.  Cost Estimate",
        "10. Implementation Roadmap",
        "11. What You Don't Need Yet",
      ].map(t => new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: t, size: 22, font: "Calibri", color: BRAND })],
      })),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 1. CURRENT ARCHITECTURE
      // ════════════════════════════════════════════════════════════════════
      heading1("1. Current Architecture"),

      heading2("Technology Stack"),
      makeTable(
        ["Layer", "Technology"],
        [
          ["API Framework", "Hono.js (Node.js + TypeScript)"],
          ["Database", "PostgreSQL with Drizzle ORM"],
          ["Authentication", "JWT (jose library, HS256, 7-day expiry)"],
          ["AI Engine", "Anthropic Claude API (Sonnet 4)"],
          ["Hosting", "Vercel Serverless Functions"],
          ["Frontend", "React 18 SPA (Vite + TypeScript)"],
        ],
      ),
      spacer(),

      heading2("API Routes"),
      makeTable(
        ["Endpoint", "Purpose"],
        [
          ["/api/auth", "User registration, login, session verification"],
          ["/api/prompts", "Prompt CRUD operations, copy and save events"],
          ["/api/submissions", "Community prompt submissions and review"],
          ["/api/profile", "User profile data and usage statistics"],
          ["/api/admin", "Admin-only bulk CSV import operations"],
          ["/api/library", "Pre-seeded prompt library (pl_prompts table)"],
          ["/api/builder", "AI-powered prompt generation (v4.2 Pro Formula)"],
          ["/api/improver", "AI-powered prompt improvement and analysis"],
        ],
      ),
      spacer(),

      heading2("Known Production Risks"),
      bullet("No connection pooling — serverless functions open a new database connection per request, risking connection exhaustion under moderate load"),
      bullet("No rate limiting — AI endpoints (Builder and Improver) can be called unlimited times, causing uncontrolled Anthropic API costs"),
      bullet("No input validation — raw JSON request bodies are passed directly to database queries and the Anthropic API without sanitization"),
      bullet("No error tracking — production errors are invisible with no logging, alerting, or stack trace capture"),
      bullet("No caching — identical requests hit the database and Anthropic API every single time"),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 2. DATABASE — NEON
      // ════════════════════════════════════════════════════════════════════
      heading1("2. Database Layer — PostgreSQL (Neon)"),

      heading2("Why Neon"),
      para("Neon is a serverless PostgreSQL provider built specifically for platforms like Vercel. It solves the critical connection pooling problem that affects every serverless deployment."),
      spacer(),

      makeTable(
        ["Feature", "Benefit"],
        [
          ["Serverless-native", "Scales to zero when idle, scales up automatically under load"],
          ["Built-in connection pooling", "Serverless driver pools connections automatically — no PgBouncer needed"],
          ["Database branching", "Create an instant copy of production for testing without snapshots or dumps"],
          ["Auto-suspend", "Zero cost when the application has no traffic (e.g., overnight)"],
          ["Full Postgres compatibility", "No changes to schema, queries, Drizzle ORM config, or migrations"],
        ],
      ),
      spacer(),

      heading2("The Connection Pooling Problem"),
      para("The current setup opens a raw postgres connection per serverless function invocation. This is unsustainable:"),
      spacer(),
      bullet("50 concurrent users = 50 simultaneous open connections"),
      bullet("PostgreSQL default connection limit = 100"),
      bullet("Vercel cold starts each open a new connection and never close it properly"),
      bullet("At moderate traffic, the database returns: FATAL: too many connections"),
      bullet("The application becomes completely unresponsive until connections time out"),
      spacer(),

      heading2("Migration Effort"),
      bullet("Replace the postgres driver with @neondatabase/serverless in src/db/index.ts"),
      bullet("Connection string format remains identical — pooling is handled automatically"),
      bullet("Drizzle ORM schema, migrations, and all existing queries remain unchanged"),
      bullet("Total effort: one file change, approximately 30 minutes"),
      spacer(),

      heading2("Recommended Tier"),
      makeTable(
        ["Specification", "Free Tier", "Launch Tier ($19/mo)"],
        [
          ["Storage", "0.5 GB", "10 GB"],
          ["Compute hours", "190 hours/month", "300 hours/month"],
          ["Autoscaling", "0.25 to 2 CU", "0.25 to 4 CU"],
          ["Point-in-time restore", "7 days", "14 days"],
          ["Branches", "10", "Unlimited"],
        ],
      ),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 3. CACHING — UPSTASH REDIS
      // ════════════════════════════════════════════════════════════════════
      heading1("3. Caching Layer — Redis (Upstash)"),

      heading2("Why Upstash"),
      para("Upstash provides HTTP-based serverless Redis that works natively in Vercel serverless functions where traditional TCP-based Redis connections cannot persist."),
      spacer(),

      makeTable(
        ["Feature", "Benefit"],
        [
          ["HTTP-based protocol", "Works in serverless environments without persistent TCP connections"],
          ["Pay-per-request pricing", "10,000 free requests/day — pay only for actual usage"],
          ["Global replication", "Data is cached at the edge closest to the user"],
          ["Multi-purpose", "Same instance handles caching, rate limiting, and session storage"],
        ],
      ),
      spacer(),

      heading2("What to Cache"),
      makeTable(
        ["Endpoint", "Current Behavior", "With Cache", "TTL"],
        [
          ["/api/library (list)", "DB query every request", "Serve from Redis", "10 minutes"],
          ["/api/library/search", "Full-text GIN index search", "Cache by query hash", "5 minutes"],
          ["/api/library/categories", "DB aggregate query", "Cache result", "1 hour"],
          ["/api/builder/generate", "Anthropic API call ($0.003-0.01)", "Cache by input hash", "24 hours"],
          ["/api/improver/improve", "Anthropic API call ($0.003-0.01)", "Cache by input hash", "24 hours"],
        ],
      ),
      spacer(),

      heading2("Anthropic Response Caching — Cost Impact"),
      para("This is the single highest-impact optimization in this entire document."),
      spacer(),
      boldPara("Without caching: ", "100 users submit the same prompt idea for Midjourney. Claude is called 100 times at $0.01 each = $1.00 total cost."),
      boldPara("With caching: ", "First request calls Claude and stores the result. The next 99 requests are served from Redis in under 50ms = $0.01 total cost."),
      boldPara("Result: ", "99% cost reduction on repeated prompts."),
      spacer(),

      heading2("Cache Flow"),
      codeBlock("1. User submits request with (idea + platform + style + mood)"),
      codeBlock("2. Server creates hash: SHA256(idea + platform + style + mood)"),
      codeBlock("3. Check Redis for cached result with that hash"),
      codeBlock("4a. CACHE HIT  → Return cached prompt (response time: ~50ms)"),
      codeBlock("4b. CACHE MISS → Call Anthropic API (response time: 2-5 seconds)"),
      codeBlock("                 Store result in Redis with 24-hour TTL"),
      codeBlock("                 Return prompt to user"),
      spacer(),

      heading2("Cache Invalidation Strategy"),
      bullet("Library data: TTL-based auto-expiration (10 minutes for lists, 1 hour for categories)"),
      bullet("AI-generated responses: TTL-based 24-hour expiration — prompts do not go stale"),
      bullet("User-specific data (profile, dashboard): Never cached — always served fresh"),
      bullet("After admin imports: Manually flush affected library cache keys"),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 4. RATE LIMITING
      // ════════════════════════════════════════════════════════════════════
      heading1("4. Rate Limiting — Upstash Ratelimit"),

      heading2("Why This Is the Biggest Immediate Risk"),
      para("The Builder and Improver endpoints call the Anthropic API with zero protection. No authentication is required. No request limits exist."),
      spacer(),
      boldPara("Attack scenario: ", "A malicious user opens browser DevTools, copies the fetch request to /api/builder/generate, and runs it in a loop 10,000 times. At $0.01 per request, that is $100+ in Anthropic API charges within minutes."),
      spacer(),

      heading2("Proposed Rate Limits"),
      makeTable(
        ["User Tier", "Builder / Improver", "Library API", "Auth Endpoints"],
        [
          ["Anonymous (by IP)", "5 requests/hour", "60 requests/minute", "10 requests/minute"],
          ["Free registered user", "20 requests/hour", "120 requests/minute", "10 requests/minute"],
          ["Pro subscriber", "200 requests/hour", "Unlimited", "10 requests/minute"],
        ],
      ),
      spacer(),

      heading2("Implementation Details"),
      bullet("Uses the same Upstash Redis instance — no extra service, no additional cost"),
      bullet("Sliding window algorithm prevents gaming at time boundaries (vs. fixed window counters)"),
      bullet("Returns standard HTTP headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset"),
      bullet("Frontend can read these headers to display warnings before the user hits the limit"),
      bullet("HTTP 429 (Too Many Requests) response with retryAfter timestamp when exceeded"),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 5. INPUT VALIDATION — ZOD
      // ════════════════════════════════════════════════════════════════════
      heading1("5. Input Validation — Zod"),

      heading2("Why This Is a Security Requirement"),
      para("All current API routes accept raw JSON request bodies and pass them directly to database queries and the Anthropic API. This creates multiple exploitable attack vectors."),
      spacer(),

      heading2("Attack Vectors Without Validation"),
      makeTable(
        ["Endpoint", "Attack", "Impact"],
        [
          ["/api/builder/generate", "Send 'idea' as a 500KB string", "Anthropic API call costs 10x more, possible timeout"],
          ["/api/auth/register", "Send email as <script>alert('xss')</script>", "Cross-site scripting if rendered unescaped"],
          ["/api/submissions", "Submit 10MB of text as a prompt", "Database storage abuse and performance degradation"],
          ["/api/builder/generate", "Send invalid platform value", "Unexpected behavior in prompt generation logic"],
          ["/api/improver/improve", "Send crafted prompt injection payload", "AI behavior manipulation"],
        ],
      ),
      spacer(),

      heading2("What Zod Provides"),
      bullet("Type-safe validation at the API boundary — every request body is validated before it reaches business logic"),
      bullet("Automatic descriptive error messages returned to the client"),
      bullet("Unknown fields are stripped — prevents extra data from reaching the database"),
      bullet("Enum enforcement — platform values must be one of the six valid options"),
      bullet("String length limits — prevents oversized payloads from inflating API costs"),
      bullet("Native integration with Hono's built-in validator middleware"),
      spacer(),

      heading2("Example: Builder Endpoint Schema"),
      codeBlock("BuilderSchema = {"),
      codeBlock("  idea:     string, min 1 char, max 2000 chars"),
      codeBlock("  family:   enum ['image', 'video', 'text', 'content']"),
      codeBlock("  platform: enum ['chatgpt', 'gemini', 'grok', 'midjourney', 'firefly', 'flux']"),
      codeBlock("  style:    string, max 50 chars (optional)"),
      codeBlock("  mood:     string, max 50 chars (optional)"),
      codeBlock("  aspect:   string, max 10 chars (optional)"),
      codeBlock("}"),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 6. ERROR TRACKING — SENTRY
      // ════════════════════════════════════════════════════════════════════
      heading1("6. Error Tracking — Sentry"),

      heading2("Why This Is Required Before Launch"),
      para("If something breaks in production today, there is zero visibility. Vercel serverless logs disappear after 1 hour on the free plan. Users do not report errors — they leave."),
      spacer(),

      heading2("Errors Sentry Captures"),
      makeTable(
        ["Error Category", "Example"],
        [
          ["Unhandled promise rejections", "Drizzle query fails silently inside an async route"],
          ["Anthropic API timeouts", "Claude takes > 30 seconds, Vercel function times out"],
          ["Anthropic rate limit errors", "Anthropic account hits its own API usage limits"],
          ["Database connection failures", "PostgreSQL connection pool exhausted"],
          ["JWT validation errors", "Expired, tampered, or malformed authentication tokens"],
          ["Frontend component crashes", "React component throws during render, user sees blank page"],
        ],
      ),
      spacer(),

      heading2("Why Sentry Specifically"),
      bullet("Free tier includes 5,000 errors per month — sufficient for early stage"),
      bullet("Hono.js integration requires only 4 lines of code"),
      bullet("Captures full request context: headers, request body, authenticated user, response timing"),
      bullet("Configurable alerts via email or Slack when error rate exceeds thresholds"),
      bullet("Optional performance monitoring to identify slow endpoints"),
      spacer(),

      heading2("Setup Effort"),
      bullet("Backend: Install @sentry/node, wrap Hono application — 15 minutes"),
      bullet("Frontend: Install @sentry/react, wrap App component — 15 minutes"),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 7. SECURITY HEADERS & CORS
      // ════════════════════════════════════════════════════════════════════
      heading1("7. Security Headers & CORS"),

      heading2("CORS Configuration"),
      para("Cross-Origin Resource Sharing must be restricted to the production frontend domain only. The current configuration may allow overly broad origins."),
      spacer(),
      makeTable(
        ["Setting", "Production Value"],
        [
          ["Allowed origin", "https://promptbot.app (exact domain only)"],
          ["Allowed methods", "GET, POST, PUT, DELETE"],
          ["Allowed headers", "Authorization, Content-Type"],
          ["Credentials", "Enabled"],
          ["Preflight cache", "86400 seconds (24 hours)"],
        ],
      ),
      spacer(),

      heading2("Security Headers"),
      makeTable(
        ["Header", "Value", "Purpose"],
        [
          ["X-Content-Type-Options", "nosniff", "Prevents browser MIME type sniffing"],
          ["X-Frame-Options", "DENY", "Prevents clickjacking via iframe embedding"],
          ["Referrer-Policy", "strict-origin-when-cross-origin", "Limits referrer data sent to external sites"],
          ["Permissions-Policy", "camera=(), microphone=(), geolocation=()", "Disables unnecessary browser APIs"],
          ["Strict-Transport-Security", "max-age=31536000; includeSubDomains", "Enforces HTTPS for one year"],
          ["X-XSS-Protection", "1; mode=block", "Enables legacy browser XSS filter"],
        ],
      ),
      spacer(),
      para("Implementation: A single Hono middleware function that adds all headers before every response. Approximately 15 lines of code."),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 8. SERVICE ARCHITECTURE MAP
      // ════════════════════════════════════════════════════════════════════
      heading1("8. Service Architecture Map"),

      heading2("System Overview"),
      spacer(),
      codeBlock("User Browser"),
      codeBlock("    |"),
      codeBlock("    v"),
      codeBlock("Vercel Edge Network (CDN for static assets)"),
      codeBlock("    |"),
      codeBlock("    v"),
      codeBlock("Vercel Serverless Function (Hono.js Application)"),
      codeBlock("    |"),
      codeBlock("    |-- Middleware 1: Security Headers"),
      codeBlock("    |-- Middleware 2: CORS Validation"),
      codeBlock("    |-- Middleware 3: Rate Limiter ---------> Upstash Redis"),
      codeBlock("    |-- Middleware 4: Zod Input Validation"),
      codeBlock("    |-- Middleware 5: Route Handler"),
      codeBlock("    |       |                      |"),
      codeBlock("    |       v                      v"),
      codeBlock("    |  Neon Postgres         Anthropic API"),
      codeBlock("    |  (pooled conn)         (Claude Sonnet)"),
      codeBlock("    |                              |"),
      codeBlock("    |                     Cache result in Redis"),
      codeBlock("    |                              |"),
      codeBlock("    v                              v"),
      codeBlock("Response sent to user       Upstash Redis"),
      codeBlock("    |"),
      codeBlock("    v"),
      codeBlock("Errors captured by Sentry"),
      spacer(),

      heading2("Request Flow Example — Builder Endpoint"),
      spacer(),
      boldPara("Step 1: ", "User clicks 'Generate Pro Prompt' in the frontend"),
      boldPara("Step 2: ", "Frontend sends POST /api/builder/generate with idea, platform, style, mood"),
      boldPara("Step 3: ", "Vercel routes the request to the serverless function"),
      boldPara("Step 4: ", "Security headers are added to the response"),
      boldPara("Step 5: ", "CORS validates the request origin matches the production domain"),
      boldPara("Step 6: ", "Rate limiter checks Redis — user has remaining requests? If no, return 429"),
      boldPara("Step 7: ", "Zod validates all input fields match the expected schema"),
      boldPara("Step 8: ", "Route handler hashes the input: SHA256(idea + platform + style + mood)"),
      boldPara("Step 9: ", "Redis cache check — if hit, return cached prompt in ~50ms"),
      boldPara("Step 10: ", "If cache miss, call Anthropic API, store result in Redis, return to user"),
      boldPara("Step 11: ", "If any error occurs at any step, Sentry captures it with full context"),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 9. COST ESTIMATE
      // ════════════════════════════════════════════════════════════════════
      heading1("9. Cost Estimate"),

      heading2("Early Stage — 0 to 100 Daily Users"),
      makeTable(
        ["Service", "Plan", "Monthly Cost"],
        [
          ["Neon Postgres", "Free", "$0"],
          ["Upstash Redis", "Free", "$0"],
          ["Sentry", "Free", "$0"],
          ["Anthropic API", "Pay per use", "$10 – $20"],
          ["Vercel", "Free / Hobby", "$0"],
          ["TOTAL", "", "$10 – $20"],
        ],
      ),
      spacer(),

      heading2("Growth Stage — 100 to 1,000 Daily Users"),
      makeTable(
        ["Service", "Plan", "Monthly Cost"],
        [
          ["Neon Postgres", "Launch", "$19"],
          ["Upstash Redis", "Pay-as-you-go", "$10"],
          ["Sentry", "Free", "$0"],
          ["Anthropic API", "Pay per use", "$30 – $50"],
          ["Vercel", "Pro", "$20"],
          ["TOTAL", "", "$79 – $99"],
        ],
      ),
      spacer(),

      heading2("Scale Stage — 1,000 to 10,000 Daily Users"),
      makeTable(
        ["Service", "Plan", "Monthly Cost"],
        [
          ["Neon Postgres", "Scale", "$69"],
          ["Upstash Redis", "Pro", "$100"],
          ["Sentry", "Team", "$26"],
          ["Anthropic API", "Pay per use", "$100 – $300"],
          ["Vercel", "Pro", "$20"],
          ["TOTAL", "", "$315 – $515"],
        ],
      ),
      spacer(),

      heading2("Cost Savings from Caching"),
      spacer(),
      boldPara("Without caching (1,000 daily users, 5 AI requests each): ", "5,000 Anthropic calls/day x $0.008 average = $40/day = $1,200/month"),
      boldPara("With caching (60% cache hit rate): ", "2,000 unique calls/day x $0.008 = $16/day = $480/month"),
      boldPara("Monthly savings: ", "$720/month — caching pays for every other service combined"),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 10. IMPLEMENTATION ROADMAP
      // ════════════════════════════════════════════════════════════════════
      heading1("10. Implementation Roadmap"),

      heading2("Phase 1 — Protect (Week 1)"),
      para("Priority: Prevent abuse and secure the API boundary before any public launch."),
      spacer(),
      makeTable(
        ["#", "Task", "Estimated Time", "Impact"],
        [
          ["1", "Upstash Redis setup + rate limiting on AI endpoints", "3 hours", "Prevents Anthropic bill shock"],
          ["2", "Zod input validation on all API routes", "3 hours", "Blocks malformed and malicious input"],
          ["3", "Security headers middleware", "30 minutes", "HTTP layer hardening"],
          ["4", "CORS lockdown for production domain", "15 minutes", "Restricts unauthorized API access"],
        ],
      ),
      spacer(),

      heading2("Phase 2 — Optimize (Week 2)"),
      para("Priority: Reduce costs and improve response times through caching and connection management."),
      spacer(),
      makeTable(
        ["#", "Task", "Estimated Time", "Impact"],
        [
          ["5", "Neon serverless driver migration", "1 hour", "Fixes connection pooling crashes"],
          ["6", "Cache library API endpoints in Redis", "2 hours", "Faster responses, reduced DB load"],
          ["7", "Cache Anthropic API responses in Redis", "2 hours", "60-99% reduction in AI API costs"],
        ],
      ),
      spacer(),

      heading2("Phase 3 — Monitor (Week 3)"),
      para("Priority: Gain visibility into production errors and application behavior."),
      spacer(),
      makeTable(
        ["#", "Task", "Estimated Time", "Impact"],
        [
          ["8", "Sentry backend error tracking integration", "30 minutes", "Production error visibility"],
          ["9", "Sentry frontend crash reporting integration", "30 minutes", "User-facing error capture"],
          ["10", "Structured request logging with request IDs", "1 hour", "Debugging and usage analytics"],
        ],
      ),
      spacer(),

      heading2("Phase 4 — Scale (When Needed)"),
      para("Priority: Only implement when traffic demands it. Not required for launch."),
      spacer(),
      makeTable(
        ["#", "Task", "Estimated Time", "Impact"],
        [
          ["11", "AI model tiering (Haiku for simple, Sonnet for complex)", "2 hours", "Further AI cost reduction"],
          ["12", "Queue system for heavy AI generation requests", "3 hours", "Graceful handling of traffic spikes"],
          ["13", "Database read replicas for read-heavy endpoints", "1 hour", "Handle high read concurrency"],
        ],
      ),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // 11. WHAT YOU DON'T NEED YET
      // ════════════════════════════════════════════════════════════════════
      heading1("11. What You Don't Need Yet"),
      para("These technologies are commonly recommended but are unnecessary at the current stage of the project. Adding them prematurely increases complexity without delivering proportional value."),
      spacer(),

      makeTable(
        ["Technology", "Why Not Yet", "Reconsider When"],
        [
          ["Kubernetes / Docker", "Vercel serverless handles scaling automatically", "You need custom GPU workloads or persistent WebSocket connections"],
          ["Microservices", "A monolith is simpler and sufficient", "Your team grows past 5 engineers on the same codebase"],
          ["Message queues (RabbitMQ)", "Only needed for crash-resilient async processing", "AI generation takes > 30 seconds and needs background processing"],
          ["GraphQL", "REST is simpler; your data shapes are fixed", "Frontend needs wildly different data shapes per page"],
          ["Multi-region deployment", "Single region handles all current users", "More than 30% of users are on a different continent"],
          ["CDN for API responses", "Upstash Redis global replication covers this", "You need sub-10ms API responses globally"],
          ["Load balancer", "Vercel manages this automatically", "You move off Vercel to custom infrastructure"],
          ["CI/CD pipeline", "Vercel auto-deploys from git pushes", "You need staging environments or complex test suites"],
          ["Terraform / IaC", "5 services with web dashboards are manageable", "You have 15+ infrastructure services to coordinate"],
        ],
      ),

      pageBreak(),

      // ════════════════════════════════════════════════════════════════════
      // SUMMARY
      // ════════════════════════════════════════════════════════════════════
      heading1("Summary"),
      spacer(),
      para("The production backend requires six additions to the current stack:"),
      spacer(),

      makeTable(
        ["#", "Service", "Purpose", "Priority"],
        [
          ["1", "Neon Postgres", "Connection pooling for serverless (prevents crashes)", "Critical"],
          ["2", "Upstash Redis", "Caching + rate limiting (saves money, prevents abuse)", "Critical"],
          ["3", "Zod", "Input validation on all routes (security baseline)", "Critical"],
          ["4", "Sentry", "Error tracking and production visibility", "High"],
          ["5", "Security headers", "HTTP response hardening", "High"],
          ["6", "CORS lockdown", "Restrict API access to production domain only", "High"],
        ],
      ),
      spacer(), spacer(),

      boldPara("Total implementation effort: ", "2 to 3 weeks of focused development"),
      boldPara("Starting monthly cost: ", "$10 to $20 per month"),
      boldPara("Biggest single optimization: ", "Anthropic response caching — saves $720+ per month at 1,000 daily users"),

      spacer(), spacer(), spacer(),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "— End of Document —", size: 20, font: "Calibri", color: GRAY, italics: true })],
      }),
    ],
  }],
});

// ── Generate ────────────────────────────────────────────────────────────────
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync("Backend-Production-Architecture.docx", buffer);
console.log("Created: Backend-Production-Architecture.docx");
