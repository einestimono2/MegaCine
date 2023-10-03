export class ErrorHandler extends Error {
  statusCode: number;

  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Bắt stack-trace nơi xảy ra lỗi, Hiển thị chi tiết vị trí lỗi
    // https://stackoverflow.com/questions/63598211/how-to-use-error-capturestacktrace-in-node-js
    Error.captureStackTrace(this, this.constructor);
  }
}
