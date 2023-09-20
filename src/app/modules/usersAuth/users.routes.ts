import express from 'express';
import { UserAuthController } from './users.controller';

const router = express.Router();

router.post('/signup', UserAuthController.createNewUser);
router.post('/signin', UserAuthController.userLogin);

// router.patch(
//   '/:id',
//   validateRequest(AcademicDepartmentValidation.update),
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   AcademicDepartmentController.updateOneInDB
// );

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   AcademicDepartmentController.deleteByIdFromDB
// );

export const UserAuthRoutes = router;
