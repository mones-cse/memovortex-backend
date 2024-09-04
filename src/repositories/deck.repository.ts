import { db } from '@src/config/database'
import { DeckTable } from '@src/schemas/schemas'
import { TInsertDeck } from '@src/types/deck.types'
import { deckSerializer } from '@src/serializers/deckSerializer'

export const createDeck = async (deck: TInsertDeck) => {
    return await db.insert(DeckTable).values(deck).returning(deckSerializer)
}
