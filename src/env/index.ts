import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  APP_PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid environments schema:', {
    erros: JSON.stringify(_env.error.format()),
  })
  throw new Error('Invalid environments schema')
}

export const env = _env.data
