"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email address")
            .nonempty("Email must not be empty"),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        role: zod_1.z.enum(["admin", "user"]).default("user"),
        isBlocked: zod_1.z.boolean().default(false),
    })
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Invalid email address").optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum(["admin", "user"]).optional(),
        isBlocked: zod_1.z.boolean().optional(),
    }),
});
exports.userValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema
};
