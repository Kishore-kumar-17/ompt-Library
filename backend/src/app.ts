import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { bodyLimit } from "hono/body-limit";
import { HTTPException } from "hono/http-exception";

import authRouter from "./routes/auth.js";
import promptsRouter from "./routes/prompts.js";
import submissionsRouter from "./routes/submissions.js";
import profileRouter from "./routes/profile.js";
import adminRouter from "./routes/admin.js";
import promptLibraryRouter from "./routes/prompt-library.js";
import builderRouter from "./routes/builder.js";
import improverRouter from "./routes/improver.js";
import engineRouter from "./routes/engine.js";
import ruleEngineRouter from "./routes/rule-engine.js";
import variablesRouter from "./routes/variables.js";
import refineRouter from "./routes/refine.js";

const app = new Hono();

app.use("*", logger());
app.use("*", prettyJSON());
app.use(
  "*",
  bodyLimit({
    maxSize: 5 * 1024 * 1024, // 5MB — generous enough for the largest legitimate payload (admin CSV import rows as JSON), still bounded
    onError: (c) => c.json({ error: "Request body too large" }, 413),
  })
);

const DEV_ORIGINS = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, ...DEV_ORIGINS]
  : DEV_ORIGINS;

if (process.env.NODE_ENV === "production" && !process.env.FRONTEND_URL) {
  // Falling back silently here means the real production frontend origin is
  // rejected by CORS entirely — an availability bug, not just a config nit.
  console.error("[app] FRONTEND_URL is not set in production — CORS will only allow localhost dev origins.");
}

app.use(
  "*",
  cors({
    // Returning undefined for an unrecognized origin omits the ACAO header
    // instead of echoing back a fixed fallback origin for every mismatch.
    origin: (origin) => (allowedOrigins.includes(origin) ? origin : undefined),
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.route("/api/auth", authRouter);
app.route("/api/prompts", promptsRouter);
app.route("/api/submissions", submissionsRouter);
app.route("/api/profile", profileRouter);
app.route("/api/admin", adminRouter);
app.route("/api/library", promptLibraryRouter);
app.route("/api/builder", builderRouter);
app.route("/api/improver", improverRouter);
app.route("/api/engine", engineRouter);
app.route("/api/rule-engine", ruleEngineRouter);
app.route("/api/variables", variablesRouter);
app.route("/api/refine", refineRouter);

app.get("/health", (c) => c.json({ status: "ok", ts: new Date().toISOString() }));

// Global safety net — routes that call c.req.json() without their own
// try/catch (or any other uncaught error) previously fell through to Hono's
// default handler, which can leak stack traces and always returns a bare
// 500. Malformed JSON specifically becomes a clean 400 here.
app.onError((err, c) => {
  if (err instanceof HTTPException) return err.getResponse();
  if (err instanceof SyntaxError) return c.json({ error: "Invalid JSON body" }, 400);
  console.error("Unhandled error:", err instanceof Error ? err.message : err);
  return c.json({ error: "Internal server error" }, 500);
});

export default app;
