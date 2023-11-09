export const Message = {
  REDIS_CONNECTION_FAIL: {
    msg: 'Redis connection fail'
  },
  ROUTE_s_NOT_FOUND: {
    msg: 'Route %s not found'
  },
  RESOURCE_NOT_FOUND_INVALID_s: {
    msg: 'Resource not found. Invalid %s'
  },
  s_ALREADY_EXISTS: {
    msg: '%s already exists'
  },
  TOKEN_IS_INVALID_TRY_AGAIN: {
    msg: 'Token is invalid, Try again'
  },
  TOKEN_IS_INVALID: {
    ec: 420,
    msg: 'Token is invalid'
  },
  TOKEN_IS_EXPIRED_TRY_AGAIN: {
    ec: 419,
    msg: 'Token is expired, Try again'
  },
  EMAIL_ALREADY_EXIST: {
    msg: 'Email already exist'
  },
  CODE_ALREADY_EXIST: {
    msg: 'Code already exist'
  },
  EMAIL_EMPTY: {
    msg: 'Email empty'
  },
  INVALID_EMAIL: {
    msg: 'Invalid email'
  },
  NAME_EMPTY: {
    msg: 'Name empty'
  },
  FIELD_s_EMPTY: {
    msg: 'Field %s empty'
  },
  NAME_TOO_SHORT_s: {
    msg: 'Name too short %s'
  },
  NAME_TOO_LONG_s: {
    msg: 'Name too long %s'
  },
  PASSWORD_EMPTY: {
    msg: 'Password empty'
  },
  PASSWORD_TOO_SHORT_s: {
    msg: 'Password too short %s'
  },
  INVALID_ROLE_s: {
    ec: 400,
    msg: 'Invalid role %s'
  },
  INVALID_AGETYPE_s: {
    msg: 'Invalid age type %s'
  },
  INVALID_COORDINATE_TYPE_s: {
    msg: 'Invalid coordinate type %s'
  },
  INVALID_ROOM_TYPE_s: {
    msg: 'Invalid room type %s'
  },
  INVALID_MOVIE_TYPE_s: {
    msg: 'Invalid movie type %s'
  },
  INVALID_LOGIN_METHOD: {
    msg: 'Invalid login method'
  },
  REGISTER_CHECK_EMAIL_NOTIFICATION_s: {
    msg: 'Check email notification %s to verify account'
  },
  WAIT_FOR_REGISTRATION_APPROVAL: {
    msg: 'Wait for registration approval'
  },
  RESET_PASSWORD_CHECK_EMAIL_NOTIFICATION_s: {
    msg: 'Check email notification %s to reset password'
  },
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
  INVALID_OTP_CODE: {
    msg: 'Invalid OTP Code'
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
  EMAIL_OR_PASSWORD_EMPTY: {
    msg: 'Email Or Password Empty'
  },
  WRONG_EMAIL: {
    msg: 'Wrong Email'
  },
  WRONG_PASSWORD: {
    msg: 'Wrong Password'
  },
  LOGGED_OUT_SUCCESSFULLY: {
    msg: 'Logged Out Successfully'
  },
  SESSION_EXPIRED: {
    msg: 'Session Expired'
  },
  LOGIN_TO_ACCESS_RESOURCE: {
    msg: 'Login To Access Resource'
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
  THEATER_NOT_FOUND: {
    msg: 'Theater Not Found'
  },
  INSUFFICIENT_ACCESS_RIGHTS: {
    msg: 'Insufficient Access Rights'
  },
  INTERNAL_SERVER_ERROR: {
    msg: 'Internal Server Error'
  },
  WRONG_OLD_PASSWORD: {
    msg: 'Wrong Old Password'
  },
  PASSWORD_DOES_NOT_MATCH: {
    msg: 'Password does not match'
  },
  OLD_OR_NEW_PASSWORD_EMPTY: {
    msg: 'Old Or New Password Empty'
  },
  UNSUPPORTED_IMAGE_FORMAT: {
    msg: 'Unsupported Image Format'
  },
  UNSUPPORTED_VIDEO_FORMAT: {
    msg: 'Unsupported Video Format'
  },
  UPLOAD_FAILED: {
    msg: 'Upload Failed'
  },
  ACCOUNT_NOT_ACTIVATED: {
    msg: 'Account Not Activated'
  },
  ACCOUNT_ACTIVATED: {
    msg: 'Account Activated'
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
  GENRE_NOT_FOUND: {
    msg: 'Genre Not Found'
  },
  MANAGER_THEATER_EMPTY: {
    msg: 'Manager Theater Empty'
  },
  MANAGER_OWNED_THEATER: {
    msg: 'Manager owned theater'
  },
  INVALID_COORDINATES: {
    msg: 'Coordinates are not valid'
  },
  FILE_EMPTY: {
    msg: 'File empty'
  },
  FILE_NOT_FOUND: {
    ec: 3000,
    msg: 'File not found'
  }
};

/*
export const messages = {
  INVALID_PAYLOAD: {
    ec: 400,
    msg: 'Invalid payload'
  },
  YOU_ARE_NOT_ALLOWED: {
    ec: 403,
    msg: 'You are not allowed'
  },
  NOT_FOUND: {
    ec: 404,
    msg: 'API not found'
  },
  ACCESS_TOKEN_EXPIRED: {
    ec: 419,
    msg: 'Access token expired'
  },
  ACCESS_TOKEN_INVALID: {
    ec: 420,
    msg: 'Access token is invalid'
  },
  INTERNAL_SERVER_ERROR: {
    ec: 500,
    msg: 'Internal server error'
  },
  ROLE_INVALID: {
    ec: 400,
    msg: 'Role is invalid'
  },
  RESOURCE_NOT_FOUND: {
    ec: 2000,
    msg: 'Resource is not found'
  },
  RESOURCE_DElETED_SUCCESS: {
    msg: 'Resource is deleted successfully'
  },
  FILE_DELETED_SUCCESS: {
    msg: 'File is deleted successfully'
  },
  FILE_NOT_FOUND: {
    ec: 3000,
    msg: 'File is not found'
  },
  COMMENT_NOT_FOUND: {
    ec: 4000,
    msg: 'Comment is not found'
  },
  COMMENT_NOT_ALLOWED_DELETE: {
    ec: 4001,
    msg: 'You are not allowed to delete this comment'
  },
  COMMENT_DElETED_SUCCESS: {
    msg: 'Comment is deleted successfully'
  },
  USER_NOT_FOUND: {
    ec: 1000,
    msg: 'Invalid credentials'
  },
  USER_EXISTED: {
    ec: 1001,
    msg: 'User already exists'
  },
  USER_NOT_EXISTED: {
    ec: 1002,
    msg: 'User does not exist'
  },
  USER_NOT_ACTIVATED: {
    ec: 1004,
    msg: 'User is not activated'
  },
  USER_EMAIL_ALREADY_EXISTED: {
    ec: 1005,
    msg: 'Email address already exists'
  },
  USER_EMAIL_NOT_EXISTED: {
    ec: 1006,
    msg: 'Email address does not exist'
  },
  USER_ACTIVATED: {
    ec: 1007,
    msg: 'User has been activated'
  },
  USER_PASSWORD_INVALID: {
    ec: 1008,
    msg: 'Invalid password'
  },
  USER_PASSWORD_NOT_MATCHED: {
    ec: 1009,
    msg: 'Password not matched'
  },
  USER_PASSWORD_NOT_CHANGED: {
    ec: 1010,
    msg: 'Password not changed'
  },
  USER_TOKEN_INVALID: {
    ec: 1011,
    msg: 'Invalid token'
  },

  USER_ACTIVATE: {
    ec: 0,
    msg: 'Activated user successful'
  },
  USER_RESET_PASSWORD: {
    ec: 0,
    msg: 'Reset password successful'
  },
  USER_CHANGE_PASSWORD: {
    ec: 0,
    msg: 'Change password successful'
  },
  USER_SENT_REQUEST_TO_MAIL: {
    ec: 0,
    msg: 'Sent request to mail successful'
  },
  USER_DELETED_SUCCESS: {
    ec: 0,
    msg: 'User is deleted successfully'
  }
}
*/
