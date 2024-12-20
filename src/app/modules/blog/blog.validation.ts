import { z } from "zod";

const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        }),
        content: z
            .string({
                required_error: "Content is required",
            })
            .min(5, "Content must be at least 10 characters long")
            .max(1000, "Content must be at most 1000 characters long"),
        author: z
            .string()
            .optional(), // Assuming `author` is optional in the schema
        isPublished: z.boolean().default(true),
    })
});

// zod schema for update blogs data


const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required",
        }).optional(),
        content: z
            .string({
                required_error: "Content is required",
            })
            .min(5, "Content must be at least 10 characters long")
            .max(1000, "Content must be at most 1000 characters long").optional(),
        author: z
            .string()
            .optional(), // Assuming `author` is optional in the schema
        isPublished: z.boolean().default(true).optional(),
    })
});


export const blogValidations = {
    createBlogValidationSchema,
    updateBlogValidationSchema

};
