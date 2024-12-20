"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const respondToClient = (res, data) => {
    return res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
        data: data.data
    });
};
exports.default = respondToClient;
