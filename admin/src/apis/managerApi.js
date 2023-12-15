import { ENDPOINTS } from "../constants/endpoints";
import axiosClient from "./axiosClient";

export const managerApi = {
  listMovie: (data) => () => {
    return axiosClient.get(ENDPOINTS.LOGIN, data);
  },
};