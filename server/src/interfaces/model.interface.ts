import { type Document } from 'mongoose';

export interface ICloudinaryFile {
  public_id: string;
  url: string;
}

export interface ILocalizationField {
  en: string;
  vi: string;
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
  theater?: string | ITheater; // type: mongoose.Schema.Types.ObjectId, ref: 'Theater'
  comparePassword: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
  signRefreshToken: () => string;
}

export interface IGenre extends Document {
  name: ILocalizationField;
}

export interface IReview extends Document {
  user: string | IUser;
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
  description: ILocalizationField;
  hotline: string;
  logo: ICloudinaryFile;
  images: ICloudinaryFile[];
  isActive: boolean;
  totalFavorites: number;
  ratingAverage: number;
  ratingCount: number;
  reviews: Array<string | IReview>; // type: mongoose.Schema.Types.ObjectId, ref: 'Review'
}

export interface IFare extends Document {
  theater: string | ITheater;
  normalDay: string;
  weekend: string;
  specialDay: string;
  description: ILocalizationField;
  u22: number;
  _2d: Array<{
    from: string;
    to: string;
    seat: Array<{
      type: string;
      normalDayPrice: number;
      specialDayPrice: number;
    }>;
  }>;
  _3d: Array<{
    from: string;
    to: string;
    seat: Array<{
      type: string;
      normalDayPrice: number;
      specialDayPrice: number;
    }>;
  }>;
  surcharge: Array<{ name: string; value: number }>;
}

export interface IMovie extends Document {
  title: string;
  originalTitle: string;
  trailer: string;
  poster: ICloudinaryFile;
  overview: ILocalizationField;
  duration: number;
  releaseDate: Date;
  formats: string[];
  directors: Array<string | IPerson>;
  actors: Array<string | IPerson>;
  languages: string[];
  ageType: string;
  genres: Array<string | IGenre>;
  totalRate: number;
  isActive: boolean;
  totalFavorites: number;
  ratingAverage: number;
  ratingCount: number;
  reviews: Array<string | IReview>;
}

export interface IPerson extends Document {
  avatar: ICloudinaryFile;
  fullName: string;
  summary: ILocalizationField;
  movies: Array<string | IMovie>;
}

export interface IProduct extends Document {
  name: string;
  description: ILocalizationField;
  price: number;
  image: ICloudinaryFile;
  isActive: boolean;
  theater: string | ITheater;
}

export interface IRoom extends Document {
  theater: string | ITheater;
  type: string;
  name: string;
  capacity: number;
  seats: ISeat[];
  isActive: boolean;
  // seats: Array<string | ISeat>;
}

export interface ISeat extends Document {
  row: string; // unique
  col: number; // unique
  coordinates: [number, number];
  type: string; // VIP, STANDARD, SWEET
  status: string; // Để frontend xử lý
}

// [startTime, room] --> unique --> không có 2 lịch chiếu nào cùng một phòng
export interface IShowtime extends Document {
  movie: string | IMovie;
  theater: string | ITheater;
  room: string | IRoom;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  language: string;
  type: string; // Sneakshow (Suất chiếu sớm / Suất chiếu đặc biệt), Normal
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
  maxUse: number; // Số lượng tối đa
  useCount: number; // so luong đã sd
  minValue: number; // Giá trị min để có thể sử dụng
  userUsed: string[];
  isActive: boolean;
}

export interface IPromotion extends Document {
  // Thông tin
  title: string;
  description: string;
  thumbnail: ICloudinaryFile;
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

export interface IBooking extends Document {
  reservation: string | IReservation;

  products: Array<{
    quantity: number;
    items: string | IProduct;
  }>;

  user: string | null;
  email: string;
  phoneNumber: string;

  promotion: string;
  vourcher: string | IVoucher;

  totalPrice: number;
  finalPrice: number;

  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt: Date;

  qrcode: string;
}

export interface IReservation {
  user: string | null;
  showTime: string;
  theater: string;
  room: string;
  seat: Array<string | ISeat>;
  // status: string;
}
