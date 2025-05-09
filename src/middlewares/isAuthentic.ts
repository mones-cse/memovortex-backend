import ApiError from '../errors/ApiError'
import { Request, Response } from 'express'
import passport from 'passport'

const isAuthentic = (req: Request, res: Response, next: any) => {
    // todo : check if user is authenticated manually from jwt token rather than using passport
    // because passport make a request to database to check if user is authenticated
    passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
        if (err || !user) {
            throw new ApiError(401, 'Unauthorized')
        }
        req.user = user[0]
        next()
    })(req, res, next)
}

export default isAuthentic
