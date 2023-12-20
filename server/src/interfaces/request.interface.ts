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
  languages?: string;
  ageType?: string;
  formats?: string;
  genres?: string;
  isActive?: boolean;
}

export interface IUpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  isActive?: boolean;
}

export interface IUpdateTheaterRequest {
  name?: string;
  address?: string;
  location?: string;
  email?: string;
  description?: string;
  hotline?: string;
  logo?: string;
  images?: string[];
  isActive?: boolean;
  totalFavorites?: number;
  ratingAverage?: number;
  ratingCount?: number;
}

export interface IUpdateFareRequest {
  normalDay?: string;
  weekend?: string;
  specialDay?: string;
  description?: string;
  u22?: number;
  _2d?: Array<{
    from: string;
    to: string;
    seat: Array<{
      type: string;
      normalDayPrice: number;
      specialDayPrice: number;
    }>;
  }>;
  _3d?: Array<{
    from: string;
    to: string;
    seat: Array<{
      type: string;
      normalDayPrice: number;
      specialDayPrice: number;
    }>;
  }>;
  surcharge?: Array<{ name: string; value: number }>;
}

export interface IUpdateRoomRequest {
  type?: string;
  name?: string;
  capacity?: number;
  seats?: Array<{
    row: string;
    col: number;
    coordinates: [number, number];
    type?: string;
    status?: string;
  }>;
  isActive?: boolean;
}

export interface IUpdateShowtimeRequest {
  startTime?: Date;
  endTime?: Date;
  isActive?: boolean;
  type?: string;
  language?: string;
}

export interface IUpdatePromotionRequest {
  code?: string;
  title?: string;
  content?: string;
  thumbnail?: string;
  startTime?: Date;
  endTime?: Date;
  value?: number;
  type?: string;
  isActive?: boolean;
}

// export interface IUpdateBookingRequest {

// }

export interface IOTPRequest {
  id: string;
  name?: string;
  email: string;
  subject: string;
  template: string;
}
