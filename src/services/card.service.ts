import { Case } from 'change-case-all'
import { createEmptyCard, fsrs, generatorParameters, Rating, Card } from 'ts-fsrs'
import { TCardServiceCreateInput, TCardServiceUpdateInput } from '@src/types/card.types'
import cardRepository from '@src/repositories/card.repository'
import ApiError from '@src/errors/ApiError'
import deckRepository from '@src/repositories/deck.repository'

const params = generatorParameters({
    enable_fuzz: false,
    enable_short_term: true,
    request_retention: 0.9,
    maximum_interval: 36500,
    w: [
        0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0234, 1.616, 0.1544, 1.0824, 1.9813, 0.0953, 0.2975,
        2.2042, 0.2407, 2.9466, 0.5034, 0.6567,
    ],
})
const f = fsrs(params)

const createCardService = async (userId: string, data: TCardServiceCreateInput) => {
    try {
        const emptyCard = createEmptyCard()
        const { deckId, ...cardContentData } = data
        const customEmptyCard = fromSnakeCaseToCamelCase(emptyCard)
        const card = await cardRepository.createCard({ deckId, createdBy: userId, ...customEmptyCard })
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
    const decks = await deckRepository.getDeck(deckId, userId)
    const deck = decks[0]
    const cards = await cardRepository.getCards(deckId, userId)
    return { deck, cards }
}
const getCardService = async (userId: string, deckId: string, cardId: string) => {
    const card = await cardRepository.getCard(userId, deckId, cardId)
    return card
}

const removeCardService = async (deckId: string, cardId: string) => {
    const result = await cardRepository.removeCard(deckId, cardId)
    await cardRepository.updateDeckSummaryState(deckId)
    return result
}

const updateCardService = async (userId: string, deckId: string, cardId: string, data: TCardServiceUpdateInput) => {
    const card = await cardRepository.getCard(userId, deckId, cardId)
    if (card.length === 0) {
        throw new ApiError(404, 'Card not found or you are not the owner')
    }
    const result = await cardRepository.updateCardContent(cardId, userId, data)
    return result
}

const fromSnakeCaseToCamelCase = (data: Record<string, any>) => {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [Case.camel(key), value]))
}

const fromCamleCaseToSnakeCase = (data: Record<string, any>): Card => {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [Case.snake(key), value])) as Card
}

const getScheduleCard = async (rating: number, scheduling_cards: any) => {
    if (rating == 1) {
        const { card: scheduldedCard } = scheduling_cards[Rating.Again]
        return scheduldedCard
    } else if (rating == 2) {
        const { card: scheduldedCard } = scheduling_cards[Rating.Hard]
        return scheduldedCard
    } else if (rating == 3) {
        const { card: scheduldedCard } = scheduling_cards[Rating.Good]
        return scheduldedCard
    } else if (rating == 4) {
        const { card: scheduldedCard } = scheduling_cards[Rating.Easy]
        return scheduldedCard
    }
}

const reviewCardService = async (userId: string, deckId: string, cardId: string, rating: number) => {
    const [{ card: fetchedData } = { card: undefined }] = await cardRepository.getCard(userId, deckId, cardId)
    if (!fetchedData) {
        throw new ApiError(404, 'Card not found or you are not the owner!')
    }
    const snakeCaseCardData = fromCamleCaseToSnakeCase(fetchedData)
    const scheduling_cards = f.repeat(snakeCaseCardData, snakeCaseCardData.due)
    const nextSchedule = await getScheduleCard(rating, scheduling_cards)
    const camleCaseCardData = fromSnakeCaseToCamelCase(nextSchedule)
    const resultFromDatabase = await cardRepository.reviewCard(cardId, camleCaseCardData)
    await cardRepository.updateDeckSummaryState(deckId)
    return resultFromDatabase[0]
}

export default {
    createCardService,
    getCardsService,
    getCardService,
    removeCardService,
    updateCardService,
    reviewCardService,
}
