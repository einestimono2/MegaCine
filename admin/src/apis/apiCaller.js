import { message } from 'antd';

export default async function apiCaller({ request, errorHandler = defaultErrorHandler }) {
  try {
    const response = await request();
    return response;
  } catch (error) {
    errorHandler(error);
  }
  return null;
}

function defaultErrorHandler(error) {
  console.error('An error occurred:', error);
  message.error(error);
}
