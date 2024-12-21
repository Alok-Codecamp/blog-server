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
exports.blogController = void 0;
const asyncWrapper_1 = __importDefault(require("../../utils/asyncWrapper"));
const blog_service_1 = require("./blog.service");
const respondToClient_1 = __importDefault(require("../../utils/respondToClient"));
const http_status_1 = __importDefault(require("http-status"));
// controller function for create blog,
const createBlog = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogServices.createBlogIntoDb(req.body);
    (0, respondToClient_1.default)(res, {
        success: true,
        message: `Blog created successfully`,
        statusCode: http_status_1.default.OK,
        data: result
    });
}));
//controller function get all blogs
const getAllBlogs = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { search, sortBy, sortOrder, filter } = req.query;
    // console.log(`search:${search},sort:${sortBy},sortOrder:${sortOrder},filter:${filter}`);
    // console.log('controller', req.query);
    const result = yield blog_service_1.blogServices.getAllBlogFromDb(req.query);
    (0, respondToClient_1.default)(res, {
        success: true,
        message: `Blog retrive successfully`,
        statusCode: http_status_1.default.OK,
        data: result
    });
}));
// controller function for update blog
const updateBlog = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    console.log('requestedUser', req.user);
    const result = yield blog_service_1.blogServices.updateBlogIntoDb(req.params.id, req.body, email);
    (0, respondToClient_1.default)(res, {
        success: true,
        message: `Blog updated successfully`,
        statusCode: http_status_1.default.OK,
        data: result
    });
}));
//controller function for delete blog
const deleteBlog = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield blog_service_1.blogServices.deleteBlogfromDb(req.params.id, email);
    (0, respondToClient_1.default)(res, {
        success: true,
        message: `Blog deleted successfully`,
        statusCode: http_status_1.default.OK,
    });
}));
const deleteBlogByAdmin = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogServices.deleteBlogByAdminFromDb(req.params.id);
    (0, respondToClient_1.default)(res, {
        success: true,
        message: `Blog deleted successfully`,
        statusCode: http_status_1.default.OK,
    });
}));
exports.blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    deleteBlogByAdmin
};
