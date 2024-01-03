import mongoose, { type Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { type IManager } from '../interfaces/model.interface';
import { Roles } from '../constants/enum.constant';
import { Message } from '../constants';
import { theaterServices } from '../services';

const managerSchema: Schema<IManager> = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      trim: true,
      required: [true, `'${Message.FIELD_s_EMPTY.msg}', 'code'`]
    },
    password: {
      type: String,
      select: false,
      required: [true, `'${Message.PASSWORD_EMPTY.msg}'`]
    },
    role: {
      type: String,
      enum: {
        values: Object.values(Roles),
        message: `'${Message.INVALID_ROLE_s.msg}', '{VALUE}'`
      },
      default: Roles.Manager
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater'
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

// Middleware khi gọi findByIdAndDelete
managerSchema.post('findOneAndDelete', async function (doc) {
  if (doc?.theater) {
    await theaterServices.deleteTheater(doc.theater, doc._id);
  }
});

export const ManagerModel = mongoose.model<IManager>('Manager', managerSchema);
