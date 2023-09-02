import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createNewBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getAllBook = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({});
  return result;
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

export const CategoryService = {
  createNewBook,
  getAllBook,
  getAllBookById,
  updateBook,
  deleteBook,
};
