import { IUser } from "./user.interface";
import { User } from "./user.model";



const createUserIntoDb = async (payload: IUser) => {



    const newUser = await User.create(payload);
    console.log(newUser);
    return newUser;
}



export const userServices = {
    createUserIntoDb,
}