import { NextFunction, Request, Response } from 'express'
import { userService, authService } from '../services/index'
import { successResponse } from '../utils/response'
import { TUser } from '@src/config/database'
import { changePasswordService } from '@src/services/auth.service'

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body
        const user = await userService.createUserService(body)
        res.status(201).json({ message: 'User created successfully', user })
    } catch (err: any) {
        next(err)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const tokens = await authService.loginUserService(email, password)
        successResponse(res, 200, 'User logged in successfully', tokens)
    } catch (err: any) {
        next(err)
    }
}

const newAccessTokenByRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refresh_token } = req.body

        const tokens = await authService.newAccessTokenByRefreshToken(refresh_token)
        successResponse(res, 200, 'New access token created successfully', tokens)
    } catch (err: any) {
        next(err)
    }
}

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const newPassword = req.body.newPassword
        const oldPassword = req.body.oldPassword
        const response = await changePasswordService(user as TUser, newPassword, oldPassword)
        successResponse(res, 200, 'Password changed successfully')
    } catch (err: any) {
        console.log('🚀 ~ changePassword ~ err:', err)
        next(err)
    }
}
export default {
    signup,
    login,
    changePassword,
    newAccessTokenByRefreshToken,
}
