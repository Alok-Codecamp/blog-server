import { Request, Response, Router, NextFunction } from "express";
import { userController } from "./user.controller";
import requestValidator from "../../middleware/requestValidator";
import { userValidationSchema } from "./user.validation";
import { authTokenValidator } from "../../middleware/authTokenValidator";
import { USER_ROLE } from "./user.constant";




const router = Router();

router.post('/auth/register', requestValidator(userValidationSchema.createUserValidationSchema), userController.createUser);


// /api/admin/users/:userId/block

router.patch('/admin/users/:userId/block', authTokenValidator(USER_ROLE.admin), userController.blockedUser)



export const userRoutes = router;