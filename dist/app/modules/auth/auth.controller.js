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
exports.authController = void 0;
const asyncWrapper_1 = __importDefault(require("../../utils/asyncWrapper"));
const respondToClient_1 = __importDefault(require("../../utils/respondToClient"));
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.loginUser(req.body);
    (0, respondToClient_1.default)(res, {
        success: true,
        message: 'Login successfully',
        statusCode: http_status_1.default.OK,
        data: result
    });
}));
exports.authController = {
    loginUser,
};
