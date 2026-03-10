import { Elysia } from "elysia";
import { SQL }    from "bun";
import { drizzle } from "drizzle-orm/bun-sql"
import * as schema from "./db/schema"
import 'dotenv/config';

const client = new SQL(process.env.DATABASE_URL!)
const database = drizzle({
  client,
  schema
})