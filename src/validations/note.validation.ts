import { z } from 'zod'

export const noteCreateSchema = z.object({
    noteTitle: z.string().min(3, { message: 'note title must be at least 3 charcters long' }).max(100),
    noteContent: z.string().min(3, { message: 'note content must be at least 3 charcters long' }).max(1000),
    isNoteFavourite: z.boolean(),
    noteBgColor: z.string().max(50),
})

export const noteUpdateSchema = noteCreateSchema.partial()
