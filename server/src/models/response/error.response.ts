import { HttpStatusCode } from '../../constants';

// https://github.com/trotrindonesia/custom-error-exceptions/tree/master/lib/errors

class ErrorResponse extends Error {
  statusCode: number;
  ec: number;

  constructor(message: any, statusCode: number, ec: number) {
    super(message);
    this.statusCode = statusCode;
    this.ec = ec;

    // Bắt stack-trace nơi xảy ra lỗi, Hiển thị chi tiết vị trí lỗi
    // https://stackoverflow.com/questions/63598211/how-to-use-error-capturestacktrace-in-node-js
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.BAD_REQUEST_400,
    ec = message.ec ?? HttpStatusCode.BAD_REQUEST_400
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class ConflictError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.CONFLICT_409,
    ec = message.ec ?? HttpStatusCode.CONFLICT_409
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.FORBIDDEN_403,
    ec = message.ec ?? HttpStatusCode.FORBIDDEN_403
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class GatewayTimeoutError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.GATEWAY_TIMEOUT_504,
    ec = message.ec ?? HttpStatusCode.GATEWAY_TIMEOUT_504
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class GoneError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.GONE_410,
    ec = message.ec ?? message.ec ?? HttpStatusCode.GONE_410
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class InternalServerError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR_500,
    ec = message.ec ?? HttpStatusCode.INTERNAL_SERVER_ERROR_500
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.NOT_FOUND_404,
    ec = message.ec ?? HttpStatusCode.NOT_FOUND_404
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class RequestTimeoutError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.REQUEST_TIMEOUT_408,
    ec = message.ec ?? HttpStatusCode.REQUEST_TIMEOUT_408
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class TooManyRequestsError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.TOO_MANY_REQUESTS_429,
    ec = message.ec ?? HttpStatusCode.TOO_MANY_REQUESTS_429
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.UNAUTHORIZED_401,
    ec = message.ec ?? HttpStatusCode.UNAUTHORIZED_401
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class UnsupportedMediaTypeError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.UNSUPPORTED_MEDIA_TYPE_415,
    ec = message.ec ?? HttpStatusCode.UNSUPPORTED_MEDIA_TYPE_415
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class MethodNotAllowedError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.METHOD_NOT_ALLOWED_405,
    ec = message.ec ?? HttpStatusCode.METHOD_NOT_ALLOWED_405
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}

export class UnprocessableEntityError extends ErrorResponse {
  constructor(
    message: any,
    statusCode = HttpStatusCode.UNPROCESSABLE_ENTITY_422,
    ec = message.ec ?? HttpStatusCode.UNPROCESSABLE_ENTITY_422
  ) {
    super(typeof message === 'string' ? message : message.msg, statusCode, ec);
  }
}
