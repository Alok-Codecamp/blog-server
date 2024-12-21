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
exports.userController = void 0;
const asyncWrapper_1 = __importDefault(require("../../utils/asyncWrapper"));
const respondToClient_1 = __importDefault(require("../../utils/respondToClient"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const createUser = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.createUserIntoDb(req.body);
    (0, respondToClient_1.default)(res, {
        success: true,
        message: ` User registerd successfull`,
        statusCode: http_status_1.default.OK,
        data: {
            _id: result._id,
            name: result.name,
            email: result.email
        }
    });
}));
const blockedUser = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.blockUserIntoDb(req.params.userId);
    (0, respondToClient_1.default)(res, {
        success: true,
        message: ` User blocked successfull`,
        statusCode: http_status_1.default.OK,
    });
}));
exports.userController = {
    createUser,
    blockedUser
};
