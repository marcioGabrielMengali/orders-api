import { FastifyInstance } from 'fastify'
import {
  createOrderSchema,
  paramsOrdersSchema,
} from '../validation/orders-schema'
import { ZodError } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

interface BadRequestError {
  erro: string
  field: string
}

export async function ordersRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    console.log(`[${request.method}] : ${request.url}`)
  })
  app.post('/', async (request, reply) => {
    try {
      const body = createOrderSchema.parse(request.body)
      await knex('orders').insert({
        id: randomUUID(),
        item: body.item,
        price: body.price,
        unity: body.unity,
      })
      return reply.status(201).send()
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({ error: error.errors })
      } else {
        console.error('INTERNAL SERVER ERROR', error)
        return reply.code(500).send({ error: 'INTERNAL SERVER ERROR' })
      }
    }
  })

  app.get('/', async (_, reply) => {
    try {
      const orders = await knex('orders').select('*')
      return reply.code(200).send({ orders })
    } catch (error) {
      console.error('INTERNAL SERVER ERROR', error)
      return reply.code(500).send({ error: 'INTERNAL SERVER ERROR' })
    }
  })

  app.get('/:id', async (request, reply) => {
    try {
      const { id } = paramsOrdersSchema.parse(request.params)
      const order = await knex('orders').where('id', id).select('*').first()
      if (!order) {
        return reply.code(400).send({ error: `Order for id ${id} not found` })
      }
      return reply.code(200).send({ order })
    } catch (error) {
      console.error('INTERNAL SERVER ERROR', error)
      return reply.code(500).send({ error: 'INTERNAL SERVER ERROR' })
    }
  })

  app.put('/:id', async (request, reply) => {
    try {
      const { id } = paramsOrdersSchema.parse(request.params)
      const body = createOrderSchema.parse(request.body)
      body.updated_at = new Date().toISOString()
      const order = await knex('orders').where('id', id).update(body)
      if(order === 0){
        return reply.code(400).send({ error: `Order for id ${id} not found` })
      }
      return reply.status(204).send()
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({ error: error.errors })
      } else {
        console.error('INTERNAL SERVER ERROR', error)
        return reply.code(500).send({ error: 'INTERNAL SERVER ERROR' })
      }
    }
  })

  app.delete('/:id', async (request, reply) => {
    try {
      const { id } = paramsOrdersSchema.parse(request.params)
      const order = await knex('orders').where('id', id).delete()
      if(order === 0){
        return reply.code(400).send({ error: `Order for id ${id} not found` })
      }
      return reply.status(204).send()
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({ error: error.errors })
      } else {
        console.error('INTERNAL SERVER ERROR', error)
        return reply.code(500).send({ error: 'INTERNAL SERVER ERROR' })
      }
    }
  })
}
