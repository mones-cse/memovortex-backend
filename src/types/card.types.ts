import { z } from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { CardContentTable, CardTable } from '@src/schemas/schemas'

// Base Schema defination
const BaseInsertCardContentSchema = createInsertSchema(CardContentTable)
const BaseInsertCardSchema = createInsertSchema(CardTable)

// cutom schema since drizzle-zod does not support array type
const CustomInserCardContentScheam = BaseInsertCardContentSchema.extend({
    multipleChoiceOptions: z.array(z.string()).max(4).optional(),
    tags: z.array(z.string()).max(10).optional(),
    cardType: z.enum(['BASIC', 'MULTIPLE_CHOICE']).optional(),
})

// Base type
type BaseCardContent = z.infer<typeof CustomInserCardContentScheam>
type BaseCard = z.infer<typeof BaseInsertCardSchema>

// export
export type TCardContentRepositoryCreateInput = BaseCardContent
export type TCardServiceCreateInput = Pick<BaseCard, 'deckId'> & BaseCardContent
export type TCardRepositoryCreateInput = BaseCard
