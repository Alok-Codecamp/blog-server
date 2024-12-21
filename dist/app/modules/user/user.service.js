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
exports.userServices = void 0;
const error_superClass_1 = __importDefault(require("../../middleware/error.superClass"));
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role === 'admin') {
        throw new error_superClass_1.default(http_status_1.default.NOT_ACCEPTABLE, 'admin Can not be create');
    }
    const isUserExists = yield user_model_1.User.isUserExistsByCustomId(payload.email);
    if (isUserExists) {
        throw new error_superClass_1.default(http_status_1.default.NOT_ACCEPTABLE, 'User already registered. Please log in or use a different email to sign up.');
    }
    const newUser = (yield user_model_1.User.create(payload));
    // console.log(newUser);
    return newUser;
});
const blockUserIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findById(id);
    if (!isUserExists) {
        throw new error_superClass_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const blockedUser = yield user_model_1.User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    if (!blockedUser) {
        throw new error_superClass_1.default(http_status_1.default.FORBIDDEN, 'faild to block user!');
    }
    return blockedUser;
});
exports.userServices = {
    createUserIntoDb,
    blockUserIntoDb
};
