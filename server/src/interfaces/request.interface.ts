import { type EmailProviders } from '../constants';

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IManagerLoginRequest {
  code: string;
  password: string;
}

export interface ISocialAuthRequest {
  email: string;
  name: string;
  avatar: string;
  provider: EmailProviders;
}

export interface IUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateProfileRequest {
  name?: string;
  phoneNumber?: string;
  avatar?: string;
}

export interface IUpdatePersonRequest {
  fullName: string;
  summary?: string;
  avatar?: string;
}

export interface IUpdateMovieRequest {
  title?: string;
  originalTitle?: string;
  trailer?: string;
  poster?: string;
  overview?: string;
  duration?: number;
  releaseDate?: Date;
  directors?: string;
  actors?: string;
  language?: string;
  ageType?: string;
  genres?: string;
}

export interface IUpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  isActive?: boolean;
}

export interface IOTPRequest {
  id: string;
  name?: string;
  email: string;
  subject: string;
  template: string;
}
