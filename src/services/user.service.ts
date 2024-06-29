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
        const refresh_token = await tokenService.issueRefresh(user)
        try {
            const session: TInsertSession = {
                user_id: user.id,
                refresh_token: refresh_token,
                expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            }
            console.log('🚀 ~ loginUserService ~ session:', session)

            await createSession(session)
        } catch (e) {
            console.log('🚀 ~ loginUserService ~ e:', e)
            throw new ApiError(500, 'Internal Server Error during refrash token save')
        }
        return { token, refresh_token }
    }
}
