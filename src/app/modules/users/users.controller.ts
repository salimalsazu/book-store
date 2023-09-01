import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './users.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

const getAllUsersById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getAllUsersById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User fetched successfully',
    data: result,
  });
});

const updateUsers = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUsers(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getAllUsersById,
  updateUsers,
};
