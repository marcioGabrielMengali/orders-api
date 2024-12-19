import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
    const result = knex('sqlite_schema').select('*')
    return result
})

app.listen({
    port: 3333
})
.then(() => console.log('HTTP Server is running on PORT 3333..'))