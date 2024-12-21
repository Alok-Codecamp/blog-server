"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const requestValidator_1 = __importDefault(require("../../middleware/requestValidator"));
const user_validation_1 = require("./user.validation");
const authTokenValidator_1 = require("../../middleware/authTokenValidator");
const user_constant_1 = require("./user.constant");
const router = (0, express_1.Router)();
router.post('/auth/register', (0, requestValidator_1.default)(user_validation_1.userValidationSchema.createUserValidationSchema), user_controller_1.userController.createUser);
// /api/admin/users/:userId/block
router.patch('/admin/users/:userId/block', (0, authTokenValidator_1.authTokenValidator)(user_constant_1.USER_ROLE.admin), user_controller_1.userController.blockedUser);
exports.userRoutes = router;
