"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const loginValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string({ required_error: 'Id is required' }).email({ message: 'invalied email' }),
        password: zod_1.default.string({ required_error: 'Password is required' })
    })
});
exports.default = loginValidationSchema;
