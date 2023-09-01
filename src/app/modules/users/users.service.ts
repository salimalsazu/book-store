import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUser = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({});

  return result;
};

const getAllUsersById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateUsers = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUser = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllUser,
  getAllUsersById,
  updateUsers,
  deleteUser,
};
