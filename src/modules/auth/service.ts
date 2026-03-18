//SERVICIO 

import { status } from 'elysia' //se importa el modulo para manejar solicitudes erroneas
import type { AuthModel } from './model' //se importa el modelo 

import { database, schema } from '../../db/client'
import { eq } from 'drizzle-orm'


export abstract class Auth {
    static async signIn({ rut, password }: AuthModel["signInBody"]) {
        // a. consulta a la base de datos
        const [person] = await database
            .select({
                rut: schema.person.rut,
                password: schema.person.password,
            })
            .from(schema.person)
            .where(eq(schema.person.rut, rut))
            .limit(1)

        // b. validaciones
        if (!person) {
            console.log('No está registrado')
            return status(400, { error: 'Usuario no encontrado' })
        }

        if (person.password !== password) {
            console.log('Contraseña incorrecta')
            return status(400, { error: 'Credenciales inválidas' })
        }

        console.log('Ingreso exitoso')

        // c. respuesta
        return {
            rut,
            password,
        }
    }
}
