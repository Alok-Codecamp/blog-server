import ApiError from "../../middleware/error.superClass";
import { IUser } from "./user.interface";
import { User } from "./user.model";



const createUserIntoDb = async (payload: IUser) => {



    const newUser = (await User.create(payload));
    // console.log(newUser);

    return newUser;
}

const blockUserIntoDb = async (id: string) => {

    const isUserExists = await User.findById(id);
    if (!isUserExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
    }
    const blockedUser = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });

    if (!blockedUser) {
        throw new ApiError(httpStatus.FORBIDDEN, 'faild to block user!')
    }

    return blockedUser;
}



export const userServices = {
    createUserIntoDb,
    blockUserIntoDb
}