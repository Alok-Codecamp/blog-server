import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";




const BlogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        min: 1,
        max: 1000
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

// BlogSchema.post('find', async function (next) {
//     const PublishedBlogs = await Blog.find({ isPublished: true });

//     next()
// })


export const Blog = model<IBlog>('Blog', BlogSchema);