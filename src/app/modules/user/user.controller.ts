import asyncWrapper from "../../utils/asyncWrapper";
import respondToClient from "../../utils/respondToClient";
import { userServices } from "./user.service";
import httpStatus from "http-status";




const createUser = asyncWrapper(async (req, res) => {
    console.log(req.body);

    const result = await userServices.createUserIntoDb(req.body);

    respondToClient(res, {
        success: true,
        message: `Blog created successfully`,
        statusCode: httpStatus.OK,
        data: result
    })


})




export const userController = {
    createUser,
}