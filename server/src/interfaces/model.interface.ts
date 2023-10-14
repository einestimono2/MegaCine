import { type Document } from 'mongoose';

export interface ICloudinaryFile {
  public_id: string;
  url: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar: ICloudinaryFile;
  role: string;
  isVerified: boolean;
  provider: string;
  comparePassword: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
  signRefreshToken: () => string;
}

export interface IManager extends Document {
  code: string;
  password: string;
  role: string;
  isVerified: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
  signRefreshToken: () => string;
}

export interface IGenre extends Document {
  name: {
    en: string;
    vi: string;
  };
}

export interface IReview extends Document {
  user: string;
  rating: number;
  messages: string;
  isActive: boolean;
}

export interface ITheater extends Document {
  name: string;
  address: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  email: string;
  description: string;
  hotline: string;
  thumbnail: ICloudinaryFile;
  cover: ICloudinaryFile;
  roomSummary: string; // 1 2D, 1 3D (1 phòng loại 2D và 1 phòng loại 3D)
  rooms: Array<{
    name: string; // tên phòng
    type: string; // loại 2D, 3D ...
  }>;
  isActive: boolean;
  totalFavorites: number;
  ratings: {
    average: number;
    count: number;
  };
  reviews: string[]; // type: mongoose.Schema.Types.ObjectId, ref: 'Review'
  manager: string; // type: mongoose.Schema.Types.ObjectId, ref: 'Manager'
}

export interface IMovie extends Document {
  title: string;
  originalTitle: string;
  trailer: ICloudinaryFile;
  poster: ICloudinaryFile;
  overview: string;
  duration: number;
  releaseDate: Date;
  directors: string[];
  actors: string[];
  language: string;
  ageType: string;
  genre: string[];
  totalRate: number;
  isActive: boolean;
  totalFavorites: number;
  ratings: {
    average: number;
    count: number;
  };
  reviews: string[];
}

export interface IPerson extends Document {
  avatar: ICloudinaryFile;
  fullName: string;
  summary: {
    en: string;
    vi: string;
  };
}

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  image: ICloudinaryFile;
  isActive: boolean;
  theater: string;
}

export interface ISeat extends Document {
  row: string;
  number: number;
  theatre: string;
  room: string;
  isActive: boolean;
}

export interface IShowTimes extends Document {
  movie: string;
  theater: string;
  room: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
}

export interface IVoucher extends Document {
  code: string;
  name: string;
  value: number;
  type: string; // Amount | Percentage
  startTime: Date;
  endTime: Date;
  showTime: string;
  theater: string;
  movie: string;
  creator: string;
  userUsed: string[];
  isActive: boolean;
}

export interface IPromotion extends Document {
  // Thông tin
  title: string;
  description: string;
  thumbnail: ICloudinaryFile;
  creator: string;
  // Phạm vi + Thời gian
  startTime: Date;
  endTime: Date;
  movie: string; // NULL - áp dụng all
  showTime: string;
  theater: string;
  // Giá trị giảm giá
  value: number;
  type: string; // Amount | Percentage
  // Trạng thái
  scope: string; // Áp dụng cho all | user
  userUsed: string[];
  isActive: boolean;
}

export interface ITicket extends Document {
  user: string | null;
  showTime: string;
  seat: string;
  product: string[];

  email: string;
  phoneNumber: string;

  totalPrice: number;
  finalPrice: number;
  promotion: string;
  vourcher: string;
  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt: Date;
}
