import { TUser } from 'config/database'
import jwt from 'jsonwebtoken'
import env from '../config/env'
export const issueJWT = async (user: TUser) => {
    const expiresIn = '100m' // 1000ms * 60s * 60m * 24h  = 1 days
    console.log('during jwt issue time is ', Date.now())
    const payload = {
        sub: user.id,
        iat: Math.floor(Date.now() / 1000),
    }
    const signedToken = await jwt.sign(payload, env.PRIVATE_KEY, {
        expiresIn: expiresIn,
        algorithm: 'RS256',
    })
    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn,
    }
}
