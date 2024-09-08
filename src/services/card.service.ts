import { TCardServiceCreateInput, TCardServiceUpdateInput } from '@src/types/card.types'
import cardRepository from '@src/repositories/card.repository'

import { TUser } from '@src/config/database'
import ApiError from '@src/errors/ApiError'

//todo: handle any
const createCardService = async (userId: string, data: TCardServiceCreateInput) => {
    try {
        const { deckId, ...cardContentData } = data
        // todo use package to create card
        const card = await cardRepository.createCard({ deckId, createdBy: userId })

        const cardContent = await cardRepository.createCardContent({
            ...cardContentData,
            cardId: card[0].id,
        })
        return { ...card[0], cardContent: cardContent[0] }
    } catch (err) {
        console.log('🚀 ~ createCardService ~ err:', err)
        throw new ApiError(500, 'Internal Server Error')
    }
}
const getCardsService = async (userId: string, deckId: string) => {
    const cards = await cardRepository.getCards(deckId, userId)
    return cards
}
const getCardService = async (userId: string, cardId: string) => {
    const cards = await cardRepository.getCard(cardId, userId)
    return cards
}

const removeCardService = async (id: string) => {
    const result = await cardRepository.removeCard(id)
    return result
}

const updateCardService = async (userId: string, cardId: string, data: TCardServiceUpdateInput) => {
    const result = await cardRepository.updateCardContent(cardId, userId, data)
    return result
}

// const getDecksService = async (userId: string) => {
//     const decks = await deckRepository.getDecks(userId)
//     return decks
// }

// const getDeckService = async (deckId: string, userId: string) => {
//     const deck = await deckRepository.getDeck(deckId, userId)
//     return deck
// }

// const removeDeckService = async (id: string) => {
//     const result = await deckRepository.removeDeck(id)
//     return result
// }

// // todo change any type
// const updateDeckService = async (deckId: string, userId: string, data: TDeckServiceUpdateInput) => {
//     const result = await deckRepository.updateDeck(deckId, userId, data)
//     return result
// }

export default {
    createCardService,
    getCardsService,
    getCardService,
    removeCardService,
    updateCardService,
    // updateDeckService,
}
