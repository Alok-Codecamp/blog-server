import { Router } from "express";
import { blogController } from "./blog.controller";
import requestValidator from "../../middleware/requestValidator";
import { blogValidations } from "./blog.validation";
import { authTokenValidator } from "../../middleware/authTokenValidator";
import { USER_ROLE } from "../user/user.constant";





const router = Router();

router.post('/blogs', authTokenValidator(USER_ROLE.user), requestValidator(blogValidations.createBlogValidationSchema), blogController.createBlog);

router.patch('/blogs/:id', requestValidator(blogValidations.updateBlogValidationSchema), blogController.updateBlog);

router.delete('/blogs/:id', blogController.deleteBlog);

router.get('/blogs', blogController.getAllBlogs);







export const blogRoutes = router;