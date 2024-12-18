"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const allRoutes = [
    {
        path: '/',
        route: router.get('/', (req, res, next) => {
            res.status(200).json('Project Blog server is running');
            next();
        })
    }
];
// use all route through forEach loop
allRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
