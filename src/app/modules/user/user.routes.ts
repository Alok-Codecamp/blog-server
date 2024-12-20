import { Request, Response, Router, NextFunction } from "express";
import { userController } from "./user.controller";
import requestValidator from "../../middleware/requestValidator";
import { userValidationSchema } from "./user.validation";




const router = Router();

router.post('/register', requestValidator(userValidationSchema.createUserValidationSchema), userController.createUser);







export const userRoutes = router;