"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = require("../modules/usersAuth/users.routes");
const users_routes_2 = require("../modules/users/users.routes");
const users_routes_3 = require("../modules/userProfile/users.routes");
const category_routes_1 = require("../modules/categories/category.routes");
const book_routes_1 = require("../modules/books/book.routes");
const orders_routes_1 = require("../modules/orders/orders.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: users_routes_1.UserAuthRoutes,
    },
    {
        path: '/users',
        route: users_routes_2.UserRoutes,
    },
    {
        path: '/profile',
        route: users_routes_3.UserProfileRoutes,
    },
    {
        path: '/category',
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: '/books',
        route: book_routes_1.BookRoutes,
    },
    {
        path: '/orders',
        route: orders_routes_1.OrderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
