import { CardContentTable, CardTable } from '@src/schemas/schemas'

export const cardContentSerializer = {
    id: CardContentTable.id,
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
    cardContentId: CardTable.cardContentId,
    reps: CardTable.reps,
    due: CardTable.due,
    state: CardTable.state,
    lastReview: CardTable.lastReview,
    elapsedDays: CardTable.elapsedDays,
    scheduledDays: CardTable.scheduledDays,
    difficulty: CardTable.difficulty,
    stability: CardTable.stability,
    lapses: CardTable.lapses,
    createdAt: CardTable.createdAt,
    updatedAt: CardTable.updatedAt,
}

export const cardsContentSerializer = {
    card: {
        id: CardTable.id,
        deckId: CardTable.deckId,
        cardContentId: CardTable.cardContentId,
        reps: CardTable.reps,
        due: CardTable.due,
        state: CardTable.reps,
        lastReview: CardTable.lastReview,
        elapsedDays: CardTable.elapsedDays,
        scheduledDays: CardTable.scheduledDays,
        difficulty: CardTable.difficulty,
        stability: CardTable.stability,
        lapses: CardTable.lapses,
        createdAt: CardTable.createdAt,
        updatedAt: CardTable.updatedAt,
    },
    cardContent: {
        id: CardContentTable.id,
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
