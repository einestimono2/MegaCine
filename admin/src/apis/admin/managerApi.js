import { ENDPOINTS } from '../../constants/endpoints';
import axiosClient from '../axiosClient';

export const managerApi = {
  approvalList: (params) => () => {
    return axiosClient.get(ENDPOINTS.APPROVAL_LIST_MANAGER, { params });
  },
  listManager: (params) => () => {
    return axiosClient.get(ENDPOINTS.LIST_MANAGER, { params });
  },
  getDetails: (id) => () => {
    return axiosClient.get(`${ENDPOINTS.MANAGER_DETAILS}/${id}`);
  },
  activateManager: (id) => () => {
    return axiosClient.get(`${ENDPOINTS.ACTIVATE_MANAGER}/${id}`);
  },
  deleteManager: (id) => () => {
    return axiosClient.delete(`${ENDPOINTS.DELETE_MANAGER}/${id}`);
  },
};
