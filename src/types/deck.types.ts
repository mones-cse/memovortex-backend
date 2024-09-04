import { z } from 'zod'
import { DeckTable } from '@src/schemas/schemas'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

// const SelectedDeckSchema = createSelectSchema(DeckTable)
const InsertDeckSchema = createInsertSchema(DeckTable)

// export type TDeck = z.infer<typeof SelectedDeckSchema>
export type TInsertDeck = z.infer<typeof InsertDeckSchema>

// export type TUpdateDeck = Partial<Omit<TInsertDeck, 'id'>> & { id: string }
