// const enum: giữ nguyên các giá trị enum thay vì tạo một đối tượng enum riêng biệt
// can't index it by an arbitrary value

export const enum LoggerTypes {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error'
}

export enum Roles {
  Admin = 'ADMIN',
  User = 'USER',
  Manager = 'MANAGER'
}

export enum EmailProviders {
  Email = 'Email',
  Google = 'Google',
  Facebook = 'Facebook'
}

export enum LocationTypes {
  Point = 'Point'
}

export enum RoomTypes {
  '2D' = '2D',
  '3D' = '3D'
}

export enum MovieFormats {
  '2D' = '2D',
  '3D' = '3D'
}

export enum MovieLanguages {
  Subtitles = 'Subtitles',
  Dubbing = 'Dubbing'
}

export enum AgeTypes {
  P = 'P', // All
  K = 'K', // < 13 với điều kiện xem cùng cha, mẹ hoặc người giám hộ
  T13 = 'T13', // 13+
  T16 = 'T16', // 16+
  T18 = 'T18', // 18+,
  C = 'C' // Không được phép phổ biến
}

export enum SeatTypes {
  VIP = 'VIP',
  Standard = 'Standard',
  Sweetbox = 'Sweetbox'
}

export enum SeatStatus {
  Available = 'Available',
  Booked = 'Booked',
  Locked = 'Locked'
}

export enum SurchargeTypes {
  Sneakshow = 'Sneakshow', // Suất chiếu sớm/đặc biệt
  Blockbuster = 'Blockbuster' // Phim bom tấn
}

export enum ShowtimeTypes {
  Normal = 'Normal',
  Sneakshow = 'Sneakshow'
}

export enum DiscountTypes {
  Amount = 'Amount',
  Percentage = 'Percentage'
}
