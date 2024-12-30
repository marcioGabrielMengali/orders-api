import { z } from 'zod'

export const createOrderSchema = z.object({
  item: z.string(),
  unity: z.number().gt(0),
  price: z.number(),
  updated_at: z.string().nullish()
})

export const paramsOrdersSchema = z.object({
    id: z.string().uuid()
})