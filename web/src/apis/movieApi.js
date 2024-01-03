import axiosClient from './axiosClient';
import ENDPOINTS from '../constants/endpoints';
export const movieApi = {
  listMovieNowShowing: (data) => () => {
    return axiosClient.get(ENDPOINTS.MOVIE_NOW_SHOWING, data);
  },
  listMovieComingSoon: (data) => () => {
    return axiosClient.get(ENDPOINTS.MOVIE_COMING_SOON, data);
  },
};
