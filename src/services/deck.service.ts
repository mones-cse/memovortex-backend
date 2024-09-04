import { TInsertDeck } from '@src/types/deck.types'
import { createDeck, getDecks } from '@src/repositories/deck.repository'
import { TUser } from '@src/config/database'

//todo: handle any
export const createDeckService = async (user: any, data: TInsertDeck) => {
    const deck = { ...data, createdBy: user.id }
    const response = await createDeck(deck)
    return response
}

export const getDecksService = async (user: any) => {
    const decks = await getDecks(user.id)
    return decks
}
