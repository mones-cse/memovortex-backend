import { z } from 'zod'

export const noteCreateSchema = z.object({
    note_title: z.string().min(3, { message: 'note title must be at least 3 charcters long' }).max(100),
    note_content: z.string().min(3, { message: 'note content must be at least 3 charcters long' }).max(500),
    is_note_favourite: z.boolean(),
    note_bg_color: z.string().max(50),
})
