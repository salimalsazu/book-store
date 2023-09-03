import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getAllUsersById);
router.patch('/:id', UserController.updateUsers);
router.delete('/:id', UserController.deleteUser);


export const UserRoutes = router;
