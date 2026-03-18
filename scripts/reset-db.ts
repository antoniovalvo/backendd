import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";
import { sql } from "drizzle-orm";
import 'dotenv/config';

const client = new SQL(process.env.DATABASE_URL!);
const db = drizzle({ client });

async function main() {
  try {
    console.log("Dropping public and drizzle schemas...");
    await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;`);
    await db.execute(sql`DROP SCHEMA IF EXISTS drizzle CASCADE; CREATE SCHEMA drizzle;`);
    console.log("Schemas reset. You can now run migrations.");
  } catch (err) {
    console.error("Failed to reset database:", err);
  } finally {
    process.exit(0);
  }
}

main();