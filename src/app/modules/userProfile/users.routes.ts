import express from 'express';
import { UserProfileController } from './users.controller';

const router = express.Router();

router.get('/', UserProfileController.getUsersProfile);

export const UserProfileRoutes = router;
