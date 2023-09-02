/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IBookFilterRequest } from './book.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { booksFilterableFields } from './book.contants';

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

  const andConditions = [];
  const orConditions = [];
  if (search || maxPrice || minPrice) {
    if (search) {
      orConditions.push({
        OR: booksFilterableFields.map(field => ({
          [field]: {
            contains: search,
            mode: 'insensitive',
          },
        })),
      });
    }

    if (maxPrice) {
      const maxPriceFloat = parseFloat(maxPrice);
      if (!isNaN(maxPriceFloat)) {
        orConditions.push({
          OR: [{ price: { lte: maxPriceFloat } }],
        });
      }
    }

    if (minPrice) {
      const minPriceFloat = parseFloat(minPrice);

      if (!isNaN(minPriceFloat)) {
        orConditions.push({
          OR: [{ price: { gte: minPriceFloat } }],
        });
      }
    }
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        return {
          categoryId: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  let whereConditions: Prisma.BookWhereInput = {};

  if (andConditions.length > 0 && orConditions.length > 0) {
    whereConditions = {
      AND: andConditions,
      OR: orConditions,
    };
  } else if (andConditions.length > 0) {
    whereConditions = {
      AND: andConditions,
    };
  } else if (orConditions.length > 0) {
    whereConditions = {
      OR: orConditions,
    };
  }

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

export const BookService = {
  createNewBook,
  getAllBook,
  getAllBookById,
  updateBook,
  deleteBook,
};
