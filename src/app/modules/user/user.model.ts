import { model, Schema } from "mongoose";
import { IUser, UserStatics, } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";





// defined user Schema

const UserSchema = new Schema<IUser, UserStatics>({
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
}, { timestamps: true, versionKey: false });



// password hashed 
UserSchema.pre('save', async function (next) {

    const user = this;

    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))

    next();
})

// statics method for check user 
UserSchema.statics.isUserExistsByCustomId = async function (email: string) {
    return await User.findOne({ email: email });
}

// static method for match password 

UserSchema.statics.isPasswordMatched = async function (plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export const User = model<IUser, UserStatics>('User', UserSchema);