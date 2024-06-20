import env from './.env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import * as schema from '../schemas/schemas'

export interface DatabaseError {
    type: string
    message: string
    stack?: string
    code: string
    sql: string
    sqlState: string
    sqlMessage: string
}

export type TUser = typeof schema.UserTable.$inferSelect
export type TNewUser = typeof schema.UserTable.$inferInsert

export const DB_ERRORS = {
    UNIQUE_VIOLATION: '23505',
    FOREIGN_KEY_VIOLATION: '23503',
    CHECK_VIOLATION: '23514',
    NOT_NULL_VIOLATION: '23502',
}

export const client = new Client({ connectionString: env.POSTGRES_DB_URL })

let db: ReturnType<typeof drizzle>

const initializeDatabase = async () => {
    try {
        db = drizzle(client, {
            schema,
            logger: true,
        })
    } catch (error) {
        console.error('Failed to connect to the database:', error)
    }
}

initializeDatabase()

export { db }
