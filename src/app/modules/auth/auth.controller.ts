import asyncWrapper from "../../utils/asyncWrapper"
import respondToClient from "../../utils/respondToClient"
import { authServices } from "./auth.service"
import httpStatus from "http-status"

const loginUser = asyncWrapper
    (async (req, res) => {

        const result = await authServices.loginUser(req.body)
        respondToClient(res, {
            success: true,
            message: 'Login successfully',
            statusCode: httpStatus.OK,
            data: result
        })
    })



export const authController = {
    loginUser,
}