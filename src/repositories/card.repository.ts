import { eq, and, count, sql, lte } from 'drizzle-orm'
import { db } from '@src/config/database'
import { CardContentTable, CardTable, DeckTable } from '@src/schemas/schemas'
import {
    TCardContentRepositoryCreateInput,
    TCardRepositoryCreateInput,
    TCardContentRepositoryUpdateInput,
    TCardRepositoryUpdateInput,
} from '@src/types/card.types'
import {
    cardContentSerializer,
    cardSerializer,
    cardsContentForReviewSerializer,
    cardsContentSerializer,
} from '@src/serializers/cardSerializer'
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

const getStudyCards = async (deckId: string, userId: string) => {
    const card = db.$with('card').as(
        db
            .select()
            .from(CardTable)
            .where(and(eq(CardTable.createdBy, userId), eq(CardTable.deckId, deckId), lte(CardTable.due, new Date()))),
    )

    const query = db
        .with(card)
        .select(cardsContentSerializer)
        .from(card)
        .innerJoin(CardContentTable, eq(CardContentTable.cardId, card.id))
    const result = await query
    return result
}

const getCard = async (userId: string, deckId: string, cardId: string) => {
    const card = db.$with('card').as(
        db
            .select(cardSerializer)
            .from(CardTable)
            .where(and(eq(CardTable.createdBy, userId), eq(CardTable.deckId, deckId), eq(CardTable.id, cardId))),
    )

    const query = db
        .with(card)
        .select(cardsContentSerializer)
        .from(card)
        .innerJoin(CardContentTable, eq(CardContentTable.cardId, card.id))
    const result = await query
    return result
}

const removeCard = async (deckId: string, cardId: string) => {
    const result = await db.delete(CardTable).where(and(eq(CardTable.id, cardId), eq(CardTable.deckId, deckId)))
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

const updateDeckSummaryState = async (deckId: string) => {
    const states = await db
        .select({
            state: CardTable.state,
            count: sql`COUNT(${CardTable.id})`,
        })
        .from(CardTable)
        .where(eq(CardTable.deckId, deckId))
        .groupBy(CardTable.state)

    if (states.length === 0) {
        throw new ApiError(404, 'No cards found for this deck')
    }

    const stateMap = {
        stateNew: 0,
        stateLearning: 0,
        stateReview: 0,
        stateRelearning: 0,
    }

    for (const { state, count } of states) {
        switch (state) {
            case 0:
                stateMap.stateNew = Number(count)
                break
            case 1:
                stateMap.stateLearning = Number(count)
                break
            case 2:
                stateMap.stateReview = Number(count)
                break
            case 3:
                stateMap.stateRelearning = Number(count)
                break
            default:
                console.warn(`Unexpected state encountered: ${state}`)
        }
    }
    const result = await db.update(DeckTable).set(stateMap).where(eq(DeckTable.id, deckId))
    return result
}

const getCardsForReview = async (userId: string, deckId: string) => {
    const card = db.$with('card').as(
        db
            .select()
            .from(CardTable)
            .where(and(eq(CardTable.createdBy, userId), eq(CardTable.deckId, deckId))),
    )

    const query = db
        .with(card)
        .select(cardsContentForReviewSerializer)
        .from(card)
        .innerJoin(CardContentTable, eq(CardContentTable.cardId, card.id))
        .where(lte(CardTable.due, new Date()))
    const result = await query
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
    updateDeckSummaryState,
    getCardsForReview,
    getStudyCards,
}
