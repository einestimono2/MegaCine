import { type Response } from 'express';

import { type IManager, type IUser } from '../interfaces';
import { redis } from '../config';
// import { ACCESS_TOKEN, REFRESH_TOKEN, accessTokenOptions, refreshTokenOptions } from '../constants';

export const sendToken = async (user: IUser | IManager, statusCode: number, res: Response) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  //! Cookie - session
  // await redis.set(user._id, JSON.stringify(user));

  // return res
  //   .cookie(ACCESS_TOKEN, accessToken, accessTokenOptions)
  //   .cookie(REFRESH_TOKEN, refreshToken, refreshTokenOptions)
  //   .status(statusCode)
  //   .json({
  //     status: 'success',
  //     data: { user, accessToken }
  //   });

  //! Bearer Token
  await redis.set(user._id, JSON.stringify({ accessToken, refreshToken })); // Lưu refresh token và user lên redis

  return res.status(statusCode).json({
    status: 'success',
    data: {
      user,
      accessToken,
      refreshToken
    }
  });
};
