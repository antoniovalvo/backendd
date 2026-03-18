import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";
import { sql } from "drizzle-orm";
import 'dotenv/config';

const client = new SQL(process.env.DATABASE_URL!);
const db = drizzle({ client });

async function main() {
  try {
    console.log("Listing user tables...");
    const tables = await db.execute(sql`SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema','pg_catalog');`);
    console.log(JSON.stringify(tables, null, 2));

    console.log("\nQuerying drizzle.__drizzle_migrations table...");
    const res2 = await db.execute(sql`SELECT * FROM drizzle.__drizzle_migrations`);
    console.log(JSON.stringify(res2, null, 2));
  } catch (err) {
    console.error("Error querying migrations:", err);
  } finally {
    process.exit(0);
  }
}

main();