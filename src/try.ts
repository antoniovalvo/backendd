import { Elysia } from "elysia";
import { SQL }    from "bun";
import { eq } from "drizzle-orm";
import postgres from 'postgres';
import { database, schema }from './db/client'


await database.select().from(schema.institution)


