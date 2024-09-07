import { z } from 'zod'

export const cardCreateValidationSchema = z.object({
    deckId: z.string().uuid(),
    frontText: z.string().min(3, { message: 'front text must be at least 3 charcters long' }).max(1000),
    backText: z.string().min(3, { message: 'back text must be at least 3 charcters long' }).max(1000),
    frontImageUrl: z.string().url().optional(),
    backImageUrl: z.string().url().optional(),
    cardType: z.enum(['BASIC', 'MULTIPLE_CHOICE']),
    multipleChoiceOptions: z.array(z.string()).max(4).optional(),
    tags: z.array(z.string()).max(10).optional(),
})

export const cardUpdateValidationSchema = cardCreateValidationSchema.partial().strict()