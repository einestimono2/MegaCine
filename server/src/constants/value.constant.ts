export const EMAIL_REGEX_PATTERN: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const DEFAULT_AVATAR_URL: string =
  'https://res.cloudinary.com/dtl1pdmw6/image/upload/v1695568685/MegaCine/Default_avatar.png';
export const DEFAULT_IMAGE_URL: string =
  'https://res.cloudinary.com/dtl1pdmw6/image/upload/v1702019100/MegaCine/Default_image.png';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export const MONITOR_TIMER = 60000 * 15; // 60s

export const MAX_DISTANCE_IN_METERS = 10000;

const v1 = '/api/v1';
export const API_VERSION = v1;
export const LIST_API_VERSIONS = [v1];
