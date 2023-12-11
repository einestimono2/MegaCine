import path from 'path';

export const isCloudinaryImageUrl = (url: string) => {
  const cloudinaryUrlRegex = /^https?:\/\/res\.cloudinary\.com\/[a-z0-9-]+\/image\/upload\//;

  return cloudinaryUrlRegex.test(url);
};

export const isCloudinaryUrl = (url: string) => {
  const cloudinaryUrlRegex =
    /^https?:\/\/(?:res\.cloudinary\.com\/[a-z0-9-]+\/image\/upload\/|cloudinary\.com\/[a-z0-9-]+\/image\/upload\/)/;

  return cloudinaryUrlRegex.test(url);
};

export const isSystemPath = (url: string) => {
  return url === path.basename(url);
};
