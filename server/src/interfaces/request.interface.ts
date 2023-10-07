import { type EmailProvider } from '../constants';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ISocialAuthRequest {
  email: string;
  name: string;
  avatar: string;
  provider: EmailProvider;
}

export interface IUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateProfileRequest {
  name?: string;
  phoneNumber?: string;
}

export interface IUpdatePersonRequest {
  fullName: string;
  summary?: string;
}

export interface IOTPRequest {
  id: string;
  name?: string;
  email: string;
  subject: string;
  template: string;
}
