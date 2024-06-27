import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

type ErrorResponseParams = {
    res: Response
    statusCode?: number
    message: string
}

export const successResponse = (res: Response, statusCode = StatusCodes.OK, message: string, data: any = null) => {
    const response = {
        success: true,
        statusCode,
        message,
        data,
    }
    res.status(statusCode).json(response)
}

export const errorResponse = ({
    res,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    message,
}: ErrorResponseParams) => {
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
}
