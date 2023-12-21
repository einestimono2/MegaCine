import { ENDPOINTS } from '../../constants/endpoints';
import axiosClient from '../axiosClient';

export const userApi = {
  listUser: (params) => () => {
    return axiosClient.get(ENDPOINTS.LIST_USER, { params });
  },
  toggleBlockUser: (id) => () => {
    return axiosClient.get(`${ENDPOINTS.TOGGLE_BLOCK_USER}/${id}`);
  },
};
