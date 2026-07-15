import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "../db/client.js";
import { submissions, prompts, notifications } from "../db/schema.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { engineRateLimit } from "../middleware/rateLimit.js";

const router = new Hono();

const submitSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  family: z.enum(["image", "video", "text", "content"]),
  categoryId: z.string().optional(),
  basePrompt: z.string().min(1),
  platformIds: z.array(z.string()).min(1),
  variables: z.array(z.object({
    name: z.string(),
    placeholder: z.string().optional(),
    defaultValue: z.string().optional(),
  })).optional(),
  exampleOutput: z.string().optional(),
});

// ─── User: Submit a prompt for review ─────────────────────────────────────────

router.post("/", requireAuth, engineRateLimit("submit"), zValidator("json", submitSchema), async (c) => {
  const data = c.req.valid("json");
  const submitterId = c.get("user").sub;
  const id = nanoid();

  await db.insert(submissions).values({
    id,
    submitterId,
    categoryId: data.categoryId,
    platformIds: data.platformIds,
    rawData: data,
    status: "pending",
  });

  return c.json({ id, status: "pending" }, 201);
});

// ─── User: List own submissions ───────────────────────────────────────────────

router.get("/mine", requireAuth, async (c) => {
  const userId = c.get("user").sub;
  const rows = await db
    .select()
    .from(submissions)
    .where(eq(submissions.submitterId, userId))
    .orderBy(desc(submissions.submittedAt));
  return c.json(rows);
});

// ─── Admin: List all pending submissions ─────────────────────────────────────

router.get("/", requireAuth, requireAdmin, async (c) => {
  const rows = await db
    .select()
    .from(submissions)
    .where(eq(submissions.status, "pending"))
    .orderBy(desc(submissions.submittedAt));
  return c.json(rows);
});

// ─── Admin: Approve or reject ─────────────────────────────────────────────────

const reviewSchema = z.object({
  action: z.enum(["approve", "reject"]),
  reviewNote: z.string().optional(),
});

router.post("/:id/review", requireAuth, requireAdmin, zValidator("json", reviewSchema), async (c) => {
  const id = c.req.param("id");
  const { action, reviewNote } = c.req.valid("json");
  const adminId = c.get("user").sub;

  const [submission] = await db.select().from(submissions).where(eq(submissions.id, id)).limit(1);
  if (!submission) return c.json({ error: "Not found" }, 404);

  const newStatus = action === "approve" ? "approved" : "rejected";

  if (action === "approve") {
    const raw = submission.rawData as Record<string, unknown> | null;
    if (!raw?.family || !raw?.title || !raw?.basePrompt) {
      return c.json({ error: "Submission is missing required fields (family, title, basePrompt) and can't be approved as-is" }, 400);
    }
  }

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(submissions)
        .set({ status: newStatus, reviewNote, reviewedBy: adminId, reviewedAt: new Date() })
        .where(eq(submissions.id, id));

      if (action === "approve" && submission.submitterId) {
        // Promote raw submission data into the prompts table
        const raw = submission.rawData as Record<string, unknown>;
        const promptId = nanoid();
        await tx.insert(prompts).values({
          id: promptId,
          authorId: submission.submitterId,
          family: raw.family as "image" | "video" | "text" | "content",
          categoryId: submission.categoryId ?? undefined,
          title: raw.title as string,
          description: raw.description as string | undefined,
          basePrompt: raw.basePrompt as string,
          status: "approved",
        });

        await tx
          .update(submissions)
          .set({ promptId })
          .where(eq(submissions.id, id));
      }

      // Notify submitter
      if (submission.submitterId) {
        await tx.insert(notifications).values({
          userId: submission.submitterId,
          type: action === "approve" ? "prompt_approved" : "prompt_rejected",
          title: action === "approve" ? "Your prompt was approved!" : "Submission update",
          body: reviewNote ?? (action === "approve" ? "Your prompt is now live." : "Your submission was not accepted."),
          metadata: { submissionId: id },
        });
      }
    });
  } catch (err: any) {
    console.error("Submission review error:", err?.message ?? err);
    return c.json({ error: "Review failed — the submission's stored data may be invalid. No changes were made." }, 500);
  }

  return c.json({ status: newStatus });
});

export default router;
