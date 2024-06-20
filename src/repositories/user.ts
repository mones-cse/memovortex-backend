import { TNewUser, db } from '../config/database'
import { UserTable } from '../schemas/schemas'

export const createUser = async (user: TNewUser) => {
    return await db.insert(UserTable).values(user).returning()
}
