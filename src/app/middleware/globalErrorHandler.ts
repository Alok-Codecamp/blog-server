import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interface/error";
import config from "../config";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    let statuscode = err?.statusCode || 500;
    let message = err?.message || 'unknown error';

    let errorSources: TErrorSources = [
        {
            path: 'unknown',
            message: message || 'unknown erorr'
        }
    ]



    res.status(statuscode).json({
        success: false,
        message,
        errorSources,
        main: err,
        stack: config.node_env === 'development' ? err?.stack : null

    })

}

export default globalErrorHandler;