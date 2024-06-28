import { z } from 'zod'
import { UserTable } from '../schemas/schemas'
import { createSelectSchema } from 'drizzle-zod'

// Create Zod schemas from Drizzle schemas for the User table
const SelectedUserSchema = createSelectSchema(UserTable)

// create types from the Zod schema for the User table
type TSelectedUser = z.infer<typeof SelectedUserSchema>

// Serialized user type (for API responses) with only the necessary fields
const serializedUserSchema = SelectedUserSchema.pick({
    id: true,
    email: true,
    full_name: true,
    is_active: true,
})

// Serialized user type (for API responses) with only the necessary fields
type TSerializedUser = z.infer<typeof serializedUserSchema>

// Serialize a user object to only include the necessary fields
export const serializeUser = (user: TSelectedUser): TSerializedUser => {
    return serializedUserSchema.parse(user)
}
