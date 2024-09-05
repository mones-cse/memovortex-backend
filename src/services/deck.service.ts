import { TDeckServiceCreateInput, TDeckServiceUpdateInput } from '@src/types/deck.types'
import deckRepository from '@src/repositories/deck.repository'
import { TUser } from '@src/config/database'

//todo: handle any
const createDeckService = async (userId: string, data: TDeckServiceCreateInput) => {
    const deck = { ...data, createdBy: userId }
    const response = await deckRepository.createDeck(deck)
    return response
}

const getDecksService = async (userId: string) => {
    const decks = await deckRepository.getDecks(userId)
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
const updateDeckService = async (deckId: string, userId: string, data: TDeckServiceUpdateInput) => {
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
