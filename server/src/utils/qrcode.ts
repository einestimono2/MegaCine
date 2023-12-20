import { toDataURL } from 'qrcode';

export const generateQRCode = async (bookingId: string) => {
  return await new Promise<string>((resolve, reject) => {
    toDataURL(bookingId, (error, url) => {
      error ? reject(error) : resolve(url);
    });
  });
};
