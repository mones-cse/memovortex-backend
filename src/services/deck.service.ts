import { TInsertDeck } from '@src/types/deck.types'
import { createDeck } from '@src/repositories/deck.repository'
import { TUser } from '@src/config/database'

//todo: handle any
export const createDeckService = async (user: any, data: TInsertDeck) => {
    const deck = { ...data, createdBy: user.id }
    const response = await createDeck(deck)
    return response
}
