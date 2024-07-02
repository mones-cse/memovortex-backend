import { Request } from 'express'
import { TUser } from 'config/database'
export interface CustomRequest extends Request {
    user?: TUser
}
