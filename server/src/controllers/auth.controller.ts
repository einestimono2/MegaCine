import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { userServices } from '../services';
import { type IActivationToken, type IUserLoginRequest } from '../interfaces';
import { CatchAsyncError } from '../middlewares';
import { sendToken, ErrorHandler } from '../utils';
import { HttpStatusCode, Message } from '../constants';
import { redis } from '../config/redis';

//! Đăng ký tài khoản
export const register = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  // Email đã tồn tại
  const isEmailExist = await userServices.findUserByEmail(req.body.email);
  if (isEmailExist) {
    next(new ErrorHandler(Message.EMAIL_ALREADY_EXIST, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  // Tạo user
  const user = await userServices.createUser({ ...req.body });

  // Send OTP
  const { activationToken, otp } = await userServices.sendActivationOTP({
    name: user.name,
    email: user.email,
    id: user._id,
    subject: res.translate(Message.ACTIVATION_EMAIL_SUBJECT),
    template: res.translate(Message.ACTIVATION_EMAIL_TEMPLATE)
  });

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    message: res.translate(Message.REGISTER_CHECK_EMAIL_NOTIFICATION_s, user.email),
    data: { activationToken, otp }
  });
});

//! Kích hoạt tài khoản
export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { activationToken, otp } = req.body as IActivationToken;

  const payload = jwt.verify(activationToken, process.env.ACTIVATION_TOKEN_SECRET as string) as {
    id: string;
    otp: string;
  };

  if (payload.otp !== otp) {
    next(new ErrorHandler(Message.INVALID_OTP_CODE, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const user = await userServices.findUserById(payload.id);
  if (!user) {
    next(new ErrorHandler(Message.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  if (user.isVerified) {
    next(new ErrorHandler(Message.ACCOUNT_ACTIVATED, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  user.isVerified = true;
  await user.save();

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    message: res.translate(Message.EMAIL_ACTIVATION_SUCCESSFUL)
  });
});

export const resendActivationToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.findUserByEmail(req.body.email);
  if (!user) {
    next(new ErrorHandler(Message.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  if (user.isVerified) {
    next(new ErrorHandler(Message.ACCOUNT_ACTIVATED, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  // Send OTP
  const { activationToken, otp } = await userServices.sendActivationOTP({
    name: user.name,
    email: user.email,
    id: user._id,
    subject: res.translate(Message.ACTIVATION_EMAIL_SUBJECT),
    template: res.translate(Message.ACTIVATION_EMAIL_TEMPLATE)
  });

  res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    message: res.translate(Message.REGISTER_CHECK_EMAIL_NOTIFICATION_s, user.email),
    data: { activationToken, otp }
  });
});

//! Login
export const login = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as IUserLoginRequest;
  if (!email || !password) {
    next(new ErrorHandler(Message.EMAIL_OR_PASSWORD_EMPTY, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const user = await userServices.findUserByEmail(email, true);
  if (!user) {
    next(new ErrorHandler(Message.WRONG_EMAIL, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  // Chưa xác nhận OTP
  if (!user.isVerified) {
    next(new ErrorHandler(Message.ACCOUNT_NOT_ACTIVATED, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    next(new ErrorHandler(Message.WRONG_PASSWORD, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  await sendToken(user, HttpStatusCode.OK_200, res);
});

//! Social Auth
export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.findUserByEmail(req.body.email);

  if (!user) {
    const newUser = await userServices.createUser({ ...req.body, isVerified: true });
    await sendToken(newUser, HttpStatusCode.OK_200, res);
  } else {
    await sendToken(user, HttpStatusCode.OK_200, res);
  }
});

//! Logout
export const logout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  // res.clearCookie(ACCESS_TOKEN);
  // res.clearCookie(REFRESH_TOKEN);

  const userId = req.userPayload?.id;
  const accessToken = req.accessToken;

  if (userId && accessToken) {
    await redis.del(userId);

    // blacklist current access token
    await redis.set(`BL_${userId}`, accessToken);

    res.status(HttpStatusCode.OK_200).json({
      status: 'success',
      message: res.translate(Message.LOGGED_OUT_SUCCESSFULLY)
    });
  }
});

//! Update Access Token
export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  // blacklist current access token
  if (req.accessToken) await redis.set(`BL_${req.userPayload?.id}`, req.accessToken);

  const accessToken = jwt.sign({ id: req.userPayload?.id }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE
  });
  const refreshToken = req.body.refreshToken;
  // Giữ nguyên refreshToken nếu không thì không bao giờ phải đăng nhập lại
  // const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET as string, {
  //   expiresIn: process.env.REFRESH_TOKEN_EXPIRE
  // });

  // Cập nhật lại token lên redis
  await redis.set(req.userPayload?.userId ?? '', JSON.stringify({ accessToken, refreshToken }));

  return res.status(HttpStatusCode.OK_200).json({
    status: 'success',
    data: {
      accessToken
    }
  });
});

//! Forgot password
export const forgotPassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.findUserByEmail(req.body.email);
  if (!user) {
    next(new ErrorHandler(Message.USER_NOT_FOUND, 400));
    return;
  }

  if (!user.isVerified) {
    next(new ErrorHandler(Message.ACCOUNT_NOT_ACTIVATED, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const { resetPasswordToken, otp } = await userServices.sendResetPasswordOTP({
    name: user.name,
    email: user.email,
    id: user._id,
    subject: res.translate(Message.RESET_PASSWORD_EMAIL_SUBJECT),
    template: res.translate(Message.RESET_PASSWORD_EMAIL_TEMPLATE)
  });

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    message: res.translate(Message.RESET_PASSWORD_CHECK_EMAIL_NOTIFICATION_s, user.email),
    data: { resetPasswordToken, otp }
  });
});

//! Reset password
export const resetPassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { resetPasswordToken, otp, newPassword } = req.body;

  if (!newPassword || !otp || !resetPasswordToken) {
    next(new ErrorHandler(Message.FIELDS_EMPTY, 400));
    return;
  }

  const payload = jwt.verify(resetPasswordToken, process.env.RESET_PASSWORD_TOKEN_SECRET as string) as {
    id: string;
    otp: string;
  };

  if (payload.otp !== otp) {
    next(new ErrorHandler(Message.INVALID_OTP_CODE, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  const user = await userServices.findUserById(payload.id, true);
  if (!user) {
    next(new ErrorHandler(Message.USER_NOT_FOUND, HttpStatusCode.BAD_REQUEST_400));
    return;
  }

  user.password = newPassword;
  await user.save();

  res.status(HttpStatusCode.CREATED_201).json({
    status: 'success',
    message: res.translate(Message.PASSWORD_RESET_SUCCESSFUL)
  });
});
