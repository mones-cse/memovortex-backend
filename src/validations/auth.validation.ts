import { z } from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { UserTable } from '../schemas/schemas'

export const userSignupSchema = createInsertSchema(UserTable, {
    fullName: z.string().min(3, { message: 'full name must be at least 3 charcters long' }).max(50),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'password must be at least 6 characters long' }).max(50),
})

export const userLoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'password must be at least 6 characters long' }).max(50),
})

export const changePsswrodSchema = z.object({
    oldPassword: z.string().min(6, { message: 'password must be at least 6 characters long' }).max(50),
    newPassword: z.string().min(6, { message: 'password must be at least 6 characters long' }).max(50),
})
