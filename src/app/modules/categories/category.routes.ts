import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getAllCategoryById);
router.patch('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

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

export const CategoryRoutes = router;
