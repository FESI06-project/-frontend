import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
