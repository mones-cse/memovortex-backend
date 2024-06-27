import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

import { StatusCodes } from 'http-status-codes'
import ApiError from '../errors/ApiError'

export default function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log('🚀 ~ return ~ req:', req.headers)

        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            console.log('🚀 ~ return ~ error:', error)
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map(
                    (issue: any) =>
                        // message: `${issue.path.join('.')} is ${issue.message}`,
                        issue.message,
                )
                const errorMessagesString = errorMessages.reduce((acc, curr) => acc + curr + ', ', '')
                next(new ApiError(400, `Validation errors: ${errorMessagesString}`))
            } else {
                next(error)
            }
        }
    }
}
