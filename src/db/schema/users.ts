import * as p from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/typebox';
import { Type } from 'typebox';
import { Value } from 'typebox/value';
import { SQL, sql } from 'drizzle-orm'



export const occupation = p.pgTable('occupation',{
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().unique(),})



export const personTypeEnum = p.pgEnum('personType', ['employee','legal_representative'])
export const person = p.pgTable('person',{
    rut: p.varchar('rut', {length: 12 }).primaryKey(),
    type: personTypeEnum('person_type').notNull(),
    names: p.text('names').notNull(),
    password: p.text('password').notNull(),
    motherName: p.text('mother_name').notNull(),
    fatherName: p.text('pather_name').notNull(),
    email: p.text('email').unique(),
    phone: p.text('phone').unique(),
    rshScore: p.integer('rsh_score'),
    isHeadOfHousehold: p.boolean('is_head_of_household').default(false),


    occupationId: p.integer('occupation_id').references(() => occupation.id ).notNull() //REFE    
},
    (table) => [
        p.check(
            "email_check1",
            sql`${table.type} != 'employee' OR
                ${table.email} = LOWER(
                    REPLACE(${table.fatherName}, ' ', '') ||
                    '.' ||
                    REPLACE(${table.motherName}, ' ', '') ||
                    '@tome.cl'
                )`
        ),
        p.check(
            "rut_check1",
            sql`${table.rut} = LOWER(REPLACE(${table.rut}, '.', ''))`
        )
    ]
)



//SESSION TABLE...
export const session = p.pgTable('session', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    createdAt: p.timestamp('created_at').notNull().defaultNow().unique(),
    

    employeeRut: p.varchar('employee_rut', {length: 12 }).references(() => person.rut ), //SIRE
    legalRepresentativeRut: p.varchar('legal_representative_rut', {length: 12 }).references(() => person.rut ) //SIRE
})