import { Request, Response } from "express";
import asyncWrapper from "../../utils/asyncWrapper";
import { blogServices } from "./blog.service";
import respondToClient from "../../utils/respondToClient";
import httpStatus from "http-status";

// controller function for create blog,
const createBlog = asyncWrapper(async (req: Request, res: Response) => {

    const result = await blogServices.createBlogIntoDb(req.body);

    respondToClient(res, {
        success: true,
        message: `Blog created successfully`,
        statusCode: httpStatus.OK,
        data: result
    })
})

//controller function get all blogs

const getAllBlogs = asyncWrapper(async (req: Request, res: Response) => {
    // const { search, sortBy, sortOrder, filter } = req.query;

    // console.log(`search:${search},sort:${sortBy},sortOrder:${sortOrder},filter:${filter}`);
    console.log('controller', req.query);


    const result = await blogServices.getAllBlogFromDb(req.query);

    respondToClient(res, {
        success: true,
        message: `Blog retrive successfully`,
        statusCode: httpStatus.OK,
        data: result
    })
})
// controller function for update blog

const updateBlog = asyncWrapper(async (req: Request, res: Response) => {

    const result = await blogServices.updateBlogIntoDb(req.params.id, req.body);

    respondToClient(res, {
        success: true,
        message: `Blog updated successfully`,
        statusCode: httpStatus.OK,
        data: result
    })
})

//controller function for delete blog
const deleteBlog = asyncWrapper(async (req: Request, res: Response) => {

    const result = await blogServices.deleteBlogfromDb(req.params.id);

    respondToClient(res, {
        success: true,
        message: `Blog deleted successfully`,
        statusCode: httpStatus.OK,
        data: result
    })
})


export const blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs
}