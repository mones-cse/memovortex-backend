import { SessionTable } from './../schemas/schemas'
import { TInsertSession } from '@src/types/session.types'
import { db } from '../config/database'
import { eq } from 'drizzle-orm'

export const createSession = async (session: TInsertSession) => {
    return await db.insert(SessionTable).values(session).returning()
}

export const getSessionByRefreshtoken = async (refreshToken: string) => {
    return await db.select().from(SessionTable).where(eq(SessionTable.refresh_token, refreshToken))
}

export const deleteSessionByRefreshtoken = async (refreshToken: string) => {
    return await db.delete(SessionTable).where(eq(SessionTable.refresh_token, refreshToken))
}

export const deleteSessionByUserId = async (userId: string) => {
    return await db.delete(SessionTable).where(eq(SessionTable.user_id, userId))
}
