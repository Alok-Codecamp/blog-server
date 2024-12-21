import jwt, { JwtPayload } from "jsonwebtoken"
import { TUserRole } from "../modules/user/user.interface"
import { NextFunction, Request, Response } from "express"
import asyncWrapper from "../utils/asyncWrapper"
import ApiError from "./error.superClass"
import httpStatus from "http-status"
import config from "../config"


interface CustomRequest extends Request {
    user: JwtPayload
}
export const authTokenValidator = (...requiredRoles: TUserRole[]) => {
    return asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization

        // if the token send from the client
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized user!')
        }

        // check if the token is valied
        jwt.verify(token, config.jwt_private_key as string, function (err, decoded) {
            if (err) {
                throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized user!')
            }

            const { email, role } = decoded as JwtPayload;

            console.log(`payload:${role} and route:${requiredRoles}`);

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized user!')
            }


            req.user = decoded as JwtPayload;

            next()
        })

    })
}
