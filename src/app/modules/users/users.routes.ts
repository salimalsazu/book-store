import express from 'express';
import { UserController } from './users.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsersById);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateUsers);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
