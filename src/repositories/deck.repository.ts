import { eq, desc, and } from 'drizzle-orm'
import { db } from '@src/config/database'
import { DeckTable } from '@src/schemas/schemas'
import { TDeckRepositoryCreateInput, TDeckReposirotyUpdateInput } from '@src/types/deck.types'
import { deckSerializer } from '@src/serializers/deckSerializer'
import ApiError from '@src/errors/ApiError'

const createDeck = async (deck: TDeckRepositoryCreateInput) => {
    return await db.insert(DeckTable).values(deck).returning(deckSerializer)
}
// todo: handle deleted file
const getDecks = async (userId: string) => {
    return await db
        .select(deckSerializer)
        .from(DeckTable)
        .where(eq(DeckTable.createdBy, userId))
        .orderBy(desc(DeckTable.updatedAt))
}

// todo: handle deleted file
const getDeck = async (deckId: string, userId: string) => {
    const deck = await db
        .select(deckSerializer)
        .from(DeckTable)
        .where(and(eq(DeckTable.id, deckId), eq(DeckTable.createdBy, userId)))

    if (deck.length === 0) {
        throw new ApiError(404, 'Deck not found')
    }

    return deck
}

// todo: same way need to update noteRemove, document Remove code
const removeDeck = async (id: string) => {
    const result = await db.delete(DeckTable).where(eq(DeckTable.id, id))
    if (result.rowCount === 0) {
        throw new ApiError(404, 'Deck not found')
    }
    return result
}

// todo: same way need to update noteUpdate, document Update code
const updateDeck = async (id: string, userId: string, data: TDeckReposirotyUpdateInput) => {
    const result = await db
        .update(DeckTable)
        .set(data)
        .where(and(eq(DeckTable.id, id), eq(DeckTable.createdBy, userId)))
        .returning(deckSerializer)
    if (result.length === 0) {
        throw new ApiError(404, 'Deck not found')
    }
    return result
}

export default {
    createDeck,
    getDecks,
    getDeck,
    removeDeck,
    updateDeck,
}
