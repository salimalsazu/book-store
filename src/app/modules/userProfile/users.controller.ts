import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserProfileService } from './users.service';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { IMyProfile } from './users.interface';

// const getUsersProfile = catchAsync(async (req: Request, res: Response) => {
//   const userData = jwtHelpers.verifyToken(
//     req.headers.authorization as string,
//     config.jwt.secret as Secret
//   );
//   console.log(userData);

//   const result = await UserProfileService.getUsersProfile(userData);

//   sendResponse<IMyProfile>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Users information retrieved successfully',
//     data: result,
//   });
// });

const getUsersProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers?.authorization;
  const result = await UserProfileService.getUsersProfile(token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved in successfully!',
    data: result,
  });
});

export const UserProfileController = {
  getUsersProfile,
};
