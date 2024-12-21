"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const requestValidator_1 = __importDefault(require("../../middleware/requestValidator"));
const blog_validation_1 = require("./blog.validation");
const authTokenValidator_1 = require("../../middleware/authTokenValidator");
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
// create blog
router.post('/blogs', (0, authTokenValidator_1.authTokenValidator)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, requestValidator_1.default)(blog_validation_1.blogValidations.createBlogValidationSchema), blog_controller_1.blogController.createBlog);
// update blog by user
router.patch('/blogs/:id', (0, authTokenValidator_1.authTokenValidator)(user_constant_1.USER_ROLE.user), (0, requestValidator_1.default)(blog_validation_1.blogValidations.updateBlogValidationSchema), blog_controller_1.blogController.updateBlog);
//delete blog by user 
router.delete('/blogs/:id', (0, authTokenValidator_1.authTokenValidator)(user_constant_1.USER_ROLE.user), blog_controller_1.blogController.deleteBlog);
// delete blog by admin
router.delete('/admin/blogs/:id', (0, authTokenValidator_1.authTokenValidator)(user_constant_1.USER_ROLE.admin), blog_controller_1.blogController.deleteBlogByAdmin);
// get all blogs also support search , sort, sortOrder,and filter query
router.get('/blogs', blog_controller_1.blogController.getAllBlogs);
exports.blogRoutes = router;
