"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const zod_1 = require("zod");
const error_superClass_1 = __importDefault(require("./error.superClass"));
const zodError_1 = __importDefault(require("../error/zodError"));
const mongooseValidationError_1 = __importDefault(require("../error/mongooseValidationError"));
const castError_1 = __importDefault(require("../error/castError"));
const duplicateError_1 = __importDefault(require("../error/duplicateError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    let message = (err === null || err === void 0 ? void 0 : err.message) || 'unknown error';
    let errorSources = [
        {
            path: 'unknown',
            message: message || 'unknown erorr'
        }
    ];
    if (err instanceof zod_1.ZodError) {
        const commonErrorFormat = (0, zodError_1.default)(err);
        statusCode = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.statusCode;
        message = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.message;
        errorSources = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.errorSources;
    }
    else if (err.name === 'ValidationError') {
        const commonErrorFormat = (0, mongooseValidationError_1.default)(err);
        statusCode = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.statusCode;
        message = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.message;
        errorSources = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.errorSources;
    }
    else if (err.name === "CastError") {
        const commonErrorFormat = (0, castError_1.default)(err);
        statusCode = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.statusCode;
        message = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.message;
        errorSources = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.errorSources;
    }
    else if (err.code === 11000) {
        console.log('log from duplicate id error ', err.code);
        const commonErrorFormat = (0, duplicateError_1.default)(err);
        statusCode = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.statusCode;
        message = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.message;
        errorSources = commonErrorFormat === null || commonErrorFormat === void 0 ? void 0 : commonErrorFormat.errorSources;
    }
    // handle AppError
    else if (err instanceof error_superClass_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: 'App error ',
                message: err.message
            }
        ];
    }
    // handler for error
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: 'error ',
                message: err.message
            }
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error: errorSources,
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null
    });
};
exports.default = globalErrorHandler;
