import prisma from '../../../shared/prisma';
import { IMyProfile } from './users.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

// const getUsersProfile = async (
//   userData: JwtPayload
// ): Promise<IMyProfile | null> => {
//   const result = await prisma.user.findUnique({
//     where: {
//       id: userData.userId,
//     },
//   });
//   console.log('profile', result);

//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not Found !!');
//   }

//   return result;
// };

const getUsersProfile = async (token: string): Promise<IMyProfile | null> => {
  let decodedToken;
  try {
    decodedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = decodedToken;

  const result = await prisma.user.findUnique({
    where: {
      id: userId,
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

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not Found');
  }

  return result;
};

export const UserProfileService = {
  getUsersProfile,
};
