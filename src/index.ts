import { Elysia } from "elysia";
import { SQL }    from "bun";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/bun-sql"
import * as schema from "./db/schema"
import 'dotenv/config';

// 1. Inicializar cliente
const client = new SQL(process.env.DATABASE_URL!);
const database = drizzle({ client });

async function checkConnection() {
  console.log("🚀 Probando conexión a PostgreSQL...");

  try {
    // 2. Intentar una consulta simple
    const result = await database.execute(sql`SELECT now() as tiempo`);
    
    console.log("✅ ¡CONECTADO EXITOSAMENTE!");
    console.log("⏰ Hora del servidor DB:", result[0].tiempo);
  } catch (error) {
    console.error("❌ ERROR DE CONEXIÓN:");
    console.error(error.message);
  } finally {
    process.exit(0);
  }
}

checkConnection();