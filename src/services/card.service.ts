import { TCardServiceCreateInput, TCardServiceUpdateInput } from '@src/types/card.types'
import cardRepository from '@src/repositories/card.repository'
import ApiError from '@src/errors/ApiError'

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
    const card = await cardRepository.getCard(cardId, userId)
    return card
}

const removeCardService = async (id: string) => {
    const result = await cardRepository.removeCard(id)
    return result
}

const updateCardService = async (userId: string, cardId: string, data: TCardServiceUpdateInput) => {
    const card = await cardRepository.getCard(cardId, userId)
    if (card.length === 0) {
        throw new ApiError(404, 'Card not found or you are not the owner')
    }
    const result = await cardRepository.updateCardContent(cardId, userId, data)
    return result
}

const reviewCardService = async (userId: string, cardId: string, rating: number) => {
    const card = await cardRepository.getCard(cardId, userId)
    if (card.length === 0) {
        throw new ApiError(404, 'Card not found or you are not the owner')
    }
    //todo: from rating convert to reps, due, state, lastReview, elapsedDays, scheduledDays, difficulty, stability, lapses
    // replace with actual values
    const data = {
        reps: card[0].card.reps + 1,
        due: new Date(),
        state: 'REVIEW',
        lastReview: new Date(),
        elapsedDays: 0,
        scheduledDays: 0,
        difficulty: 0,
        stability: 0,
        lapses: rating,
    }
    console.log('🚀 ~ reviewCardService ~ data:', data)

    const result = await cardRepository.reviewCard(cardId, data)
    return result
}

export default {
    createCardService,
    getCardsService,
    getCardService,
    removeCardService,
    updateCardService,
    reviewCardService,
}
