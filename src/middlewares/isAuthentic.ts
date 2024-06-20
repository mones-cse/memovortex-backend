import { Request, Response } from 'express'
import passport from 'passport'

const isAuthentic = (req: Request, res: Response, next: any) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
        console.log({ err, user })
        if (err) {
            return res.status(401).send({ message: 'Unauthorized', error: err })
        }
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized' })
        }
        req.user = user
        next()
    })(req, res, next)
}

export default isAuthentic
