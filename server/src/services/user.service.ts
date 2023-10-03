import jwt, { type Secret } from 'jsonwebtoken';

import { type IActivationToken, type IUser, type IOTPRequest, type IResetPasswordToken } from '../interfaces';
import { UserModel } from '../models';
import logger, { SendMail, omitIsNil } from '../utils';

export const createUser = async (user: IUser) => {
  const newUser = new UserModel(user);

  return await newUser.save();
};

export const findUserByEmail = async (email: string, password: boolean = false) => {
  return await UserModel.findOne({ email }).select(password ? '+password' : '-password');
};

export const findUserById = async (id: string, password: boolean = false) => {
  return await UserModel.findById(id).select(password ? '+password' : '-password');
};

export const findUser = async (filters: any, password: boolean = false) => {
  return await UserModel.findOne(omitIsNil(filters)).select(password ? '+password' : '-password');
};

export const updateUser = async (data: any) => {
  const { userId, update } = data;
  const updatedUser = await UserModel.findOneAndUpdate({ id: userId }, update, {
    new: true
  });
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
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
