import FlexibleQueryBuilder from "../../builder/FlexibleQueryBuilder ";
import { searchingFields } from "./blog.constant";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";



const createBlogIntoDb = async (payload: IBlog) => {

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

const updateBlogIntoDb = async (id: string, payload: Partial<IBlog>) => {

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

const deleteBlogfromDb = async (id: string) => {

    const deletedBlog = await Blog.findByIdAndDelete(id);



    return deletedBlog;
}


export const blogServices = {
    createBlogIntoDb,
    updateBlogIntoDb,
    deleteBlogfromDb,
    getAllBlogFromDb

}