import { TInsertDeck } from '@src/types/deck.types'
import deckRepository from '@src/repositories/deck.repository'

//todo: handle any
const createDeckService = async (user: any, data: TInsertDeck) => {
    const deck = { ...data, createdBy: user.id }
    const response = await deckRepository.createDeck(deck)
    return response
}

const getDecksService = async (user: any) => {
    const decks = await deckRepository.getDecks(user.id)
    return decks
}

const getDeckService = async (deckId: string, userId: string) => {
    const deck = await deckRepository.getDeck(deckId, userId)
    return deck
}

const removeDeckService = async (id: string) => {
    const result = await deckRepository.removeDeck(id)
    return result
}

// todo change any type
const updateDeckService = async (deckId: string, userId: string, data: any) => {
    const result = await deckRepository.updateDeck(deckId, userId, data)
    return result
}

export default {
    createDeckService,
    getDecksService,
    getDeckService,
    removeDeckService,
    updateDeckService,
}
