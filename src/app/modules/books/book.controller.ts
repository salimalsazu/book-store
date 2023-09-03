import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { IBookFilterRequest } from './book.interface';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createNewBook(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters: IBookFilterRequest = pick(req.query, [
    'search',
    'minPrice',
    'maxPrice',
    'category',
  ]);

  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);

  const result = await BookService.getAllBook(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});

const getAllBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getAllBookById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Book fetched successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await BookService.updateBook(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

const getBookByCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params?.categoryId;
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const result = await BookService.getBookByCategory(categoryId, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBook,
  getAllBookById,
  updateBook,
  deleteBook,
  getBookByCategory,
};
