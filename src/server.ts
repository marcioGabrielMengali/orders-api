import fastify from 'fastify'
import { env } from './env'
import { ordersRoutes } from './routes/orders'

const app = fastify()

app.register(ordersRoutes, { prefix: '/orders' })

app
  .listen({
    port: env.APP_PORT,
  })
  .then(() => console.log('HTTP Server is running on PORT 3333..'))
