import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authApi } from './authApi';
import { REACT_APP_BASE_URL } from '../configs';
import { ROUTE } from '../constants/router';

const axiosClient = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token');

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

  async (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      console.error('Unknown error:', error.message);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh_token = localStorage.getItem('refresh_token');
        const data = {
          refreshToken: refresh_token,
        };
        const response = await authApi.refreshToken(data);
        console.log('Access token refreshed:', response.data);
        const { accessToken } = response.data;

        localStorage.setItem('access_token', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (_error) {
        console.error('Refresh token failed:', _error);
        const navigate = useNavigate();
        navigate(ROUTE.SIGNIN);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
