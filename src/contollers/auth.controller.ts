import { catchAsync } from '../utils/catchAsync'
import { Request, Response } from 'express'
import { userService } from '../services/index'

const signup = catchAsync(async (req: Request, res: Response) => {
    try {
        const body = req.body
        const user = await userService.createUserService(body)
        res.status(201).json({ message: 'User created successfully', user })
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})
export default {
    signup,
}
