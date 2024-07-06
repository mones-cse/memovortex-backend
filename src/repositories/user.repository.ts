import { eq } from 'drizzle-orm'
import { TNewUser, db } from '../config/database'
import { UserTable } from '../schemas/schemas'
import { UserAccountInfo } from '../types/user.types'

export const createUser = async (user: TNewUser) => {
    return await db.insert(UserTable).values(user).returning()
}

export const getUserByEmail = async (email: string) => {
    return await db.select().from(UserTable).where(eq(UserTable.email, email))
}

export const getUserById = async (id: string) => {
    return await db.select().from(UserTable).where(eq(UserTable.id, id))
}

export const getUsers = async () => {
    return await db.select().from(UserTable)
}

export const deleteUser = async (id: string) => {
    return await db.delete(UserTable).where(eq(UserTable.id, id))
}

export const updateUser = async (id: string, data: UserAccountInfo) => {
    return await db
        .update(UserTable)
        .set({
            fullName: data.fullName,
            updatedAt: new Date(),
        })
        .where(eq(UserTable.id, id))
        .returning()
}

export const changePassword = async (userId: string, hashPassword: string) => {
    return await db
        .update(UserTable)
        .set({ password: hashPassword, updatedAt: new Date() })
        .where(eq(UserTable.id, userId))
}
