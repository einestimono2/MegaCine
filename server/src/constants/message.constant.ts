export const Message = {
  // Not found
  ROUTE_s_NOT_FOUND: {
    msg: 'Route %s not found'
  },
  RESOURCE_NOT_FOUND_INVALID_s: {
    msg: 'Resource not found. Invalid %s'
  },
  USER_NOT_FOUND: {
    ec: 1000,
    msg: 'User Not Found'
  },
  MOVIE_NOT_FOUND: {
    msg: 'Movie Not Found'
  },
  PERSON_NOT_FOUND: {
    msg: 'Person Not Found'
  },
  PRODUCT_NOT_FOUND: {
    msg: 'Product Not Found'
  },
  FARE_NOT_FOUND: {
    msg: 'Fare Not Found'
  },
  PROMOTION_NOT_FOUND: {
    msg: 'Promotion Not Found'
  },
  REVIEW_NOT_FOUND: {
    msg: 'Review Not Found'
  },
  ROOM_NOT_FOUND: {
    msg: 'Room Not Found'
  },
  SHOWTIME_NOT_FOUND: {
    msg: 'Showtime Not Found'
  },
  THEATER_NOT_FOUND: {
    msg: 'Theater Not Found'
  },
  GENRE_NOT_FOUND: {
    msg: 'Genre Not Found'
  },
  FILE_NOT_FOUND: {
    ec: 3000,
    msg: 'File not found'
  },
  BOOKING_NOT_FOUND: {
    msg: 'Booking Not Found'
  },

  // Invalid
  TOKEN_IS_INVALID_TRY_AGAIN: {
    msg: 'Token is invalid, Try again'
  },
  TOKEN_IS_INVALID: {
    ec: 420,
    msg: 'Token is invalid'
  },
  INVALID_EMAIL: {
    msg: 'Invalid email'
  },
  INVALID_ROLE_s: {
    ec: 400,
    msg: 'Invalid role %s'
  },
  INVALID_AGE_TYPE_s: {
    msg: 'Invalid age type %s'
  },
  INVALID_COORDINATE_TYPE_s: {
    msg: 'Invalid coordinate type %s'
  },
  INVALID_ROOM_TYPE_s: {
    msg: 'Invalid room type %s'
  },
  INVALID_SEAT_TYPE_s: {
    msg: 'Invalid seat type %s'
  },
  INVALID_MOVIE_FORMAT_s: {
    msg: 'Invalid movie format %s'
  },
  INVALID_MOVIE_LANGUAGE_s: {
    msg: 'Invalid movie language %s'
  },
  INVALID_SHOWTIME_TYPE_s: {
    msg: 'Invalid showtime type %s'
  },
  INVALID_PROMOTION_TYPE_s: {
    msg: 'Invalid promotion type %s'
  },
  INVALID_PAYMENT_METHOD_s: {
    msg: 'Invalid payment method %s'
  },
  INVALID_MOVIE_RATING: {
    msg: 'Invalid movie rating'
  },
  INVALID_THEATER_RATING: {
    msg: 'Invalid theater rating'
  },
  INVALID_LOGIN_METHOD: {
    msg: 'Invalid login method'
  },
  INVALID_OTP_CODE: {
    msg: 'Invalid OTP Code'
  },
  INVALID_COORDINATES: {
    msg: 'Coordinates are not valid'
  },
  INVALID_ROOM_SEATS_COORDINATES: {
    msg: 'Invalid Room Seats Coordinates'
  },
  INVALID_ROOM_SEATS_ROW_COL: {
    msg: 'Invalid Room Seats Row Col'
  },
  INVALID_SHOWTIME_ENDTIME: {
    msg: 'Invalid Showtime endTime'
  },
  INVALID_SHOWTIME_STARTTIME: {
    msg: 'Invalid Showtime startTime'
  },
  INVALID_SHOWTIME_ROOM_TYPE: {
    msg: 'Invalid Showtime room type'
  },
  INVALID_SHOWTIME_LANGUAGES: {
    msg: 'Invalid Showtime languages'
  },

  // Exist
  s_ALREADY_EXISTS: {
    msg: '%s already exists'
  },
  EMAIL_ALREADY_EXIST: {
    msg: 'Email already exist'
  },
  CODE_ALREADY_EXIST: {
    msg: 'Code already exist'
  },
  SHOWTIME_ALREADY_EXIST: {
    msg: 'Showtime already exist'
  },
  PROMOTION_CODE_EXIST: {
    msg: 'Promotion code already exist'
  },

  // Expire
  TOKEN_IS_EXPIRED_TRY_AGAIN: {
    ec: 419,
    msg: 'Token is expired, Try again'
  },
  SESSION_EXPIRED: {
    msg: 'Session Expired'
  },

  // Empty
  EMAIL_EMPTY: {
    msg: 'Email empty'
  },
  NAME_EMPTY: {
    msg: 'Name empty'
  },
  FIELD_s_EMPTY: {
    msg: 'Field %s empty'
  },
  PASSWORD_EMPTY: {
    msg: 'Password empty'
  },
  EMAIL_OR_PASSWORD_EMPTY: {
    msg: 'Email Or Password Empty'
  },
  OLD_OR_NEW_PASSWORD_EMPTY: {
    msg: 'Old Or New Password Empty'
  },
  BEARER_TOKEN_EMPTY: {
    msg: 'Bearer Token Empty'
  },
  AVATAR_EMPTY: {
    msg: 'Avatar Empty'
  },
  FIELDS_EMPTY: {
    msg: 'Fields Empty'
  },
  MANAGER_THEATER_EMPTY: {
    msg: 'Manager Theater Empty'
  },
  FILE_EMPTY: {
    msg: 'File empty'
  },

  // Length
  NAME_TOO_SHORT_s: {
    msg: 'Name too short %s'
  },
  NAME_TOO_LONG_s: {
    msg: 'Name too long %s'
  },
  PASSWORD_TOO_SHORT_s: {
    msg: 'Password too short %s'
  },

  // Template
  ACTIVATION_EMAIL_SUBJECT: {
    msg: 'Activation Email Subject'
  },
  ACTIVATION_EMAIL_TEMPLATE: {
    msg: 'Activation Email Template'
  },
  RESET_PASSWORD_EMAIL_SUBJECT: {
    msg: 'Reset Password Email Subject'
  },
  RESET_PASSWORD_EMAIL_TEMPLATE: {
    msg: 'Reset Password Email Template'
  },

  // Notification
  REGISTER_CHECK_EMAIL_NOTIFICATION_s: {
    msg: 'Check email notification %s to verify account'
  },
  WAIT_FOR_REGISTRATION_APPROVAL: {
    msg: 'Wait for registration approval'
  },
  RESET_PASSWORD_CHECK_EMAIL_NOTIFICATION_s: {
    msg: 'Check email notification %s to reset password'
  },
  EMAIL_ACTIVATION_SUCCESSFUL: {
    msg: 'Email Activation Successful'
  },
  ACCOUNT_ACTIVATION_SUCCESSFUL: {
    msg: 'Account Activation Successful'
  },
  PASSWORD_RESET_SUCCESSFUL: {
    msg: 'Password Reset Successful'
  },
  LOGGED_OUT_SUCCESSFULLY: {
    msg: 'Logged Out Successfully'
  },
  MANAGER_OWNED_THEATER: {
    msg: 'Manager owned theater'
  },

  // Wrong
  WRONG_EMAIL: {
    msg: 'Wrong Email'
  },
  WRONG_PASSWORD: {
    msg: 'Wrong Password'
  },
  WRONG_OLD_PASSWORD: {
    msg: 'Wrong Old Password'
  },
  PASSWORD_DOES_NOT_MATCH: {
    msg: 'Password does not match'
  },

  // Unsupported
  UNSUPPORTED_IMAGE_FORMAT: {
    msg: 'Unsupported Image Format'
  },
  UNSUPPORTED_VIDEO_FORMAT: {
    msg: 'Unsupported Video Format'
  },

  // Error | Fail
  INTERNAL_SERVER_ERROR: {
    msg: 'Internal Server Error'
  },
  UPLOAD_FAILED: {
    msg: 'Upload Failed'
  },
  REDIS_CONNECTION_FAIL: {
    msg: 'Redis connection fail'
  },
  ACCOUNT_NOT_ACTIVATED: {
    msg: 'Account Not Activated'
  },
  ACCOUNT_ACTIVATED: {
    msg: 'Account Activated'
  },
  INSUFFICIENT_ACCESS_RIGHTS: {
    msg: 'Insufficient Access Rights'
  }
};
