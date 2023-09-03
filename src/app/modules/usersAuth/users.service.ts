import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IUserLogin, IUserLoginResponse, IUserReturn } from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';

//sign up
const createNewUser = async (data: User): Promise<IUserReturn> => {
  const { password, ...newUserData } = data;

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await prisma.user.create({
    data: {
      password: hashedPassword,
      ...newUserData,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

//login
const userLogin = async (
  loginData: IUserLogin
): Promise<IUserLoginResponse | null> => {
  const { email, password } = loginData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found !!');
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist?.password);

  if (isUserExist && !isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect !!');
  }

  const { id: userId, role } = isUserExist;

  // create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    {
      role,
      userId,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const UserAuthService = {
  createNewUser,
  userLogin,
};
