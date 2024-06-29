import { z } from 'zod'
import { SessionTable } from '../schemas/schemas'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

// create zod schema from drizzle schema
const SelectedSessionScheam = createSelectSchema(SessionTable)
const InsertSessionSchema = createInsertSchema(SessionTable)

export type TSession = z.infer<typeof SelectedSessionScheam>
export type TInsertSession = z.infer<typeof InsertSessionSchema>
