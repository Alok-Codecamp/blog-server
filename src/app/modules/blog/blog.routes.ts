import { Router } from "express";
import { blogController } from "./blog.controller";
import requestValidator from "../../middleware/requestValidator";
import { blogValidations } from "./blog.validation";
import { authTokenValidator } from "../../middleware/authTokenValidator";
import { USER_ROLE } from "../user/user.constant";





const router = Router();

// create blog
router.post('/blogs', authTokenValidator(USER_ROLE.user, USER_ROLE.admin), requestValidator(blogValidations.createBlogValidationSchema), blogController.createBlog);

// update blog by user
router.patch('/blogs/:id', authTokenValidator(USER_ROLE.user), requestValidator(blogValidations.updateBlogValidationSchema), blogController.updateBlog);

//delete blog by user 
router.delete('/blogs/:id', authTokenValidator(USER_ROLE.user), blogController.deleteBlog);

// delete blog by admin
router.delete('/admin/blogs/:id', authTokenValidator(USER_ROLE.admin), blogController.deleteBlogByAdmin);

// get all blogs also support search , sort, sortOrder,and filter query
router.get('/blogs', blogController.getAllBlogs);







export const blogRoutes = router;