"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = void 0;
const FlexibleQueryBuilder_1 = __importDefault(require("../../builder/FlexibleQueryBuilder "));
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = require("./blog.model");
const createBlogIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blog_model_1.Blog.create(payload);
    if (!newBlog) {
        throw new Error(`Faild to create blog`);
    }
    return newBlog;
});
// service function for get all Blog from db
const getAllBlogFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const blogQuery = new FlexibleQueryBuilder_1.default(blog_model_1.Blog.find().populate({ path: 'author', select: '_id name email' }).select('title content author createdAt'), query).search(blog_constant_1.searchingFields).sort().filter();
    const allBlog = yield blogQuery.queryModel;
    if (!allBlog) {
        throw new Error(`Faild to retrive blogs`);
    }
    return allBlog;
});
// service function for update blog 
const updateBlogIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, { new: true }).populate({
        path: 'author',
        select: '_id name email'
    }).select('_id title content author');
    if (!updatedBlog) {
        throw new Error(`Faild to update blog`);
    }
    // const {_id,title,content,author} = updatedBlog;
    return updatedBlog;
});
// service function for delete blog 
const deleteBlogfromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBlog = yield blog_model_1.Blog.findByIdAndDelete(id);
    return deletedBlog;
});
exports.blogServices = {
    createBlogIntoDb,
    updateBlogIntoDb,
    deleteBlogfromDb,
    getAllBlogFromDb
};
