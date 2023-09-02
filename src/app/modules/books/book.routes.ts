import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/', BookController.createBook);
router.get('/', BookController.getAllBook);
router.get('/:id', BookController.getAllBookById);
router.patch('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

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

export const BookRoutes = router;
