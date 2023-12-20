import { ENDPOINTS } from "../constants/endpoints";
import axiosClient from "./axiosClient";

export const authApi = {
  login: (data) => () => {
    return axiosClient.post(ENDPOINTS.LOGIN, data);
  },
  logout: (access_token) => () => {
    return axiosClient.get(ENDPOINTS.LOGOUT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
};
