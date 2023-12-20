import jwt, { type Secret } from 'jsonwebtoken';

import {
  type IActivationToken,
  type IUser,
  type IOTPRequest,
  type IResetPasswordToken,
  type IUpdateProfileRequest
} from '../interfaces';
import { BadRequestError, NotFoundError, UserModel } from '../models';
import logger, { SendMail, omitIsNil } from '../utils';
import { AVATAR_UPLOAD_FOLDER, Message } from '../constants';
import { cloudinaryServices } from '.';

export const createUser = async (user: IUser) => {
  const isEmailExist = await findUserByEmail(user.email);
  if (isEmailExist) {
    throw new BadRequestError(Message.EMAIL_ALREADY_EXIST);
  }

  const newUser = new UserModel(user);

  return await newUser.save();
};

export const findUserByEmail = async (email: string, password: boolean = false) => {
  return await UserModel.findOne({ email }).select(password ? '+password' : '-password');
};

export const getUserByEmail = async (email: string, password: boolean = false) => {
  const user = await UserModel.findOne({ email }).select(password ? '+password' : '-password');
  if (!user) {
    throw new NotFoundError(Message.EMAIL_ALREADY_EXIST);
  }

  return user;
};

export const getUserById = async (id: string, password: boolean = false) => {
  const user = await UserModel.findById(id).select(password ? '+password' : '-password');
  if (!user) {
    throw new NotFoundError(Message.EMAIL_ALREADY_EXIST);
  }

  return user;
};

export const getUser = async (filters: any, password: boolean = false) => {
  const user = await UserModel.findOne(omitIsNil(filters)).select(password ? '+password' : '-password');
  if (!user) {
    throw new NotFoundError(Message.EMAIL_ALREADY_EXIST);
  }

  return user;
};

export const updateProfile = async (id: string, newProfile: IUpdateProfileRequest) => {
  // Xóa ảnh mới khỏi obj nếu có
  const avatar = newProfile.avatar;
  if (avatar) delete newProfile.avatar;

  const user = await getUserById(id);

  Object.assign(user, newProfile);
  await user.validate();

  if (avatar) {
    user.avatar = await cloudinaryServices.uploadImage({
      public_id: user._id,
      file: avatar,
      folder: AVATAR_UPLOAD_FOLDER
    });
  }

  return await user.save();
};

export const sendActivationOTP = async (payload: IOTPRequest): Promise<IActivationToken> => {
  const { activationToken, otp } = createActivationToken(payload.id);
  const createdAt = new Date(Date.now()).toLocaleString();
  const expiredTime = (process.env.ACTIVATION_TOKEN_EXPIRE ?? '5m').replace(/[^0-9]/g, '');
  const data = { user: { name: payload.name ?? payload.email, email: payload.email }, otp, createdAt, expiredTime };

  await SendMail({
    email: payload.email,
    subject: payload.subject,
    template: payload.template,
    data
  });

  return { activationToken, otp };
};

export const sendResetPasswordOTP = async (payload: IOTPRequest): Promise<IResetPasswordToken> => {
  const { resetPasswordToken, otp } = createResetPasswordToken(payload.id);
  const createdAt = new Date(Date.now()).toLocaleString();
  const expiredTime = (process.env.RESET_PASSWORD_TOKEN_EXPIRE ?? '5m').replace(/[^0-9]/g, '');
  const data = { user: { name: payload.name ?? payload.email, email: payload.email }, otp, createdAt, expiredTime };

  await SendMail({
    email: payload.email,
    subject: payload.subject,
    template: payload.template,
    data
  });

  return { resetPasswordToken, otp };
};

// METHODs

const createActivationToken = (id: string): IActivationToken => {
  // OTP verification - 6 digits
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  logger.debug(`OTP: ${otp}`);

  const activationToken = jwt.sign({ id, otp }, process.env.ACTIVATION_TOKEN_SECRET as Secret, {
    expiresIn: process.env.ACTIVATION_TOKEN_EXPIRE
  });

  return { activationToken, otp };
};

const createResetPasswordToken = (id: string): IResetPasswordToken => {
  // OTP verification - 6 digits
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  logger.debug(`OTP: ${otp}`);

  const resetPasswordToken = jwt.sign({ id, otp }, process.env.RESET_PASSWORD_TOKEN_SECRET as Secret, {
    expiresIn: process.env.RESET_PASSWORD_TOKEN_EXPIRE
  });

  return { resetPasswordToken, otp };
};
