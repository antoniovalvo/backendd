import * as p from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/typebox';
import { Type } from 'typebox';
import { Value } from 'typebox/value';
import { commune } from './geography'

//...BUSINESS TABLE...
export const patentTypeEnum = p.pgEnum('patent', ['comercial','industrial','profesional']);

export const business = p.pgTable('business', {
    rut: p.varchar('rut', {length: 12 }).primaryKey(),
    legalName: p.varchar('legal_name').notNull().unique(),
    email: p.text('email').unique(),
    formalized: p.integer('formalized').notNull(),
    type: patentTypeEnum('patent'), //datos patente
    communeId: p.integer('commune_id').references(() => commune.postalCode )
})





//DOCUMENT TABLE...
export const document = p.pgTable('document',{
    id: p.integer('id').primaryKey(),
    name: p.text('name').notNull().unique(),
    description: p.text().notNull(),
    businessRut: p.varchar('business_rut', {length: 12 }).references(() => business.rut)
})
//ACTIVITY TABLE...
export const activity = p.pgTable('activity', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().default('N/A').unique(),
    activityCode: p.integer('activity_code')

})

//BUSINESS&ACTIVITY TABLE...
export const businessActivity = p.pgTable('business_activity', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    businessRut: p.varchar('business_rut', {length: 12 }).references(() => business.rut ),
    activityId:  p.integer('activity_id').references(() => activity.id)
})


//RECORD TABLE...
export const record = p.pgTable('record', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().unique(),
    createdAt: p.timestamp('created_at').defaultNow().notNull().unique(),
    updatedAt: p.timestamp('updated_at').defaultNow().notNull().unique(),
    state: p.boolean('state').default(false).notNull(),
    description: p.text('description'),
    recordableId: p.integer('recordable_id'), //***
    businessRut: p.varchar('business_rut', {length: 12 }).references(() => business.rut )
})

//TRAINING TABLE...
export const training = p.pgTable('training',{
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull()
})
//PRODUCTIONLOSS TABLE...
export const productionLoss = p.pgTable('production_loss', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull(),
    eventType: p.text('event_type').notNull(),
    houseServiceRegister: p.integer('house_service_register').default(0),
    otherBackground: p.text('other_background')
})
//ITEM TABLE...
export const item = p.pgTable('item', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull(),
    amount: p.integer('amount').notNull().default(1),
    productionLossId: p.integer('production_loss_id').references(() => productionLoss.id ),
    lossTypeId: p.integer('loss_type_id').references(() => lossType.id )
})
//LOSSTYPE TABLE...
export const lossType = p.pgTable('loss_type', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().unique(), //crear datos
})

//FUND TABLE
export const fund = p.pgTable('funds', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().unique(), //crear datos
    institutionId: p.integer('institution_id').references(() => institution.id )
})
//BUSINESS&FOUND TABLE...
export const businessFund = p.pgTable('business_fund', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    fundId: p.integer('fund_id').references(() => fund.id ),
    state: p.text('state').notNull().default('no participa'),
    businessRut: p.varchar('business_rut', {length: 12 }).references(() => business.rut )
})

//INSTITUTION TABLE {fundtable}
export const institution = p.pgTable('institution', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().unique(),
})