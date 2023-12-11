import mongoose, { type Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { type IUser } from '../interfaces';
import { DEFAULT_AVATAR_URL, EMAIL_REGEX_PATTERN, Message, Roles, EmailProviders } from '../constants';

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, `'${Message.NAME_EMPTY.msg}'`],
      maxLength: [50, `'${Message.NAME_TOO_LONG_s.msg}', '50'`],
      minLength: [2, `'${Message.NAME_TOO_SHORT_s.msg}', '2'`]
    },
    email: {
      type: String,
      index: true,
      required: [true, `'${Message.EMAIL_EMPTY.msg}'`],
      validate: {
        validator: function (value: string) {
          return EMAIL_REGEX_PATTERN.test(value);
        },
        message: `'${Message.INVALID_EMAIL.msg}'`
      },
      unique: true,
      trim: true
    },
    password: {
      type: String,
      select: false,
      minlength: [6, `'${Message.PASSWORD_TOO_SHORT_s.msg}', '6'`],
      required: [
        function () {
          return this.provider === EmailProviders.Email;
        },
        `'${Message.PASSWORD_EMPTY.msg}'`
      ]
    },
    avatar: {
      type: String,
      default: DEFAULT_AVATAR_URL
    },
    phoneNumber: String,
    role: {
      type: String,
      enum: {
        values: Object.values(Roles),
        message: `'${Message.INVALID_ROLE_s.msg}', '{VALUE}'`
      },
      default: Roles.User
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    provider: {
      type: String,
      enum: {
        values: Object.values(EmailProviders),
        message: `'${Message.INVALID_LOGIN_METHOD.msg}'`
      },
      default: EmailProviders.Email
    }
  },
  { timestamps: true, versionKey: false }
);

// Mã khóa mật khẩu
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (_password: string): Promise<boolean> {
  return await bcrypt.compare(_password, this.password);
};

userSchema.methods.signAccessToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE
  });
};

userSchema.methods.signRefreshToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE
  });
};

export const UserModel = mongoose.model<IUser>('User', userSchema);
