import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
    const result = knex('sqlite_schema').select('*')
    return result
})

app.listen({
    port: env.APP_PORT
})
.then(() => console.log('HTTP Server is running on PORT 3333..'))