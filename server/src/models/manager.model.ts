import mongoose, { type Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { type IManager } from '../interfaces/model.interface';
import { Roles } from '../constants/enum.constant';
import { Message } from '../constants';

const managerSchema: Schema<IManager> = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      trim: true,
      required: [true, `'${Message.FIELD_s_EMPTY}', 'code'`]
    },
    password: {
      type: String,
      select: false,
      minlength: [6, `'${Message.PASSWORD_TOO_SHORT_s}', '6'`],
      required: [true, `'${Message.PASSWORD_EMPTY}'`]
    },
    role: {
      type: String,
      enum: {
        values: [Roles.Manager, Roles.Admin],
        message: `'${Message.INVALID_ROLE_s}', '{VALUE}'`
      },
      default: Roles.Manager
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
);

// Mã khóa mật khẩu
managerSchema.pre<IManager>('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
managerSchema.methods.comparePassword = async function (_password: string): Promise<boolean> {
  return await bcrypt.compare(_password, this.password);
};

managerSchema.methods.signAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, theater: this.theater },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    }
  );
};

managerSchema.methods.signRefreshToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, theater: this.theater },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    }
  );
};

export const ManagerModel = mongoose.model<IManager>('Manager', managerSchema);
