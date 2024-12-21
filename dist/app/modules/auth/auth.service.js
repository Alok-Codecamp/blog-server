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
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const error_superClass_1 = __importDefault(require("../../middleware/error.superClass"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    // check the use is exists.
    const isUserExists = yield user_model_1.User.isUserExistsByCustomId(payload.email);
    // console.log(isUserExists);
    if (!isUserExists) {
        throw new error_superClass_1.default(http_status_1.default.NOT_FOUND, `The user is not found !`);
    }
    const isBlocked = isUserExists.isBlocked;
    if (isBlocked) {
        throw new error_superClass_1.default(http_status_1.default.FORBIDDEN, `This user is Blocked !`);
    }
    // // checking if the password is inCorrect
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, isUserExists.password);
    if (!isPasswordMatched) {
        throw new error_superClass_1.default(http_status_1.default.UNAUTHORIZED, `"Invalid credentials!`);
    }
    // ASSCESS granged: send accessToken, refreshToken
    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_private_key, {
        expiresIn: '1d',
    });
    return {
        accessToken,
    };
});
exports.authServices = {
    loginUser
};
