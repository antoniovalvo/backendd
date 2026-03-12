import * as p from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/typebox';
import { Type } from 'typebox';
import { Value } from 'typebox/value';


///COMMUNE TABLE...
export const commune = p.pgTable('comune', {
    postalCode: p.integer('postal_code').primaryKey(),
    name: p.text('name').notNull().unique(),
})
//LOCALITY TABLE...
export const locality = p.pgTable('locality', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().unique(),
    communeId: p.integer('commune_id').references(() => commune.postalCode )
})
//ADDRESS TABLE...
export const address = p.pgTable('address',{
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    street: p.text('street').notNull(),
    number: p.integer('number').notNull(),
    dptLocalNumber: p.integer('dpt_local_number'),
    area: p.text('area'),
    localityId: p.integer('locality_id').references(() => locality.id)
})
