import { Router } from "express";
import loginValidationSchema from "./auth.validation";
import requestValidator from "../../middleware/requestValidator";
import { authController } from "./auth.controller";


const router = Router();



router.post('/login', requestValidator(loginValidationSchema
), authController.loginUser)


export const authRoutes = router;