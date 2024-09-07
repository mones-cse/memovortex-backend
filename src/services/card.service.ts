import { TCardServiceCreateInput } from '@src/types/card.types'
import cardRepository from '@src/repositories/card.repository'

import { TUser } from '@src/config/database'
import ApiError from '@src/errors/ApiError'

//todo: handle any
const createCardService = async (userId: string, data: TCardServiceCreateInput) => {
    try {
        const { deckId, ...cardContentData } = data
        console.log('🚀 ~ createCardService ~ cardContentData:', cardContentData)
        const cardContent = await cardRepository.createCardContent(cardContentData)
        console.log('cardConten', cardContent)
        // todo use package to create card
        const cardData = { deckId, cardContentId: cardContent[0]?.id }
        const card = await cardRepository.createCard(cardData)
        return { ...card[0], cardContent: cardContent[0] }
    } catch (err) {
        console.log('🚀 ~ createCardService ~ err:', err)

        throw new ApiError(500, 'Internal Server Error')
    }
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
    // getDecksService,
    // getDeckService,
    // removeDeckService,
    // updateDeckService,
}
