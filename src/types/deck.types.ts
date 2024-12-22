import { z } from 'zod'
import { DeckTable } from '@src/schemas/schemas'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

// Schema defination
const SelectedDeckSchema = createSelectSchema(DeckTable)
const InsertDeckSchema = createInsertSchema(DeckTable)

// Base type defination
type Deck = z.infer<typeof SelectedDeckSchema>
type InsertDeck = z.infer<typeof InsertDeckSchema>

// Derived type definations
export type TDeckServiceCreateInput = Pick<InsertDeck, 'deckTitle' | 'deckDescription'>
export type TDeckRepositoryCreateInput = Pick<InsertDeck, 'deckTitle' | 'deckDescription' | 'createdBy'>

export type TDeckServiceUpdateInput = Partial<TDeckServiceCreateInput>
export type TDeckReposirotyUpdateInput = TDeckServiceUpdateInput
