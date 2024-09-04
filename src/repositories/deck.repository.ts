import { eq, desc } from 'drizzle-orm'
import { db } from '@src/config/database'
import { DeckTable } from '@src/schemas/schemas'
import { TInsertDeck } from '@src/types/deck.types'
import { deckSerializer } from '@src/serializers/deckSerializer'
import ApiError from '@src/errors/ApiError'

export const createDeck = async (deck: TInsertDeck) => {
    return await db.insert(DeckTable).values(deck).returning(deckSerializer)
}

export const getDecks = async (userId: string) => {
    return await db
        .select(deckSerializer)
        .from(DeckTable)
        .where(eq(DeckTable.createdBy, userId))
        .orderBy(desc(DeckTable.updatedAt))
}

// todo: same way need to update noteRemove, document Remove code
export const removeDeck = async (id: string) => {
    const result = await db.delete(DeckTable).where(eq(DeckTable.id, id))
    if (result.rowCount === 0) {
        throw new ApiError(404, 'Deck not found')
    }
    return result
}
