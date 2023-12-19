/* eslint-disable */
import { message } from 'antd';
// import {
//   loadingHandler,
//   removeUser,
//   tokenHandler,
//   updateLoginState,
// } from 'src/redux/auth/action';
// import store from 'src/redux/store';

export default async function apiCaller({
  request,
  errorHandler = defaultErrorHandler,
}) {
  try {
    // store.dispatch(loadingHandler(true));
    const response = await request();
    return response;
  } catch (error) {
    if (error.ec === 419 || error.ec === 420) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    //   store.dispatch(removeUser());
    //   store.dispatch(updateLoginState(false));
    //   store.dispatch(tokenHandler(true));
    }
    errorHandler(error);
  } finally {
    // store.dispatch(loadingHandler(false));
  }
  return null;
}

function defaultErrorHandler(error) {
  console.error('An error occurred:', error);
  message.error(error);
}