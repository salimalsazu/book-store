import express from 'express';
import { UserController } from './users.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getAllUsersById);
router.patch('/:id', UserController.updateUsers);
router.delete('/:id', UserController.deleteUser);


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

export const UserRoutes = router;
