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
        min: 10,
        max: 1000
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })




export const Blog = model<IBlog>('Blog', BlogSchema);