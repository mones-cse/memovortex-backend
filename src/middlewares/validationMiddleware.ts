import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

import { StatusCodes } from 'http-status-codes'
import ApiError from '../errors/ApiError'

export default function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => `For ${issue.path}: ${issue.message}`)
                const errorMessagesString = errorMessages.reduce((acc, curr) => acc + curr + ', ', '')
                next(new ApiError(StatusCodes.BAD_REQUEST, `Validation errors: ${errorMessagesString}`))
            } else {
                next(error)
            }
        }
    }
}
