import { database, schema } from './client'
import { sql } from 'drizzle-orm'

async function person() {
    const newPerson = await database.insert(schema.person).values({ 
        rut: '21438899-5',
        names: 'vicente antonio',
        password: 'vicente',
        motherName: 'valdés',       // Cambiado: era mother_name
        fatherName: 'olivares',     // Cambiado: era pather_name (ojo que en el esquema pusiste fatherName)
        email: 'olivares.valdés@tome.cl', // Ojo con tu CHECK constraint de email
        phone: '+56934535152',
        type: 'employee',           // Asegúrate que coincida con el Enum 'emplooye'
        isHeadOfHousehold: false,   // Cambiado: de 0 a false
        occupationId: 1             // Cambiado: era occupation_id
    }).returning();
    
    console.log(newPerson);
}

async function occupation(){
const occupation = await database.insert(schema.occupation).values({
    name: 'arquitecto'

}).returning()

console.log(occupation)
}


occupation()

