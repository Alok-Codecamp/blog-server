import { Response } from "express"
import { IResponseData } from "../interface/response"

const respondToClient = <T>(res: Response, data: IResponseData<T>) => {
    return res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
        data: data.data
    })
}


export default respondToClient;