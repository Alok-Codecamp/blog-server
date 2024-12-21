import { JwtPayload } from "jsonwebtoken";
import FlexibleQueryBuilder from "../../builder/FlexibleQueryBuilder ";
import ApiError from "../../middleware/error.superClass";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { searchingFields } from "./blog.constant";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import httpStatus from "http-status";


const createBlogIntoDb = async (payload: IBlog) => {

    const isAuthorExists = await User.findOne({ _id: payload.author })

    if (!isAuthorExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Author not found!')
    }

    const newBlog = await Blog.create(payload);

    if (!newBlog) {
        throw new Error(`Faild to create blog`);
    }

    return newBlog;
}


// service function for get all Blog from db

const getAllBlogFromDb = async (query: Record<string, unknown>) => {
    console.log(query);

    const blogQuery = new FlexibleQueryBuilder(Blog.find().populate({ path: 'author', select: '_id name email' }).select('title content author createdAt'), query).search(searchingFields).sort().filter();

    const allBlog = await blogQuery.queryModel;





    if (!allBlog) {
        throw new Error(`Faild to retrive blogs`);
    }

    return allBlog;
}

// service function for update blog 

const updateBlogIntoDb = async (id: string, payload: Partial<IBlog>, email: string) => {

    const isBlogExists = await Blog.findById(id);

    if (!isBlogExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!')
    }

    const blogOwner = await User.findById(isBlogExists.author);

    if (!blogOwner) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Author not found!')
    }

    if (email && blogOwner.email !== email) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized for modify this blog!')
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, payload, { new: true }).populate({
        path: 'author',
        select: '_id name email'
    }).select('_id title content author');

    if (!updatedBlog) {
        throw new Error(`Faild to update blog`);
    }

    // const {_id,title,content,author} = updatedBlog;


    return updatedBlog;
}

// service function for delete blog 

const deleteBlogfromDb = async (id: string, email: string) => {

    const isBlogExists = await Blog.findById(id);

    if (!isBlogExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!')
    }

    const blogOwner = await User.findById(isBlogExists.author);

    if (!blogOwner) {
        throw new ApiError(httpStatus.NOT_FOUND, 'You are not owner of this blog!')
    }

    if (email && blogOwner.email !== email) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to delete this blog!')
    }

    const deletedBlog = await Blog.findByIdAndDelete(id).populate({
        path: 'author',
        select: '_id name email'
    });

    if (!deletedBlog) {
        throw new Error(`Faild to delete blog`);
    }

    return deletedBlog;
}

const deleteBlogByAdminFromDb = async (id: string) => {

    const isBlogExists = await Blog.findById(id);

    if (!isBlogExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!')
    }
    const deletedBlog = await Blog.findByIdAndDelete(id).populate({
        path: 'author',
        select: '_id name email'
    });

    if (!deletedBlog) {
        throw new Error(`Faild to delete blog`);
    }

    return deletedBlog;

}


export const blogServices = {
    createBlogIntoDb,
    updateBlogIntoDb,
    deleteBlogfromDb,
    getAllBlogFromDb,
    deleteBlogByAdminFromDb

}