import * as p from "drizzle-orm/pg-core";
import { defineRelations } from 'drizzle-orm';



//@grupo usuarios

//OCCUPATION TABLE...
export const occupation = p.pgTable('occupation',{
    id: p.serial('id').primaryKey(),
    name: p.text('name').notNull().default('sin_especificar'),})
//PERSON TABLE (legal_representative, employee)...
export const person = p.pgTable('person',{
    rut: p.varchar('rut', {length: 12 }).primaryKey(),
    names: p.text('names').notNull(),
    motherName: p.text('mother_name').notNull(),
    patherName: p.text('pather_name').notNull(),
    email: p.text('email').unique(),
    phone: p.text('phone').unique(),
    personType: p.integer('person_type').notNull(),
    isHeadOfHousehold: p.boolean('is_head_of_household').notNull().default(false),
    occupationableId: p.integer('occupationable_id').references(() => occupation.id ).notNull() //REFE
    
})
//SESSION TABLE...
export const session = p.pgTable('seccion', {
    id: p.serial('id').primaryKey(),
    createdAt: p.timestamp('created_at').notNull().defaultNow().unique(),
    employeeRut: p.integer('employee_rut').references(() => person.rut ).notNull(), //SIRE
    legalRepresentativeRut: p.integer('legal_representative_rut').references(() => person.rut ).notNull() //SIRE
})

//BUSINESS TABLE...
export const patentTypeEnum = p.pgEnum('patent', ['comercial','industrial','profesional']);
export const business = p.pgTable('business', {
    rut: p.varchar('rut', {length: 12 }).primaryKey(),
    legalName: p.varchar('legal_name').notNull().unique(),
    email: p.text('email').unique(),
    formalized: p.integer('formalized').notNull(),
    type: patentTypeEnum('patent'), //datos patente
    communeId: p.integer('commune_id').references(() => commune.postalCode ).notNull().unique()
})

//@grupo detalles negocio
//DOCUMENT TABLE...
export const document = p.pgTable('document',{
    id: p.integer('id').primaryKey(),
    name: p.integer('name').notNull().unique(),
    description: p.text().notNull(),
    businessRut: p.integer('business_rut').references(() => business.rut).notNull()
})
//ACTIVITY TABLE...
export const activity = p.pgTable('activity', {
    id: p.serial('id').primaryKey(),
    name: p.text('name').notNull().default('N/A').unique(),
    activityCode: p.integer('activity_code').notNull().unique()

})

//BUSINESSACTIVITY TABLE...
export const businessActivity = p.pgTable('business_activity', {
    id: p.serial('id').primaryKey(),
    businessRut: p.integer('business_rut').references(() => business.rut ),
    activityId:  p.integer('activity_id').references(() => activity.id)
})



///COMMUNE TABLE...
export const commune = p.pgTable('comune', {
    postalCode: p.integer('postal_code').primaryKey(),
    name: p.text('name').notNull().unique(),
    localityId: p.serial('locality_id').references(() => locality.id ).notNull().unique()
})
//LOCALITY TABLE...
export const locality = p.pgTable('locality', {
    id: p.serial('id').primaryKey(),
    name: p.text('name').notNull().unique(),
    addressId: p.serial('address_id').references(() => address.id ).notNull().unique()
})
//ADDRESS TABLE...
export const address = p.pgTable('address',{
    id: p.serial('id').primaryKey(),
    street: p.text('street').notNull(),
    number: p.integer('number').notNull(),
    dptLocalNumber: p.integer('dpt_local_number'),
    area: p.text('area')
})

//@grupo registros negocio
//RECORD TABLE...
export const record = p.pgTable('record', {
    id: p.serial('id').primaryKey(),
    name: p.text('name').notNull().unique(),
    createdAt: p.timestamp('created_at').defaultNow().notNull().unique(),
    updatedAt: p.timestamp('updated_at').defaultNow().notNull().unique(),
    state: p.boolean('state').default(false).notNull(),
    description: p.text('description'),
    recordableId: p.serial('recordable_id').notNull().unique(), //***
    businessRut: p.varchar('business_rut', {length: 12 }).references(() => business.rut )
})

//TRAINING TABLE...
export const training = p.pgTable('training',{
    id: p.integer('id').primaryKey(),
    name: p.text('name').notNull()
})
//PRODUCTIONLOSS TABLE...
export const productionLoss = p.pgTable('production_loss', {
    id: p.integer('id').primaryKey(),
    name: p.text('name').notNull(),
    eventType: p.text('event_type').notNull(),
    houseServiceRegister: p.integer('house_service_register'),
    otherBackground: p.text('other_background')
})
//ITEM TABLE...
export const item = p.pgTable('item', {
    id: p.integer('id').primaryKey(),
    name: p.text('name').notNull(),

    productionLossId: p.integer('production_loss_id').references(() => productionLoss.id ),
    lossTypeId: p.integer('loss_type_id').references(() => lossType.id )
})
//LOSSTYPE TABLE...
export const lossType = p.pgTable('loss_type', {
    id: p.integer('id').primaryKey(),
    name: p.text('name').notNull(),
})

//FUND TABLE
export const fund = p.pgTable('funds', {
    id: p.integer('id').primaryKey(),
    name: p.text('name').notNull().unique(), //#$

    institutionId: p.integer('institution_id').references(() => institution.id )
})
//BUSINESS&FOUND TABLE...
export const businessFund = p.pgTable('business_fund', {
    id: p.integer('id').primaryKey(),
    fundId: p.integer('fund_id').references(() => fund.id ),
    businessRut: p.integer('business_rut').references(() => business.rut )
})

//INSTITUTION TABLE {fundtable}
export const institution = p.pgTable('institution', {
    id: p.serial('id').primaryKey(),
    name: p.text('name').notNull(),
})




