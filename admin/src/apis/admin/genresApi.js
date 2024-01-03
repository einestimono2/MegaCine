import { ENDPOINTS } from '../../constants/endpoints';
import axiosClient from '../axiosClient';

export const genresApi = {
  listGenres: (data, access_token) => () => {
    return axiosClient.get(ENDPOINTS.LIST_GENRES, {
      headers: { Authorization: `Bearer ${access_token}` },
      params: data,
    });
  },
  createPerson: (data, access_token) => () => {
    return axiosClient.post(ENDPOINTS.CREATE_GENRES, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  },
};
