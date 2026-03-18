import { Elysia, t } from "elysia";

import { Auth } from "./service"
import { AuthModel } from "./model"

export const auth = new Elysia({ prefix: '/auth'})
    .get('/sign-in', 
        async ({ query }) => {
        const response = await Auth.signIn(query)
        
        return response
    },
    {
        query: AuthModel.signInBody,
        response:{
            200: AuthModel.signInResponse,
            400: AuthModel.signInInvalid,
        }
      }
    )

    
    