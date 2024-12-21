import config from "../../config";
import ApiError from "../../middleware/error.superClass";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import httpStatus from "http-status";
import jwt from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser) => {
    // console.log(payload);

    // check the use is exists.

    const isUserExists = await User.isUserExistsByCustomId(payload.email)
    // console.log(isUserExists);

    if (!isUserExists) {
        throw new ApiError(httpStatus.NOT_FOUND, `The user is not found !`)
    }

    const isBlocked = isUserExists.isBlocked;
    if (isBlocked) {
        throw new ApiError(httpStatus.FORBIDDEN, `This user is Blocked !`)
    }

    // // checking if the password is inCorrect

    const isPasswordMatched = await User.isPasswordMatched(payload.password, isUserExists.password)

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.FORBIDDEN, `user password doesn't match !`)
    }

    // ASSCESS granged: send accessToken, refreshToken
    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_private_key as string, {
        expiresIn: '1d',
    })

    return {
        accessToken,
    }
}


export const authServices = {
    loginUser
}