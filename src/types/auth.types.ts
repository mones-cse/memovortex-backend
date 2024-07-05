import { Request } from 'express'
import { TUser } from '@src/config/database'
export interface CustomRequest extends Request {
    user?: TUser
}
