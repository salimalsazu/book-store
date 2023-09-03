"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const users_service_1 = require("./users.service");
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
const getUsersProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const result = yield users_service_1.UserProfileService.getUsersProfile(token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Profile retrieved in successfully!',
        data: result,
    });
}));
exports.UserProfileController = {
    getUsersProfile,
};
