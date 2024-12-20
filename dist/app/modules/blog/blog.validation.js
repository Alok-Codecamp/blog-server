"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidations = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        content: zod_1.z
            .string({
            required_error: "Content is required",
        })
            .min(5, "Content must be at least 10 characters long")
            .max(1000, "Content must be at most 1000 characters long"),
        author: zod_1.z
            .string()
            .optional(), // Assuming `author` is optional in the schema
        isPublished: zod_1.z.boolean().default(true),
    })
});
// zod schema for update blogs data
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }).optional(),
        content: zod_1.z
            .string({
            required_error: "Content is required",
        })
            .min(5, "Content must be at least 10 characters long")
            .max(1000, "Content must be at most 1000 characters long").optional(),
        author: zod_1.z
            .string()
            .optional(), // Assuming `author` is optional in the schema
        isPublished: zod_1.z.boolean().default(true).optional(),
    })
});
exports.blogValidations = {
    createBlogValidationSchema,
    updateBlogValidationSchema
};
