import { type ITokenOptions } from '../interfaces';

const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE ?? '3', 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE ?? '7', 10);

export const accessTokenOptions: ITokenOptions = {
  // Get unix milliseconds at current time plus number of days
  // 1000 is milliseconds in each second
  expires: new Date(Date.now() + accessTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'prod' ? true : undefined // secure=true <=> production
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
};
