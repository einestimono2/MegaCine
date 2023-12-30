import { ENDPOINTS } from '../../constants/endpoints';
import axiosClient from '../axiosClient';

export const uploadApi = {
  uploadFiles: (data) => () => {
    return axiosClient.post(ENDPOINTS.UPLOADFILES, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadFile: (data) => () => {
    return axiosClient.post(ENDPOINTS.UPLOADFILE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
