import { ENDPOINTS } from '../../constants/endpoints';
import axiosClient from '../axiosClient';

export const peopleApi = {
  listPeople: () => () => {
    return axiosClient.get(ENDPOINTS.LIST_PEOPLE, { params: { sort: '-createdAt' } });
  },
  createPeople: (data) => () => {
    return axiosClient.post(ENDPOINTS.CREATE_PEOPLE, data);
  },
  updatePeople: (id, data) => () => {
    return axiosClient.put(`${ENDPOINTS.PEOPLE_DETAILS}/${id}`, data);
  },
  deletePeople: (id) => () => {
    return axiosClient.delete(`${ENDPOINTS.PEOPLE_DETAILS}/${id}`);
  },
  getDetails: (id) => () => {
    return axiosClient.get(`${ENDPOINTS.PEOPLE_DETAILS}/${id}`);
  },
};
