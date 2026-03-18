import { Elysia } from 'elysia'
import { auth } from './modules/auth/controller'
import { swagger } from '@elysiajs/swagger'
new Elysia()
    // Código en Elysia
        // Código en Elysia
  .use(swagger())
  .use(auth)
  .listen(3000)

console.log(`🚀 Swagger disponible en: http://localhost:3000/swagger
   servidor disponible en: http://localhost:3000`)