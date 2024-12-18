import { model, Schema } from "mongoose";
import { IUser, TName } from "./user.interface";

// type for name properties of iUser interface 
const NameSchema = new Schema<TName>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    }
})

const UserSchema = new Schema<IUser>({
    name: NameSchema,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: ["admin", "user"],
    isBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


export const User = model<IUser>('User', UserSchema);