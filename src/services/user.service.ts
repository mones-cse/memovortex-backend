import { Request } from 'express'
import { DB_ERRORS, DatabaseError, TNewUser } from '../config/database'
import { createUser, getUserByEmail } from '../repositories/user.repository'
import { createSession } from '../repositories/session.repository'
import { passowrdGenerator, passwordCompare } from '../utils/bcrypt'
import { tokenService } from './index'
import ApiError from '../errors/ApiError'
import { TInsertSession } from 'types/session.types'
import { serializeUser } from '../serializers/userSerializer'

export const createUserService = async (user: TNewUser) => {
    const existingUser = await getUserByEmail(user.email)
    if (existingUser.length > 0) {
        throw new ApiError(409, 'Email already exists')
    }

    const hashedPassword = await passowrdGenerator(user.password_hash)
    const createtdUser = await createUser({ ...user, password_hash: hashedPassword })
    const serializedUser = serializeUser(createtdUser[0])
    return serializedUser
}
