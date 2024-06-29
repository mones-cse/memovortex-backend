import { NextFunction, Request, Response } from 'express'
import { userService, authService } from '../services/index'
import { successResponse } from '../utils/response'

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
export default {
    signup,
    login,
}
