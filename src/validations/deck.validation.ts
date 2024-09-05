import { z } from 'zod'

export const deckCreateValidationSchema = z.object({
    deckTitle: z.string().min(3, { message: 'note title must be at least 3 charcters long' }).max(100),
    deckDescription: z.string().min(3, { message: 'note content must be at least 3 charcters long' }).max(1000),
})

export const deckUpdateValidationSchema = deckCreateValidationSchema.partial().strict()
