import axios from "axios";
import { REACT_APP_BASE_URL } from "../configs";

const axiosClient = axios.create({
  baseURL: REACT_APP_BASE_URL,
});
axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error("Unknown error:", error.message);
      return;
    }

    const { status, data } = error.response;
    if (status >= 500) {
      // TODO: Show server error message
    } else if (400 <= status && status < 500) {
      throw data;
    }
  }
);

export default axiosClient;