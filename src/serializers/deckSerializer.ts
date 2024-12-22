import { DeckTable } from '@src/schemas/schemas'
export const deckSerializer = {
    id: DeckTable.id,
    deckTitle: DeckTable.deckTitle,
    deckDescription: DeckTable.deckDescription,
    stateNew: DeckTable.stateNew,
    stateLearning: DeckTable.stateLearning,
    stateReview: DeckTable.stateReview,
    stateRelearning: DeckTable.stateRelearning,
    createdAt: DeckTable.createdAt,
    updatedAt: DeckTable.updatedAt,
}
