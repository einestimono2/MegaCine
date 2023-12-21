import { ENDPOINTS } from "../constants/endpoints";
import axiosClient from "./axiosClient";

export const managerApi = {
  listMovie: () => () => {
    return axiosClient.get(ENDPOINTS.LISTMOVIE);
  },
};