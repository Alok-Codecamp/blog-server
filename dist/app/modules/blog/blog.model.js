"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.ObjectId,
        ref: 'User'
    },
    isPublished: {
        type: Boolean
    }
}, { timestamps: true });
exports.Blog = (0, mongoose_1.model)('Blog', BlogSchema);
