import { z } from "zod";

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        email: z
            .string({
                required_error: "Email is required",
            })
            .email("Invalid email address")
            .nonempty("Email must not be empty"),
        password: z.string({
            required_error: "Password is required",
        }),
        role: z.enum(["admin", "user"]).default("user"),
        isBlocked: z.boolean().default(false),
    })
});



const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email("Invalid email address").optional(),
        password: z.string().optional(),
        role: z.enum(["admin", "user"]).optional(),
        isBlocked: z.boolean().optional(),
    }),
});




export const userValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema
};
