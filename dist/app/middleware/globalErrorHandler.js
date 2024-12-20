"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    let statuscode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    let message = (err === null || err === void 0 ? void 0 : err.message) || 'unknown error';
    let errorSources = [
        {
            path: 'unknown',
            message: message || 'unknown erorr'
        }
    ];
    res.status(statuscode).json({
        success: false,
        message,
        statuscode,
        error: errorSources,
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null
    });
};
exports.default = globalErrorHandler;
