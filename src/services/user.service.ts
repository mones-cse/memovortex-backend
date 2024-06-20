import { Request } from 'express'
import { DB_ERRORS, DatabaseError, TNewUser } from '../config/database'
import { createUser } from '../repositories/user'
import { passowrdGenerator } from '../utils/bcrypt'

export const createUserService = async (user: TNewUser) => {
    const hashedPassword = await passowrdGenerator(user.password_hash)

    try {
        const res_service = await createUser({ ...user, password_hash: hashedPassword })
        console.log('User created successfully', res_service)
        return res_service
    } catch (err) {
        console.log('fuck')
        const e = err as DatabaseError
        if (e.code === DB_ERRORS.UNIQUE_VIOLATION) {
            throw new Error('Unique constraint violation: Duplicate entry.')
        } else if (e.code === DB_ERRORS.FOREIGN_KEY_VIOLATION) {
            throw new Error('Foreign key constraint violation: Referenced key not found.')
        } else if (e.code === DB_ERRORS.CHECK_VIOLATION) {
            throw new Error('Check constraint violation: Condition not met.')
        } else if (e.code === DB_ERRORS.NOT_NULL_VIOLATION) {
            throw new Error('Not null constraint violation: Null value not allowed.')
        } else {
            throw new Error('Some other database error occurred.')
        }
    }
}
