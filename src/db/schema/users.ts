import * as p from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/typebox';
import { Type } from 'typebox';
import { Value } from 'typebox/value';
import { defineRelations } from 'drizzle-orm'



export const occupation = p.pgTable('occupation',{
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().default('sin_especificar'),})


export const person = p.pgTable('person',{
    rut: p.varchar('rut', {length: 12 }).primaryKey(),
    names: p.text('names').notNull(),
    password: p.text('password').notNull(),
    motherName: p.text('mother_name').notNull(),
    fatherName: p.text('pather_name').notNull(),
    email: p.text('email').unique(),
    phone: p.text('phone').unique(),
    personType: p.text('person_type').notNull(),
    isHeadOfHousehold: p.boolean('is_head_of_household').notNull().default(false),

    occupationId: p.integer('occupation_id').references(() => occupation.id ).notNull() //REFE
    
})

export const insertPersonSchema = createInsertSchema(person)
export const UpdatePeersonSchema = createUpdateSchema(person)


//SESSION TABLE...
export const session = p.pgTable('session', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    createdAt: p.timestamp('created_at').notNull().defaultNow().unique(),
    employeeRut: p.varchar('employee_rut', {length: 12 }).references(() => person.rut ), //SIRE
    legalRepresentativeRut: p.varchar('legalRepresentativeRut', {length: 12 }).references(() => person.rut ) //SIRE
})

//1. buscar rut de ambos usuarios











