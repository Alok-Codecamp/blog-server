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
exports.authTokenValidator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncWrapper_1 = __importDefault(require("../utils/asyncWrapper"));
const error_superClass_1 = __importDefault(require("./error.superClass"));
const httpStatus = require("http-status");
const config_1 = __importDefault(require("../config"));
const authTokenValidator = (...requiredRoles) => {
    return (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // if the token send from the client
        if (!token) {
            throw new error_superClass_1.default(httpStatus.NOT_ACCEPTABLE, 'Unauthorized user!');
        }
        // check if the token is valied
        jsonwebtoken_1.default.verify(token, config_1.default.jwt_private_key, function (err, decoded) {
            if (err) {
                throw new error_superClass_1.default(httpStatus.NOT_ACCEPTABLE, 'Unauthorized user!');
            }
            const { email, role } = decoded;
            console.log(`payload:${role} and route:${requiredRoles}`);
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new error_superClass_1.default(httpStatus.NOT_ACCEPTABLE, 'Unauthorized user!');
            }
            req.user = decoded;
            next();
        });
    }));
};
exports.authTokenValidator = authTokenValidator;
