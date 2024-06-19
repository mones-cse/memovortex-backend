import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    PORT: z.string().default('3000'),
    POSTGRES_DB_URL: z.string().default('postgres://admin:password@localhost:5432/db_name'),
})

export default envSchema.parse(process.env)
