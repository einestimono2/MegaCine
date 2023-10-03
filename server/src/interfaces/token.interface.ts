export interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean;
}

export interface IActivationToken {
  activationToken: string;
  otp: string;
}

export interface IResetPasswordToken {
  resetPasswordToken: string;
  otp: string;
}
