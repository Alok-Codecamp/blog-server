import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interface/error";
import config from "../config";
import { ZodError } from "zod";
import ApiError from "./error.superClass";
import handleZodError from "../error/zodError";
import handleMongooseValidationError from "../error/mongooseValidationError";
import handleCastError from "../error/castError";
import handleDuplicateError from "../error/duplicateError";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = err?.statusCode || 500;
    let message = err?.message || 'unknown error';

    let errorSources: TErrorSources = [
        {
            path: 'unknown',
            message: message || 'unknown erorr'
        }
    ]
    if (err instanceof ZodError) {
        console.log(err);

        const commonErrorFormat = handleZodError(err);
        statusCode = commonErrorFormat?.statusCode;
        message = commonErrorFormat?.message;
        errorSources = commonErrorFormat?.errorSources;
    } else if (err.name === 'ValidationError') {

        const commonErrorFormat = handleMongooseValidationError(err);

        statusCode = commonErrorFormat?.statusCode;
        message = commonErrorFormat?.message;
        errorSources = commonErrorFormat?.errorSources;

    } else if (err.name === "CastError") {

        const commonErrorFormat = handleCastError(err);

        statusCode = commonErrorFormat?.statusCode;
        message = commonErrorFormat?.message;
        errorSources = commonErrorFormat?.errorSources;

    } else if (err.code === 11000) {
        console.log('log from duplicate id error ', err.code);

        const commonErrorFormat = handleDuplicateError(err);

        statusCode = commonErrorFormat?.statusCode;
        message = commonErrorFormat?.message;
        errorSources = commonErrorFormat?.errorSources;

    }

    // handle AppError

    else if (err instanceof ApiError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSources = [
            {
                path: 'Api error ',
                message: err.message
            }
        ]

    }

    // handler for error

    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: 'error ',
                message: err.message
            }
        ]

    }

    if (!statusCode) {
        statusCode = 500;
    }

    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error: errorSources,
        stack: config.node_env === 'development' ? err?.stack : null

    })

}

export default globalErrorHandler;