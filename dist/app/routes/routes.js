"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const baseRoute = router.get('/');
const allRoutes = [
    {
        path: '/',
        route: baseRoute
    }
];
// use all route through forEach loop
allRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
