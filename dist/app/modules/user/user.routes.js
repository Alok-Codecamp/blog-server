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
const router = (0, express_1.Router)();
router.post('/register', (0, requestValidator_1.default)(user_validation_1.userValidationSchema.createUserValidationSchema), user_controller_1.userController.createUser);
exports.userRoutes = router;
