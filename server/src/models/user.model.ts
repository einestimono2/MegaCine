import mongoose, { type Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { type IUser } from '../interfaces/model.interface';
import { Roles, EmailProvider } from '../constants/enum.constant';
import { DEFAULT_AVATAR_URL, EMAIL_REGEX_PATTERN } from './../constants/value.constant';
import { Message } from '../constants';

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, `'${Message.NAME_EMPTY}'`],
      maxLength: [50, `'${Message.NAME_TOO_LONG_s}', '50'`],
      minLength: [2, `'${Message.NAME_TOO_SHORT_s}', '2'`]
    },
    email: {
      type: String,
      index: true,
      required: [true, `'${Message.EMAIL_EMPTY}'`],
      validate: {
        validator: function (value: string) {
          return EMAIL_REGEX_PATTERN.test(value);
        },
        message: `'${Message.INVALID_EMAIL}'`
      },
      unique: true,
      trim: true
    },
    password: {
      type: String,
      select: false,
      minlength: [6, `'${Message.PASSWORD_TOO_SHORT_s}', '6'`],
      required: [
        function () {
          return this.provider === EmailProvider.Email;
        },
        `'${Message.PASSWORD_EMPTY}'`
      ]
    },
    avatar: {
      public_id: String,
      url: {
        type: String,
        default: DEFAULT_AVATAR_URL
      }
    },
    phoneNumber: String,
    role: {
      type: String,
      enum: {
        values: [Roles.SuperAdmin, Roles.User, Roles.Admin],
        message: `'${Message.INVALID_ROLE_s}', '{VALUE}'`
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
        values: [EmailProvider.Email, EmailProvider.Facebook, EmailProvider.Google],
        message: `'${Message.INVALID_LOGIN_METHOD}'`
      },
      default: EmailProvider.Email
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
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE
  });
};

userSchema.methods.signRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE
  });
};

export const UserModel = mongoose.model<IUser>('Users', userSchema);

/**
 * @swagger
 * components:
 *  schemas:
 *    Response:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        message:
 *          type: string
 *        data:
 *          type: object
 */
