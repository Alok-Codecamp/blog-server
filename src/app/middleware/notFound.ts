import { Request, Response } from "express";

import httpStatus from "http-status";
// error handler function for route not found
const apiNotFound = (req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'API Not Found !!',
        error: 'Please enter a valied url path'
    })
}

export default apiNotFound;