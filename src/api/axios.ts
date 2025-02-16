import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount: number) => Math.pow(2, retryCount) * 1000,
  shouldResetTimeout: true,
});

export default axiosInstance;
