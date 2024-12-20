
// type for name properties of iUser interface 

import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserStatics extends Model<IUser> {
    isUserExistsByCustomId(id: string): Promise<IUser>;
    isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
