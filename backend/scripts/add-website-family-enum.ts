import { config } from "dotenv";
config({ path: new URL("../.env", import.meta.url).pathname });

import postgres from "postgres";

// drizzle-kit push isn't usable with the drizzle-kit version pinned here
// (v0.18.1 predates the unified `push` command) — add the enum value directly.
// Uses its own postgres() connection (not src/db/client.ts) because that
// module reads process.env.DATABASE_URL at import time, before config()
// above would have run.
async function main() {
  const sql = postgres(process.env.DATABASE_URL!);
  await sql`ALTER TYPE family ADD VALUE IF NOT EXISTS 'website'`;
  console.log("family enum now includes 'website'");
  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
