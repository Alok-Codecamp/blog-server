"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// type for name properties of iUser interface 
const NameSchema = new mongoose_1.Schema({
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
});
const UserSchema = new mongoose_1.Schema({
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
exports.User = (0, mongoose_1.model)('User', UserSchema);
