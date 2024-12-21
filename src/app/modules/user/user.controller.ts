import asyncWrapper from "../../utils/asyncWrapper";
import respondToClient from "../../utils/respondToClient";
import { userServices } from "./user.service";
import httpStatus from "http-status";




const createUser = asyncWrapper(async (req, res) => {
    console.log(req.body);

    const result = await userServices.createUserIntoDb(req.body);

    respondToClient(res, {
        success: true,
        message: ` User registerd successfull`,
        statusCode: httpStatus.OK,
        data: {
            _id: result._id,
            name: result.name,
            email: result.email
        }
    })


})


const blockedUser = asyncWrapper(async (req, res) => {

    const result = await userServices.blockUserIntoDb(req.params.userId)

    respondToClient(res, {
        success: true,
        message: ` User blocked successfull`,
        statusCode: httpStatus.OK,
    })
})



export const userController = {
    createUser,
    blockedUser
}