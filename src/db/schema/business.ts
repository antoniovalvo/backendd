import * as p from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/typebox';
import { Type } from 'typebox';
import { Value } from 'typebox/value';
import { commune } from './geography'
import { person } from './users'
import { sql, eq } from 'drizzle-orm'



//---BUSINESS---//
export const patentTypeEnum = p.pgEnum('patent', ['comercial','industrial','profesional']);

export const business = p.pgTable('business', {
    rut: p.varchar('rut', {length: 12 }).primaryKey(),
    legalName: p.varchar('legal_name').unique().notNull().default('razon-social'),
    email: p.text('email').unique(),
    formalized: p.integer('formalized'),
    type: patentTypeEnum('patent'), //datos patente
    

    personRut: p.varchar('person_rut').references(() => person.rut),
    activityId: p.varchar('activity_id').references(() => activity.id)
})



//---BUSINESS & COMMUNE---//
export const businessComunne = p.pgTable('business_commune', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    

    businessRut: p.varchar('business_rut').references(() => business.rut),
    communePostalCode: p.integer('commune_postal_code').references(() => commune.postalCode)
})



//---BUSINESS & FUND---//
export const stateEnum = p.pgEnum('state',['otorgado','elegible','postulado', 'rechazado' ])
export const businessFund = p.pgTable('business_fund', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    fundId: p.integer('fund_id').references(() => fund.id ),
    state: stateEnum('state').notNull(),
    


    businessRut: p.varchar('business_rut', {length: 12 }).references(() => business.rut )
})

//---ACTIVITY TABLE---//
export const activity = p.pgTable('activity', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().default('N/A').unique(),
    activityCode: p.integer('activity_code')

})



//---ACTIVITY & TRAINING---//
export const activityTraining = p.pgTable('ativity_training',{
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),

    activityid: p.integer('activity_id').references(() => activity.id),
    trainingid: p.integer('training_id').references(() => training.id)
})



//---FUND---//
export const fund = p.pgTable('funds', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().unique(), //crear datos

    institutionId: p.integer('institution_id').references(() => institution.id )
})



//---INSTITUTION---//
export const institution = p.pgTable('institution', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull().unique(),
})



//---RECORD---//

export const recordableTypeEnum = p.pgEnum('recordable_type',['acta_atención', 'pérdida_productiva', 'capacitación', 'otro'])
export const recordState = p.pgEnum('state',['incompleto','completo'])
export const record = p.pgTable('record', {
    
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    createdAt: p.timestamp('created_at').defaultNow().notNull().unique(),
    updatedAt: p.timestamp('updated_at').defaultNow().notNull().unique(),
    state: recordState('state').notNull().default('incompleto'),
    description: p.text('description'),

    recordableType: recordableTypeEnum('recordable_type').notNull(),
    recordableId: p.integer('recordable_id').unique(), //***
    businessRut: p.varchar('business_rut', {length: 12 }).references(() => business.rut )
},
 (table) => [
    
    p.uniqueIndex().on(table.recordableType).where(eq(table.recordableType,'acta_atención')),
    p.uniqueIndex().on(table.recordableType).where(eq(table.recordableType, 'pédida_productiva'))
])



//---MINUTES---//
export const minutes = p.pgTable('minutes',{
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
})



//---TRAINING---//
export const training = p.pgTable('training',{
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull(),
    date: p.timestamp('date').notNull()
})



//---PRODUCTIONLOSS---//
export const productionLossType = p.pgEnum('production_loss_type', ['menor', 'parcial', 'total'])
export const productionLoss = p.pgTable('production_loss', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    description:  p.text('description').notNull(),
    type: productionLossType('production_loss_type').notNull(),
    otherBackgrounds: p.text('other_background')
})



//---ITEM---//
export const itemType = p.pgEnum('item_type',['activos','mercaderias','infraestructuras','otros'])
export const item = p.pgTable('item', {
    id: p.integer('id').generatedAlwaysAsIdentity().primaryKey(),
    name: p.text('name').notNull(),
    amount: p.integer('amount').notNull().default(1),
    type: itemType('item_type').notNull(),


    productionLossId: p.integer('production_loss_id').references(() => productionLoss.id ),
})



