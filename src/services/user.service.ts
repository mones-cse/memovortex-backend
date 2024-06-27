import { Request } from 'express'
import { DB_ERRORS, DatabaseError, TNewUser } from '../config/database'
import { createUser, getUserByEmail } from '../repositories/user.repository'
import { passowrdGenerator, passwordCompare } from '../utils/bcrypt'
import { tokenService } from './index'
import ApiError from '../errors/ApiError'

export const createUserService = async (user: TNewUser) => {
    const existingUser = await getUserByEmail(user.email)
    if (existingUser.length > 0) {
        throw new ApiError(409, 'Email already exists')
    }

    const hashedPassword = await passowrdGenerator(user.password_hash)
    const createtdUser = await createUser({ ...user, password_hash: hashedPassword })
    return createtdUser
}

export const loginUserService = async (email: string, password: string) => {
    const [user] = await getUserByEmail(email)
    if (!user) {
        throw new ApiError(404, 'Email not found')
    }
    const isMatch = await passwordCompare(password, user.password_hash)
    if (!isMatch) {
        throw new ApiError(404, 'Credentials not match')
    } else {
        const token = await tokenService.issueJWT(user)
        return token
    }
}
