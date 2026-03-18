import * as business from './schema/business'
import * as geography from './schema/geography'
import * as users from './schema/users'
import { SQL } from 'bun'
import { drizzle } from 'drizzle-orm/bun-sql'


//1. agrupar tablas en una constante
export const schema = { ...users, ...geography, ...business}

//2.  crear conección a la base de datos
const client = new SQL(process.env.DATABASE_URL!);
export const database = drizzle({ client });



