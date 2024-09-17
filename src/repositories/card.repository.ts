import { eq, and } from 'drizzle-orm'
import { db } from '@src/config/database'
import { CardContentTable, CardTable } from '@src/schemas/schemas'
import {
    TCardContentRepositoryCreateInput,
    TCardRepositoryCreateInput,
    TCardContentRepositoryUpdateInput,
    TCardRepositoryUpdateInput,
} from '@src/types/card.types'
import { cardContentSerializer, cardSerializer, cardsContentSerializer } from '@src/serializers/cardSerializer'
import ApiError from '@src/errors/ApiError'

const createCardContent = async (cardContent: TCardContentRepositoryCreateInput) => {
    return await db.insert(CardContentTable).values(cardContent).returning(cardContentSerializer)
}

const createCard = async (card: TCardRepositoryCreateInput) => {
    return await db.insert(CardTable).values(card).returning(cardSerializer)
}

const getCards = async (deckId: string, userId: string) => {
    const card = db.$with('card').as(
        db
            .select()
            .from(CardTable)
            .where(and(eq(CardTable.createdBy, userId), eq(CardTable.deckId, deckId))),
    )

    const query = db
        .with(card)
        .select(cardsContentSerializer)
        .from(card)
        .innerJoin(CardContentTable, eq(CardContentTable.cardId, card.id))
    const result = await query
    return result
}

const getCard = async (cardId: string, userId: string) => {
    const card = db.$with('card').as(
        db
            .select(cardSerializer)
            .from(CardTable)
            .where(and(eq(CardTable.createdBy, userId), eq(CardTable.id, cardId))),
    )

    const query = db
        .with(card)
        .select(cardsContentSerializer)
        .from(card)
        .innerJoin(CardContentTable, eq(CardContentTable.cardId, card.id))
    const result = await query
    return result
}

const removeCard = async (id: string) => {
    const result = await db.delete(CardTable).where(eq(CardTable.id, id))
    if (result.rowCount === 0) {
        throw new ApiError(404, 'Card not found')
    }
    return result
}

const updateCardContent = async (cardId: string, userId: string, data: TCardContentRepositoryUpdateInput) => {
    const result = await db
        .update(CardContentTable)
        .set(data)
        .where(eq(CardContentTable.cardId, cardId))
        .returning(cardContentSerializer)
    if (result.length === 0) {
        throw new ApiError(404, 'Card not found')
    }
    return result
}

const reviewCard = async (cardId: string, data: TCardRepositoryUpdateInput) => {
    const result = await db.update(CardTable).set(data).where(eq(CardTable.id, cardId)).returning(cardSerializer)
    if (result.length === 0) {
        throw new ApiError(404, 'Card not found')
    }
    return result
}

export default {
    createCardContent,
    createCard,
    getCards,
    getCard,
    removeCard,
    updateCardContent,
    reviewCard,
}
