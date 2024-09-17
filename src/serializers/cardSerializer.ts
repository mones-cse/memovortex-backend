import { CardContentTable, CardTable } from '@src/schemas/schemas'

export const cardContentSerializer = {
    id: CardContentTable.id,
    cardId: CardContentTable.cardId,
    frontText: CardContentTable.frontText,
    backText: CardContentTable.backText,
    createdAt: CardContentTable.createdAt,
    updatedAt: CardContentTable.updatedAt,
    frontImageUrl: CardContentTable.frontImageUrl,
    backImageUrl: CardContentTable.backImageUrl,
    cardType: CardContentTable.cardType,
    multipleChoiceOptions: CardContentTable.multipleChoiceOptions,
    tags: CardContentTable.tags,
}

export const cardSerializer = {
    id: CardTable.id,
    deckId: CardTable.deckId,
    due: CardTable.due,
    difficulty: CardTable.difficulty,
    elapsedDays: CardTable.elapsedDays,
    lastReview: CardTable.lastReview,
    lapses: CardTable.lapses,
    reps: CardTable.reps,
    scheduledDays: CardTable.scheduledDays,
    state: CardTable.state,
    stability: CardTable.stability,
    createdAt: CardTable.createdAt,
    updatedAt: CardTable.updatedAt,
}

export const cardsContentSerializer = {
    card: {
        id: CardTable.id,
        deckId: CardTable.deckId,
        due: CardTable.due,
        difficulty: CardTable.difficulty,
        elapsedDays: CardTable.elapsedDays,
        lastReview: CardTable.lastReview,
        lapses: CardTable.lapses,
        reps: CardTable.reps,
        scheduledDays: CardTable.scheduledDays,
        state: CardTable.state,
        stability: CardTable.stability,
        createdAt: CardTable.createdAt,
        updatedAt: CardTable.updatedAt,
    },
    cardContent: {
        id: CardContentTable.id,
        cardId: CardContentTable.cardId,
        frontText: CardContentTable.frontText,
        backText: CardContentTable.backText,
        createdAt: CardContentTable.createdAt,
        updatedAt: CardContentTable.updatedAt,
        frontImageUrl: CardContentTable.frontImageUrl,
        backImageUrl: CardContentTable.backImageUrl,
        cardType: CardContentTable.cardType,
        multipleChoiceOptions: CardContentTable.multipleChoiceOptions,
        tags: CardContentTable.tags,
    },
}
