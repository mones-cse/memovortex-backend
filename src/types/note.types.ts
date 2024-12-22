import { z } from 'zod'
import { NoteTable } from '../schemas/schemas'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

// create zod schema from drizzle schema
const SelectedNoteScheam = createSelectSchema(NoteTable)
const InsertNoteSchema = createInsertSchema(NoteTable)

export type TNote = z.infer<typeof SelectedNoteScheam>
export type TInsertNote = z.infer<typeof InsertNoteSchema>

export type TUpdateNote = Partial<Omit<TInsertNote, 'id'>> & { id: string }
