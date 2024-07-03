import { NextFunction, Request, Response } from 'express'
import { userService, authService } from '../services/index'
import { successResponse } from '../utils/response'
import { TUser } from '@src/config/database'
import { updateUserAcountInfoService } from '@src/services/user.service'

const updateUserAccountInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const data = req.body
        const response = await updateUserAcountInfoService(user as TUser, data)
        successResponse(res, 200, 'User account info updated successfully', response)
    } catch (err: any) {
        next(err)
    }
}

export default {
    updateUserAccountInfo,
}
