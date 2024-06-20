import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction, Errback } from 'express'
const errorHandler = (
    err: { message: string; statusCode: number },
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let { statusCode, message } = err
    res.locals.errorMessage = err.message
    const response = {
        code: statusCode,
        message,
    }
    res.status(statusCode).send(response)
}
