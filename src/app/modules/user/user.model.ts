import { model, Schema } from "mongoose";
import { IUser, } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";





// defined user Schema

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: 'user'

    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



UserSchema.pre('save', async function (next) {
    console.log(this);


    const user = this;

    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))

    next();
})

UserSchema.post('save', async function (next) {

    this.password = '';


})
export const User = model<IUser>('User', UserSchema);