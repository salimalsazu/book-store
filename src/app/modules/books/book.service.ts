/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IBookFilterRequest } from './book.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { booksFilterableFields } from './book.contants';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createNewBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getAllBook = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, minPrice, maxPrice, ...filterData } = filters;

  console.log(filters);

  const conditions = [];

  if (search) {
    conditions.push({
      OR: booksFilterableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minPrice) {
    const minPriceFloat = parseFloat(minPrice);
    if (!isNaN(minPriceFloat)) {
      conditions.push({
        OR: [{ price: { gte: minPriceFloat } }],
      });
    }
  }

  if (maxPrice) {
    const maxPriceFloat = parseFloat(maxPrice);
    if (!isNaN(maxPriceFloat)) {
      conditions.push({
        OR: [{ price: { lte: maxPriceFloat } }],
      });
    }
  }

  if (Object.keys(filterData).length > 0) {
    conditions.push({
      AND: Object.keys(filterData).map(key => ({
        categoryId: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    conditions.length > 1 ? { AND: conditions } : conditions[0] || {};
  // console.log(orConditions);

  const result = await prisma.book.findMany({
    include: {
      category: true,
      reviewAndRatings: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            price: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  // console.log(whereConditions);
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const getAllBookById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

const getBookByCategory = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[] | null>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);

  const isExistCategory = await prisma.category.findMany({});

  if (!isExistCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category Not Exist');
  }

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    skip,
    take: size,
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });

  const total = await prisma.book.count({
    where: {
      categoryId,
    },
    skip,
    take: size,
  });
  const totalPage = Math.ceil(total / size);
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Book Not Found on this category !!'
    );
  }

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

export const BookService = {
  createNewBook,
  getAllBook,
  getAllBookById,
  updateBook,
  deleteBook,
  getBookByCategory,
};
