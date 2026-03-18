import { sql } from 'drizzle-orm';
import { database } from './client';

async function main() {
  try {
    
    // Borra todos los objetos del esquema público y lo vuelve a crear.
    await database.execute(sql`DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;`);

    // Si usas un esquema adicional para migraciones (p.ej. drizzle), resetealo también.
    await database.execute(sql`DROP SCHEMA IF EXISTS drizzle CASCADE; CREATE SCHEMA drizzle;`);

    console.log('Database reset complete.');
  } catch (err) {
    console.error('Error resetting database:', err);
    process.exit(1);
  }

  process.exit(0);
}

main();

