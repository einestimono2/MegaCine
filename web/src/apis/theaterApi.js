import axiosClient from './axiosClient';
import ENDPOINTS from '../constants/endpoints';

export const theaterApi = {
  listNearbyTheater: (body, params) => () => {
    return axiosClient.post(ENDPOINTS.THEATER_NEARBY, body, { params });
  },
  listMostRateTheater: (params) => () => {
    return axiosClient.get(ENDPOINTS.THEATER_MOST_RATE, { params });
  },
};
