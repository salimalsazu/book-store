import express from 'express';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);

router.get('/', BookController.getAllBook);

router.get('/:id', BookController.getAllBookById);

router.get('/:categoryId/category ', BookController.getBookByCategory);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateBook);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRoutes = router;
