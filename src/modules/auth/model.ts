//MODELO: define la estructura y validación de datos para 
// define the data structure and validation for the request and response
import { t, type UnwrapSchema } from 'elysia'

//a. definición de datos 
export  const AuthModel = {
    signInBody: t.Object({
        rut: t.String(),
        password: t.String()
    }),
    signInResponse: t.Object({
        rut: t.String(),
        password: t.String()
    }),
    signInInvalid: t.Object({
        error: t.String()
    }),
} as const
//b. definir autocompletado de tipos
export type AuthModel = {
	[k in keyof typeof AuthModel]: UnwrapSchema<typeof AuthModel[k]>
}