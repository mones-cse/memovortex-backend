import { z } from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { UserTable } from '../schemas/schemas'

export const userSignupSchema = createInsertSchema(UserTable, {
    full_name: z.string().min(3).max(50),
    email: z.string().email(),
    password_hash: z.string().min(6).max(50),
})
