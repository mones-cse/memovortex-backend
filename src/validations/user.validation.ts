import { z } from 'zod'

export const userAccountInfoSchema = z.object({
    fullName: z.string().min(3, { message: 'full name must be at least 3 charcters long' }).max(50),
})
