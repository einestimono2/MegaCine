import { ENDPOINTS } from '../../constants/endpoints';
import axiosClient from '../axiosClient';

export const genreApi = {
  listGenre: () => () => {
    return axiosClient.get(ENDPOINTS.LIST_GENRE);
  },
  createGenre: (data) => () => {
    return axiosClient.post(ENDPOINTS.CREATE_GENRE, data);
  },
  updateGenre: (id, data) => () => {
    return axiosClient.put(`${ENDPOINTS.GENRE_DETAILS}/${id}`, data);
  },
  deleteGenre: (id) => () => {
    return axiosClient.delete(`${ENDPOINTS.GENRE_DETAILS}/${id}`);
  },
  getDetails: (id) => () => {
    return axiosClient.get(`${ENDPOINTS.GENRE_DETAILS}/${id}`);
  },
};
