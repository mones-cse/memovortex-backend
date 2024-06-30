import { getUserByEmail, getUserById } from '../repositories/user.repository'
import { createSession, deleteSessionByUserId, getSessionByRefreshtoken } from '../repositories/session.repository'
import { passwordCompare } from '../utils/bcrypt'
import { tokenService } from './index'
import ApiError from '../errors/ApiError'
import { TInsertSession } from 'types/session.types'

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
            await deleteSessionByUserId(user.id)
            await createSession(session)
        } catch (e) {
            console.log('🚀 ~ loginUserService ~ e:', e)
            throw new ApiError(500, 'Internal Server Error during refrash token save')
        }
        return { token, refresh_token }
    }
}

export const newAccessTokenByRefreshToken = async (refresh_token: string) => {
    const session = await getSessionByRefreshtoken(refresh_token)
    if (session.length === 0) {
        throw new ApiError(404, 'Session not found')
    }
    const user = await getUserById(session[0].user_id as string)
    if (!user) {
        throw new ApiError(404, 'User not found')
    }
    const newAccessToken = await tokenService.issueJWT(user[0])
    return newAccessToken
}
