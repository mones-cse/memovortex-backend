import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    PORT: z.string().default('3000'),
})

export default envSchema.parse(process.env)
