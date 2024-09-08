import { eq, and } from 'drizzle-orm'
import { db } from '@src/config/database'
import { CardContentTable, CardTable } from '@src/schemas/schemas'
import { TCardContentRepositoryCreateInput, TCardRepositoryCreateInput } from '@src/types/card.types'
import { cardContentSerializer, cardSerializer, cardsContentSerializer } from '@src/serializers/cardSerializer'

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
        .innerJoin(CardContentTable, eq(CardContentTable.id, card.cardContentId))
    const result = await query
    return result
}

const getCard = async (cardId: string, userId: string) => {
    const card = db.$with('card').as(
        db
            .select()
            .from(CardTable)
            .where(and(eq(CardTable.createdBy, userId), eq(CardTable.id, cardId))),
    )

    const query = db
        .with(card)
        .select(cardsContentSerializer)
        .from(card)
        .innerJoin(CardContentTable, eq(CardContentTable.id, card.cardContentId))
    const result = await query
    return result
}

// // todo: handle deleted file
// const getDecks = async (userId: string) => {
//     return await db
//         .select(deckSerializer)
//         .from(DeckTable)
//         .where(eq(DeckTable.createdBy, userId))
//         .orderBy(desc(DeckTable.updatedAt))
// }

// // todo: handle deleted file
// const getDeck = async (deckId: string, userId: string) => {
//     const deck = await db
//         .select(deckSerializer)
//         .from(DeckTable)
//         .where(and(eq(DeckTable.id, deckId), eq(DeckTable.createdBy, userId)))

//     if (deck.length === 0) {
//         throw new ApiError(404, 'Deck not found')
//     }

//     return deck
// }

// // todo: same way need to update noteRemove, document Remove code
// const removeDeck = async (id: string) => {
//     const result = await db.delete(DeckTable).where(eq(DeckTable.id, id))
//     if (result.rowCount === 0) {
//         throw new ApiError(404, 'Deck not found')
//     }
//     return result
// }

// // todo: same way need to update noteUpdate, document Update code
// const updateDeck = async (id: string, userId: string, data: TDeckReposirotyUpdateInput) => {
//     const result = await db
//         .update(DeckTable)
//         .set(data)
//         .where(and(eq(DeckTable.id, id), eq(DeckTable.createdBy, userId)))
//         .returning(deckSerializer)
//     if (result.length === 0) {
//         throw new ApiError(404, 'Deck not found')
//     }
//     return result
// }

export default {
    createCardContent,
    createCard,
    getCards,
    getCard,
    //     getDecks,
    //     getDeck,
    //     removeDeck,
    //     updateDeck,
}

// {
//     "deckId":"0e8df180-7828-49fd-b6ca-c9f89ffa4b23",
//     "frontText": "Question 1",
//     "backText": "Answer 1",
//     "frontImageUrl": "",
//     "backImageUrl": "",
//     "cardType": "BASIC",
//     "multipleChoiceOptions": [],
//     "tags":[]
// }
