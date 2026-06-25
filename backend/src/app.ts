import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import authRouter from "./routes/auth.js";
import promptsRouter from "./routes/prompts.js";
import submissionsRouter from "./routes/submissions.js";
import profileRouter from "./routes/profile.js";
import adminRouter from "./routes/admin.js";
import promptLibraryRouter from "./routes/prompt-library.js";
import builderRouter from "./routes/builder.js";
import improverRouter from "./routes/improver.js";
import engineRouter from "./routes/engine.js";

const app = new Hono();

app.use("*", logger());
app.use("*", prettyJSON());
app.use(
  "*",
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
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

app.get("/health", (c) => c.json({ status: "ok", ts: new Date().toISOString() }));

export default app;
