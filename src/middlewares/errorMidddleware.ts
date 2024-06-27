import { Request, Response, NextFunction } from 'express'
import ApiError from '../errors/ApiError'
import { errorResponse } from '../utils/response'

const errorMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    errorResponse({ res, statusCode, message })

    if (process.env.NODE_ENV !== 'production') {
        console.log('🚀 ~ errorMiddleware ~ :', err)
    }
}

export default errorMiddleware
