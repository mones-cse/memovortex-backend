import { z } from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { DocumentTable } from '../schemas/schemas'

export const documentCreateSchema = createInsertSchema(DocumentTable, {
    fileSize: z.string().transform((val) => BigInt(val)),
}).omit({ id: true, createdAt: true, updatedAt: true, createdBy: true })
