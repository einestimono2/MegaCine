import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { userServices } from '../services';
import { type IActivationToken, type IUserLoginRequest } from '../interfaces';
import { CatchAsyncError } from '../middlewares';
import { sendToken } from '../utils';
import { HttpStatusCode, Message } from '../constants';
import { redis } from '../config/redis';
import { BadRequestError, ForbiddenError } from '../models';

//! Đăng ký tài khoản
export const register = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  // Tạo user
  const user = await userServices.createUser({ ...req.body });

  // Send OTP
  const { activationToken, otp } = await userServices.sendActivationOTP({
    name: user.name,
    email: user.email,
    id: user._id,
    subject: res.translate(Message.ACTIVATION_EMAIL_SUBJECT.msg),
    template: res.translate(Message.ACTIVATION_EMAIL_TEMPLATE.msg)
  });

  res.sendCREATED({
    message: res.translate(Message.REGISTER_CHECK_EMAIL_NOTIFICATION_s.msg, user.email),
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
    next(new BadRequestError(Message.INVALID_OTP_CODE));
    return;
  }

  const user = await userServices.getUserById(payload.id);

  if (user.isVerified) {
    next(new BadRequestError(Message.ACCOUNT_ACTIVATED));
    return;
  }

  user.isVerified = true;
  await user.save();

  res.sendCREATED({
    message: res.translate(Message.EMAIL_ACTIVATION_SUCCESSFUL.msg)
  });
});

export const resendActivationToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.getUserByEmail(req.body.email);

  if (user.isVerified) {
    next(new BadRequestError(Message.ACCOUNT_ACTIVATED));
    return;
  }

  // Send OTP
  const { activationToken, otp } = await userServices.sendActivationOTP({
    name: user.name,
    email: user.email,
    id: user._id,
    subject: res.translate(Message.ACTIVATION_EMAIL_SUBJECT.msg),
    template: res.translate(Message.ACTIVATION_EMAIL_TEMPLATE.msg)
  });

  res.sendOK({
    message: res.translate(Message.REGISTER_CHECK_EMAIL_NOTIFICATION_s.msg, user.email),
    data: { activationToken, otp }
  });
});

//! Login
export const login = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as IUserLoginRequest;
  if (!email || !password) {
    next(new BadRequestError(Message.EMAIL_OR_PASSWORD_EMPTY));
    return;
  }

  const user = await userServices.getUserByEmail(email, true);

  // Chưa xác nhận OTP
  if (!user.isVerified) {
    next(new BadRequestError(Message.ACCOUNT_NOT_ACTIVATED));
    return;
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    next(new BadRequestError(Message.WRONG_PASSWORD));
    return;
  }

  if (user.isBlocked) {
    next(new ForbiddenError(Message.ACCOUNT_BLOCKED));
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
    if (user.isBlocked) {
      next(new ForbiddenError(Message.ACCOUNT_BLOCKED));
      return;
    }

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
  }

  res.sendOK({
    message: res.translate(Message.LOGGED_OUT_SUCCESSFULLY.msg)
  });
});

//! Update Access Token
export const updateAccessToken = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  // blacklist current access token
  if (req.accessToken) await redis.set(`BL_${req.userPayload?.id}`, req.accessToken);

  const accessToken = jwt.sign(
    { id: req.userPayload?.id, role: req.userPayload?.role },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    }
  );
  const refreshToken = req.body.refreshToken;
  // Giữ nguyên refreshToken nếu không thì không bao giờ phải đăng nhập lại
  // const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET as string, {
  //   expiresIn: process.env.REFRESH_TOKEN_EXPIRE
  // });

  // Cập nhật lại token lên redis
  await redis.set(req.userPayload?.userId ?? '', JSON.stringify({ accessToken, refreshToken }));

  res.sendOK({
    data: {
      accessToken
    }
  });
});

//! Forgot password
export const forgotPassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userServices.getUserByEmail(req.body.email);

  if (!user.isVerified) {
    next(new BadRequestError(Message.ACCOUNT_NOT_ACTIVATED));
    return;
  }

  if (user.isBlocked) {
    next(new ForbiddenError(Message.ACCOUNT_BLOCKED));
    return;
  }

  const { resetPasswordToken, otp } = await userServices.sendResetPasswordOTP({
    name: user.name,
    email: user.email,
    id: user._id,
    subject: res.translate(Message.RESET_PASSWORD_EMAIL_SUBJECT.msg),
    template: res.translate(Message.RESET_PASSWORD_EMAIL_TEMPLATE.msg)
  });

  res.sendCREATED({
    message: res.translate(Message.RESET_PASSWORD_CHECK_EMAIL_NOTIFICATION_s.msg, user.email),
    data: { resetPasswordToken, otp }
  });
});

//! Reset password
export const resetPassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { resetPasswordToken, otp, newPassword } = req.body;

  if (!newPassword || !otp || !resetPasswordToken) {
    next(new BadRequestError(Message.FIELDS_EMPTY));
    return;
  }

  const payload = jwt.verify(resetPasswordToken, process.env.RESET_PASSWORD_TOKEN_SECRET as string) as {
    id: string;
    otp: string;
  };

  if (payload.otp !== otp) {
    next(new BadRequestError(Message.INVALID_OTP_CODE));
    return;
  }

  const user = await userServices.getUserById(payload.id, true);

  user.password = newPassword;
  await user.save();

  res.sendCREATED({
    message: res.translate(Message.PASSWORD_RESET_SUCCESSFUL.msg)
  });
});
