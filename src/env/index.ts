import 'dotenv/config'
import { z, ZodError, ZodIssue } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  APP_PORT: z.string().transform((val) => {
    const num = Number(val)
    if(isNaN(num)){
        const issue: ZodIssue = {
            path: ['APP_PORT'],
            message: 'Invalid environmets schema Error APP_PORT is Not a Number',
            code: 'custom'
        }
        throw new ZodError([issue])
    }
    return num
  }),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.log('Invalid environments schema:', {erros: JSON.stringify(_env.error.format())});
    throw new Error('Invalid environments schema')
}

export const env = _env.data