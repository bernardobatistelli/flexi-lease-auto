import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  SECRET_KEY: z.string().default('SecretKey'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new Error(_env.error.message)
}

export const env = _env.data
