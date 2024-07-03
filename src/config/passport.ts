import { Strategy, ExtractJwt } from 'passport-jwt'
import { Algorithm } from 'jsonwebtoken'
import env from './env'
import { userRepository } from '../repositories/index'
import exp from 'constants'

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.PUBLIC_KEY,
    algorithms: ['RS256'] as Algorithm[],
    ignoreExpiration: false,
    jsonWebTokenOptions: {
        ignoreExpiration: false,
    },
}

const strategy = new Strategy(options, (payload, done) => {
    userRepository
        .getUserById(payload.sub)
        .then((user) => {
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch((err) => {
            console.log({ err })
            return done(err, false)
        })
})

export default strategy
