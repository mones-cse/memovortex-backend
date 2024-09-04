import { DeckTable } from '@src/schemas/schemas'
export const deckSerializer = {
    id: DeckTable.id,
    deckTitle: DeckTable.deckTitle,
    deckDescription: DeckTable.deckDescription,
    createdAt: DeckTable.createdAt,
    updatedAt: DeckTable.updatedAt,
}
