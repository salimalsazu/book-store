import express from 'express';
import { UserAuthRoutes } from '../modules/usersAuth/users.routes';
import { UserRoutes } from '../modules/users/users.routes';
import { UserProfileRoutes } from '../modules/userProfile/users.routes';
import { CategoryRoutes } from '../modules/categories/category.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: UserAuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: UserProfileRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
