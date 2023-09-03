import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

//Category create
const createNewCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
    include: {
      books: true,
    },
  });
  return result;
};

//All Category
const getAllCategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  });
  return result;
};

//Single category
const getAllCategoryById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

//Update category
const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

//Delete a category
const deleteCategory = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  createNewCategory,
  getAllCategory,
  getAllCategoryById,
  updateCategory,
  deleteCategory,
};
